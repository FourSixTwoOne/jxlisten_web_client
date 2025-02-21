<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores';
import { timeFormat } from '@/utils/dateFormat';
import { WarnTriangleFilled, Loading } from '@element-plus/icons-vue';

const props = defineProps({
    messages: {
        type: Array,
        required: true,
        default: () => [],
    },
    participants: {
        type: Map,
        required: true,
        default: () => new Map(),
    },
});

const userStore = useUserStore();
const emit = defineEmits(['send']);

const currentUserId = ref(userStore.user.userId);
const newMessage = ref('');

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
                v-for="msg in props.messages"
                :key="msg.id"
                class="message"
                :class="{ self: msg.senderId === currentUserId }">
                <AvatarView
                    v-if="msg.senderId === currentUserId"
                    :src="userStore.user.image"
                    class="message-avatar" />
                <AvatarView
                    v-else
                    :src="participants.get(msg.senderId)?.image"
                    class="message-avatar" />
                <div class="bubble-container">
                    <div v-if="msg.senderId !== currentUserId" class="sender-name">
                        {{ participants.get(msg.senderId)?.name || '用户' }}
                    </div>
                    <div class="bubble">
                        <!-- 失败状态图标 -->
                        <el-icon
                            v-if="msg.status === 'failed'"
                            class="status-icon"
                            :class="{ self: msg.senderId === currentUserId }"
                            color="#ff4d4f">
                            <WarnTriangleFilled />
                        </el-icon>

                        <div class="content">{{ msg.content }}</div>

                        <div class="status-container">
                            <!-- 发送中状态图标 -->
                            <el-icon
                                v-if="msg.status === 'sending'"
                                class="status-icon"
                                :class="{ self: msg.senderId === currentUserId }">
                                <Loading />
                            </el-icon>

                            <div class="time">{{ timeFormat(msg.time) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="input-area">
            <el-input
                class="input"
                v-model="newMessage"
                type="textarea"
                size="small"
                :autosize="{ minRows: 1, maxRows: 4 }"
                placeholder="输入信息…"
                autofocus
                @keyup.enter.exact="sendMessage"
                @keyup.shift.enter="newMessage += '\n'"
                @keyup.enter.prevent="sendMessage" />
            <el-button type="primary" size="small" @click="sendMessage"> 发送 </el-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/main.scss' as *;
.chat-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    .messages-area {
        width: 100%;
        max-height: 80vh;
        flex: 1;
        overflow-y: auto;

        .message {
            display: flex;
            margin: 0;
            width: 100%;
            justify-content: flex-start;
            margin: 2px 0;
            &.self {
                flex-direction: row-reverse;
                .bubble {
                    background: #a1ad97;
                }
            }
            .bubble {
                background-color: #e6e6e6;
                padding: 1px;
                position: relative;
                border-radius: 4px;
                max-width: 280px;
                .content {
                    word-break: break-word;
                }

                .status-container {
                    display: flex;
                    align-items: center;
                    gap: 2px;
                    justify-content: flex-end;
                    margin-top: 2px;
                    font-size: 0.8em;
                    color: #666;
                }

                .status-icon {
                    &.self {
                        position: absolute;
                        right: auto;
                        left: -20px;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    &:not(.self) {
                        margin-left: 8px;
                    }
                }

                @keyframes rotating {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            }
        }

        .message-avatar {
            margin: 2px;
            width: 25px;
            height: 25px;
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
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
    }

    :deep(.el-textarea) {
        position: absolute;
        bottom: 0;
        width: 90%;
    }

    .el-button {
        position: absolute;
        width: 10%;
        height: 28px;
        right: 0;
        bottom: 0;
    }
}
</style>
