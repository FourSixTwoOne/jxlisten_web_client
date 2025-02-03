<script setup>
import { useSongStore } from '@/stores/modules/song';
import MusicPlayerSVG from '@/components/icons/MusicplayerSVG.vue';
import NextSongSVG from '@/components/icons/NextSongSVG.vue';
import PrevSongSVG from '@/components/icons/PrevSongSVG.vue';

const songStore = useSongStore();

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, '0');
    return `${minutes}:${seconds}`;
};

const togglePlay = () => {
    if (songStore.isPlaying) {
        songStore.pause();
    } else {
        songStore.play();
    }
};

const handleSeek = (value) => {
    songStore.audio.currentTime = value;
};
</script>

<template>
    <div class="controls">
        <div class="progress-area">
            <span class="current-time">{{ formatTime(songStore.currentTime) }}</span>
            <el-slider
                class="progress-bar"
                v-model="songStore.currentTime"
                :format-tooltip="formatTime"
                :max="songStore.totalTime"
                @mousedown="songStore.isSeeking = true"
                @change="handleSeek" 
                @mouseup="songStore.isSeeking = false"/>
            <span class="total-time">{{ formatTime(songStore.totalTime) }}</span>
        </div>

        <div class="control-btn">
            <el-button @click="songStore.prevSong">
                <PrevSongSVG />
            </el-button>

            <el-button @click="togglePlay">
                <MusicPlayerSVG :is-playing="songStore.isPlaying" />
            </el-button>

            <el-button @click="songStore.nextSong">
                <NextSongSVG />
            </el-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/main.scss' as *;
.controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgb(170, 176, 172);
    border-radius: 40px;
    margin-top: 10px;
    margin: 10px;
    width: 95%;

    .progress-area {
        display: flex;
        align-items: center;
        flex-direction: row;

        .current-time,
        .total-time {
            font-size: 10%;
            width: 50px;
            text-align: center;
        }

        .progress-bar {
            width: 150px;
            margin: 0 10px;
        }
    }

    .control-btn {
        display: flex;
        align-items: center;
        justify-content: space-around;
        .el-button {
            height: 20px;
            padding: 0 20px;
            margin-bottom: 5px;
        }
    }
}
</style>
