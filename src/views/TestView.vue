<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores'; // 修正导入路径

const userStore = useUserStore();
const user = computed(() => userStore.user);

const test = () => {
    console.log('test')
    console.log('user:::', user.value);
    console.log('userStore:::', userStore.user);
    const user1 = userStore.user; // 直接访问 user，不需要 .value
    console.log('user:::', user1);

}
const audio = new Audio();
audio.src = 'http://localhost:5173/src/assets/music/小城夏天 - LBI利比.mp3';
</script>

<template>
    <div class="test-view">
        <el-button @click="test">test</el-button>
    </div>
    <div>
        <button @click="audio.play()">播放</button>
        <button @click="audio.pause()">暂停</button>
        <el-slider v-model="audio.currentTime"></el-slider>
    </div>
</template>