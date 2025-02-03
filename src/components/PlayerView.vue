<script setup>
const props = defineProps({
    
});
</script>

<template>
    <div class="player-view">
        <div class="progress-area">
            <span class="current-time">{{ formatTime(songStore.currentTime) }}</span>
            <el-slider
                v-model="songStore.currentTime"
                :max="songStore.totalTime"
                class="progress-bar"
                @mousedown="isSeeking = true"
                @change="seekSong(songStore.currentTime)"
                @mouseup="isSeeking = false"></el-slider>
            <span class="total-time">{{ formatTime(songStore.totalTime) }}</span>
        </div>
        <div class="control-up">
            <el-button @click="prevSong" :icon="PrevSongSVG" class="control-btn"> </el-button>
            <el-button @click="togglePlay" class="control-btn">
                <MusicPlayerSVG :isPlaying="songStore.isPlaying" />
            </el-button>
            <el-button @click="nextSong" :icon="NextSongSVG" class="control-btn"></el-button>
        </div>
    </div>
</template>
