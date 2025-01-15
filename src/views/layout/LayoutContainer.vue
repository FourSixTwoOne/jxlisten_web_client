<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores';
import ProfilePage from '@/views/userView/ProfilePage.vue'; // 个人主页组件
import logo from '@/assets/logo-192x192.png'; // 应用 logo
import nameLogo from '@/assets/juexianlisten.png'; // 应用名称 logo
import defaultAvatar from '@/assets/default.png';
import { Headset, HomeFilled } from '@element-plus/icons-vue';
import DownContainer from '@/views/component/DownContainer.vue';

const userStore = useUserStore();
const user = ref(userStore.user);
const isProfileVisible = ref(false);

// 播放音乐的函数
const playMusic = (track) => {
    console.log(`播放音乐: ${track.title}`);
};

// 加入音乐室的函数
const joinRoom = (room) => {
    console.log(`加入音乐室: ${room.name}`);
};

// 切换个人界面的可见性
const toggleProfile = () => {
    isProfileVisible.value = !isProfileVisible.value;
};

// 登出函数
const logout = () => {
    userStore.logout(); // 处理登出逻辑
};

// 关闭个人主页
const closeProfile = () => {
    isProfileVisible.value = false;
};
</script>
<template>
    <el-watermark :font="font" :content="['陆2壹', '绝弦juexianlisten']">
        <div class="layout-container">
            <el-header class="header">
                <div class="logo-section">
                    <img :src="logo" alt="Logo" class="logo" />
                    <div class="vertical-line"></div>
                    <div class="container">
                        <img :src="nameLogo" alt="Name" class="name-logo" />
                    </div>
                </div>
                <div class="user-section">
                    <div class="user-info">
                        <span v-if="!user">加载中...</span>
                        <span v-else
                            ><strong>{{ user?.name || '未知用户' }}</strong></span
                        >
                    </div>
                    <el-avatar
                        class="user-avatar"
                        @click="toggleProfile"
                        :src="user?.image || defaultAvatar" />
                    <el-button type="danger" size="small" class="logout-btn" @click="logout"
                        >登出</el-button
                    >
                </div>
            </el-header>

            <el-main class="main">
                <div class="oneContent">
                    <div class="twoContent">
                        <div class="left-column">
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
                        <div class="right-column" :class="{ shrink: isProfileVisible }">
                                <router-view />
                        </div>
                        <div
                            class="profile"
                            v-if="isProfileVisible"
                            :class="{ visible: isProfileVisible }">
                            <ProfilePage @close="closeProfile" />
                        </div>
                    </div>
                    <div class="threeContent">
                        <DownContainer />
                    </div>
                </div>
            </el-main>

            <el-footer class="footer">
                <p>绝弦 ©2025 Created by 陆2壹.</p>
            </el-footer>
        </div>
    </el-watermark>
</template>
<style lang="scss" scoped>
.layout-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-image: url('@/assets/BG.jpg');
    background-size: cover;
    background-position: center;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(74, 58, 111, 0.724);
        height: 35px;

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
                margin-right: 10px;
                font-size: 12px;
                color: rgb(47, 222, 137);
            }

            .el-avatar {
                height: 30px;
                width: 30px;
                margin-right: 10px;
            }

            .user-avatar {
                cursor: pointer;
                margin-right: 10px;
                padding: 5px;
            }

            .logout-btn {
                background-color: #f56c6c;
                color: white;
            }
        }
    }

    .main {
        padding: 2px;
    }

    .oneContent {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;

        .twoContent {
            display: flex;
            flex: 1;
            width: 100%;
            height: 50%;

            .left-column {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-right: 5px;
                width: 4%;

                .el-scrollbar {
                    width: 40px;
                }
                .el-menu-item {
                    display: flex;
                    height: 10%;
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
                }

                .single-letter {
                    display: block;
                    line-height: 2;
                }
            }

            .right-column {
                flex: 1;
                border-left: 2px solid #403593;
                overflow-y: auto;
                &.shrink {
                    flex: 0 0 calc(95% - 260px);
                }
            }

            .profile {
                width: 260px;
                background-color: rgb(4, 36, 60);
                overflow-y: auto;
            }
        }

        .threeContent {
            display: flex;
            flex: 1;
            width: 100%;
            height: 50%;
            border-top: 4px solid #403593;
            border-bottom: 4px solid #403593;
        }
    }

    .footer {
        height: 25px;
        padding: 1px;
        text-align: center;
        font-size: 12px;
        color: #7d5224;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
