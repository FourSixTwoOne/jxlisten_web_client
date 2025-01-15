<script setup>
import { ref } from 'vue';
import { Search, Upload } from '@element-plus/icons-vue';
import defaultCoverUrl from '@/assets/apple-touch-icon.png';

const isLoading = ref(false);
const total = ref(0);

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
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },
    // 其他音乐数据...
]);

const handleSearch = () => {
    handleQuery();
};

const toggleStatus = async (row) => {
    const newStatus = row.status === 1 ? 0 : 1;
    console.log('toggleStatus', newStatus);
    // await updateMusicStatusService(row.adminId, newStatus);
    handleQuery();
};
// 处理查询
const handleQuery = async () => {
    isLoading.value = true;
    // await getMusicListService(pageParams.value);
    isLoading.value = false;
};

const deleteMusic = async (musicId) => {
    await ElMessageBox.confirm('确定删除此项？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    });
    // await deleteMusicService(musicId);
    ElMessage.success('删除成功');
    handleQuery();
};

// handleQuery();
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
                        style="width: 50px; height: 50px; object-fit: cover" />
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
            <el-table-column label="上传时间" prop="uploadTime" min-width="150" />
            <el-table-column label="播放" width="150" align="center"> </el-table-column>
            <template #empty>
                <el-empty description="暂无数据" />
            </template>
        </el-table>

        <div class="pagination">
            <el-pagination
                v-model:current-page="pageParams.page"
                v-model:page-size="pageParams.pageSize"
                :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                v-model:total="total"
                @size-change="handleQuery"
                @current-change="handleQuery" />
        </div>
    </page-container>
</template>

<style lang="scss" scoped>
.music-list-view {
    background-image: url('@/assets/BG.jpg');
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
                padding-bottom: 1px ;
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
            flex: 1;
            margin-left: 10%;
        }
    }
    .music-list {
        font-size: 12px;
        .el-table-column {
            color: #b0b4b9;
        }

        .el-tag {
            padding-left: 2px;
            padding-right: 2px;
            margin-left: 2px;
            font-size: 10px;
        }
        
    }


    .pagination {
        margin-top: 10px;
        text-align: center;
        .el-pagination {
            background-color: rgb(51, 135, 220);
        }
    }
}
</style>
