<script setup>
import { ref, onMounted } from 'vue';
import { debounce } from 'lodash-es';
import { useUserStore } from '@/stores';
import { uploadFileService, updateUserService } from '@/api/user.js';
import {
    EditPen,
    Upload,
    InfoFilled,
    Search,
    Plus,
    Loading,
    CircleClose,
} from '@element-plus/icons-vue';
import UserProfile from '@/components/UserProfile.vue';

const userInfo = ref({
    userId: '',
    username: '',
    image: '',
    gender: 0,
    age: 0,
    bio: '',
});

const friendList = ref([]);
const userStore = useUserStore();
const isEditing = ref(false);
const imageFile = ref(null);
const isLoading = ref(false); // 添加加载状态
const searchResults = ref([]);
const searchKeyword = ref('');
const isLoadingSearch = ref(false);
const isFriendsVisible = ref(false);
const isProfileVisible = ref(false);
const selectedUserId = ref(null);

const buttonProps = {
    color: '#a0a20a',
    size: 'small',
    plain: true,
};

const getUser = async () => {
    await userStore.getUser();
    userInfo.value = userStore.user;
};

onMounted(() => {
    getUser();
});

// 获取初始好友列表
const getFriends = async () => {
    // try {
    //     friendList.value = res.data;
    // } catch (error) {
    //     ElMessage.error('获取好友列表失败');
    // }
    friendList.value = [
        {
            userId: 1,
            username: 'John Doe',
            image: 'https://via.placeholder.com/150',
            isOnline: true,
        },
        {
            userId: 2,
            username: 'Jane Smith',
            image: 'https://via.placeholder.com/150',
            isOnline: false,
        },
        {
            userId: 3,
            username: 'Mike Brown',
            image: 'https://via.placeholder.com/150',
            isOnline: true,
        },
        {
            userId: 1,
            username: 'John Doe',
            image: 'https://via.placeholder.com/150',
            isOnline: true,
        },
        {
            userId: 2,
            username: 'Jane Smith',
            image: 'https://via.placeholder.com/150',
            isOnline: false,
        },
        {
            userId: 3,
            username: 'Mike Brown',
            image: 'https://via.placeholder.com/150',
            isOnline: true,
        },
        {
            userId: 1,
            username: 'John Doe',
            image: 'https://via.placeholder.com/150',
            isOnline: true,
        },
        {
            userId: 2,
            username: 'Jane Smith',
            image: 'https://via.placeholder.com/150',
            isOnline: false,
        },
        {
            userId: 3,
            username: 'Mike Brown',
            image: 'https://via.placeholder.com/150',
            isOnline: true,
        },
        {
            userId: 1,
            username: 'John Doe',
            image: 'https://via.placeholder.com/150',
            isOnline: true,
        },
        {
            userId: 2,
            username: 'Jane Smith',
            image: 'https://via.placeholder.com/150',
            isOnline: false,
        },
        {
            userId: 3,
            username: 'Mike Brown',
            image: 'https://via.placeholder.com/150',
            isOnline: true,
        },
    ];
};

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
        userInfo.value.userId = userStore.user.userId;
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

const toggleView = (viewParams) => {
    console.log('显示好友主页', viewParams);
    userStore.viewParams = viewParams;
    userStore.isThreeVisible = true;
};
// 带防抖的搜索方法
const handleSearch = debounce(async () => {
    if (!searchKeyword.value.trim()) {
        // 如果搜索关键字为空，则清空搜索结果
        searchResults.value = [];
        return;
    }

    isLoadingSearch.value = true;
    try {
        ElMessage.info('正在搜索...');
        // searchResults.value= await userStore.
        searchResults.value = [
            {
                userId: 1,
                username: 'John Doe',
                image: 'https://via.placeholder.com/150',
                isOnline: true,
            },
        ];
    } finally {
        isLoadingSearch.value = false;
    }
}, 500);

// 添加好友方法
const addFriend = async (userId) => {
    try {
        ElMessageBox.confirm('确定要添加好友吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(async () => {
                // await addFriend(userId);
                console.log('添加好友', userId);
            })
            .catch(() => {
                ElMessage.info('已取消添加好友');
            });
    } catch (error) {
        ElMessage.error('操作失败', error);
    }
};

const toggleUserProfile = (userId) => {
    selectedUserId.value = userId;
    isProfileVisible.value = !isProfileVisible.value;
};

// 初始化获取好友列表
onMounted(() => {
    getFriends();
});
</script>

