<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores';
import { uploadFileService, updateUserService } from '@/api/user.js';
import defaultAvatar from '@/assets/default.png';
import { EditPen, Upload, InfoFilled } from '@element-plus/icons-vue';


const userInfo = ref({
    id: '',
    username: '',
    image: '',
    gender: 0,
    age: 0,
    bio: '',
});

const emit = defineEmits(['action-selected']);
const userStore = useUserStore();
const isEditing = ref(false);
const imageFile = ref(null);
const isLoading = ref(false); // 添加加载状态

const isFriendsVisible = ref(false);
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
        if (imageFile.value) {
            const formData = new FormData();
            formData.append('file', imageFile.value);
            const res = await uploadFileService(formData);
            userInfo.value.image = res.data.data;
        }
        userInfo.value.id = userStore.user.id;
        await updateUserService(userInfo.value);
        await getUser();
        isEditing.value = false;
        ElMessage.success('修改成功');
    } catch (error) {
        ElMessage.error('提交用户信息失败:', error);
    } finally {
        isLoading.value = false; // 结束加载
    }
};

// 切换好友列表的显示状态
const toggleFriendsList = () => {
    isFriendsVisible.value = !isFriendsVisible.value;
};

const handleAction = (action) => {
    emit('action-selected', action);
};

const buttonProps = {
    color: '#a0a20a',
    size: 'small',
    plain: true,
};

const getUser = async () => {
    await userStore.getUser();
    userInfo.value = await userStore.user;
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
                <p>用户：{{ userInfo?.username }}</p>
                <p>
                    性别:
                    {{ userInfo?.gender === 0 ? '男' : userInfo.gender === 1 ? '女' : '未选择' }}
                </p>
                <p>年龄: {{ userInfo?.age }}</p>
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
            <el-button v-bind="buttonProps" @click="toggleFriendsList">好友列表</el-button>
            <!-- 展开好友列表 -->
            <div v-if="isFriendsVisible">
                <p>好友展示区域</p>
                <!-- 在这里添加友人展示的具体内容 -->
            </div>
            <el-dropdown split-button size="small" color="#a0a20a" @click="handleAction('history')">
                历史记录
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleAction('record-upload')"
                            >上传记录</el-dropdown-item
                        >
                        <el-dropdown-item @click="handleAction('record-listen')"
                            >最近听歌</el-dropdown-item
                        >
                        <el-dropdown-item @click="handleAction('record-room')"
                            >音乐室记录</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-button v-bind="buttonProps" @click="handleAction('favorites')">收藏歌曲</el-button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '@/assets/main.scss' as *;
.profile-page {
    height: calc(100% - 12px);
    font-size: small;
    color: #118c98;
    padding: 2px;
    background-image: url('@/assets/BG.jpg');
    background-size: cover;
    background-position: center;

    .profile-header {
        display: flex;
        align-items: center;
    }

    .avatar-container {
        position: relative;
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
    .actions {
        border: 1px solid #ccc;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .el-dropdown,
        .el-button {
            width: 103px;
            margin-bottom: 30px;
        }
    }
}
</style>
