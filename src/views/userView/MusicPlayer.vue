<template>
    <div class="music-player">
        <div class="player-controls">
            <img :src="currentSong.cover" alt="专辑封面" class="album-cover" />
            <div class="song-info">
                <h2>{{ currentSong.title }}</h2>
                <p>{{ currentSong.artist }}</p>
            </div>
            <div class="controls">
                <el-button
                    @click="prevSong"
                    icon="el-icon-backward"
                    class="control-btn"></el-button>
                <el-button
                    @click="togglePlay"
                    :icon="isPlaying ? 'el-icon-pause' : 'el-icon-play'"
                    class="control-btn"></el-button>
                <el-button @click="nextSong" icon="el-icon-forward" class="control-btn"></el-button>
            </div>
        </div>

        <el-slider
            v-model="currentTime"
            :max="currentSong.duration"
            class="progress-bar"
            @change="seekSong"></el-slider>

        <div class="playlist">
            <h3>播放列表</h3>
            <ul>
                <li
                    v-for="(song, index) in playlist"
                    :key="index"
                    @click="selectSong(index)"
                    :class="{ active: currentSongIndex === index }">
                    <span>{{ song.title }}</span> - <span>{{ song.artist }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// 假设这些数据来自API或其他数据源
const playlist = ref([
    {
        title: 'Song 1',
        artist: 'Artist 1',
        cover: '@/assets/song1.jpg',
        duration: 240,
        url: '@/assets/song1.mp3',
    },
    {
        title: 'Song 2',
        artist: 'Artist 2',
        cover: '@/assets/song2.jpg',
        duration: 180,
        url: '@/assets/song2.mp3',
    },
    {
        title: 'Song 3',
        artist: 'Artist 3',
        cover: '@/assets/song3.jpg',
        duration: 210,
        url: '@/assets/song3.mp3',
    },
]);

const currentSongIndex = ref(0);
const currentSong = ref(playlist.value[currentSongIndex.value]);
const isPlaying = ref(false);
const audio = new Audio(currentSong.value.url);
const currentTime = ref(0);

watch(
    () => currentSongIndex.value,
    (newIndex) => {
        currentSong.value = playlist.value[newIndex];
        audio.src = currentSong.value.url;
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

audio.addEventListener('timeupdate', () => {
    currentTime.value = audio.currentTime;
});

const selectSong = (index) => {
    currentSongIndex.value = index;
};
</script>

<style lang="scss" scoped>
.music-player {
    width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .player-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .album-cover {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            margin-right: 15px;
        }

        .song-info {
            flex-grow: 1;

            h2 {
                margin: 0;
                font-size: 18px;
            }

            p {
                margin: 5px 0 0;
                font-size: 14px;
                color: #666;
            }
        }

        .controls {
            display: flex;

            .control-btn {
                margin: 0 5px;
            }
        }
    }

    .progress-bar {
        margin: 20px 0;
    }

    .playlist {
        h3 {
            margin-bottom: 10px;
            font-size: 16px;
        }

        ul {
            list-style-type: none;
            padding: 0;

            li {
                padding: 8px;
                cursor: pointer;
                transition: background-color 0.3s;

                &:hover {
                    background-color: #f0f0f0;
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
