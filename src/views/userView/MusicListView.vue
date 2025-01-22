<script setup>
import { ref } from 'vue';
import { Search, Upload } from '@element-plus/icons-vue';
import defaultCoverUrl from '@/assets/apple-touch-icon.png';
import CustomPagination from '@/components/CustomPagination.vue';
import CUploader from '@/components/CUploader.vue';
import { uploadFileService } from '@/api/user';
import { uploadMusicService } from '@/api/music';

const isLoading = ref(false);
const total = ref(2);
const dialog = ref(false);
const coverFile = ref(null);
const musicFile = ref(null);

const uploadForm = ref({
    title: '',
    author: '',
    type: '', // 1: 原创, 2: 翻唱, 3: 转载
    audioUrl: '',
    coverUrl: '',
});

// 取消表单
const cancelForm = () => {
    // 重置表单
    uploadForm.value = null;
    dialog.value = false;
};

// 处理关闭
const handleClose = () => {
    cancelForm();
};

const onClick = async () => {
    isLoading.value = true;
    try {
        // 上传封面
        if (coverFile.value) {
            const coverFormData = new FormData();
            coverFormData.append('file', coverFile.value);
            const coverResponse = await uploadFileService(coverFormData);
            uploadForm.value.coverUrl = coverResponse.data.data;
        }
        // 上传音频
        if (!musicFile.value) {
            ElMessage.error('请选择音频文件');
        }
        const audioFormData = new FormData();
        audioFormData.append('file', musicFile.value);
        const audioResponse = await uploadFileService(audioFormData);
        uploadForm.value.audioUrl = audioResponse.data.data;

        // 调用update
        uploadMusicService(uploadForm.value);
    } catch (error) {
        console.error('上传失败:', error);
    } finally {
        isLoading.value = false;
    }
};

const pageParams = ref({
    page: 1,
    pageSize: 10,
    title: '',
    author: '',
    status: '',
});

const musicList = ref([
    {
        musicId: 1,
        coverUrl: '',
        title: '曲名1',
        publisher: '发布者1',
        author: '作者1',
        uploadTime: '2023-10-01',
        audioUrl: 'http://localhost:5173/src/assets/music/%E5%B0%8F%E5%9F%8E%E8%B0%A3%20-%20Vk.mp3',
        type: 1, // 1: 原创, 2: 翻唱, 3: 转载
        likeCount: 0,
        collectCount: 0,
        isLiked: false,
        isCollected: false,
    },
    {
        musicId: 2,
        coverUrl: '',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'http://localhost:5173/src/assets/music/%E5%B0%8F%E5%9F%8E%E8%B0%A3%20-%20Vk.mp3',
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

const handleUpdate = (updatedRow) => {
    const index = musicList.value.findIndex((item) => item.musicId === updatedRow.musicId);
    if (index !== -1) {
        musicList.value[index] = { ...musicList.value[index], ...updatedRow };
    }
};
</script>

<template>
    <el-container class="music-list-view">
        <el-header>
            <span>音乐列表</span>
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
            <el-button size="small" type="primary" @click="dialog = true" class="button-upload">
                上传歌曲<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
        </el-header>
        <el-main>
            <el-drawer
                v-model="dialog"
                title="上传歌曲"
                :before-close="handleClose"
                direction="ltr"
                class="drawer">
                <div class="drawer__content">
                    <el-form :model="uploadForm">
                        <el-form-item label="标题" :label-width="formLabelWidth">
                            <el-input v-model="uploadForm.title" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="原唱" :label-width="formLabelWidth">
                            <el-input v-model="uploadForm.author" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="类型" :label-width="formLabelWidth">
                            <el-select v-model="uploadForm.type" placeholder="请选择歌曲类型">
                                <el-option label="原创" :value="1" />
                                <el-option label="翻唱" :value="2" />
                                <el-option label="转载" :value="3" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="上传封面" :label-width="formLabelWidth">
                            <CUploader
                                placeholder="请上传封面图片"
                                type="image"
                                @file-selected="coverFile = $event" />
                        </el-form-item>
                        <el-form-item label="上传音频" :label-width="formLabelWidth">
                            <CUploader
                                placeholder="请上传音频文件"
                                type="audio"
                                @file-selected="musicFile = $event" />
                        </el-form-item>

                        <div class="drawer__footer">
                            <el-button @click="cancelForm">取消</el-button>
                            <el-button type="primary" :loading="isLoading" @click="onClick">
                                {{ loading ? '提交中...' : '提交' }}
                            </el-button>
                        </div>
                    </el-form>
                </div>
            </el-drawer>
            <el-table class="music-list" :data="musicList" v-loading="isLoading">
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
                <el-table-column label="播放" align="center" width="auto">
                    <template #default="scope">
                        <MusicPlayerIcon :row="scope.row"></MusicPlayerIcon>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <ActionButtons :type="'music'" :row="scope.row" @update="handleUpdate" />
                    </template>
                </el-table-column>
                <template #empty>
                    <el-empty description="暂无数据" />
                </template>
            </el-table>
        </el-main>
        <el-footer>
            <CustomPagination
                :total="total"
                :page="pageParams.page"
                :pageSize="pageParams.pageSize"
                @update:page="pageParams.page = $event"
                @update:pageSize="pageParams.pageSize = $event"
                @query="handleQuery" />
        </el-footer>
    </el-container>
</template>

<style lang="scss" scoped>
.music-list-view {
    $bg: rgb(92, 152, 213);
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .el-header,
    .el-main,
    .el-footer {
        padding: 0 0;
    }

    .el-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: auto;
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
        background-color: $bg;
        :deep(.el-table__cell) {
            color: #1c3c53;
            padding: 0;
            margin: 0;
            background-color: $bg;
        }

        .el-tag {
            height: 15px;
            width: 15px;
            padding: 1px;
            margin-bottom: 3px;
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
    }
    .drawer__content {
        padding: 20px;
    }
}
</style>
