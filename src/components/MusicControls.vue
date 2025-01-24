<template>
    
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
    totalTime: Number,
    currentTime: Number,
    currentSong: Object,
    isPlaying: Boolean,
    togglePlay: Function,
    nextSong: Function,
    prevSong: Function,
    seekSong: Function,
    formatTime: Function,
});

const localCurrentTime = ref(props.currentTime);

watch(
    () => props.currentTime,
    (newVal) => {
        localCurrentTime.value = newVal;
    }
);

// 当滑块值改变时，调用父组件的 seekSong 方法
const handleSeekSong = (value) => {
    props.seekSong(value);
};
</script>

<style lang="scss" scoped>
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
</style>
