<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useUserStore, useSongStore } from '@/stores';
import ProfilePage from '@/views/userView/ProfilePage.vue';
import logo from '@/assets/logo-192x192.png';
import nameLogo from '@/assets/juexianlisten.png';
import { Headset, HomeFilled } from '@element-plus/icons-vue';
import ThreeContainer from '@/views/component/ThreeContainer.vue';
import router from '@/router';
import CoverView from '@/components/AvatarView.vue';
const songStore = useSongStore();
const userStore = useUserStore();
const isProfileVisible = ref(false);
const isThreeVisible = ref(false);
const viewName = ref('music'); // music:'音乐', room:'音乐室', friend:'好友列表'，collect:'我的收藏', record:'浏览记录', upload:'我的上传'
const viewId = ref(0);

// 计算属性获取用户信息
const user = computed(() => userStore.user);

// 切换个人界面的可见性
const toggleProfile = () => {
    isProfileVisible.value = !isProfileVisible.value;
};

// 视图切换优化
const changeContent = (view) => {
    const isSameView = viewName.value === view;
    viewName.value = view;
    isThreeVisible.value = !isSameView || !isThreeVisible.value;
};

// 登出函数
const logout = () => {
    userStore.removeToken();
    userStore.setUser(null);
    songStore.clean();
    router.push('/login');
};

// 关闭个人主页
const closeProfile = () => {
    isProfileVisible.value = false;
};

const closeThreeContainer = () => {
    isThreeVisible.value = false;
};

// 切换视图方法
const changeView = (params) => {
    if(params[0] === 'friend') viewId.value = params[1];
    viewName.value = params[0];
    isThreeVisible.value = true;
    console.log('切换视图成功！', params[0], viewId.value);
};



onMounted(() => {
    songStore.initAudio();
});

onUnmounted(() => {
    songStore.clean();
});
</script>

<template>
    <el-watermark :content="['陆2壹', '绝弦juexianlisten']">
        <div class="layout-container">
            <el-header class="header">
                <div class="logo-section">
                    <img :src="logo" alt="Logo" class="logo" />
                    <div class="vertical-line"></div>
                    <div class="container">
                        <img :src="nameLogo" alt="Name" class="name-logo" />
                    </div>
                </div>
                <div class="controls-butoons">
                    <div class="player-controls">
                        <el-button
                            type="primary"
                            size="small"
                            class="play-btn"
                            @click="changeContent('music')"
                            >播放器</el-button
                        >
                    </div>
                    <div class="listenRoom-controls">
                        <el-button
                            type="primary"
                            size="small"
                            class="play-btn"
                            @click="changeContent('room')"
                            >音乐室</el-button
                        >
                    </div>
                </div>
                <div class="user-section">
                    <div class="user-info">
                        <span v-if="!user">加载中...</span>
                        <span v-else
                            ><strong>{{ user?.username || '未知用户' }}</strong></span
                        >
                        <div class="avatar-container">
                            <CoverView :imageUrl="user?.avatar" @click="toggleProfile" />
                        </div>
                    </div>

                    <el-button type="danger" size="small" class="logout-btn" @click="logout"
                        >登出</el-button
                    >
                </div>
            </el-header>

            <el-main class="main">
                <div class="one-column">
                    <el-menu
                        active-text-color="#ffd04b"
                        background-color="#087099"
                        :default-active="$route.path"
                        text-color="#fff"
                        router
                        class="custom-menu">
                        <el-menu-item index="/user/music_list">
                            <el-icon class="icon">
                                <Headset />
                            </el-icon>
                            <div class="menu-text">
                                <span class="single-letter">音</span>
                                <span class="single-letter">乐</span>
                                <span class="single-letter">列</span>
                                <span class="single-letter">表</span>
                            </div>
                        </el-menu-item>
                    </el-menu>
                    <div class="divider"></div>
                    <el-menu
                        active-text-color="#ffd04b"
                        background-color="#087099"
                        :default-active="$route.path"
                        text-color="#fff"
                        router
                        class="custom-menu">
                        <el-menu-item index="/user/room_list">
                            <el-icon class="icon">
                                <HomeFilled />
                            </el-icon>
                            <div class="menu-text">
                                <span class="single-letter">音</span>
                                <span class="single-letter">乐</span>
                                <span class="single-letter">室</span>
                                <span class="single-letter">列</span>
                                <span class="single-letter">表</span>
                            </div>
                        </el-menu-item>
                    </el-menu>
                </div>
                <div
                    class="two-column"
                    :class="{ shrink: isThreeVisible, visible: isProfileVisible }">
                    <router-view />
                </div>
                <div class="three-container" v-if="isThreeVisible">
                    <button class="close-button" @click="closeThreeContainer">×</button>
                    <ThreeContainer :params="{ userId: viewId }" :viewName="viewName" :key="`${viewName}-${viewId}`"/>
                </div>
                <div class="profile" v-if="isProfileVisible">
                    <ProfilePage
                        @close="closeProfile"
                        @action-selected="changeView" />
                </div>
            </el-main>

            <el-footer class="footer">
                <p>绝弦 ©2025 Created by 陆2壹.</p>
            </el-footer>
        </div>
    </el-watermark>
