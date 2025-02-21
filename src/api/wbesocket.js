import { ref } from 'vue';

const socket = ref(null);
const isConnected = ref(false);
const messageHandler = ref(null);

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
        console.log('WebSocket connected');
    };

    socket.value.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);
            if (messageHandler.value) messageHandler(message);
        } catch (error) {
            console.error('消息解析失败:', error);
        }
    };

    socket.value.onclose = () => {
        isConnected.value = false;
        console.log('WebSocket disconnected');
    };

    socket.value.onerror = (error) => {
        ElMessage.error('服务未连接，请尝试刷新');
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
    messageHandler.value = handler;
};

const closeWebSocket = () => {
    socket.value?.close();
    socket.value = null;
};

export default {
    initWebSocket,
    sendMessage,
    closeWebSocket,
    isConnected,
    setMessageHandler,
};
