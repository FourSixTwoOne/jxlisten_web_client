<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import defaultCover from '@/assets/android-chrome-512x512.png';
import NextSongSVG from '@/components/icons/NextSongSVG.vue';
import PrevSongSVG from '@/components/icons/PrevSongSVG.vue';
import MusicPlayerSVG from '@/components/icons/MusicplayerSVG.vue';
import { Delete } from '@element-plus/icons-vue';

const playlist = ref([
    {
        musicId: 1,
        coverUrl: '',
        title: '曲名1',
        publisher: '发布者1',
        author: '作者1',
        uploadTime: '2023-10-01',
        audioUrl: 'http://localhost:5173/src/assets/music/%E5%B0%8F%E5%9F%8E%E8%B0%A3%20-%20Vk.mp3',
        type: 1,
    },
    {
        musicId: 2,
        coverUrl: '',
        title: '曲名2',
        publisher: '发布者2',
        author: '作者2',
        uploadTime: '2023-10-01',
        audioUrl: 'http://localhost:5173/src/assets/music/小城夏天 - LBI利比.mp3',
        type: 2,
    },
]);

const currentIndex = ref(0);
const currentSong = computed(() => playlist.value[currentIndex.value]);
const isPlaying = ref(false);
const audio = new Audio(currentSong.value.audioUrl);
const currentTime = ref(0);
const totalTime = ref(0);
const isSeeking = ref(false);

const handleLoadedMetadata = () => {
    totalTime.value = audio.duration;
};

const handleTimeUpdate = () => {
    if (!isSeeking.value) {
        currentTime.value = audio.currentTime;
    }
};

onMounted(() => {
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
});

onUnmounted(() => {
    audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    audio.removeEventListener('timeupdate', handleTimeUpdate);
});

watch(currentIndex, (newIndex) => {
    audio.src = currentSong.value.audioUrl;
    currentTime.value = 0;
    totalTime.value = 0;
    isPlaying.value = true;
    audio.play();
});

const togglePlay = () => {
    isPlaying.value = !isPlaying.value;
    if (isPlaying.value) {
        audio.play();
    } else {
        audio.pause();
    }
};

const nextSong = () => {
    currentIndex.value = (currentIndex.value + 1) % playlist.value.length;
};

const prevSong = () => {
    currentIndex.value = (currentIndex.value - 1 + playlist.value.length) % playlist.value.length;
};

const seekSong = (time) => {
    audio.currentTime = time;
};

const selectSong = (index) => {
    currentIndex.value = index;
    if (isPlaying.value) {
        audio.play();
    }
};

const removeSong = (index) => {
    playlist.value.splice(index, 1);
    if (currentIndex.value >= playlist.value.length) {
        currentIndex.value = playlist.value.length - 1; // 确保索引不越界
    }
};

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, '0');
    return `${minutes}:${seconds}`;
};
</script>

<template>
    <div class="music-player">
        <div class="player-area">
            <div class="song">
                <h2>{{ currentSong.title }}</h2>
                <img
                    :src="currentSong?.coverUrl || defaultCover"
                    alt="专辑封面"
                    class="album-cover" />
                <div class="song-info">
                    <el-button class="info-button" type="plain"
                        >上传：{{ currentSong.publisher }}</el-button
                    >
                    <el-button class="info-button" type="plain"
                        >原唱：{{ currentSong.author }}</el-button
                    >
                    <ActionButtons :row="currentSong" @update="handleUpdate" :type="'music'" />
                </div>
            </div>

            <div class="controls">
                <div class="progress-area">
                    <span class="current-time">{{ formatTime(currentTime) }}</span>
                    <el-slider
                        v-model="currentTime"
                        :max="totalTime"
                        class="progress-bar"
                        @mousedown="isSeeking = true"
                        @change="seekSong(currentTime)"
                        @mouseup="isSeeking = false"></el-slider>
                    <span class="total-time">{{ formatTime(totalTime) }}</span>
                </div>
                <div class="control-up">
                    <el-button @click="prevSong" :icon="PrevSongSVG" class="control-btn">
                    </el-button>
                    <el-button @click="togglePlay" class="control-btn">
                        <MusicPlayerSVG :isPlaying="isPlaying" />
                    </el-button>
                    <el-button
                        @click="nextSong"
                        :icon="NextSongSVG"
                        class="control-btn"></el-button>
                </div>
            </div>
        </div>

        <div class="playlist-area">
            <h3>播放列表</h3>
            <ul>
                <li
                    v-for="(song, index) in playlist"
                    :key="index"
                    @click="selectSong(index)"
                    :class="{ active: currentIndex === index }">
                    <span>{{ song.title }}</span> - <span>{{ song.author }}</span>
                    <el-button
                        @click.stop="removeSong(index)"
                        class="remove-btn"
                        type="text"
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
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: $bg;
    width: 100%;
    align-items: center;
    justify-content: center;
    color: #3f431c;

    .player-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        justify-content: center;

        .controls {
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid rgb(170, 176, 172);
            border-radius: 40px;
            margin-top: 10px;
            margin: 10px 0;
            width: 95%;

            .control-btn {
                height: 20px;
                padding: 0 20px;
                margin-bottom: 5px;
            }

            .progress-area {
                display: flex;
                align-items: center;
                flex-direction: row;

                .current-time,
                .total-time {
                    font-size: 10%;
                    width: 50px; /* 时间显示宽度 */
                    text-align: center;
                }

                .progress-bar {
                    width: 150px;
                    margin: 0 10px;
                }
            }
        }

        .song {
            text-align: center;

            h2 {
                margin: 0;
                font-size: 20px;
            }

            .album-cover {
                width: 100px; /* 封面大小 */
                height: 100px; /* 封面大小 */
                margin: 10px 0;
            }

            .song-info {
                display: flex;
                flex-direction: row;
                align-items: center;

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
        flex: 1;
        height: 100%;
        width: 100%;
        overflow-y: auto; /* 允许滚动 */
        h3 {
            font-size: 16px;
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
                    background-color: #adfeff;
                }

                &.active {
                    background-color: #e1f1ed;

                    font-weight: bold;
                }
            }
        }
    }
}
</style>
