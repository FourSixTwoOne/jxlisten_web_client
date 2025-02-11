//******************* 储存用户信息 *******************\\
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getRoomService } from '@/api/listenRoom';

export const useRoomStore = defineStore(
    'room',
    () => {
        const room = ref({
            roomId: '',
            roomName: '',
            createdName: '',
            type: '',
            coverUrl: '',
            createTime: '',
            updateTime: '',
            bio: '',
        });
        const getRoom = async () => {
            const res = await getRoomService();
            if (res.data.code === 1) {
                room.value = res.data.data;
            }

            console.log('room:', room.value);
        };
        const setRoom = (newRoom) => {
            room.value = newRoom;
        };
        return { room, getRoom, setRoom };
    },
    { persist: true }
);
