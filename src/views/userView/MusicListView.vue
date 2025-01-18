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

const form = ref({
    title: '',
    author: '',
    type: '', // 1: 原创, 2: 翻唱, 3: 转载
    audioUrl: '',
    coverUrl: '',
});

// 取消表单
const cancelForm = () => {
    // 重置表单
    form.value = {
        title: '',
        author: '',
        type: '',
        audioUrl: '',
        coverUrl: '',
    };
    dialog.value = false;
};

// 处理关闭
const handleClose = () => {
    cancelForm();
};

// 上传封面成功的回调
const handleCoverSuccess = (file) => {
    form.value.coverUrl = response.url; // 假设上传成功后返回对象中有url字段
};

// 上传音频成功的回调
const handleAudioSuccess = (response, file) => {
    form.value.audioUrl = response.url; // 假设上传成功后返回对象中有url字段
};

// 上传之前的检查
const beforeCoverUpload = (file) => {
    // 可以在这里添加文件类型和大小的检查
    return true;
};

const beforeAudioUpload = (file) => {
    // 可以在这里添加文件类型和大小的检查
    return true;
};

const onClick = async () => {
    isLoading.value = true;
    try {
        // 上传封面
        const coverFormData = new FormData();
        coverFormData.append('file', coverFile.value);
        const coverResponse = await uploadFileService(coverFormData);
        form.value.coverUrl = coverResponse.data.data.url;

        // 上传音频
        const audioFormData = new FormData();
        audioFormData.append('file', musicFile.value);
        const audioResponse = await uploadFileService(audioFormData);
        form.value.audioUrl = audioResponse.data.data.url;

        // 调用update
        uploadMusicService(form.value);

    } catch (error) {
        console.error('上传失败:', error);
    }finally {
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
        id: 1,
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
        id: 2,
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
                <el-button size="small" type="primary" @click="dialog = true" class="button-upload">
                    上传歌曲<el-icon class="el-icon--right"><Upload /></el-icon>
                </el-button>
            </div>
        </template>
        <el-drawer
            v-model="dialog"
            title="上传歌曲"
            :before-close="handleClose"
            direction="ltr"
            class="demo-drawer">
            <div class="demo-drawer__content">
                <el-form :model="form">
                    <el-form-item label="标题" :label-width="formLabelWidth">
                        <el-input v-model="form.title" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="原唱" :label-width="formLabelWidth">
                        <el-input v-model="form.author" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="类型" :label-width="formLabelWidth">
                        <el-select v-model="form.type" placeholder="请选择歌曲类型">
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

                    <div class="demo-drawer__footer">
                        <el-button @click="cancelForm">取消</el-button>
                        <el-button type="primary" :loading="isLoading" @click="onClick">
                            {{ loading ? '提交中...' : '提交' }}
                        </el-button>
                    </div>
                </el-form>
            </div>
        </el-drawer>
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
            <el-table-column label="播放" align="center" width="auto">
                <template #default="scope">
                    <MusicPlayerIcon :audioUrl="scope.row.audioUrl"></MusicPlayerIcon>
                </template>
            </el-table-column>
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
        :deep(.el-table__cell) {
            padding: 0;
            margin: 0;
            background-color: $bg;
        }
    }
    demo-drawer__content {
        padding: 20px;
    }
}
</style>
