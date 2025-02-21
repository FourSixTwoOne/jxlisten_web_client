<script setup>
import { ref, computed } from 'vue';
import { useUserStore, useChatStore } from '@/stores';
import { getUserByIdService } from '@/api/user';
import { ArrowUpBold } from '@element-plus/icons-vue';
import { ChannelType } from '@/api/websocket';

const props = defineProps({
    param: {
        type: Number,
    },
});

const chatStore = useChatStore();
const userStore = useUserStore();
const isExpanded = ref(false);
const userInfo = ref({
    username: '',
    userId: props.param,
    image: '',
    bio: '',
    gender: 0,
    age: 0,
});

const propData = computed(() => {
    const map = new Map();
    map.set(userInfo.value.userId, userInfo.value);
    return map;
});

const getFriendInfo = async () => {
    if (userStore.user.userId === props.param) {
        ElMessage.error('出错，不能与自己聊天');
        userInfo.value = null;
        return;
    }
    const res = await getUserByIdService(props.param);
    if (res.data.code === 1) {
        userInfo.value = res.data.data;
    }
};

const messages = computed(() => {
    return chatStore.getMessages(ChannelType.FRIEND, userInfo.value.userId, userStore.user.userId);
});

// 处理消息发送
const handleSend = async (content) => {
    const newMsg = {
        senderId: userStore.user.userId,
        content: content,
        channelType: ChannelType.FRIEND,
        targetId: userInfo.value.userId,
    };
    chatStore.sendMessage(newMsg);
};

// 清空聊天记录
const cleanChat = (userId) => {
    ElMessageBox.confirm('确定要清空聊天记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        // 清空聊天记录
        chatStore.clearMessages(ChannelType.FRIEND, userId);
        chatStore.getMessages(ChannelType.FRIEND, userId);
    });
};

getFriendInfo();
</script>

<template>
    <div class="container">
        <el-text size="large" type="primary">好友主页</el-text>
        <div class="header">
            <div class="profile" @click="isExpanded = !isExpanded">
                <AvatarView :src="userInfo?.image" class="avatar" />
                <div class="info">
                    <span class="name">
                        {{ userInfo.username }}
                    </span>

                    <p v-if="isExpanded" class="meta">
                        {{ userInfo.gender === 1 ? '女' : '男' }} · {{ userInfo.age }}岁
                    </p>
                </div>

                <span class="arrow" :class="{ expanded: isExpanded }"
                    ><el-icon color="#409efc"><ArrowUpBold /></el-icon
                ></span>
            </div>
            <div class="more-choices">
                <el-dropdown trigger="click">
                    ...
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="cleanChat(props.param)"
                                >清空聊天记录</el-dropdown-item
                            >
                            <el-dropdown-item>举报</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div v-if="isExpanded" class="bio">{{ userInfo.bio }}</div>
        </div>
        <ChatWindow
            :messages="messages"
            :key="messages"
            :participants="propData"
            @send="handleSend" />
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/main.scss' as *;

.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    .title {
        color: #000000;
    }
}

.header {
    border-bottom: $border2;
    position: relative;
    .profile {
        display: flex;
        align-items: center;
        cursor: pointer;
        .name {
            color: $name-color;
        }
    }

    .more-choices {
        display: flex;
        justify-content: center;
        position: absolute;
        width: 20px;
        height: 20px;
        right: 0px;
        border: $border2;
        border-radius: 30%;
        bottom: 0;
    }

    .avatar {
        width: 50px;
        height: 50px;
    }
}
.meta {
    padding: 0;
    margin: 0;
}

.arrow {
    margin-right: 20px;
    margin-left: auto;
    transition: transform 0.3s;
}

.arrow.expanded {
    transform: rotate(180deg);
}

.bio {
    color: #666;
}
</style>
