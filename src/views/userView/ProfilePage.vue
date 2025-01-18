<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores';
import { uploadFileService, updateUserService } from '@/api/user.js';
import defaultAvatar from '@/assets/default.png';
import { EditPen, Upload, InfoFilled } from '@element-plus/icons-vue';

const userInfo = ref({
    username: '',
    image: '',
    gender: 0,
    age: 0,
    bio: '',
});

const emit = defineEmits(['favorites', 'friends', 'records']);
const userStore = useUserStore();
const isEditing = ref(false);
const imageFile = ref(null);
const isLoading = ref(false); // 添加加载状态

// 切换编辑状态
const editProfile = () => {
    isEditing.value = true;
};

const cancelEvent = () => {
    ElMessage.warning('取消修改');
};

// 提交修改
const submitProfile = async () => {
    isLoading.value = true; // 开始加载
    try {
        userInfo.value.image = await uploadFileService(imageFile.value);
        await updateUserService(userInfo.value);
        await getUser();
        isEditing.value = false;
    } catch (error) {
        console.error('提交用户信息失败:', error);
    } finally {
        isLoading.value = false; // 结束加载
    }
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

const getUser = async () => {
    await userStore.getUser(); 
     userInfo.value = await userStore.user ; 
    console.log('用户信息：userInfo.value',  userInfo.value);
    console.log('用户信息：userStore.user.value', userStore.user);
};

onMounted(() => {
    getUser();
});
</script>

<template>
    <div class="profile-page">
        <div v-if="!isEditing" class="profile-header">
            <div class="avatar-container">
                <img :src="userInfo?.image || defaultAvatar" alt="用户头像" class="avatar" />
            </div>
            <div class="user-info">
                <p>用户：{{ userInfo.username }}</p>
                <p>性别: {{ userInfo.gender === 0 ? '男' : userInfo.gender === 1 ? '女' : '未选择' }}</p>
                <p>年龄: {{ userInfo.age }}</p>
            </div>
        </div>
        <div v-if="isEditing" class="profile-header">
            <CUploader placeholder="请上传头像" type="image" @file-selected="imageFile = $event" />
            <div class="user-info-input">
                <div class="input-with-label">
                    <span class="label">用户名：</span>
                    <el-input
                        size="small"
                        v-model="userInfo.username"
                        placeholder="用户名"></el-input>
                </div>
                <div class="input-with-label">
                    <span class="label">性别：</span>
                    <el-select size="small" v-model="userInfo.gender" placeholder="性别">
                        <el-option label="未选择" value="2"></el-option>
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                    </el-select>
                </div>
                <div class="input-with-label">
                    <span class="label">年龄：</span>
                    <el-input-number size="small" v-model="userInfo.age" :min="1" :max="130" />
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
        <div class="bio-container" v-if="isEditing">
            <el-input
                class="transparent-input"
                type="textarea"
                v-model="userInfo.bio"
                placeholder="输入个人简介" />
        </div>
        <div class="edit-button">
            <el-button v-if="!isEditing" type="primary" plain @click="editProfile" text>
                点击进行修改<el-icon><EditPen /></el-icon
            ></el-button>
            <el-popconfirm
                confirm-button-text="是"
                cancel-button-text="否"
                :icon="InfoFilled"
                icon-color="#626AEF"
                title="已确认信息无误并提交"
                @confirm="submitProfile"
                @cancel="cancelEvent">
                <template #reference>
                    <el-button v-if="isEditing" type="warning" plain text :loading="isLoading">
                        点击进行提交 <el-icon><Upload /></el-icon>
                    </el-button>
                </template>
            </el-popconfirm>
        </div>
        <div class="actions">
            <el-button v-bind="buttonProps" @click="handleAction('friends')">好友列表</el-button>
            <el-button v-bind="buttonProps" @click="handleAction('favorites')">收藏歌曲</el-button>
            <el-button v-bind="buttonProps" plain @click="handleAction('history')"
                >历史记录</el-button
            >
        </div>
    </div>
</template>
<style lang="scss" scoped>
.profile-page {
    height: 95%;
    font-size: small;
    color: #118c98;
    border: 4px solid #0b144a;
    border-radius: 4px;
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
    margin-top: 5px;
    .transparent-input {
        opacity: 0.8;
    }
}

.avatar {
    width: 70px;
    height: 70px;
    object-fit: cover;
}

.edit-button {
    margin-top: 5px;
    margin-bottom: 5px;
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

.user-info-input {
    .input-with-label {
        display: flex;
        justify-content: space-between; // 标签向左，输入框向右
        align-items: center;
        margin-bottom: 5px;

        .label {
            margin-right: 10px; // 可选：标签和输入框之间的间距
            white-space: nowrap; // 防止标签换行
        }

        .el-input,
        .el-select,
        .el-input-number {
            opacity: 0.8;
        }
        .el-select,
        .el-input-number {
            width: 80px;
        }
    }
}
</style>
