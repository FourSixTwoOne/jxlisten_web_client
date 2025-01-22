<script setup>
import NextSongSVG from '@/components/icons/NextSongSVG.vue';
import PrevSongSVG from '@/components/icons/PrevSongSVG.vue';
import MusicPlayerSVG from '@/components/icons/MusicplayerSVG.vue';
import { ref, watch } from 'vue';
import defaultCover from '@/assets/android-chrome-512x512.png';
const playlist = ref([
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
]);
const currentSongIndex = ref(0);
const currentSong = ref(playlist.value[currentSongIndex.value]);
const isPlaying = ref(false);
const audio = new Audio(currentSong.value.audioUrl);
const currentTime = ref(0);

watch(
    () => currentSongIndex.value,
    (newIndex) => {
        currentSong.value = playlist.value[newIndex];
        audio.src = currentSong.value.audioUrl;
        if (isPlaying.value) {
            audio.play();
        }
    }
);

const togglePlay = () => {
    isPlaying.value = !isPlaying.value;
    if (isPlaying.value) {
        audio.play();
    } else {
        audio.pause();
    }
};

const nextSong = () => {
    currentSongIndex.value = (currentSongIndex.value + 1) % playlist.value.length;
};

const prevSong = () => {
    currentSongIndex.value =
        (currentSongIndex.value - 1 + playlist.value.length) % playlist.value.length;
};

const seekSong = (time) => {
    audio.currentTime = time;
};

const selectSong = (index) => {
    currentSongIndex.value = index;
};

const removeSong = (index) => {
    playlist.value.splice(index, 1);
    if (currentSongIndex.value >= playlist.value.length) {
        currentSongIndex.value = playlist.value.length - 1; // 确保索引不越界
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
                        :max="currentSong.duration"
                        class="progress-bar"
                        @change="seekSong"></el-slider>
                    <span class="total-time">{{ formatTime(currentSong.duration) }}</span>
                </div>
                <div class="control-up">
                    <el-button
                        @click="prevSong"
                        :icon="PrevSongSVG"
                        class="control-btn"></el-button>
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
                    :class="{ active: currentSongIndex === index }">
                    <span>{{ song.title }}</span> - <span>{{ song.author }}</span>
                    <el-button
                        icon="el-icon-delete"
                        @click.stop="removeSong(index)"
                        class="remove-btn"
                        size="mini"></el-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.music-player {
    $border: 4px solid #3247bc;
    display: flex;
    position: relative;
    flex-direction: column;
    border: $border; /* 边框属性提取 */
    border-radius: 8px;
    background-color: #97d9f1;
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
        border-bottom: $border;

        .song {
            text-align: center;

            h2 {
                margin: 0;
                font-size: 20px;
            }

            .album-cover {
                width: 100px; /* 封面大小 */
                height: 100px; /* 封面大小 */
                border-radius: 8px;
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

        .controls {
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid rgb(170, 176, 172);
            border-radius: 40px;
            margin-top: 10px;
            margin: 10px 0 10px 0;
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
    }

    .playlist-area {
        flex: 1;
        height: 100%;
        width: 100%;
        border: $border;
        overflow-y: auto; /* 允许滚动 */
        h3 {
            font-size: 16px;
        }

        ul {
            list-style-type: none;
            padding: 0;
            li {
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: background-color 0.3s;

                &:hover {
                    background-color: #478cc5;
                }

                &.active {
                    background-color: #e0e0e0;

                    font-weight: bold;
                }
            }
        }
    }
}
</style>
