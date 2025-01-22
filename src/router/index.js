import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            component: () => import('@/views/login/LoginPage.vue'),
        },
        {
            path: '/',
            component: () => import('@/views/layout/LayoutContainer.vue'), //布局容器
            redirect: '/user/music_list',
            children: [
                {
                    path: '/user/music_list',
                    component: () => import('@/views/userView/MusicListView.vue'),//主界面
                },
                {
                    path: '/user/room_list',
                    component: () => import('@/views/userView/RoomListView.vue'),//音乐列表
                },
                {
                    path: '/user/one',
                    component: () => import('@/views/userView/ProfilePage.vue'),//个人主页
                },
                {
                    path: '/user/music_room',
                    component: () => import('@/views/otherView/ListeningRoom.vue'),//音乐室
                },
                {
                    path: '/user/music',
                    component: () => import('@/views/otherView/MusicPlayer.vue'),//音乐播放器
                },
                {
                    path: '/user/favorite',
                    component: () => import('@/views/otherView/FavoriteView.vue'),//收藏列表
                },
                {
                    path: '/user/friend',
                    component: () => import('@/views/otherView/FriendView.vue'),//好友列表
                },
                {
                    path: '/user/record',
                    component: () => import('@/views/otherView/RecordView.vue'),//听歌记录
                },
                {
                    path: '/user/upload',
                    component: () => import('@/views/otherView/MyUploadView.vue'),//上传歌曲
                },
            ],
        },
        {
            path: '/test',
            component: () => import('@/views/TestView.vue'),
        },

    ],

});

router.beforeEach((to) => {
    const useStore = useUserStore();
    if (!useStore.token && to.path !== '/login') {
        ElMessage.error('未登录或超时');
        return '/login';
    }
});

export default router;
