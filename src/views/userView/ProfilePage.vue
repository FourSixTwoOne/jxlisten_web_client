<script setup>
import { ref, computed, onMounted } from 'vue';
import { debounce } from 'lodash-es';
import { useUserStore } from '@/stores';
import { uploadFileService, updateUserService, getUserListByNameService } from '@/api/user';
import { timeFormat } from '@/utils/dateFormat';
import {
    addFriendService,
    getFriendsService,
    getSendService,
    getReceivedService,
    handleFriendService,
} from '@/api/friend';
import {
    EditPen,
    Upload,
    InfoFilled,
    Search,
    Plus,
    Loading,
    CircleClose,
} from '@element-plus/icons-vue';

// 状态管理
const userInfo = ref({ userId: '', username: '', image: '', gender: 0, age: 0, bio: '' });
const friendList = ref([]);
const receivedRecords = ref([]);
const sendRecords = ref([]);
const isLoading = ref(false);
const userStore = useUserStore();
const isEditing = ref(false);
const imageFile = ref(null);
const searchResults = ref([]);
const searchKeyword = ref('');
const isLoadingSearch = ref(false);
const isFriendsVisible = ref(0); // 0: 隐藏，1: 显示好友列表；2: 显示添加情况
const isUserProfile = ref(false);
const selectedUserId = ref(null);
const activeTab = ref('receive'); // 当前活动标签

// 计算属性
const receivedRecordsSorted = computed(() => {
    return [...receivedRecords.value].sort((a, b) => {
        if (a.type === 0 && b.type !== 0) return -1;
        if (a.type !== 0 && b.type === 0) return 1;
        return new Date(b.createTime) - new Date(a.createTime);
    });
});

const sendRecordsSorted = computed(() => {
    return [...sendRecords.value].sort((a, b) => {
        if (a.type === 0 && b.type !== 0) return -1;
        if (a.type !== 0 && b.type === 0) return 1;
        return new Date(b.createTime) - new Date(a.createTime);
    });
});

const activeRecords = computed(() => {
    return activeTab.value === 'receive' ? receivedRecordsSorted.value : sendRecordsSorted.value;
});

const receivedUnreadCount = computed(
    () => receivedRecords.value.filter((r) => r.type === 0).length
);
const sendUnreadCount = computed(() => sendRecords.value.filter((r) => r.type === 0).length);

// API 调用
const getUser = async () => {
    await userStore.getUser();
    userInfo.value = userStore.user;
};

const getFriendsList = async () => {
    userStore.friendIds = [];
    try {
        const res = await getFriendsService(userStore.user.userId);
        if (res.data.code === 1) {
            friendList.value = res.data.data;
            userStore.friendIds = friendList.value.map((friend) => friend.friendId);
            console.log('好友id列表：', userStore.friendIds.value);
        }
    } catch (error) {
        ElMessage.error('获取好友状态失败', error);
    }
};

const getSendRecords = async () => {
    try {
        const res = await getSendService();
        if (res.data.code === 1) sendRecords.value = res.data.data;
    } catch (error) {
        ElMessage.error('获取添加记录失败', error);
    }
};

const getReceivedRecords = async () => {
    try {
        const res = await getReceivedService();
        if (res.data.code === 1) receivedRecords.value = res.data.data;
    } catch (error) {
        ElMessage.error('获取添加记录失败', error);
    }
};

// 处理记录点击
const handleRecordClick = (record) => {
    if (!(activeTab.value === 'receive' && record.status === 0)) {
        toggleUserProfile(record.friendId);
    }
};

// 申请处理
const handleApply = async (param) => {
    try {
        await handleFriendService(param);
        getFriendsList;
        getSendRecords();
        getReceivedRecords();
    } catch (error) {
        ElMessage.error('操作失败', error);
    }
};

// 提交用户资料修改
const submitProfile = async () => {
    isLoading.value = true;
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
        isLoading.value = false;
    }
};

// 切换界面显示
const toggleView = (param) => {
    userStore.isThreeVisible = true;
    userStore.viewParams = param;
};

// 切换好友列表显示状态
const toggleFriendsList = (param) => {
    if (isFriendsVisible.value === param) {
        isFriendsVisible.value = 0;
    } else {
        isFriendsVisible.value = param;
        if (param === 1) getFriendsList();
        else if (param === 2) {
            getSendRecords();
            getReceivedRecords();
        }
    }
};

