<script setup>
import ChatWindow from '@/components/ChatWindow.vue';
import { ref, watch,onMounted } from 'vue';
import { useUserStore } from '@/stores';

const userStore = useUserStore();
const props = defineProps({
    param: {
        type: Object,
    },
});

onMounted(() => {
    getListeningRoom();
});

const listeningRoom = ref({
    roomId: '',
    roomName: '',
    host: '',
    playlist: [],
    members: [],
});

const currentSongIndex = ref(0);
const currentSong = ref(listeningRoom.value.playlist[currentSongIndex.value]);
const messages = ref([]);
const isMember = ref(false);
const isMusic = ref(false);

const getListeningRoom = async () => {
    listeningRoom.value.roomId = props.param.Id;
    listeningRoom.value.roomName = '音乐室';
    listeningRoom.value.host = '房主';
    listeningRoom.value.members = [
        { name: '用户1', avatar: '' },
        { name: '用户2', avatar: '@/assets/user2.jpg' },
    ];
    listeningRoom.value.playlist = [
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
    ];
    // listenroom.value = await getListeningRoomService(props.param.roomId);
};

// 处理消息发送
const handleSend = async (content) => {
    const newMsg = {
        content,
        senderId: userStore.user.userId,
        time: Date.now() / 1000,
    };

    // 调用后端API发送消息
    // await api.sendMessage(newMsg);

    // 添加到消息列表
    messages.value.push(newMsg);
};
// 聊天记录初始样本
messages.value = [
    { userId: 2, content: '你好！', time: 123456 },
    { userId: 1, content: '大家准备好听歌了吗？', time: 123456 },
];

// 切换显示成员列表
const showMember = () => {
    isMember.value = !isMember.value;
    if (isMusic.value) isMusic.value = false;
};

// 切换显示音乐列表
const showMusic = () => {
    isMusic.value = !isMusic.value;
    if (isMember.value) isMember.value = false;
};
</script>

<template>
    <el-container class="listening-room">
        <el-header>
            <div class="header">
                <div>音乐室</div>
                <div>房主: {{ listeningRoom.host.username }}</div>
            </div>
        </el-header>
        <div class="song-info">
            <div>{{ currentSong?.title || '未知歌曲' }}</div>
            ———
            <div v-if="currentSong?.type === 1">{{ currentSong.author }}</div>
            <div v-if="currentSong?.type === 2">{{ currentSong.publisher }}</div>
            <div v-if="currentSong?.type === 3">{{ currentSong.author }}</div>
        </div>
        <el-main>
            <div class="chat-area" :class="{ hei: isMember || isMusic }">
                <ChatWindow :messages="messages" :participants="listeningRoom.members" @send="handleSend" />
            </div>
            <div class="muen-list">
                <div v-if="isMember" class="member-list">
                    <div class="member-list">
                        <div v-for="(member, index) in listeningRoom.members" :key="index" class="member-item">
                            <div class="avatar-container">
                                <AvatarView :imageUrl="member.avatar" />
                            </div>
                            <div class="member-name">{{ member.name }}</div>
                        </div>
                    </div>
                </div>
                <div v-if="isMusic" class="music-list">
                    <ul>
                        <li v-for="(song, index) in listeningRoom.playlist" :key="index">
                            {{ song.title }} - {{ song.author }}
                        </li>
                    </ul>
                </div>
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
        margin: 10px 0; // 增加顶部和底部的间距
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
            overflow-y: auto; // 增加滚动条
            flex-grow: 1; // 使聊天区域自动填充剩余空间
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
        gap: 2px; /* 列间距 */
    }

    .member-item {
        display: flex;
        height: 65px;
        width: 51px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        .avatar-container {
            width: 35px;
            height: 35px;
        }
    }

    .member-name {
        margin-top: 5px;
        font-size: 10px;
        text-align: center;
    }

    .el-footer {
        width: 100%;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: space-around; // 使按钮均匀分布
        .el-button {
            height: 30px;
        }
    }

    .music-list {
        padding: 10px;
        h3 {
            margin: 0; // 去掉默认的h3上下间距
            color: #333; // 设置标题颜色
        }
        ul {
            padding-left: 0; // 去掉列表的内边距
            list-style-type: none; // 去掉默认的列表样式
            margin: 0; // 去掉默认的外边距
        }
        li {
            margin: 5px 0; // 增加歌曲之间的间距
            color: #444; // 设置歌曲颜色
        }
    }
}
</style>
