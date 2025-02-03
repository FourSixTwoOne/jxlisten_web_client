<script setup>
import { Search, Upload } from '@element-plus/icons-vue';
import { ref } from 'vue';

const isLoading = ref(false);
const total = ref(2);
const dialog = ref(false);
const coverFile = ref(null);
const formLabelWidth = ref('80px');
const pageParams = ref({
    page: 1,
    pageSize: 10,
    roomName: '',
    createdName: '',
    type: '',
});

const roomList = ref([
    { roomName: '房间A', createdName: '用户A', createTime: '2023-10-01', coverUrl: 'cover_url_1' },
    { roomName: '房间B', createdName: '用户B', createTime: '2023-10-02', coverUrl: 'cover_url_2' },
]);

const defaultCoverUrl = 'default_cover_url';

const handleSearch = () => {
    handleQuery();
};

const handleQuery = async () => {
    isLoading.value = true;
    // await getMusicListService(pageParams.value);
    isLoading.value = false;
};

const createdForm = ref({
    roomName: '',
    createdName: '',
    coverUrl: '',
    description: '',
});

// 取消表单
const cancelForm = () => {
    // 重置表单
    createdForm.value = {
        roomName: '',
        createdName: '',
        coverUrl: '',
        description: '',
    };
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
        if (!coverFile.value) {
            ElMessage.error('请选择封面图片');
            return;
        }

        // const coverFormData = new FormData();
        // coverFormData.append('file', coverFile.value);
        // const coverResponse = await uploadFileService(coverFormData);
        // createdForm.value.coverUrl = coverResponse.data.data;

        // 调用update
        // uploadMusicService(createdForm.value);
        ElMessage.success('音乐室创建成功');
    } catch (error) {
        console.error('上传失败:', error);
        ElMessage.error('上传失败');
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <el-container class="listening-room-layout">
        <el-header>
            <el-text size="large" type="primary">音乐室列表</el-text>
            <div class="search-container">
                <div class="search-label">
                    <el-icon><Search /></el-icon>音乐室名：
                </div>
                <el-input
                    class="search-input"
                    @input="handleSearch"
                    v-model="pageParams.roomName"
                    style="width: 120px; margin-right: 10px; height: 20px" />
                <div class="search-label">
                    <el-icon><Search /></el-icon>房主名：
                </div>
                <el-input
                    class="search-input"
                    @input="handleSearch"
                    v-model="pageParams.createdName" />
            </div>
            <el-button size="small" type="primary" @click="dialog = true" class="button-upload">
                创建音乐室<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
        </el-header>
        <el-drawer
            v-model="dialog"
            title="创建音乐室"
            :before-close="handleClose"
            direction="ltr"
            class="drawer">
            <div class="drawer__content">
                <el-form :model="createdForm">
                    <el-form-item label="名称" :label-width="formLabelWidth">
                        <el-input v-model="createdForm.roomName" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="房主" :label-width="formLabelWidth">
                        <el-input v-model="createdForm.createdName" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="上传封面" :label-width="formLabelWidth">
                        <CUploader
                            placeholder="请上传封面图片"
                            type="image"
                            @file-selected="coverFile = $event" />
                    </el-form-item>
                    <el-form-item label="描述" :label-width="formLabelWidth">
                        <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入音乐室描述"
                            v-model="createdForm.description" />
                    </el-form-item>
                    <div class="drawer__footer">
                        <el-button @click="cancelForm">取消</el-button>
                        <el-button type="primary" :loading="isLoading" @click="onClick">
                            {{ isLoading ? '提交中...' : '提交' }}
                        </el-button>
                    </div>
                </el-form>
            </div>
        </el-drawer>
        <el-main>
            <el-table class="room-list" :data="roomList" v-loading="isLoading" fit>
                <el-table-column label="封面" align="center">
                    <template #default="scope">
                        <img
                            :src="scope.row.coverUrl ? scope.row.coverUrl : defaultCoverUrl"
                            alt="封面"
                            style="width: 40px; height: 40px; object-fit: cover" />
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="title"> </el-table-column>
                <el-table-column label="房主" prop="publisherId" />
                <el-table-column label="创建时间" prop="uploadTime" />
                <el-table-column label="操作" align="center" width="auto">
                    <template>
                        <el-button size="small">加入</el-button>
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
.listening-room-layout {
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
        border-bottom: $border;
        padding: 2px 10px;

        .search-container {
            margin: 0 10%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #b0b4b9;
            .search-label {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 80px;
            }
            .search-input {
                opacity: 0.4;
            }
            .el-icon {
                display: flex;
                margin-top: 2px;
            }
            .el-input {
                width: 120px;
                height: 20px;
                margin-right: 4px;
            }
        }
        .button-upload {
            flex: 0;
            margin-right: 1;
        }
    }
    .room-list {
        font-size: 12px;
        width: 100%;
        background-color: $bg;
        :deep(.el-table__cell) {
            color: #1c3c53;
            padding: 0;
            margin: 0;
            background-color: $bg;
        }
    }
    .drawer__content {
        padding: 20px;
    }

    .el-footer {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
