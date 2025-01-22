//******************* 储存用户信息 *******************\\
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getMusicService } from '@/api/music';
export const useSongStore = defineStore(
    'song',
    () => {
        const song = ref({
            songId: '',
            title: '',
            author: '',
            publisher: '',
            type: '',
            audioUrl: '',
            coverUrl: '',
            createTime: '',
            updateTime: '',
            status: 0,
            likeCount: 0,
            collectCount: 0,
            isLiked: false,
            isCollected: false,
        });
        const getSong = async () => {
            const res = await getMusicService();
            if (res.status === 200) {
                song.value = res.data.data;
            }

            console.log('song:', song.value);
        };
        const setSong = (newSong) => {
            song.value = newSong;
        };
        return { song, getSong, setSong };
    },
    { persist: true }
);
