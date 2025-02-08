import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// 使用枚举定义播放模式，提高可读性和维护性
const PlayMode = {
    SEQUENTIAL: 0,
    SINGLE_LOOP: 1,
    RANDOM: 2,
};
export const useSongStore = defineStore(
    'song',
    () => {
        const audio = ref(null);
        const isPlaying = ref(false);
        const isSeeking = ref(false);
        const currentTime = ref(0);

        const totalTime = ref(0);
        const playlist = ref([
            {
                musicId: 2,
                coverUrl: '',
                title: '曲名2',
                publisher: '发布者2',
                author: '作者2',
                uploadTime: '2023-10-02',
                audioUrl: 'http://localhost:5173/src/assets/music/小城夏天 - LBI利比.mp3',
                type: 2, // 2: 翻唱
                likeCount: 0,
                collectCount: 0,
                isLike: false,
                isCollect: false,
            },
            {
                musicId: 1,
                coverUrl: '',
                title: '曲名1',
                publisher: '发布者1',
                author: '作者1',
                uploadTime: '2023-10-01',
                audioUrl: 'http://localhost:5173/src/assets/music/小城谣 - Vk.mp3',
                type: 1, // 1: 原创, 2: 翻唱, 3: 转载
                likeCount: 0,
                collectCount: 0,
                isLike: false,
                isCollect: false,
            },
        ]);
        const currentIndex = ref(-1);
        const playMode = ref(PlayMode.SEQUENTIAL);

        const currentSong = computed(() => playlist.value[currentIndex.value] ?? null);

        const initAudio = () => {
            console.log('初始化音频');
            isPlaying.value = false;
            if (audio.value) return;
            audio.value = new Audio();
            setupAudioListeners();
            if (currentSong.value) {
                audio.value.src = currentSong.value.audioUrl;
                audio.value.load();
                audio.value.currentTime = currentTime.value; // 确保恢复播放位置
            }
        };

        const handleTimeUpdate = () => {
            if (!isSeeking.value && audio.value) {
                currentTime.value = audio.value.currentTime;
            }
        };

        const handleLoadedMetadata = () => {
            if (audio.value) {
                totalTime.value = audio.value.duration;
            }
        };

        const handleEnded = () => {
            if (playMode.value === PlayMode.SEQUENTIAL) {
                nextSong();
            } else if (playMode.value === PlayMode.SINGLE_LOOP) {
                audio.value.currentTime = 0;
                play();
            } else if (playMode.value === PlayMode.RANDOM) {
                playRandomSong();
            }
        };

        const playRandomSong = () => {
            currentIndex.value = Math.floor(Math.random() * playlist.value.length);
            play();
        };

        const setupAudioListeners = () => {
            if (audio.value) {
                audio.value.addEventListener('timeupdate', handleTimeUpdate);
                audio.value.addEventListener('loadedmetadata', handleLoadedMetadata);
                audio.value.addEventListener('ended', handleEnded);
            }
        };

        const removeAudioListeners = () => {
            if (audio.value) {
                audio.value.removeEventListener('timeupdate', handleTimeUpdate);
                audio.value.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.value.removeEventListener('ended', handleEnded);
            }
        };

        const clean = () => {
            cleanup();
            playlist.value = [];
            currentIndex.value = -1;
            currentTime.value = 0;
            totalTime.value = 0;
        };

        const cleanup = () => {
            console.log('清理音频事件监听和音频实例');
            if (audio.value) {
                if (audio.value instanceof Audio) {
                    removeAudioListeners();
                    audio.value.pause();
                }
                audio.value = null; // 清空音频实例
            }
            isPlaying.value = false;
        };

        const play = async () => {
            // 检查 audio 是否为有效的 Audio 实例
            if (!(audio.value instanceof Audio)) {
                audio.value = null;
                initAudio();
            }
            if (!audio.value) {
                initAudio();
            }
            if (!currentSong.value) {
                ElMessage.error('未获得歌曲信息');
                return;
            }
            if (audio.value.src) {
                pause();
            }
            console.log(
                `当前播放歌曲索引:${currentIndex.value}，当前播放列表长度:${playlist.value.length}`,
                `当前播放歌曲url:${audio.value.src}，',
                '当前歌曲url:${currentSong.value.audioUrl}`
            );

            try {
                // 编码 currentSong.value.audioUrl 进行比较
                if (audio.value.src !== encodeURI(currentSong.value.audioUrl)) {
                    audio.value.src = currentSong.value?.audioUrl;
                    console.log('播放新歌曲', encodeURI(currentSong.value.audioUrl));
                }
                await audio.value.play();
                isPlaying.value = true;
            } catch (error) {
                console.error('播放失败:', error);
                totalTime.value = 0;
            }
        };

        const pause = () => {
            if (audio.value?.src) {
                audio.value.pause();
                isPlaying.value = false;
            }
        };

        const switchSong = (song) => {
            if (!song) return;
            addSong(song);
            currentIndex.value = playlist.value.findIndex((s) => s.musicId === song.musicId);
            if (currentIndex.value !== -1) {
                play();
            }
        };

        const nextSong = () => {
            currentIndex.value = (currentIndex.value + 1) % playlist.value.length;
            play();
        };

        const prevSong = () => {
            currentIndex.value =
                currentIndex.value > 0 ? currentIndex.value - 1 : playlist.value.length - 1;
            play();
        };

        const validatePlaylist = () => {
            if (playlist.value.length > 0) {
                currentIndex.value =
                    currentIndex.value >= playlist.value.length ? 0 : currentIndex.value;
            } else {
                currentIndex.value = -1;
                cleanup();
                currentTime.value = 0;
                totalTime.value = 0;
            }
        };
        validatePlaylist();

        const seek = (time) => {
            if (audio.value) {
                audio.value.currentTime = time;
                currentTime.value = time;
            }
        };

        const toggleMode = () => {
            playMode.value = (playMode.value + 1) % 3;
        };

        const addSong = (song) => {
            if (!playlist.value.some((item) => item.musicId === song.musicId)) {
                playlist.value.push(song);
                validatePlaylist();
            }
        };

        const clearPlaylist = () => {
            playlist.value = [];
            validatePlaylist();
        };

        const removeSong = (index) => {
            playlist.value.splice(index, 1);
            validatePlaylist();
        };

        const updateSong = (song) => {
            const index = playlist.value.findIndex((s) => s.musicId === song.musicId);
            if (index !== -1) {
                playlist.value[index] = song;
            }
        };

        return {
            audio,
            isPlaying,
            isSeeking,
            currentTime,
            totalTime,
            playlist,
            currentIndex,
            playMode,
            currentSong,
            initAudio,
            clean,
            cleanup,
            play,
            pause,
            switchSong,
            nextSong,
            prevSong,
            seek,
            toggleMode,
            addSong,
            clearPlaylist,
            removeSong,
            updateSong,
        };
    },
    {
        persist: {
            key: 'music-player-storage',
            paths: [
                // 移除 'audio' 和 'currentSong'（currentSong 是计算属性，不需要持久化）
                'playlist',
                'currentIndex',
                'playMode',
                'currentTime',
                'totalTime',
            ],
            afterRestore: (ctx) => {
                ctx.store.validatePlaylist?.();
                ctx.store.initAudio?.(); // 恢复后重新初始化 audio 实例
            },
        },
    }
);