// 搜索功能
const handleSearch = debounce(async () => {
    if (!searchKeyword.value.trim()) {
        searchResults.value = [];
        return;
    }
    isLoadingSearch.value = true;
    try {
        const res = await getUserListByNameService(searchKeyword.value);
        if (res.data.code === 1) {
            searchResults.value = res.data.data;
            console.log('搜索到数据：', searchResults.value);
        }
    } finally {
        isLoadingSearch.value = false;
    }
}, 500);

// 添加好友
const addFriend = async (userId) => {
    try {
        await ElMessageBox.confirm('确定要添加好友吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(async () => {
                const res = await addFriendService(userId);
                if (res.data.code === 1) {
                    ElMessage.success('已发送请求');
                } else {
                    ElMessage.error('添加失败', res.data.msg); // 显示错误消息
                }
            })
            .catch(() => {
                ElMessage.info('已取消添加好友'); // 取消添加好友操作
            });
    } catch (error) {
        ElMessage.error('操作失败', error); // 显示操作失败消息
    }
};

// 切换用户资料显示状态
const toggleUserProfile = (userId) => {
    selectedUserId.value = userId;
    isUserProfile.value = !isUserProfile.value; // 切换用户资料显示状态
};

// 切换编辑状态
const editProfile = () => {
    isEditing.value = true; // 设置为编辑状态
};

// 取消编辑操作
const cancelEvent = () => {
    ElMessage.warning('取消修改'); // 显示取消修改提示
};

// 状态文本映射
const statusMap = {
    0: '待处理',
    1: '已接受',
    2: '已拒绝',
    3: '关系已解除',
};

// 状态样式映射
const statusClassMap = {
    0: 'status-pending',
    1: 'status-accepted',
    2: 'status-rejected',
    3: 'status-deleted',
};

// 定义按钮属性
const buttonProps = {
    color: '#a0a20a',
    size: 'small',
    plain: true,
};

// 获取状态的文本
const getStatusText = (status) => {
    return statusMap[status] || '未知状态'; // 返回状态对应的文本
};

// 获取状态的样式
const getStatusClass = (status) => {
    return statusClassMap[status] || ''; // 返回状态对应的样式
};

