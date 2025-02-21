<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore, useChatStore } from '@/stores';

const userStore = useUserStore();
const chatStore = useChatStore();

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

const messages = computed(() => {
    return chatStore.getMessages(chatStore.MessageType.LISTENING_ROOM, listeningRoom.value.roomId);
});
const currentSongIndex = ref(0);
const currentSong = ref(listeningRoom.value.playlist[currentSongIndex.value]);

const isMember = ref(false);
const isMusic = ref(false);
const showProfile = ref(false);
const selectedUserId = ref(null);

const getListeningRoom = async () => {
    listeningRoom.value.roomId = userStore.viewParams.param;
    listeningRoom.value.roomName = '音乐室';
    listeningRoom.value.host = '房主';
    listeningRoom.value.members = [
        { userId: 2, name: '用户1', avatar: '' },
        { userId: 3, name: '用户2', avatar: '@/assets/user2.jpg' },
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
        channelType: chatStore.MessageType.ROOM,
        targetId: listeningRoom.value.roomId,
    };

    // 调用后端API发送消息
    // await api.sendMessage(newMsg);

    // 添加到消息列表
    listeningRoom.value.messages.push(newMsg);
};

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

const handleUserProfile = (userId) => {
    selectedUserId.value = userId;
    showProfile.value = !showProfile.value;
    console.log('handleUserProfile', userId, showProfile.value);
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
            <div class="more-choices">
                <el-dropdown trigger="click">
                    ...
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>退出</el-dropdown-item>
                            <el-dropdown-item>举报</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <el-main>
            <div class="chat-area" :class="{ hei: isMember || isMusic }">
                <ChatWindow
                    :messages="messages"
                    :key="messages"
                    :participants="listeningRoom.members"
                    @send="handleSend" />
            </div>
            <div class="menu-list">
                <div v-if="isMember">
                    <div class="member-list">
                        <div
                            v-for="(member, index) in listeningRoom.members"
                            :key="index"
                            @click="handleUserProfile(member.userId)"
                            class="member-item">
                            <div class="avatar-container">
                                <AvatarView :imageUrl="member.avatar" />
                            </div>
                            <div class="member-name">{{ member.name }}</div>
                        </div>
                        <UserProfile
                            v-if="showProfile"
                            :userId="selectedUserId"
                            @close="handleUserProfile" />
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
@use '@/assets/main.scss' as *;
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
        margin: 10px 0;
        position: relative;
        .more-choices {
            display: flex;
            justify-content: center;
            position: absolute;
            width: 20px;
            height: 20px;
            right: 0px;
            border: $border2;
            bottom: 0;
        }
    }
    .chat-area {
        height: calc(100% - 2px);
        display: flex;
        border: $border2;
        font-size: small;
        &.hei {
            height: calc(50% - 50px);
        }
    }
    .member-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 50px));
        gap: 2px;
        justify-content: center;
    }

    .member-item {
        display: flex;
        height: 65px;
        width: 50px;
        cursor: pointer;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: $border2;
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
            margin: 0;
            color: #333;
        }
        ul {
            padding-left: 0;
            list-style-type: none;
            margin: 0;
        }
        li {
            margin: 5px 0;
            color: #444;
        }
    }
}
</style>
