<script setup>
import { useUserStore } from '@/stores';
import { getUserByIdService } from '@/api/user';
import { addFriendService } from '@/api/friend';
import { ref, computed } from 'vue';

const props = defineProps({
    userId: {
        type: Number,
    },
});

const userStore = useUserStore();
const emit = defineEmits(['close']);

// 判断是否是好友
const isFriend = computed(() => {
    return userStore.friendIds.some((id) => id === props.userId);
});
const handleClose = () => {
    emit('close');
};

const handleAddFriend = async () => {
    try {
        await addFriendService(props.userId);
        ElMessage.success('好友请求已发送');
    } catch (error) {
        ElMessage.error(error.message);
    }
};
const user = ref(null);
const getUser = async () => {
    const res = await getUserByIdService(props.userId);
    user.value = res.data.data;
};

const handleChat = () => {
    // 跳转到聊天页面逻辑
    userStore.isThreeVisible = true;
    userStore.viewParams = { name: 'friend', param: props.userId };
    handleClose();
};

const deleteFriend = () => {
    ElMessageBox.confirm('确认要删除该好友吗？', '删除确认', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        // 提交删除逻辑

        ElMessage.success('删除成功');
    });
};

const handleReport = () => {
    ElMessageBox.confirm('确认要举报该用户吗？', '举报确认', {
        confirmButtonText: '确认举报',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        // 提交举报逻辑
        ElMessage.success('举报已提交，我们将尽快处理');
    });
};

const genderText = computed(() => {
    switch (user.value?.gender) {
        case 0:
            return '男';
        case 1:
            return '女';
        default:
            return '保密';
    }
});

getUser();
</script>

<template>
    <div class="user-profile-modal">
        <div class="modal-mask" @click.self="handleClose"></div>

        <div class="modal-container">
            <div class="user-info">
                <AvatarView :imageUrl="user?.image" class="profile-avatar" />
                <h2 class="username">{{ user?.username }}</h2>
                <div class="meta-info">
                    <span class="gender">{{ genderText }}</span>
                    <span class="age">{{ user?.age }}岁</span>
                </div>
                <div class="bio">{{ user?.bio || '暂无简介' }}</div>
            </div>

            <div class="action-buttons">
                <el-button type="info" size="small" @click="handleClose">关闭</el-button>
                <el-button v-if="!isFriend" size="small" type="primary" @click="handleAddFriend">
                    添加好友
                </el-button>
                <div v-else class="operation">
                    <el-button size="small" type="success" @click="handleChat"> 去聊天 </el-button>
                    <el-button size="small" type="primary" @click="deleteFriend"> 删除 </el-button>
                </div>
                <el-button type="warning" size="small" @click="handleReport"> 举报 </el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.user-profile-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    .modal-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }

    .modal-container {
        position: relative;
        width: 230px;
        margin: 100px auto;
        background: white;
        border-radius: 8px;
        padding: 24px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .user-info {
        text-align: center;

        .profile-avatar {
            width: 100px;
            height: 100px;
            margin: 0 auto 16px;
        }

        .username {
            margin: 0 0 8px;
            font-size: 24px;
        }

        .meta-info {
            margin-bottom: 12px;
            color: #666;

            span + span {
                margin-left: 12px;
            }
        }

        .bio {
            color: #666;
            line-height: 1.5;
            padding: 0 20px;
        }
    }

    .action-buttons {
        margin-top: 24px;
        display: flex;
        justify-content: center;
        gap: 12px;
        .operation {
            display: flex;
            flex-direction: row;
        }

        .el-button {
            flex: 1;
            max-width: 120px;
        }
    }
}
</style>