// 组件挂载后获取用户和记录
onMounted(() => {
    getUser();
    getFriendsList();
    getReceivedRecords();
    getSendRecords();
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
        <UserProfile v-if="isUserProfile" :userId="selectedUserId" @close="isUserProfile = false" />
        <div class="actions">
            <div class="friend">
                <div class="friend-status">
                    <el-button v-bind="buttonProps" @click="toggleFriendsList(1)"
                        >好友列表</el-button
                    >
                    <el-button v-bind="buttonProps" @click="toggleFriendsList(2)"
                        >添加记录</el-button
                    >
                </div>
                <div v-if="[1, 2].includes(isFriendsVisible)" class="list-area">
                    <div class="list-container" v-if="isFriendsVisible === 1">
                        <el-input
                            v-if="isFriendsVisible === 1"
                            v-model="searchKeyword"
                            placeholder="输入昵称添加用户"
                            :prefix-icon="Search"
                            clearable
                            @input="handleSearch" />
                        <div>
                            <div v-if="isLoadingSearch" class="loading-container">
                                <el-icon><Loading /></el-icon>搜索中...
                            </div>
                            <template v-else>
                                <ul
                                    v-if="searchKeyword && searchResults.length"
                                    class="friend-list">
                                    <li
                                        v-for="user in searchResults"
                                        :key="user.userId"
                                        @click="toggleUserProfile(user.userId)">
                                        <div class="friend-info">
                                            <AvatarView
                                                :imageUrl="user.image"
                                                class="friend-avatar" />
                                            <span class="username">{{ user.username }}</span>
                                        </div>
                                        <el-button
                                            class="add-button"
                                            size="small"
                                            :icon="Plus"
                                            @click="addFriend(user.userId)" />
                                    </li>
                                </ul>
                                <ul v-else class="friend-list">
                                    <li
                                        v-for="friend in friendList"
                                        :key="friend.friendId || index"
                                        @click="toggleUserProfile(friend.friendId)">
                                        <div class="friend-info">
                                            <AvatarView
                                                :imageUrl="friend.image"
                                                class="friend-avatar" />
                                            <div class="info">
                                                <span class="username">{{ friend.username }}</span>
                                                <div class="status">
                                                    <div
                                                        class="status-dot"
                                                        :class="{ online: friend.isOnline }" />
                                                    <span>{{
                                                        friend.isOnline ? '在线' : '离线'
                                                    }}</span>
                                                    <span
                                                        v-if="friend.unreadCount > 0"
                                                        class="unread-badge">
                                                        {{ friend.unreadCount }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </template>
                        </div>
                    </div>
                    <template v-if="isFriendsVisible === 2">
                        <div class="tabs-container">
                            <div class="tabs">
                                <div
                                    class="tab"
                                    :class="{ active: activeTab === 'receive' }"
                                    @click="activeTab = 'receive'">
                                    接收请求
                                    <span v-if="receivedUnreadCount > 0" class="unread-bubble">
                                        {{ receivedUnreadCount }}
                                    </span>
                                </div>
                                <div
                                    class="tab"
                                    :class="{ active: activeTab === 'send' }"
                                    @click="activeTab = 'send'">
                                    发送请求
                                    <span v-if="sendUnreadCount > 0" class="unread-bubble">
                                        {{ sendUnreadCount }}
                                    </span>
                                </div>
                            </div>
                            <ul class="friend-list">
                                <li
                                    v-for="record in activeRecords"
                                    :key="record.friendId"
                                    @click="handleRecordClick(record)">
                                    <div class="friend-info">
                                        <AvatarView
                                            :imageUrl="record.image"
                                            class="friend-avatar" />
                                        <div class="info">
                                            <span class="username">{{ record.username }}</span>
                                            <div class="status">
                                                <span class="time">{{
                                                    timeFormat(record.createTime)
                                                }}</span>
                                                <span :class="getStatusClass(record.status)">
                                                    {{ getStatusText(record.status) }}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            class="action-area"
                                            v-if="activeTab === 'receive' && record.status === 0">
                                            <el-button
                                                type="success"
                                                size="small"
                                                @click.stop="
                                                    handleApply({
                                                        friendId: record.friendId,
                                                        status: 1,
                                                    })
                                                "
                                                >接受</el-button
                                            >
                                            <el-button
                                                type="danger"
                                                size="small"
                                                @click.stop="
                                                    handleApply({
                                                        friendId: record.friendId,
                                                        status: 2,
                                                    })
                                                "
                                                >拒绝</el-button
                                            >
                                        </div>
                                        <span v-else-if="record.type === 0" class="red-dot"></span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </template>
                </div>
            </div>
            <el-button
                v-bind="buttonProps"
                @click="toggleView({ name: 'favorites', param: userInfo?.userId })"
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

        .el-dropdown,
        .el-button {
            width: 103px;
            margin-bottom: 3px;
        }
        .list-area {
            .el-input {
                height: 25px;
                border-bottom: $border2;
                border-top: $border2;
            }

            .friend-list {
                display: flex;
                flex-direction: column;
                height: 300px;
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

            ul {
                min-height: 100px;
                overflow-y: auto;
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
                    &-accepted {
                        color: #67c23a;
                    } // 绿色
                    &-rejected {
                        color: #f56c6c;
                    } // 红色
                    &-deleted {
                        color: #909399;
                    } // 灰色
                    &-dot {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: #909399;

                        &.online {
                            background: #67c23a;
                        }
                    }
                    &-pending {
                        color: #e6a23c;
                    } // 橙色

                    .time {
                        font-size: 12px;
                        color: #909399;
                        margin-right: 8px;
                    }
                    .unread-badge {
                        background: #f56c6c;
                        color: white;
                        border-radius: 10px;
                        padding: 2px 6px;
                        font-size: 12px;
                    }
                }
                .info {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
            }
        }

        .favorite-btn {
            margin-top: 5px;
            margin-left: 0;
        }
    }
    .tabs-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .tabs {
        display: flex;
        border-bottom: 1px solid #5a83c5;
    }

    .tab {
        position: relative;
        padding: 8px 16px;
        cursor: pointer;
        color: #909399;
        transition: all 0.3s;

        &.active {
            color: #409eff;
            border-bottom: 2px solid #409eff;
        }
    }

    .unread-bubble {
        position: absolute;
        top: -3px;
        right: -6px;
        background: #f56c6c;
        color: white;
        border-radius: 10px;
        min-width: 16px;
        height: 16px;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        padding: 0 4px;
    }

    .red-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #f56c6c;
        margin-left: auto;
        margin-right: 8px;
    }

    .action-area {
        margin-left: auto;
        display: flex;
        padding-right: 8px;

        .el-button {
            width: 28px;
            padding: 5px 10px;
            font-size: 10px;
        }
    }

    .friend-info {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding-right: 8px;
    }
}
</style>
