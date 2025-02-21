import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Status, ChannelType, createMessage, MessageType } from '@/api/websocket';
import socketApi from '@/api/websocket';
import { ElMessage } from 'element-plus';

export const useChatStore = defineStore(
    'chat',
    () => {
        const roomMessages = ref([]);
        const friendMessages = ref([]);
        const serverMessages = ref([]);
        // 待确认消息队列
        const pendingMessages = ref(new Map());

        const createWebSocket = (token) => {
            socketApi.initWebSocket(token);
            // 设置消息处理器
            socketApi.setMessageHandler((message) => {
                if (message.messageType === MessageType.ACK) {
                    console.log('收到ACK消息:', message);
                    handleAckMessage(message);
                    return;
                }
                switch (message.channelType) {
                    case ChannelType.ROOM:
                        roomMessages.value.push(message);
                        break;
                    case ChannelType.FRIEND:
                        friendMessages.value.push(message);
                        break;
                    case ChannelType.SERVER:
                        if (message.messageType === MessageType.PING) {
                            sendPong();
                            break;
                        }
                        serverMessages.value.push(message);
                        break;
                    default:
                        console.warn('收到未知类型消息:', message);
                }
            });
        };

        const sendPong = () => {
            console.log('发送PONG');
            const pongMessage = createMessage({
                channelType: ChannelType.SERVER,
                messageType: MessageType.PONG,
            });
            try {
                const success = socketApi.sendMessage(pongMessage);
                if (!success) {
                    console.error('连接未就绪');
                }
            } catch (err) {
                console.error('发送失败', err);
            }
        };

        const handleAckMessage = (ack) => {
            const pendingMsg = pendingMessages.value.get(ack.messageId);
            if (!pendingMsg) return;
            // 更新最终状态
            if (ack.status === Status.SENT) {
                updateMessageStatus(pendingMsg.channelType, pendingMsg.localIndex, Status.SENT);
            } else {
                ElMessage.error(ack.content);
                updateMessageStatus(pendingMsg.channelType, pendingMsg.localIndex, Status.FAILED);
            }
            pendingMessages.value.delete(ack.messageId);
        };

        const sendMessage = async (params) => {
            const message = createMessage(params);
            console.log('newMsg:::', message);

            // 存储到待确认队列
            const localIndex = storeLocally(message);
            pendingMessages.value.set(message.messageId, {
                ...message,
                localIndex,
                channelType: message.channelType,
            });

            try {
                const success = socketApi.sendMessage(message);
                if (!success) {
                    ElMessage.error('连接未就绪');
                    updateMessageStatus(message.channelType, localIndex, Status.FAILED);
                    pendingMessages.value.delete(message.messageId);
                }
            } catch (err) {
                console.error('发送失败', err);
            }
        };

        // 更新消息状态
        const updateMessageStatus = (channelType, index, status) => {
            if (channelType === ChannelType.ROOM && roomMessages.value[index]) {
                roomMessages.value[index].status = status;
            } else if (channelType === ChannelType.FRIEND && friendMessages.value[index]) {
                friendMessages.value[index].status = status;
            }
        };
        const clearMessages = (channelType, targetId) => {
            if (channelType === ChannelType.ALL) {
                roomMessages.value = [];
                friendMessages.value = [];
                serverMessages.value = [];
            }
            if (channelType === ChannelType.ROOM) {
                roomMessages.value = roomMessages.value.filter((m) => m.targetId !== targetId);
            } else if (channelType === ChannelType.FRIEND) {
                friendMessages.value = friendMessages.value.filter((m) => m.targetId !== targetId);
            }
        };

        const getMessages = (channelType, targetId, senderId) => {
            if (channelType === ChannelType.ROOM) {
                return roomMessages.value.filter((m) => m.targetId === targetId);
            } else if (channelType === ChannelType.FRIEND) {
                return friendMessages.value.filter(
                    (m) =>
                        (m.targetId === targetId && m.senderId === senderId) ||
                        (m.senderId === targetId && m.targetId === senderId)
                );
            }
            return [];
        };

        const storeLocally = (message) => {
            let index;
            switch (message.channelType) {
                case ChannelType.ROOM:
                    index = roomMessages.value.length;
                    roomMessages.value.push(message);
                    break;
                case ChannelType.FRIEND:
                    index = friendMessages.value.length;
                    friendMessages.value.push(message);
                    break;
                case ChannelType.SERVER:
                    index = serverMessages.value.length;
                    serverMessages.value.push(message);
                    break;
            }
            return index;
        };

        return {
            roomMessages,
            friendMessages,
            serverMessages,
            createWebSocket,
            sendMessage,
            updateMessageStatus,
            clearMessages,
            getMessages,
        };
    },
    {
        persist: {
            paths: ['roomMessages', 'friendMessages'],
            afterRestore: (ctx) => {
                ctx.store.roomMessages = ctx.store.roomMessages.filter(
                    (m) => m.status === Status.SENT
                );
                ctx.store.friendMessages = ctx.store.friendMessages.filter(
                    (m) => m.status === Status.SENT
                );
            },
        },
    }
);
