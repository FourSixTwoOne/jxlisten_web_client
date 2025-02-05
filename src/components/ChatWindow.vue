<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores';

const props = defineProps({
    // 消息列表（由父组件维护）
    messages: {
        type: Array,
        required: true,
        default: () => [],
    },
    // 参与者信息映射 { userId: { name, avatar } }
    participants: {
        type: Object,
        default: () => ({}),
    },
});

const userStore = useUserStore();
const emit = defineEmits(['send']);

const currentUserId = ref(userStore.user.userId);
const newMessage = ref('');

const formatTime = (time) => {
    return new Date(time * 1000).toLocaleTimeString();
};

const sendMessage = () => {
    if (!newMessage.value.trim()) return;

    emit('send', newMessage.value.trim());
    newMessage.value = '';
};
</script>

<template>
    <div class="chat-container">
        <div class="messages-area">
            <div
                v-for="(msg, index) in props.messages"
                :key="index"
                class="message"
                :class="{ self: msg.senderId === currentUserId }">
                <AvatarView :src="participants[msg.senderId]?.avatar" class="message-avatar" />
                <div class="bubble-container">
                    <div v-if="msg.senderId !== currentUserId" class="sender-name">
                        {{ participants[msg.senderId]?.name || '用户' }}
                    </div>
                    <div class="bubble">
                        <div class="content">{{ msg.content }}</div>
                        <div class="time">{{ formatTime(msg.time) }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="input-area">
            <el-input
                v-model="newMessage"
                type="textarea"
                autosize
                placeholder="输入信息…"
                @keyup.enter.prevent="sendMessage" />
            <el-button type="primary" @click="sendMessage"> 发送 </el-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/main.scss' as *;
.chat-container {
    height: calc(100% - 107px);
    width: 100%;
    display: flex;
    flex-direction: column;

    .messages-area {
        width: 100%;
        flex: 1;
        overflow-y: auto;

        .message {
            display: flex;
            margin: 0;
            width: 100%;

            &.self {
                flex-direction: row-reverse;

                .bubble {
                    background: #dcf8c6;
                }
            }
        }

        .message-avatar {
            width: 30px;
            height: 30px;
            margin: 5px;
        }

        .bubble {
            max-width: 300px;
            padding: 4px;
            border-radius: 10px;
            background: #f0f0f0;

            .sender-name {
                font-size: 16px;
                color: #785656;
                margin-bottom: 10px;
            }

            .content {
                font-size: 12px;
                line-height: 1.4;
                word-break: break-word;
            }

            .time {
                font-size: 8px;
                color: #514a4a;
                text-align: right;
            }
        }
    }
    .input-area {
        border-top: $border2;
        display: flex;
        gap: 4px;
    }
}
</style>
