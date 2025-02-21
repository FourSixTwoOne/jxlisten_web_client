<script setup>
import { ref, watch, onUnmounted } from 'vue';
import MusicplayerSVG from '@/components/icons/MusicplayerSVG.vue';
import { useSongStore } from '@/stores';

const songStore = useSongStore();
const props = defineProps({
    row: {
        type: Object,
        default: null,
    },
});
const isPlayer = ref(false);
let stopWatch = null; // 用于存储监听器清理函数

// 主监听逻辑
const checkSongMatch = () => {
    // 当播放器激活时检查歌曲匹配
    if (songStore.isPlaying == false) {
        isPlayer.value = false;
        // 停止监听
        stopWatch?.();
        stopWatch = null;
    }
};

// 组件卸载时清理
onUnmounted(() => {
    stopWatch?.();
});

const togglePlayer = async () => {
    isPlayer.value = !isPlayer.value;
    if (isPlayer.value) {
        songStore.switchSong(props.row);
        console.log('播放歌曲', props.row);
        stopWatch = watch(() => songStore.isPlaying, checkSongMatch);
    } else {
        songStore.pause();
    }
};
</script>

<template>
    <div>
        <el-button size="small" @click="togglePlayer">
            <MusicplayerSVG :isPlaying="isPlayer" />
        </el-button>
    </div>
</template>

<style scoped>
.el-button {
    height: 24px;
    width: 24px;
    padding: 0;
    margin: 0;
}
</style>
