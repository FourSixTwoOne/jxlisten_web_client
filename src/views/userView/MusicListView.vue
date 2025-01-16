<script setup>
import { ref } from 'vue';
import { Search, Upload } from '@element-plus/icons-vue';
import defaultCoverUrl from '@/assets/apple-touch-icon.png';
import CustomPagination from '@/components/CustomPagination.vue';

const isLoading = ref(false);
const total = ref(2);

const pageParams = ref({
    page: 1,
    pageSize: 10,
    title: '',
    author: '',
    status: '',
});

const musicList = ref([
    {
        id: 1,
        coverUrl: '',
        title: '曲名1',
        publisher: '发布者1',
        author: '作者1',
        uploadTime: '2023-10-01',
        audioUrl: 'path/to/audio1.mp3',
        type: 1, // 1: 原创, 2: 翻唱, 3: 转载
        likeCount: 0,
        collectCount: 0,
        isLiked: false,
        isCollected: false,
    },
    {
        id: 2,
        coverUrl: '',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2, // 2: 翻唱
        likeCount: 0,
        collectCount: 0,
        isLiked: false,
        isCollected: false,
    },
]);

const handleSearch = () => {
    handleQuery();
};

const handleQuery = async () => {
    isLoading.value = true;
    // await getMusicListService(pageParams.value);
    isLoading.value = false;
};

const handleLike = (row) => {
    row.isLiked = !row.isLiked;
    if (row.isLiked) {
        row.likeCount++;
    } else {
        row.likeCount--;
    }
    // 调用点赞服务
    // await likeMusicService(row.id, row.isLiked);
};

const handleCollect = (row) => {
    row.isCollected = !row.isCollected;
    if (row.isCollected) {
        row.collectCount++;
    } else {
        row.collectCount--;
    }
    // 调用收藏服务
    // await collectMusicService(row.id, row.isCollected);
};

const handleReport = (row) => {
    // 调用举报服务
    // await reportMusicService(row.id);
    ElMessage.info('已举报');
};

const handleAddFriend = (row) => {
    // 调用添加好友服务
    // await addFriendService(row.publisherId);
    ElMessage.info('已发送好友请求');
};
</script>

<template>
    <page-container title="歌曲" class="music-list-view">
        <template #extra>
            <div class="header">
                <div class="search-container">
                    <div class="search-label">
                        <el-icon><Search /></el-icon>歌名：
                    </div>
                    <el-input
                        class="search-input"
                        @input="handleSearch"
                        v-model="pageParams.title"
                        style="width: 60px; margin-right: 10px; height: 20px" />
                    <div class="search-label">
                        <el-icon><Search /></el-icon>作者：
                    </div>
                    <el-input
                        class="search-input"
                        @input="handleSearch"
                        v-model="pageParams.author"
                        style="width: 60px; margin-right: 4px; height: 20px" />
                </div>
                <el-button
                    size="small"
                    type="primary"
                    @click="handleUploadMusic"
                    class="button-upload">
                    上传歌曲<el-icon class="el-icon--right"><Upload /></el-icon>
                </el-button>
            </div>
        </template>

        <el-table class="music-list" :data="musicList" v-loading="isLoading" fit>
            <el-table-column label="封面" align="center">
                <template #default="scope">
                    <img
                        :src="scope.row.coverUrl ? scope.row.coverUrl : defaultCoverUrl"
                        alt="封面"
                        style="width: 40px; height: 40px; object-fit: cover" />
                </template>
            </el-table-column>
            <el-table-column label="歌名" prop="title">
                <template #default="scope">
                    <span>
                        {{ scope.row.title }}
                        <el-tooltip
                            v-if="scope.row.type === 1"
                            content="原：发布者原创歌曲"
                            placement="top"
                            effect="light">
                            <el-tag type="success"> 原 </el-tag>
                        </el-tooltip>
                        <el-tooltip
                            v-if="scope.row.type === 2"
                            content="翻：发布者翻唱歌曲"
                            placement="top"
                            effect="light">
                            <el-tag type="info"> 翻 </el-tag>
                        </el-tooltip>
                        <el-tooltip
                            v-if="scope.row.type === 3"
                            content="转：发布者转载歌曲"
                            placement="top"
                            effect="light">
                            <el-tag type="warning"> 转 </el-tag>
                        </el-tooltip>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="发布者" prop="publisherId" />
            <el-table-column label="作者" prop="author" />
            <el-table-column label="上传时间" prop="uploadTime" />
            <el-table-column label="播放" align="center" width="50px" />
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <ActionButtons
                        :isLiked="scope.row.isLiked"
                        :isCollected="scope.row.isCollected"
                        :likeCount="scope.row.likeCount"
                        :collectCount="scope.row.collectCount"
                        :row="scope.row"
                        @like="handleLike"
                        @collect="handleCollect"
                        @report="handleReport"
                        @addFriend="handleAddFriend" />
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="暂无数据" />
            </template>
        </el-table>

        <CustomPagination
            :total="total"
            :page="pageParams.page"
            :pageSize="pageParams.pageSize"
            @update:page="pageParams.page = $event"
            @update:pageSize="pageParams.pageSize = $event"
            @query="handleQuery" />
    </page-container>
</template>

<style lang="scss" scoped>
.music-list-view {
    $bg: #9ac3e8;
    background-image: url('@/assets/BG.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: $bg; 
    display: flex;
    flex-direction: column;
    align-items: center;
    .header {
        width: 100%;
        display: flex;
        justify-content: center;
        .search-container {
            margin-left: 10%;
            flex: 2;
            background-color: rgb(48, 82, 116);
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #b0b4b9;

            .search-label {
                display: flex;
                align-items: center;
                justify-content: center;
                padding-bottom: 1px;
                width: 60px;
            }
            .search-input {
                opacity: 0.4;
            }
            .el-icon {
                display: flex;
                align-items: center;
            }
        }
        .button-upload {
            flex: 0;
            margin-right: 1;
        }
    }
    .music-list {
        font-size: 12px;
        width: 100%;

        .el-tag {
            padding-left: 2px;
            padding-right: 2px;
            margin-left: 2px;
            font-size: 10px;
        }

        .el-button.text {
            color: #b0b4b9;
            &.liked {
                color: red;
            }
            &.collected {
                color: gold;
            }
        }
        :deep(.el-table__cell){
            padding: 0;
            margin: 0;
            background-color: $bg;
        }
    }
    
}
</style>
