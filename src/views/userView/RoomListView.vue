<script setup>
import { Search, Upload, User, Clock } from '@element-plus/icons-vue';
import defaultCover from '@/assets/cover.jpg';
import { createListeningRoomService, getListeningRoomListService } from '@/api/ListeningRoom';
import { uploadFileService } from '@/api/user';

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
const roomList = ref([]);

const handleSearch = () => {
    handleQuery();
};

const handleQuery = async () => {
    isLoading.value = true;
    const res = await getListeningRoomListService(pageParams.value);
    roomList.value = res.data.data.records;
    total.value = res.data.data.total;
    isLoading.value = false;
};

const createdForm = ref({
    roomName: '',
    createdId: '',
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

const onUpload = async () => {
    isLoading.value = true;
    try {
        // 上传封面
        if (!coverFile.value) {
            ElMessage.error('请选择封面图片');
            return;
        }
        const coverFormData = new FormData();
        coverFormData.append('file', coverFile.value);
        const coverResponse = await uploadFileService(coverFormData);
        createdForm.value.coverUrl = coverResponse.data.data;

        // 调用update
        await createListeningRoomService(createdForm.value);
        ElMessage.success('音乐室创建成功');
    } catch (error) {
        console.error('上传失败:', error);
        ElMessage.error('上传失败');
    } finally {
        isLoading.value = false;
    }
};

const joinRoom = async (roomId) => {
    console.log(`加入房间: ${roomId}`);
    
};

handleQuery();
</script>

<template>
    <el-container class="listening-room-layout">
        <el-text size="large" type="primary">音乐室列表</el-text>
        <el-header>
            <div class="search-container">
                <div class="search-label">
                    <el-icon><Search /></el-icon>音乐室名：
                    <el-input
                        class="search-input"
                        @input="handleSearch"
                        v-model="pageParams.roomName"
                        style="width: 120px; margin-right: 10px; height: 20px" />
                </div>
                <div class="search-label">
                    <el-icon><Search /></el-icon>房主名：
                    <el-input
                        class="search-input"
                        @input="handleSearch"
                        v-model="pageParams.createdName" />
                </div>
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
                            autosize
                            maxlength="60"
                            show-word-limit
                            placeholder="请输入音乐室描述"
                            v-model="createdForm.description" />
                    </el-form-item>
                    <div class="drawer__footer">
                        <el-button @click="cancelForm">取消</el-button>
                        <el-button type="primary" :loading="isLoading" @click="onUpload">
                            {{ isLoading ? '提交中...' : '提交' }}
                        </el-button>
                    </div>
                </el-form>
            </div>
        </el-drawer>
        <el-main>
            <el-row :gutter="20" class="room-grid">
                <el-col
                    v-for="(room, index) in roomList"
                    :key="index"
                    :xs="24"
                    :sm="12"
                    :md="8"
                    :lg="6"
                    class="room-col">
                    <el-card class="room-card">
                        <div class="card-content">
                            <div class="cover-container">
                                <img
                                    :src="room.coverUrl || defaultCover"
                                    alt="封面"
                                    class="cover-image" />
                            </div>

                            <div class="room-info">
                                <h4 class="room-name">{{ room.roomName }}</h4>
                                <div class="main-info">
                                    <span class="owner">
                                        <el-icon><User /></el-icon>
                                        {{ room.createdName }}
                                    </span>
                                    <span class="create-time">
                                        <el-icon><Clock /></el-icon>
                                        {{ room.createTime }}
                                    </span>
                                </div>

                                <!-- 描述信息 -->
                                <div class="description" v-if="room.description">
                                    {{ room.description }}
                                </div>

                                <!-- 操作按钮 -->
                                <div class="actions">
                                    <el-button type="primary" size="small" @click="joinRoom(room.roomId)">加入房间</el-button>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

            <el-empty v-if="!roomList.length" description="暂无数据" />
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
    display: flex;
    flex-direction: column;
    width: 100%;
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
    .room-grid {
        width: calc(100% - 1px);
        .room-card {
            transition: transform 0.3s;
            margin: 0 5px;

            &:hover {
                transform: translateY(-5px);
            }

            .card-content {
                display: flex;
                flex-direction: column;

                .cover-container {
                    width: 140px;
                    height: 140px;
                    border-radius: 4px;
                    overflow: hidden;

                    .cover-image {
                        top: 0;
                        left: 0;
                        object-fit: cover;
                    }
                }

                .room-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;

                    .room-name {
                        font-size: 16px;
                    }
                    .main-info {
                        .owner {
                            display: flex;
                            margin-right: 10px;
                        }

                        .meta-info {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 8px;
                            font-size: 12px;
                            color: var(--el-text-color-secondary);

                            .el-icon {
                                margin-right: 4px;
                            }
                        }
                    }

                    .description {
                        height: 40px;
                        flex: 1;
                        margin-top: 5px;
                        font-size: 13px;
                        line-height: 1.4;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .actions {
                        margin-top: 16px;
                        text-align: center;
                    }
                }
            }
        }
    }

    .drawer__content {
        padding: 20px;
    }

    .el-footer {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
