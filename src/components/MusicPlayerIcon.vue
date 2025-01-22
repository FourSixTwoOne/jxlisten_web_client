<script setup>
import { ref, defineProps } from 'vue';
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

const togglePlayer = async () => {
    isPlayer.value = !isPlayer.value;
    songStore.setSong(props.row);
};
</script>

<template>
    <div>
        <el-button type="link" size="small" @click="togglePlayer">
            <MusicplayerSVG :isPlaying="isPlayer" />
        </el-button>
    </div>
</template>

<style scoped></style>
