<script setup>
import { Star, WarnTriangleFilled } from '@element-plus/icons-vue';
import BxLike from '@/components/icons/BxLikeSVG.vue';
import AddIcon from '@/components/icons/AddSVG.vue';

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    row: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['update']); // 定义事件

const handleLike = () => {
    const newRow = { ...props.row };
    newRow.isLiked = !newRow.isLiked;
    newRow.likeCount += newRow.isLiked ? 1 : -1;

    emit('update', newRow);
};

const handleCollect = () => {
    const newRow = { ...props.row };
    newRow.isCollected = !newRow.isCollected;
    newRow.collectCount += newRow.isCollected ? 1 : -1;

    emit('update', newRow);
};

const handleReport = () => {
    // 调用举报服务
    ElMessage.info('已举报');
};

const addOrJion = () => {
    if (props.type === 'music') {
        ElMessage.info('已发送好友请求');
    } else {
        // 调用加入房间服务
    }
};
</script>

<template>
    <div class="button-group">
        <el-tooltip content="点赞" placement="top">
            <el-button
                size="small"
                :icon="BxLike"
                @click="handleLike"
                :class="{ liked: props.row?.isLiked }">
                <span>{{ props.row?.likeCount || 0 }}</span>
            </el-button>
        </el-tooltip>

        <el-tooltip content="收藏" placement="top">
            <el-button
                size="small"
                @click="handleCollect"
                :icon="Star"
                :class="{ collected: props.row?.isCollected }">
                <span>{{ props.row?.collectCount || 0 }}</span>
            </el-button>
        </el-tooltip>

        <el-tooltip content="举报" placement="top">
            <el-button
                size="small"
                @click="handleReport"
                :icon="WarnTriangleFilled"
                class="report-btn">
            </el-button>
        </el-tooltip>

        <el-tooltip :content="props.type === 'music' ? '添加好友' : '加入音乐室'" placement="top">
            <el-button :icon="AddIcon" @click="addOrJion" class="add-or-jion"> </el-button>
        </el-tooltip>
    </div>
</template>

<style scoped>
.button-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%; /* 修改为100%以适应容器 */
}

.liked {
    color: red; /* 点赞后的颜色 */
}

.collected {
    color: gold; /* 收藏后的颜色 */
}

.report-btn {
    color: red;
}

.el-button {
    height: 24px;
    width: 24px;
    padding: 0;
    margin: 0;
    margin-left: 2px;
}
</style>
