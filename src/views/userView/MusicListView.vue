<script setup>
import { ref } from 'vue';
import { Search, Upload, Plus } from '@element-plus/icons-vue';
import defaultCoverUrl from '@/assets/apple-touch-icon.png';
import CustomPagination from '@/components/CustomPagination.vue';
import { uploadFileService } from '@/api/user';
import { uploadMusicService, getMusicListService } from '@/api/music';
import { useSongStore } from '@/stores';
import { dateFormat } from '@/utils/dateFormat';

const songStore = useSongStore();
const isLoading = ref(false);
const total = ref(2);
const dialog = ref(false);
const formLabelWidth = ref('80px');
const coverFile = ref(null);
const musicFile = ref(null);
const loading = ref(false);
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
    uploadForm.value = {
        title: '',
        author: '',
        type: '', // 1: 原创, 2: 翻唱, 3: 转载
        audioUrl: '',
        coverUrl: '',
    };
    dialog.value = false;
};
// 处理关闭
const handleClose = () => {
    cancelForm();
};

const onUpload = async () => {
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
            return;
        }
        const audioFormData = new FormData();
        audioFormData.append('file', musicFile.value);
        const audioResponse = await uploadFileService(audioFormData);
        uploadForm.value.audioUrl = audioResponse.data.data;

        // 调用update
        await uploadMusicService(uploadForm.value);
        ElMessage.success('上传成功');
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

const musicList = ref([]);

const handleSearch = () => {
    handleQuery();
};

const handleQuery = async () => {
    isLoading.value = true;
    const res = await getMusicListService(pageParams.value);
    musicList.value = res.data.data.records;
    total.value = res.data.data.total;
    isLoading.value = false;
};

const handleUpdate = (updatedRow) => {
    const index = musicList.value.findIndex((item) => item.musicId === updatedRow.musicId);
    if (index !== -1) {
        musicList.value[index] = { ...musicList.value[index], ...updatedRow };
    }
};

const addSong = (song) => {
    songStore.addSong(song);
};

handleQuery();
</script>

<template>
    <el-container class="music-list-view">
        <el-text size="large" type="primary">歌曲列表</el-text>
        <el-header>
            <div class="search-container">
                <div class="search-label">
                    <el-icon><Search /></el-icon>
                    <div width="20px">歌曲：</div>
                    <el-input
                        class="search-input"
                        @input="handleSearch"
                        v-model="pageParams.title" />
                </div>
                <div class="search-label">
                    <el-icon><Search /></el-icon>
                    <div>作者：</div>
                    <el-input
                        class="search-input"
                        @input="handleSearch"
                        v-model="pageParams.author" />
                </div>
            </div>
            <el-button size="small" type="primary" @click="dialog = true" class="button-upload">
                上传歌曲<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
        </el-header>
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
                        <el-button type="primary" :loading="isLoading" @click="onUpload">
                            {{ loading ? '提交中...' : '提交' }}
                        </el-button>
                    </div>
                </el-form>
            </div>
        </el-drawer>
        <el-main>
            <el-table class="music-list" :data="musicList" :loading="isLoading">
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
                <el-table-column label="上传时间" prop="uploadTime">
                    <template #default="scope">
                        {{ dateFormat(scope.row.uploadTime) }}
                    </template>
                </el-table-column>
                <el-table-column label="播放" align="center">
                    <template #default="scope">
                        <div class="music-operation">
                            <MusicPlayerIcon :row="scope.row"></MusicPlayerIcon>
                            <el-button
                                type="primary"
                                size="small"
                                :icon="Plus"
                                @click="addSong(scope.row)" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="120px">
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
@use '@/assets/main.scss' as *;
.music-list-view {
    $bg: #f5f7fa;
    display: flex;
    overflow: auto;
    flex-direction: column;
    height: 100%;

    .el-header {
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .search-container {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #b0b4b9;
            gap: 4px;
        }

        .search-label {
            font-size: 12px;
            display: flex;
            align-items: center;
            flex-direction: row;
            .search-input {
                height: 20px;
                max-width: 100px;
                width: 80px;
                opacity: 0.8;
            }
        }
    }

    .el-main {
        overflow: auto;

        .music-list {
            height: 100%;
            width: 100%;
            background: $bg;
            border-radius: 8px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            :deep(.el-table__cell) {
                padding: 8px 0;
                background: transparent;
                color: #606266;
                .cell {
                    font-size: 13px;
                    white-space: nowrap;
                }
            }
            // 封面图片样式
            img {
                border-radius: 4px;
            }
            // 操作按钮容器
            .music-operation {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 2px;
                .el-button {
                    height: 23px;
                    width: 23px;
                    padding: 0;
                    margin: 0;
                }
            }
        }
    }
    .el-footer {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    // 调整表格字体大小
    :deep(.el-table__cell .cell) {
        font-size: 12px;
    }
}
</style>
