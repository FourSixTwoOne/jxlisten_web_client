<script setup>
import { ref } from 'vue';
import defaultCover from '@/assets/android-chrome-512x512.png';
import { Delete, ArrowLeftBold } from '@element-plus/icons-vue';
import PlayListSVG from '@/components/icons/PlayListSVG.vue';
import AddListSVG from '@/components/icons/AddListSVG.vue';
import DeleteListSVG from '@/components/icons/DeleteListSVG.vue';
import { useSongStore } from '@/stores';

const songStore = useSongStore();
const isListVisible = ref(false);
const showActionButtons = ref(false);

const selectSong = (index) => {
    songStore.pause();
    songStore.currentIndex = index;
    songStore.play();
};

const handleUpdate = (row) => {
    if (!row) songStore.updateSong(row);
};

const toggleActionButtons = () => {
    showActionButtons.value = !showActionButtons.value;
};
</script>

<template>
    <div class="music-player">
        <div class="player-area">
            <div class="song">
                <h2>{{ songStore.currentSong?.title || '未知歌曲' }}</h2>
                <img
                    :src="songStore.currentSong?.coverUrl || defaultCover"
                    alt="专辑封面"
                    class="album-cover" />
                <div class="song-info">
                    <el-button class="info-button"
                        >上传：{{ songStore.currentSong?.publisher || '未知' }}</el-button
                    >
                    <el-button class="info-button"
                        >原唱：{{ songStore.currentSong?.author || '未知' }}</el-button
                    >
                    <el-button
                        size="small"
                        text
                        type="primary"
                        class="ellipsis-button"
                        @click.stop="toggleActionButtons">
                        <el-icon :class="{ rotate: showActionButtons }">
                            <!-- 使用单个箭头图标 -->
                            <ArrowLeftBold />
                        </el-icon>
                    </el-button>
                    <ActionButtons
                        v-if="showActionButtons"
                        :row="songStore.currentSong"
                        @update="handleUpdate"
                        :type="'music'" />
                </div>
            </div>

            <div class="controls-area">
                <PlayerControls />
            </div>
        </div>

        <div class="playlist-area">
            <div class="playlist-header">
                <el-button
                    class="play-list-btn"
                    type="primary"
                    size="small"
                    @click="isListVisible = !isListVisible">
                    <PlayListSVG />
                    播放列表
                </el-button>

                <el-button
                    class="play-mode-btn"
                    type="primary"
                    size="small"
                    @click="songStore.toggleMode">
                    模式：
                    <PlayModeSVG :mode="songStore.playMode"></PlayModeSVG>
                </el-button>
                <el-button
                    class="add-btn"
                    type="primary"
                    :icon="AddListSVG"
                    size="small"
                    @click="songStore.addSong">
                    添加
                </el-button>
                <el-button
                    class="clear-btn"
                    :icon="DeleteListSVG"
                    type="primary"
                    size="small"
                    @click="songStore.clearPlaylist">
                    清空
                </el-button>
            </div>
            <ul v-if="isListVisible" key="playlist">
                <li
                    v-for="(song, index) in songStore.playlist"
                    :key="song.musicId"
                    @click="selectSong(index)"
                    :class="{ active: songStore.currentIndex === index }">
                    <span>{{ song.title }}</span> - <span>{{ song.author }}</span>
                    <el-button
                        @click.stop="songStore.removeSong(index)"
                        class="remove-btn"
                        type="primary"
                        size="small">
                        <el-icon><Delete /></el-icon>
                    </el-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '@/assets/main.scss' as *;
.music-player {
    min-height: 300px;
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: #adfeff;
    width: 100%;
    align-items: center;
    justify-content: center;
    color: #1f2016;

    .player-area {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        justify-content: center;

        .song {
            text-align: center;

            h2 {
                margin: 0;
                font-size: 20px;
            }

            .album-cover {
                width: 100px;
                height: 100px;
                margin: 10px 0;
            }

            .song-info {
                display: flex;
                flex-direction: row;
                align-items: center;

                .ellipsis-button {
                    width: 10px;
                    border: $border2;
                    position: relative;

                    .el-icon {
                        transition: transform 0.5s ease;
                        transform-origin: center;
                    }

                    .rotate {
                        transform: rotate(180deg);
                    }
                }

                .info-button {
                    background: none;
                    padding: 0;
                    font-size: 10px;
                    cursor: default;
                    height: 25px;
                    &:hover {
                        background: rgba(255, 255, 255, 0.1);
                    }
                }
            }
        }
    }

    .playlist-area {
        width: 100%;
        overflow-y: auto;
        .playlist-header {
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            h3 {
                font-size: 16px;
            }
            .add-btn {
                padding: 0 10px;
                margin: 0;
            }
        }
        ul {
            list-style-type: none;
            padding: 0;
            li {
                background-color: aqua;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: background-color 0.3s;

                &:hover {
                    background-color: #9bd7c8;
                }

                &.active {
                    background-color: #85cdce;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
