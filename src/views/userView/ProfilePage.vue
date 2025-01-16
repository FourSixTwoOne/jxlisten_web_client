<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores';
import { uploadFileService,updateUserService } from '@/api/user.js';
import defaultAvatar from '@/assets/default.png';
import { EditPen, Upload, Plus } from '@element-plus/icons-vue';
const userInfo = ref({
    image: '', // 用户头像
    username: '用户名',
    gender: 0,
    age: 25,
    bio: '这是个人简介这是个人简简介',
});
const emit = defineEmits(['favorites', 'friends', 'records']);
const userStore = useUserStore();
const isEditing = ref(false);
const imageUrl = ref('');
const imageFile = ref(null);

const changeImage = (uploadFile) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw);
    imageFile.value = uploadFile.raw;
};

const beforeAvatarUpload = (file) => {
    const isImage = file.type.startsWith('image/'); // 检查文件类型是否为图片
    const isLt2M = file.size / 1024 / 1024 < 2; // 检查文件大小是否小于2MB

    if (!isImage) {
        this.$message.error('已选择文件不是图片！');
    }
    if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
    }
    return isImage && isLt2M; // 检查通过则进行上传
};

// 切换编辑状态
const editProfile = () => {
    isEditing.value = true;
};

// 提交修改
const submitProfile = async () => {
    userInfo.value.image = await uploadFileService(imageFile.value);
    await updateUserService(userInfo.value);
    getUser;
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

const getUser = async () => {
    const res = await userStore.getUser();
    userInfo.value = res.data;
};
getUser;
</script>

<template>
    <div class="profile-page">
        <div v-if="!isEditing" class="profile-header">
            <div class="avatar-container">
                <img :src="userInfo.image || defaultAvatar" alt="用户头像" class="avatar" />
            </div>
            <div class="user-info">
                <p>用户：{{ userInfo.username }}</p>
                <p>性别: {{ userInfo.gender === 0 ? '男' : '女' }}</p>
                <p>年龄: {{ userInfo.age }}</p>
            </div>
        </div>
        <div v-if="isEditing" class="profile-header">
            <el-upload
                auto-upload="false"
                class="avatar-uploader"
                :before-upload="beforeAvatarUpload"
                :on-change="changeImage">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>

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
                        <el-option label="未选择" value="0"></el-option>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
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
            <el-button v-if="isEditing" type="warning" plain @click="submitProfile" text
                >点击进行提交 <el-icon><Upload /></el-icon>
            </el-button>
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
.avatar-uploader {
    border: 1px dashed #7d7070;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 4px;
}

.avatar {
    width: 70px;
    height: 70px;
    object-fit: cover;
}

.avatar-uploader-icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #8c939d;
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