</template>

<style lang="scss" scoped>
@use '@/assets/main.scss' as *;
.layout-container {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-image: url('@/assets/BG.jpg');
    background-size: cover;
    background-position: center;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 35px;

        .controls-butoons {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .logo-section {
            display: flex;
            align-items: center;

            .logo {
                width: 30px;
                margin-right: 10px;
            }

            .vertical-line {
                width: 5px;
                height: 35px;
                background-color: rgb(98, 148, 186);
                margin-right: 10px;
            }

            .container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 50%;
            }

            .name-logo {
                width: 100%;
            }
        }

        .user-section {
            display: flex;
            align-items: center;

            .user-info {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 10px;
                margin-right: 10px;
                font-size: 12px;
                color: rgb(47, 222, 137);
            }
            .avatar-container {
                cursor: pointer;
                height: 30px;
                width: 30px;
            }
            .logout-btn {
                background-color: #f56c6c;
                color: white;
            }
        }
    }

    .main {
        height: 100%;
        display: flex;
        flex: 1;
        border: $border;
        padding: 0;
        overflow: hidden;
        flex-direction: row;

        .one-column {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 3px;
            margin-right: 3px;
            width: 30px;

            .el-menu-item {
                display: flex;
                height: 10%;
                width: 100%;
                flex-direction: column;
                padding: 2px;
            }

            .divider {
                width: 100%;
                height: 3px;
                background-color: #275561;
                margin: 10px 0;
            }

            .icon {
                margin-left: 5px;
            }

            .menu-text {
                display: flex;
                flex-direction: column;
                text-align: center;
                justify-content: center;
            }

            .single-letter {
                display: block;
                line-height: 2;
            }
        }

        .two-column {
            width: 100%;
            border-left: $border;
            border-right: $border;
            overflow-y: auto; // 添加滚动条

            &.shrink {
                flex: calc(100% - 400px);
                &.visible {
                    flex: calc(100% - 700px);
                }
            }
        }
        .three-container {
            display: flex;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 400px;
            position: relative;
            .close-button {
                position: absolute;
                background: none;
                border: 1px solid rgb(129, 129, 129);
                font-size: 20px;
                color: rgb(129, 129, 129);
                z-index: 1;
            }
        }
        .profile {
            width: 300px;
            height: 100%;
            background-color: rgb(4, 36, 60);
            overflow-y: auto; // 添加滚动条
        }
    }
    .footer {
        height: 25px;
        padding-bottom: 1px;
        margin-bottom: 20px;
        text-align: center;
        font-size: 12px;
        color: #7d5224;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
