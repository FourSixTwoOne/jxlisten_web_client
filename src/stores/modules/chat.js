import { defineStore } from 'pinia';
import { ref } from 'vue';
import socketApi from '@/api/wbesocket';

export const useChatStore = defineStore(
    'chat',
    () => {
        const MessageType = {
            ROOM: 'ROOM',
            FRIEND: 'FRIEND',
            SERVER: 'SERVER',
            ALL: 'ALL',
        };
        const roomMessages = ref([]);
        const friendMessages = ref([]);
        const serverMessages = ref([]);
        const createWebSocket = (token) => {
            socketApi.initWebSocket(token);

            // 设置消息处理器
            socketApi.setMessageHandler((message) => {
                switch (message.channelType) {
                    case MessageType.ROOM:
                        roomMessages.value.push(message);
                        break;
                    case MessageType.FRIEND:
                        friendMessages.value.push(message);
                        break;
                    case MessageType.SERVER:
                        serverMessages.value.push(message);
                        break;
                    default:
                        console.warn('收到未知类型消息:', message);
                }
            });
        };
        /**
         * 发送消息方法
         * @param {string} content - 消息对象
         * @param {'ROOM'|'FRIEND'} channelType - 频道类型
         * @param {string} targetId - 目标ID（房间ID或好友ID）
         */
        const sendMessage = async ({ senderId, content, channelType, targetId }) => {
            const message = {
                senderId,
                content,
                channelType,
                targetId,
                type: 'CHAT',
                timestamp: Date.now(),
                status: 'sending',
            };
            console.log('newMsg:::', message);

            let messageIndex;

            // 先更新本地状态并记录索引
            if (channelType === MessageType.ROOM) {
                messageIndex = roomMessages.value.length;
                roomMessages.value.push({ ...message, status: 'sent' });
            } else if (channelType === MessageType.FRIEND) {
                messageIndex = friendMessages.value.length;
                friendMessages.value.push({ ...message, status: 'sent' });
            }

            // 尝试发送
            const success = socketApi.sendMessage(message);
            if (!success) {
                updateMessageStatus(channelType, messageIndex, 'failed');
                throw new Error('发送失败：连接未就绪');
            }
        };

        // 更新消息状态
        const updateMessageStatus = (channelType, index, status) => {
            if (channelType === MessageType.ROOM && roomMessages.value[index]) {
                roomMessages.value[index].status = status;
            } else if (channelType === MessageType.FRIEND && friendMessages.value[index]) {
                friendMessages.value[index].status = status;
            }
        };
        const clearMessages = (channelType, targetId) => {
            if (channelType === MessageType.ALL) {
                roomMessages.value = [];
                friendMessages.value = [];
                serverMessages.value = [];
            }
            if (channelType === MessageType.ROOM) {
                roomMessages.value = roomMessages.value.filter((m) => m.targetId !== targetId);
            } else if (channelType === MessageType.FRIEND) {
                friendMessages.value = friendMessages.value.filter((m) => m.targetId !== targetId);
            }
        };
        const getMessages = (channelType, targetId) => {
            if (channelType === MessageType.ROOM) {
                return roomMessages.value.filter((m) => m.targetId === targetId);
            } else if (channelType === MessageType.FRIEND) {
                return friendMessages.value.filter((m) => m.targetId === targetId);
            }
            return [];
        };

        return {
            MessageType,
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
                ctx.store.roomMessages = ctx.store.roomMessages.filter((m) => m.status === 'sent');
                ctx.store.friendMessages = ctx.store.friendMessages.filter(
                    (m) => m.status === 'sent'
                );
            },
        },
    }
);
