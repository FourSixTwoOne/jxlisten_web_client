<script setup>
import { ref } from 'vue';
// import { updateUserService } from '@/api/user'; // 假设这是更新用户信息的接口
const form = ref();
const imageUrl = ref('');
const imageFile = ref('');

const user = ref({
    image: '@/assets/avatar.png', // 替换为实际头像路径
    username: '小明',
    gender: '男',
    age: 25,
    bio: '喜欢听音乐，热爱生活。',
    favoriteSongs: [
        { id: 1, title: '歌曲1', artist: '歌手1' },
        { id: 2, title: '歌曲2', artist: '歌手2' },
    ],
    friends: [
        { id: 1, username: '好友1', image: '@/assets/friend1.png' },
        { id: 2, username: '好友2', image: '@/assets/friend2.png' },
    ],
    listenHistory: [
        { id: 1, songTitle: '历史歌曲1', date: '2025-01-01' },
        { id: 2, songTitle: '历史歌曲2', date: '2025-01-02' },
    ],
});

const formModel = ref({ ...user.value });
const rules = {
    username: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
    gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
    age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
    bio: [{ required: true, message: '请输入个人简介', trigger: 'blur' }],
};

const changeImage = (uploadFile) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw);
    imageFile.value = uploadFile.raw;
};

const updateUser = async () => {
    await form.value.validate();
    // const res = await updateUserService(formModel.value);
    // if (res.data.code === 1) {
    Object.assign(user.value, formModel.value); // 更新用户信息
    ElMessage.success('信息更新成功');
    // } else {
    //     ElMessage.error(res.data.msg);
    // }
};

const beforeAvatarUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isGIF = file.type === 'image/gif';
    const isImage = isJPG || isPNG || isGIF;
    if (!isImage) {
        ElMessage.error('上传头像只能是 JPG、PNG 或 GIF 格式!');
    }
    return isImage;
};

const selectFriend = (friend) => {  
    // 处理好友选择逻辑  
    console.log('Selected friend:', friend);  
};  

const selectSong = (song) => {  
    // 处理歌曲选择逻辑  
    console.log('Selected song:', song);  
};  

const selectRecord = (record) => {  
    // 处理听歌记录选择逻辑  
    console.log('Selected record:', record);  
};  

const handleTabClick = (tab) => {
    console.log(`Clicked on tab: ${tab.label}`);
};
</script>
<template>  
    <div class="profile-container">  
        <el-card class="profile-header">  
            <div class="header-content">  
                <el-form-item label="头像" prop="image">  
                    <el-upload  
                        auto-upload="false"  
                        class="avatar-uploader"  
                        show-file-list="false"  
                        :before-upload="beforeAvatarUpload"  
                        :on-change="changeImage">  
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />  
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>  
                    </el-upload>  
                </el-form-item>  
                <div class="user-info">  
                    <el-form :model="formModel" :rules="rules" ref="form" label-position="top">  
                        <el-form-item label="昵称" prop="username">  
                            <el-input  
                                v-model="formModel.username"  
                                placeholder="请输入昵称"></el-input>  
                        </el-form-item>  
                        <el-form-item label="性别" prop="gender">  
                            <el-select v-model="formModel.gender" placeholder="请选择性别">  
                                <el-option label="男" value="男"></el-option>  
                                <el-option label="女" value="女"></el-option>  
                                <el-option label="其他" value="其他"></el-option>  
                            </el-select>  
                        </el-form-item>  
                        <el-form-item label="年龄" prop="age">  
                            <el-input-number  
                                v-model="formModel.age"  
                                :min="1"  
                                :max="150"  
                                placeholder="请输入年龄"></el-input-number>  
                        </el-form-item>  
                    </el-form>  
                </div>  
            </div>  
        </el-card>  

        <el-form-item label="个性签名" prop="bio" class="bio-item">  
            <el-input  
                type="textarea"  
                v-model="formModel.bio"  
                placeholder="请输入个人简介"></el-input>  
        </el-form-item>  

        <el-tabs model-value="activeTab" @tab-click="handleTabClick">  
            <el-tab-pane label="好友列表" name="friends">  
                <ul class="friend-list">  
                    <li v-for="friend in user.friends" :key="friend.id" class="friend-item" @click="selectFriend(friend)">  
                        <img :src="friend.image" alt="好友头像" class="friend-avatar" />  
                        <span>{{ friend.username }}</span>  
                    </li>  
                </ul>  
            </el-tab-pane>  
            <el-tab-pane label="收藏歌曲" name="favorites">  
                <ul class="song-list">  
                    <li v-for="song in user.favoriteSongs" :key="song.id" class="song-item" @click="selectSong(song)">  
                        <el-tooltip :content="song.artist" placement="top">  
                            <span>{{ song.title }}</span>  
                        </el-tooltip>  
                    </li>  
                </ul>  
            </el-tab-pane>  
            <el-tab-pane label="听歌记录" name="history">  
                <ul class="history-list">  
                    <li v-for="record in user.listenHistory" :key="record.id" class="history-item" @click="selectRecord(record)">  
                        <span>{{ record.songTitle }}</span> - <span>{{ record.date }}</span>  
                    </li>  
                </ul>  
            </el-tab-pane>  
        </el-tabs>  
    </div>  
</template>  

<style lang="scss" scoped>  
.profile-container {  
    max-width: 800px;  
    margin: 0 auto;  
    padding: 20px;  

    .profile-header {  
        margin-bottom: 20px;  

        .header-content {  
            display: flex;  
            align-items: center;  

            .avatar-uploader {  
                margin-right: 20px;  
                cursor: pointer;  

                .el-upload {  
                    border: 2px dashed #d9d9d9;  
                    border-radius: 50%;  
                    width: 100px;  
                    height: 100px;  
                    display: flex;  
                    justify-content: center;  
                    align-items: center;  
                    background-color: #f9f9f9;  
                    transition: border-color 0.3s;  

                    &:hover {  
                        border-color: #409eff;  
                    }  

                    img {  
                        border-radius: 50%;  
                        width: 100%;  
                        height: 100%;  
                        object-fit: cover;  
                    }  
                }  
            }  

            .user-info {  
                flex-grow: 1;  
                .el-form {  
                    margin-bottom: 0;  
                }  
            }  
        }  
    }  

    .bio-item {  
        margin-bottom: 20px;  
    }  

    .friend-list,  
    .song-list,  
    .history-list {  
        list-style-type: none;  
        padding: 0;  
        margin: 0;  

        .friend-item,  
        .song-item,  
        .history-item {  
            padding: 10px;  
            border: 1px solid #ddd;  
            border-radius: 5px;  
            margin-bottom: 5px;  
            background-color: #fff;  
            transition: background-color 0.3s;  

            &:hover {  
                background-color: #f0f0f0;  
            }  
        }  

        .friend-item {  
            display: flex;  
            align-items: center;  

            .friend-avatar {  
                width: 40px;  
                height: 40px;  
                border-radius: 50%;  
                margin-right: 10px;  
                object-fit: cover;  
            }  
        }  
    }  
}  
</style>