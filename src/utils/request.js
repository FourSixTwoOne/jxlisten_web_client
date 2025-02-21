//******************* axios *******************\\
import axios from 'axios';
import { useUserStore } from '@/stores';
import router from '@/router';
const baseURL = '/api';

// 基础地址，超时时间
const instance = axios.create({
    baseURL,
    timeout: 50000,
});

// 请求拦截器
instance.interceptors.request.use(
    (config) =>
    {
        const userStore = useUserStore();
        if (userStore.token)
        {
            config.headers.token = userStore.token;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

// 响应拦截器
instance.interceptors.response.use(
    (res) =>
    {
        if (res.data.code === 1)
        {
            return res;
        }

        ElMessage.error(res.data.msg||'服务异常');
        return Promise.reject(res.data);
    },
    (err) =>
    {
        if (err.response.status === 401)
        {
            ElMessage.error('登录失效，请重新登录');
            router.push('/login');
            return;
        }


        ElMessage.error(err.response.data.msg||'服务异常');

        return Promise.reject(err);
    }
);

export default instance;
