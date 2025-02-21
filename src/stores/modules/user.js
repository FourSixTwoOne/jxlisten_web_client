//******************* 储存用户信息 *******************\\

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUserService } from '@/api/user';

export const useUserStore = defineStore(
    'user',
    () => {
        const token = ref(''); 
        const setToken = (newToken) => {
            token.value = newToken;
        };
        const removeToken = () => {
            token.value = '';
        };
        const friendIds = ref([]);
        const isThreeVisible = ref(false);
        const viewParams = ref({
            name: '',
            param: null,
        });
        const user = ref({
            userId: '',
            username: '',
            image: '',
            createTime: '',
            updateTime: '',
            type: 0,
            gender: 0,
            age: 0,
            bio: '',
        });
        const getUser = async () => {
            const res = await getUserService();
            if (res.data.code === 1) {
                user.value = res.data.data;
            }
        };
        const setUser = (newUser) => {
            user.value = newUser;
        };

        return {
            token,
            setToken,
            removeToken,
            friendIds,
            isThreeVisible,
            viewParams,
            user,
            getUser,
            setUser,
        };
    },
    { persist: true }
);
