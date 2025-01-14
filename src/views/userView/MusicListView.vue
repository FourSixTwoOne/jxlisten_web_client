<script setup>
import { ref } from 'vue';

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
        coverUrl: '@/assets/favicon-16x16.png',
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
    }, {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    }, {
        id: 2,
        coverUrl: '@/assets/favicon-16x16.png',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-02',
        audioUrl: 'path/to/audio2.mp3',
        type: 2,
    },{ id: 2,
coverUrl: '@/assets/favicon-16x16.png',
title: '曲名2',
publisher: '发布者2',
author: '作者2',
uploadTime: '2023-10-02',
audioUrl: 'path/to/audio2.mp3',
type: 2,
},{ id: 2,
coverUrl: '@/assets/favicon-16x16.png',
title: '曲名2',
publisher: '发布者2',
author: '作者2',
uploadTime: '2023-10-02',
audioUrl: 'path/to/audio2.mp3',
type: 2,
},{ id: 2,
coverUrl: '@/assets/favicon-16x16.png',
title: '曲名2',
publisher: '发布者2',
author: '作者2',
uploadTime: '2023-10-02',
audioUrl: 'path/to/audio2.mp3',
type: 2,
},{ id: 2,
coverUrl: '@/assets/favicon-16x16.png',
title: '曲名2',
publisher: '发布者2',
author: '作者2',
uploadTime: '2023-10-02',
audioUrl: 'path/to/audio2.mp3',
type: 2,
},{ id: 2,
coverUrl: '@/assets/favicon-16x16.png',
title: '曲名2',
publisher: '发布者2',
author: '作者2',
uploadTime: '2023-10-02',
audioUrl: 'path/to/audio2.mp3',
type: 2,
},{ id: 2,
coverUrl: '@/assets/favicon-16x16.png',
title: '曲名2',
publisher: '发布者2',
author: '作者2',
uploadTime: '2023-10-02',
audioUrl: 'path/to/audio2.mp3',
type: 2,
},{ id: 2,
coverUrl: '@/assets/favicon-16x16.png',
title: '曲名2',
publisher: '发布者2',
author: '作者2',
uploadTime: '2023-10-02',
audioUrl: 'path/to/audio2.mp3',
type: 2,
},{ id: 2,
coverUrl: '@/assets/favicon-16x16.png',
title: '曲名2',
publisher: '发布者2',
author: '作者2',
uploadTime: '2023-10-02',
audioUrl: 'path/to/audio2.mp3',
type: 2,
},{ id: 2,
coverUrl: '@/assets/favicon-16x16.png',
title: '曲名2',
publisher: '发布者2',
author: '作者2',
uploadTime: '2023-10-02',
audioUrl: 'path/to/audio2.mp3',
type: 2,
},{ id: 2,
coverUrl: '@/assets/favicon-16x16.png',
title: '曲名2',
publisher: '发布者2',
author: '作者2',
uploadTime: '2023-10-02',
audioUrl: 'path/to/audio2.mp3',
type: 2,
},{ id: 2,
coverUrl: '@/assets/favicon-16x16.png',
title: '曲名2',
publisher: '发布者2',
author: '作者2',
uploadTime: '2023-10-02',
audioUrl: 'path/to/audio2.mp3',
type: 2,
},{ id: 2,
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
    <page-container title="歌曲列表" class="music-list-view">
        <template #extra>
            <div class="search-container">
                <el-input
                    @input="handleSearch"
                    v-model="pageParams.title"
                    placeholder="输入曲名进行查询："
                    style="width: 200px; margin-right: 10px" />
                <el-input
                    @input="handleSearch"
                    v-model="pageParams.author"
                    placeholder="输入作者进行查询："
                    style="width: 200px; margin-right: 10px" />
                <el-select
                    @input="handleSearch"
                    v-model="pageParams.status"
                    placeholder="审核状态状态"
                    style="width: 120px; margin-right: 10px">
                    <el-option label="全部" :value="''" />
                    <el-option label="已审核" :value="1" />
                    <el-option label="待审核" :value="0" />
                </el-select>
            </div>
        </template>

        <el-table class="music-list" :data="musicList" style="width: 100%" v-loading="isLoading" fit>
            <el-table-column label="序号" type="index" width="60" />
            <el-table-column label="封面" align="center">
                <template #default="scope">
                    <img
                        :src="scope.row.coverUrl"
                        alt="封面"
                        style="width: 50px; height: 50px; object-fit: cover" />
                </template>
            </el-table-column>
            <el-table-column label="曲名" prop="title">
                <template #default="scope">
                    <span>
                        {{ scope.row.title }}
                        <el-tag
                            v-if="scope.row.type === 1"
                            type="success"
                            @click="() => ElMessage.info('原：发布者原创歌曲')"
                            >原</el-tag
                        >
                        <el-tag
                            v-if="scope.row.type === 2"
                            type="info"
                            @click="() => ElMessage.info('翻：发布者翻唱歌曲')"
                            >翻</el-tag
                        >
                        <el-tag
                            v-if="scope.row.type === 3"
                            type="warning"
                            @click="() => ElMessage.info('转：发布者转载歌曲')"
                            >转</el-tag
                        >
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="发布者" prop="publisherId" />
            <el-table-column label="作者" prop="author" />
            <el-table-column label="上传时间" prop="uploadTime" min-width="150" />
            <el-table-column label="播放" width="150" align="center">
                <template #default="scope">
                    <audio
                        :src="scope.row.audioUrl"
                        controls
                        style="width: 100%"
                        class="custom-audio"></audio>
                </template>
            </el-table-column>
            <el-table-column label="审核状态" prop="status" align="center">
                <template #default="scope">
                    <el-button
                        size="small"
                        :type="scope.row.status === 1 ? 'success' : 'danger'"
                        @click="toggleStatus(scope.row)">
                        {{ scope.row.status === 1 ? '已审核' : '待审核' }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
                <template #default="scope">
                    <el-button type="danger" size="small" @click="deleteMusic(scope.row.musicId)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="暂无数据" />
            </template>
        </el-table>

        <div style="display: flex; justify-content: center; margin-top: 20px">
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

.custom-audio {
    width: 100%; /* 使音频控件宽度为100% */
    height: 24px; /* 设置音频控件高度 */
    margin-top: 8px; /* 上方添加一点间距 */
}
</style>
