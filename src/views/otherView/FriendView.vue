<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores';
import { getUserService } from '@/api/user';

const props = defineProps({
    param: {
        type: Object,
    },
});

const userStore = useUserStore();
const isExpanded = ref(false);
const userInfo = ref({
    username: '',
    userId: props.param.Id,
    image: '',
    bio: '',
    gender: 0,
    age: 0,
});

const getFriendInfo = async () => {
    const res = await getUserService(props.param.userId);
    if (res.data.code === 1) {
        userInfo.value = res.data.data;
    }
};

const messages = ref([
    {
        content: '你好呀！',
        senderId: 1,
        time: 1234556,
    },
    {
        content: '我很好，谢谢！',
        senderId: 2,
        time: 1234556,
    },
]);

// 处理消息发送
const handleSend = async (content) => {
    const newMsg = {
        content,
        senderId: userStore.user.userId,
        timestamp: Date.now() / 1000,
    };

    // 调用后端API发送消息
    // await api.sendMessage(newMsg);

    // 添加到消息列表
    messages.value.push(newMsg);
};

getFriendInfo();
</script>

<template>
    <div class="container">
        <!-- 好友信息头部 -->
        <div class="header">
            <div class="profile" @click="isExpanded = !isExpanded">
                <AvatarView :src="userInfo.image" class="avatar" />
                <div class="info">
                    <h3>{{ userInfo.username }}</h3>
                    <p v-if="isExpanded" class="meta">
                        {{ userInfo.gender === 1 ? '女' : '男' }} · {{ userInfo.age }}岁
                    </p>
                </div>
                <span class="arrow" :class="{ expanded: isExpanded }">▼</span>
            </div>
            <div v-if="isExpanded" class="bio">{{ userInfo.bio }}</div>
        </div>

        <ChatWindow :messages="messages" :participants="userInfo" @send="handleSend" />
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/main.scss' as *;

.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.header {
    border-bottom: $border2;
}

.profile {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.avatar {
    width: 50px;
    height: 50px;
}

.meta {
    padding: 0;
    margin: 0;
}

.arrow {
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
