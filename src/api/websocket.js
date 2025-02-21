import { ref } from 'vue';

const socket = ref(null);
const isConnected = ref(false);
const messageHandler = ref(null);
let reconnectAttempts = 0;
let reconnectTimer = null;
let isManualClose = false;

const RECONNECT_CONFIG = {
    INTERVAL: 5000, // 重试间隔5秒
    MAX_ATTEMPTS: 5, // 最大重试次数
    BACKOFF_FACTOR: 2, // 退避系数(每次间隔乘以系数)
};
const initWebSocket = (token) => {
    if (!token) {
        ElMessage.error('正在加载...');
        return;
    }
    const wsUrl = `/ws/chat?token=${token}`;
    if (
        socket.value &&
        socket.value.readyState === WebSocket.OPEN &&
        socket.value instanceof WebSocket
    )
        return;
    socket.value = new WebSocket(wsUrl);
    console.log('WebSocket connecting...');
    socket.value.onopen = () => {
        isConnected.value = true;
        isManualClose = false;
        resetReconnect();
        console.log('WebSocket connected');
    };

    socket.value.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);
            console.log('接收到消息:', message);
            if (messageHandler.value) {
                messageHandler.value(message);
                console.log('开始处理消息');
            }
        } catch (error) {
            console.error('消息解析失败:', error);
        }
    };

    socket.value.onclose = () => {
        isConnected.value = false;

        // 手动关闭不重连
        if (isManualClose) {
            resetReconnect();
            return;
        }

        // 自动重连逻辑
        if (!reconnectTimer && reconnectAttempts < RECONNECT_CONFIG.MAX_ATTEMPTS) {
            const calcInterval = () =>
                RECONNECT_CONFIG.INTERVAL *
                Math.pow(RECONNECT_CONFIG.BACKOFF_FACTOR, reconnectAttempts);

            reconnectTimer = setInterval(() => {
                if (!isConnected.value) {
                    console.log(
                        `尝试重连 (${reconnectAttempts + 1}/${RECONNECT_CONFIG.MAX_ATTEMPTS})`
                    );

                    reconnectAttempts++;

                    if (reconnectAttempts > RECONNECT_CONFIG.MAX_ATTEMPTS) {
                        clearInterval(reconnectTimer);
                        reconnectTimer = null;
                        ElMessage.error('连接失败，请检查网络后手动重试');
                        return; // 新增终止逻辑
                    }

                    initWebSocket(token);
                }
            }, calcInterval());
        }
    };

    socket.value.onerror = (error) => {
        console.error('WebSocket error:', error);
        isConnected.value = false;
    };
};

const sendMessage = (message) => {
    try {
        if (isConnected.value && socket.value) {
            socket.value.send(JSON.stringify(message));
            return true;
        }
    } catch (err) {
        console.error('发送失败:', err);
        return false;
    }
};

const setMessageHandler = (handler) => {
    if (typeof handler !== 'function') {
        console.error('Invalid message handler:', handler);
        return;
    }
    messageHandler.value = handler;
};

const closeWebSocket = () => {
    isManualClose = true;
    resetReconnect();
    socket.value?.close();
    socket.value = null;
};

const resetReconnect = () => {
    if (isConnected.value || isManualClose) {
        reconnectAttempts = 0;
    }
    clearInterval(reconnectTimer);
    reconnectTimer = null;
};

const MessageType = {
    PONG: 'PONG',
    CHAT: 'CHAT',
    PING: 'PING',
    ACK: 'ACK',
};

const ChannelType = {
    ROOM: 'ROOM',
    FRIEND: 'FRIEND',
    SERVER: 'SERVER',
};

const ContentType = {
    TEXT: 'TEXT',
    IMAGE: 'IMAGE',
    FILE: 'FILE',
    VOICE: 'VOICE',
};

const Status = {
    SENDING: 'sending',
    SENT: 'sent',
    FAILED: 'failed',
};

const createMessage = ({
    senderId,
    content,
    channelType = ChannelType.FRIEND,
    contentType = ContentType.TEXT,
    messageType = MessageType.CHAT,
    targetId,
}) => ({
    senderId,
    targetId,
    messageId: generateMessageId(),
    timestamp: Date.now(),
    content,
    channelType,
    contentType,
    messageType,
    status: Status.SENDING,
});

// 其他工具方法
const generateMessageId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default {
    socket,
    MessageType,
    ChannelType,
    ContentType,
    Status,
    createMessage,
    initWebSocket,
    sendMessage,
    closeWebSocket,
    isConnected,
    setMessageHandler,
};
export {
    MessageType,
    ChannelType,
    ContentType,
    Status,
    createMessage,
    initWebSocket,
    sendMessage,
    closeWebSocket,
    isConnected,
    setMessageHandler,
};
