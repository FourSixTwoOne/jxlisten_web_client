<script setup>
import { ref, defineProps } from 'vue';
import MusicplayerSVG from '@/components/icons/MusicplayerSVG.vue';

const props = defineProps({
    audioUrl: {
        type: String,
        default: null,
    },
});

const isPlayer = ref(false);
const audio = new Audio(props.audioUrl);

const togglePlayer = async () => {
    isPlayer.value = !isPlayer.value;
    if (isPlayer.value) {
        audio.play(); // 播放音乐
        console.log('Audio URL:', props.audioUrl);
    } else {
        audio.pause(); // 暂停音乐
    }
};
</script>

<template>
    <div>
        <el-button type="link" size="small" @click="togglePlayer">
            <MusicplayerSVG :isPlaying="isPlayer" />
        </el-button>
    </div>
</template>

<style scoped>
/* 可以在这里添加样式 */
</style>
