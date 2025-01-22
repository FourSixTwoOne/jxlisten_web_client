<script setup>
import { ref, watch } from 'vue';

const host = ref({ username: '房主' });
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
const newMessage = ref('');
const messages = ref([]);

// 监听当前歌曲索引变化
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
    <div class="music-room">
        <div class="header">
            <h1>音乐室</h1>
            <p>房主: {{ host.username }}</p>
        </div>

        <div class="room-content">
            <div class="chat-area">
                <div class="messages">
                    <div v-for="(msg, index) in messages" :key="index" class="message">
                        <strong>{{ msg.user }}:</strong> {{ msg.content }}
                    </div>
                </div>
                <el-input
                    v-model="newMessage"
                    placeholder="输入信息…"
                    @keyup.enter="sendMessage"></el-input>
                <el-button type="primary" @click="sendMessage">发送</el-button>
            </div>

            <div class="player-area">
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
                        <el-button
                            @click="nextSong"
                            icon="el-icon-forward"
                            class="control-btn"></el-button>
                    </div>
                </div>

                <el-slider
                    v-model="currentTime"
                    :max="currentSong.duration"
                    class="progress-bar"
                    @change="seekSong"></el-slider>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.music-room {
    margin: 20px auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;

    .header {
        text-align: center;
        margin-bottom: 20px;

        h1 {
            margin: 0;
        }
    }

    .room-content {
        display: flex;
        flex-direction: column;

        .chat-area {
            flex: 1;
            margin-bottom: 20px;

            .messages {
                max-height: 200px;
                overflow-y: auto;
                margin-bottom: 10px;
            }

            .message {
                padding: 5px;
                border-bottom: 1px solid #eee;
            }
        }

        .player-area {
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
        }
    }
}
</style>
