<script setup>
import { ref } from 'vue';
import { useSongStore } from '@/stores/modules/song';

const songStore = useSongStore();

// 模拟收藏歌曲数据
const favoriteSongs = ref([
    { id: 1, title: '夜曲', author: '周杰伦', url: '/songs/1.mp3' },
    { id: 2, title: '七里香', author: '周杰伦', url: '/songs/2.mp3' },
    { id: 3, title: '青花瓷', author: '周杰伦', url: '/songs/3.mp3' },
]);

// 多选相关状态
const isMultiSelect = ref(false);
const selectedIds = ref(new Set());

// 播放全部
const playAll = () => {
    songStore.playlist = [...favoriteSongs.value];
    songStore.currentIndex = 0;
    songStore.switchSong(songStore.playlist[0]);
};

// 多选切换
const toggleMultiSelect = () => {
    isMultiSelect.value = !isMultiSelect.value;
    selectedIds.value.clear();
};

// 多选删除
const deleteSelected = async () => {
    try {
        await ElMessageBox.confirm('确定要删除选中的歌曲吗？', '提示', { type: 'warning' });

        favoriteSongs.value = favoriteSongs.value.filter((song) => !selectedIds.value.has(song.id));
        selectedIds.value.clear();
        ElMessage.success('删除成功');
    } catch (error) {
        // 用户取消删除
    }
};

// 单曲操作
const handleUncollect = (song) => {
        favoriteSongs.value = favoriteSongs.value.filter((s) => s.id !== song.id);
};

const handleReport = (song) => {
    ElMessageBox.prompt('请输入举报原因', `举报《${song.title}》`, {
        inputValidator: (val) => !!val.trim(),
    }).then(({ value }) => {
        // 这里调用举报API
        ElMessage.success('举报已提交，我们会尽快处理');
    });
};
</script>

<template>
    <div class="favorite-container">
        <h3>收藏列表</h3>
        <div class="action-bar">
            <el-button type="primary" @click="playAll">
            <i class="icon-play" /> 播放全部
            </el-button>

            <div class="right-actions">
                <el-button :type="isMultiSelect ? 'danger' : 'default'" @click="toggleMultiSelect">
                    {{ isMultiSelect ? '取消多选' : '多选删除' }}
                </el-button>
            </div>
        </div>

        <!-- 歌曲列表 -->
        <div class="song-list">
            <div
                v-for="song in favoriteSongs"
                :key="song.id"
                class="song-item"
                @click="!isMultiSelect && $router.push(`/song/${song.id}`)">
                <!-- 多选复选框 -->
                <el-checkbox
                    v-if="isMultiSelect"
                    v-model="selectedIds"
                    :label="song.id"
                    @click.stop
                    class="multi-checkbox" />

                <!-- 歌曲信息 -->
                <div class="song-info">
                    <div class="title">{{ song.title }}</div>
                    <div class="author">{{ song.author }}</div>
                </div>

                <!-- 操作菜单 -->
                <el-dropdown v-if="!isMultiSelect" @click.stop>
                    <el-button type="text" class="more-btn">
                        <i class="icon-more" />
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="handleUncollect(song)">
                                <i class="icon-delete" /> 取消收藏
                            </el-dropdown-item>
                            <el-dropdown-item @click="handleReport(song)">
                                <i class="icon-report" /> 举报
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>

        <!-- 批量删除按钮 -->
        <div v-if="isMultiSelect && selectedIds.size" class="batch-actions">
            <el-button type="danger" @click="deleteSelected">
                删除选中歌曲 ({{ selectedIds.size }})
            </el-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.favorite-container {
    padding: 0 20px;
    width: 100%;
    margin: 0;

    .action-bar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }

    .song-list {
        .song-item {
            display: flex;
            padding: 12px 16px;
            border-radius: 8px;
            transition: background 0.3s;
            cursor: pointer;

            &:hover {
                background: #f5f5f5;
            }

            .multi-checkbox {
                margin-right: 16px;
            }

            .song-info {
                flex: 1;
                min-width: 0;

                .title {
                    font-size: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .author {
                    font-size: 12px;
                    color: #666;
                }
            }

            .more-btn {
                padding: 8px;
                margin-left: auto;
            }
        }
    }

    .batch-actions {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 16px;
        background: white;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }
}
</style>
