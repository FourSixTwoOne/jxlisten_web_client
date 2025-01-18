<script setup>
import { defineProps, defineEmits } from 'vue';
import { Star, WarnTriangleFilled } from '@element-plus/icons-vue';
import BxLike from '@/components/icons/BxLikeSVG.vue';
import AddIcon from '@/components/icons/AddSVG.vue';
const props = defineProps({
    isLiked: {
        type: Boolean,
        default: false,
    },
    isCollected: {
        type: Boolean,
        default: false,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    collectCount: {
        type: Number,
        default: 0,
    },
    row: {
        type: Object,
        required: true,
    },
});
const emit = defineEmits(['like', 'collect', 'report', 'addFriend']);

const handleLike = () => {
    emit('like', props.row); // 将行数据传递给父组件
};

const handleCollect = () => {
    emit('collect', props.row);
};

const handleReport = () => {
    emit('report', props.row);
};

const handleAddFriend = () => {
    emit('addFriend', props.row);
};
</script>
<template>
    <div class="button-group">
        <el-tooltip content="点赞" placement="top">
            <el-button
                size="small"
                type="link"
                :icon="BxLike"
                @click="handleLike"
                :class="{ liked: isLiked }">
                <span>{{ likeCount || 0 }}</span>
            </el-button>
        </el-tooltip>

        <el-tooltip content="收藏" placement="top">
            <el-button
                size="small"
                type="link"
                @click="handleCollect"
                :icon="Star"
                :class="{ collected: isCollected }">
                <span>{{ collectCount || 0 }}</span>
            </el-button>
        </el-tooltip>

        <el-tooltip content="举报" placement="top" >
            <el-button
                size="small"
                type="link"
                @click="handleReport"
                :icon="WarnTriangleFilled"
                class="report-btn">
            </el-button>
        </el-tooltip>

        <el-tooltip  content="添加好友/加入聊天室" placement="top">
            <el-button type="link" :icon="AddIcon" @click="handleAddFriend" class="add-or-jion">
            </el-button>
        </el-tooltip>
    </div>
</template>

<style scoped>
.button-group {
    width: anto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

.button-group el-button {
    text-align: center;
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
