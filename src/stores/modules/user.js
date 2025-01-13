//******************* 储存用户信息 *******************\\

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUserService } from '@/api/user'


export const useUserStore = defineStore(
  'user',
  () =>
  {
    const token = ref(''); // 使用导入的 ref
    const setToken = (newToken) =>
    {
      token.value = newToken;
    };
    const removeToken = () =>
    {
      token.value = '';
    };

    const user = ref({
      userId: '',
      username: '',
      phone: '',
      image: '',
      status: '',
      createTime: '',
      updateTime: '',
      type: '',

    });
    const getUser = async() =>
    {
      const res = await getUserService();
      if (res.status === 200) {
        user.value = res.data.data;
      }
    };
    const setUser = (newUser) =>
    {
      user.value = newUser;
    };

    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser,
    };

  },
  { persist: true }
);