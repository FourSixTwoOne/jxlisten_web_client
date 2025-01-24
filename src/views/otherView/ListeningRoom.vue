<script setup>
import { ref, watch } from 'vue';

const host = ref({ username: '房主' });
const playlist = ref([
    {
        type: 1,
        title: 'Song 1',
        author: 'Artist 1',
        coverUrl: '@/assets/song1.jpg',
        audioUrl: '@/assets/song1.mp3',
    },
    {
        title: 'Song 2',
        author: 'Artist 2',
        coverUrl: '@/assets/song2.jpg',
        audioUrl: '@/assets/song2.mp3',
    },
    {
        title: 'Song 3',
        author: 'Artist 3',
        coverUrl: '@/assets/song3.jpg',
        audioUrl: '@/assets/song3.mp3',
    },
]);
const currentSongIndex = ref(0);
const currentSong = ref(playlist.value[currentSongIndex.value]);
const isPlaying = ref(false);
const audio = new Audio(currentSong.value.audioUrl);
const currentTime = ref(0);
const newMessage = ref('');
const messages = ref([]);
const isMember = ref(false);
const isMusic = ref(false);

// 监听当前歌曲索引变化
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
const showMember = () => {
    isMember.value = !isMember.value;
    if (isMusic.value == true) isMusic.value = false;
};

const showMusic = () => {
    isMusic.value = !isMusic.value;
    if (isMember.value == true) isMember.value = false;
};
// 控制播放和暂停
const togglePlay = () => {
    isPlaying.value = !isPlaying.value;
    if (isPlaying.value) {
        audio.play();
    } else {
        audio.pause();
    }
};

// 播放下一首歌
const nextSong = () => {
    currentSongIndex.value = (currentSongIndex.value + 1) % playlist.value.length;
};

// 播放上一首歌
const prevSong = () => {
    currentSongIndex.value =
        (currentSongIndex.value - 1 + playlist.value.length) % playlist.value.length;
};

// 跳转到指定时间
const seekSong = (time) => {
    audio.currentTime = time;
};

// 发送聊天消息
const sendMessage = () => {
    if (newMessage.value.trim()) {
        messages.value.push({ user: '用户', content: newMessage.value });
        newMessage.value = '';
    }
};

// 更新当前时间
audio.addEventListener('timeupdate', () => {
    currentTime.value = audio.currentTime;
});

// 聊天记录初始样本
messages.value = [
    { user: '用户1', content: '你好！' },
    { user: '用户2', content: '大家准备好听歌了吗？' },
];
</script>

<template>
    <el-container class="listening-room">
        <el-header>
            <div class="header">
                <div>音乐室</div>
                <div>房主: {{ host.username }}</div>
            </div>
        </el-header>
        <div class="song-info">
            <div>{{ currentSong?.title || '未知歌曲' }}</div>
            ———
            <div v-if="currentSong.type === 1">{{ currentSong.author }}</div>
            <div v-if="currentSong.type === 2">{{ currentSong.publisher }}</div>
            <div v-if="currentSong.type === 3">{{ currentSong.author }}</div>
        </div>
        <el-main>
            <div class="chat-area" :class="{ hei: isMember || isMusic }">
                <div class="other-messages">
                    <div v-for="(msg, index) in messages" :key="index" class="message">
                        <strong>{{ msg.user }}:</strong> {{ msg.content }}
                    </div>
                </div>
                <div class="send-button">
                    <el-input
                        v-model="newMessage"
                        type="textarea"
                        autosize
                        placeholder="输入信息…"
                        @keyup.enter="sendMessage">
                    </el-input>
                    <el-button type="primary" @click="sendMessage">发送</el-button>
                </div>
            </div>
            <div class="muen-list">
                <div v-if="isMember" class="member-list">
                    成员列表
                    <div v-if="isMember" class="member-list">
                        <div v-for="(member, index) in members" :key="index" class="member-item">
                            <img :src="member.avatar" alt="Member Avatar" class="member-avatar" />
                            <div class="member-name">{{ member.name }}</div>
                        </div>
                    </div>
                </div>
                <div v-if="isMusic" class="music-list">播放列表</div>
            </div>
        </el-main>
        <el-footer>
            <div class="muen-area">
                <el-button type="primary" @click="showMember">成员列表</el-button>
                <el-button type="primary" @click="showMusic">播放列表</el-button>
            </div>
        </el-footer>
    </el-container>
</template>

<style lang="scss" scoped>
.listening-room {
    border-radius: 4px;

    .header {
        text-align: center;
    }
    .song-info {
        color: #95d420;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .chat-area {
        height: 99%;
        border: 1px solid #ccc;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
        font-size: small;
        &.hei {
            height: calc(50% - 50px);
        }
        .other-messages {
            max-width: 200px;
            margin-bottom: 10px;
        }

        .send-button {
            width: 100%;
            bottom: 0;
            display: flex;
            flex-direction: row;
            position: absolute;
        }

        .message {
            padding: 5px;
            border-bottom: 1px solid #eee;
        }
    }
    .member-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); /* 根据需要调整 */
        gap: 10px; /* 列间距 */
    }

    .member-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 5px;
    }

    .member-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
    }

    .member-name {
        margin-top: 5px;
        font-size: 14px;
        text-align: center;
    }

    .el-footer {
        width: 100%;
        height: 35px;
        display: flex;
        align-items: center;
        .el-button {
            height: 30px;
        }
    }
}
</style>
