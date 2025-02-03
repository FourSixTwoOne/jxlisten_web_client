<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores';
import { uploadFileService, updateUserService } from '@/api/user.js';
import { EditPen, Upload, InfoFilled } from '@element-plus/icons-vue';
import CoverView from '@/components/AvatarView.vue';
import AvatarView from '@/components/AvatarView.vue';

const userInfo = ref({
    id: '',
    username: '',
    image: '',
    gender: 0,
    age: 0,
    bio: '',
});

const friendList = ref([
    {
        id: 1,
        username: 'John Doe',
        image: 'https://via.placeholder.com/150',
        isOnline: true,
    },
    {
        id: 2,
        username: 'Jane Smith',
        image: 'https://via.placeholder.com/150',
        isOnline: false,
    },
    {
        id: 3,
        username: 'Mike Brown',
        image: 'https://via.placeholder.com/150',
        isOnline: true,
    },
]);

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
                <CoverView />
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
                v-model="userInfo.bio"
                placeholder="暂无个人简介" />
        </div>
        <div class="bio-container" v-if="isEditing">
            <el-input
                class="transparent-input"
                type="textarea"
                maxlength="50"
                show-word-limit
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
                    <div>
                        <!-- 添加一个单一的根元素 -->
                        <el-button v-if="isEditing" type="warning" plain text :loading="isLoading">
                            点击进行提交 <el-icon><Upload /></el-icon>
                        </el-button>
                    </div>
                    <!-- 结束单一的根元素 -->
                </template>
            </el-popconfirm>
        </div>
        <div class="actions">
            <el-button v-bind="buttonProps" @click="toggleFriendsList">好友列表</el-button>
            <!-- 展开好友列表 -->
            <div v-if="isFriendsVisible" class="friend-list">
                <ul>
                    <li v-for="(friend, index) in friendList" :key="index" class="friend-item">
                        <div class="friend-avatar">
                            <AvatarView :imageUrl="friend.avatar" />
                        </div>
                        <div class="friend-name">
                            {{ friend.username }}
                        </div>
                        <div
                            class="friend-status"
                            :class="{ online: friend.isOnline, offline: !friend.isOnline }"></div>
                    </li>
                </ul>
            </div>
            <el-button v-bind="buttonProps" @click="handleAction('favorites')" class="f-btn">收藏歌曲</el-button>
            <el-dropdown split-button size="small" color="#a0a20a" @click="handleAction('history')">
                <div>历史记录</div>
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
        height: 80px;
        width: 80px;
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
        height: 400px;
        border: $border2;
        border-radius: 4px;
        display: flex;
        flex-direction: column;

        .f-btn{
            margin-left: 0;
        }

        .el-dropdown,
        .el-button {
            width: 103px;
            margin-bottom: 3px;
        }
        .friend-list {
            height: 100%;
            overflow-y: auto;
            ul {
                list-style-type: none;
                padding: 0;
            }
            .friend-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 5px 0;
                border-bottom: 1px solid #ccc;
            }
            .friend-avatar {
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }
            .friend-name {
                flex-grow: 1;
            }
            .friend-status {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: gray; // 默认为离线状态
            }
            .friend-status.online {
                background-color: green; // 在线状态
            }
            .friend-status.offline {
                background-color: gray; // 离线状态
            }
        }
    }
}
</style>
