<script setup>
import { ref } from 'vue';
import defaultAvatar from '@/assets/default.png';
import { EditPen, Upload } from '@element-plus/icons-vue';
const userInfo = ref({
    avatar: '', // 用户头像
    username: '用户名',
    gender: 'male',
    age: 25,
    bio: '这是个人简介这是个人简简介',
});
const emit = defineEmits(['favorites', 'friends', 'records']);
const isEditing = ref(false);

// 切换编辑状态
const editProfile = () => {
    isEditing.value = true;
};

// 提交修改
const submitProfile = () => {
    // 在这里可以添加提交逻辑，例如 API 调用
    isEditing.value = false;
};

// 处理好友列表、收藏歌曲和历史记录的点击事件
const handleAction = (action) => {
    emit('action-selected', action);
};

const buttonProps = {
    color: '#a0a20a',
    size: 'small',
    type: 'info',
    plain: true,
};

</script>

<template>
    <div class="profile-page">
        <div class="profile-header">
            <div class="avatar-container">
                <img :src="userInfo.avatar || defaultAvatar" alt="用户头像" class="avatar" />
            </div>
            <div class="user-info">
                <p>用户：{{ userInfo.username }}</p>
                <p>性别: {{ userInfo.gender }}</p>
                <p>年龄: {{ userInfo.age }}</p>
                <div v-if="isEditing">
                    <el-input v-model="userInfo.username" placeholder="输入用户名" />
                    <el-select v-model="userInfo.gender" placeholder="选择性别">
                        <el-option label="男" value="male" />
                        <el-option label="女" value="female" />
                    </el-select>
                    <el-input v-model="userInfo.age" type="number" placeholder="输入年龄" />
                </div>
            </div>
        </div>

        <div class="bio-container" v-if="!isEditing">
            <h3>个人简介：</h3>
            <el-input
                class="transparent-input"
                :rows="2"
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 3 }"
                maxlength="50"
                show-word-limit
                v-model="userInfo.bio"
                placeholder="暂无个人简介" />
        </div>
        <div v-if="isEditing">
            <el-input type="textarea" v-model="userInfo.bio" placeholder="输入个人简介" />
        </div>
        <div class="edit-button">
            <el-button v-if="isEditing" type="primary" plain @click="editProfile" text>
                点击进行修改<el-icon><EditPen /></el-icon
            ></el-button>
            <el-button v-if="!isEditing" type="warning" plain @click="submitProfile" text
                >点击进行提交 <el-icon><Upload /></el-icon>
            </el-button>
        </div>
        <div class="friends-actions">
            <el-button v-bind="buttonProps" @click="handleAction('friends')">好友列表</el-button>
            <el-button  v-bind="buttonProps" @click="handleAction('favorites')">收藏歌曲</el-button>
            <el-button  v-bind="buttonProps" plain @click="handleAction('history')">历史记录</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.profile-page {
    height: 95%;
    font-size: small;
    color: #118c98;
    border: 4px solid #0b144a;
    border-radius: 8px;
    padding: 2px;
    background-image: url('@/assets/BG.jpg');
    background-size: cover;
    background-position: center;
}

.profile-header {
    display: flex;
    align-items: center;
}

.avatar-container {
    position: relative;
    margin-right: 5%;
}

.bio-container {
    margin-bottom: 5px;
    .transparent-input {
        opacity: 0.8;
    }
}
.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
}

.edit-button {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

.user-info {
    flex-grow: 1;
}

.friends-actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
</style>
