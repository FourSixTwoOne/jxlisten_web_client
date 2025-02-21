<script setup>
import { computed, ref } from 'vue';
import { useUserStore, useChatStore } from '@/stores'; // 修正导入路径

const chatStore = useChatStore();
const userStore = useUserStore();
const user = computed(() => userStore.user);
const inputText = ref('');
const sendMsg = ref({ content: '', targetId: '', channelType: '' });
const send = (msg) => {
    sendMsg.value.content = msg;
    sendMsg.value.targetId = user.value.userId;
    sendMsg.value.channelType = chatStore.MessageType.FRIEND;
    console.log('sendMsg:::', sendMsg.value);
    chatStore.sendMessage(sendMsg.value);
};

const test = () => {
    console.log('test');
    console.log('user:::', user.value);
    console.log('userStore:::', userStore.user);
    const user1 = userStore.user; // 直接访问 user，不需要 .value
    console.log('user:::', user1);
};
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
    <div>
        <el-button @click="send(inputText)">发送</el-button>
        <el-input v-model="inputText"></el-input>
        <div>
            <div v-for="(item, index) in chatStore.friendMessages" :key="index">
                {{ item }} - {{ sendMsg }}
            </div>
        </div>
    </div>
</template>