<template>
    <div class="profile-page">
        <div v-if="!isEditing" class="profile-header">
            <AvatarView :imageUrl="userInfo?.image" class="avatar-container" />
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

        <div class="bio-label">个人简介：</div>
        <div class="bio-container" v-if="!isEditing">
            <div>{{ userInfo.bio || '暂无个人简介' }}</div>
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
            <el-button v-if="!isEditing" type="primary" plain link @click="editProfile">
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
                        <el-button v-if="isEditing" type="warning" plain link :loading="isLoading">
                            点击进行提交 <el-icon><Upload /></el-icon>
                        </el-button>
                    </div>
                </template>
            </el-popconfirm>
            <el-button
                class="cancel-button"
                v-if="isEditing"
                type="danger"
                plain
                link
                @click="isEditing = false"
                ><el-icon><CircleClose /></el-icon>
            </el-button>
        </div>
        <UserProfile
            v-if="isProfileVisible"
            :userId="selectedUserId"
            @close="isProfileVisible = false" />
        <div class="actions">
            <div class="friend">
                <el-button v-bind="buttonProps" @click="toggleFriendsList">好友列表</el-button>
                <div v-if="isFriendsVisible" class="friend-search-container">
                    <el-input
                        class="search-input"
                        v-model="searchKeyword"
                        placeholder="输入昵称添加用户"
                        :prefix-icon="Search"
                        clearable
                        @input="handleSearch" />

                    <div class="search-results">
                        <div v-if="isLoadingSearch" class="loading-container">
                            <el-icon class="is-loading"><Loading /></el-icon>
                            搜索中...
                        </div>

                        <template v-else>
                            <ul v-if="searchKeyword && searchResults.length">
                                <li
                                    v-for="user in searchResults"
                                    :key="user.userId"
                                    class="result-item"
                                    @click="toggleUserProfile(user.userId)">
                                    <div class="friend-info">
                                        <AvatarView :imageUrl="user.avatar" class="friend-avatar" />
                                        <span class="username">{{ user.username }}</span>
                                    </div>
                                    <el-button
                                        class="add-button"
                                        circle
                                        size="small"
                                        :icon="Plus"
                                        @click="addFriend(user.userId)" />
                                </li>
                            </ul>

                            <ul v-else class="friend-list">
                                <li
                                    v-for="friend in friendList"
                                    :key="friend.userId"
                                    class="friend-item"
                                    @click="toggleUserProfile(friend.userId)">
                                    <div class="friend-info">
                                        <AvatarView
                                            :imageUrl="friend.avatar"
                                            class="friend-avatar" />
                                        <div class="info">
                                            <span class="username">{{ friend.username }}</span>
                                            <div class="status">
                                                <div
                                                    class="status-dot"
                                                    :class="{ online: friend.isOnline }" />
                                                <span>{{ friend.isOnline ? '在线' : '离线' }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </div>
                </div>
            </div>
            <el-button
                v-bind="buttonProps"
                @click="toggleView({ name: 'favorites' })"
                class="favorite-btn"
                >收藏歌曲</el-button
            >
            <el-dropdown
                split-button
                size="small"
                color="#a0a20a"
                @click="toggleView({ name: 'record', param: 1 })">
                <div>历史记录</div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="toggleView({ name: 'record', param: 1 })"
                            >上传记录</el-dropdown-item
                        >
                        <el-dropdown-item @click="toggleView({ name: 'record', param: 2 })"
                            >最近听歌</el-dropdown-item
                        >
                        <el-dropdown-item @click="toggleView({ name: 'record', param: 3 })"
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
    height: 100%;
    font-size: small;
    display: flex;
    flex-direction: column;
    color: #118c98;
    background-image: url('@/assets/BG.jpg');
    background-size: cover;
    background-position: center;

    .bio-label {
        margin: 6px;
        font-size: 16px;
    }

    .profile-header {
        display: flex;
        align-items: center;
    }

    .avatar-container {
        height: 80px;
        width: 80px;
    }

    .bio-container {
        padding: 4px;
        margin-bottom: 5px;
        margin-top: 5px;
        background-color: aliceblue;
        .transparent-input {
            opacity: 0.8;
        }
    }

    .edit-button {
        margin-top: 5px;
        margin-bottom: 5px;
        display: flex;
        justify-content: center;
    }
    .cancel-button {
        margin-left: 10px;
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
        display: flex;
        flex: 1;
        flex-direction: column;
        border: $border2;
        border-radius: 4px;

        .favorite-btn {
            margin-top: 5px;
            margin-left: 0;
        }

        .el-dropdown,
        .el-button {
            width: 103px;
            margin-bottom: 3px;
        }
        .friend-search-container {
            .el-input {
                height: 25px;
                border-bottom: $border2;
                border-top: $border2;
            }

            .search-results {
                max-height: 295px;
                overflow-y: auto;
                border: $border2;
                border-radius: 4px;
                margin-top: 4px;

                .loading-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666;

                    .el-icon {
                        margin-right: 8px;
                        animation: rotating 2s linear infinite;
                    }
                }
                .add-button {
                    margin: 0 10px;
                    width: 20px;
                    height: 20px;
                }
            }

            .friend-list {
                min-height: 100px;
                overflow-y: auto;
            }

            ul {
                list-style: none;
                padding: 0;
                margin: 0;

                li {
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    &:hover {
                        background: #21375a;
                    }

                    & + li {
                        border-top: 1px solid #5a83c5;
                    }
                }
            }

            .friend-info {
                display: flex;
                align-items: center;
                gap: 12px;

                .friend-avatar {
                    width: 30px;
                    height: 30px;
                }

                .status {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: #909399;

                    &-dot {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: #909399;

                        &.online {
                            background: #67c23a;
                        }
                    }
                }
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
</style>
