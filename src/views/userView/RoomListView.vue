<template>  
    <div class="main-page">  
      <h1 class="title">欢迎来到音乐室</h1>  
      
      <div class="sections">  
        <div class="music-list">  
          <h2>已上传的音乐列表</h2>  
          <el-table :data="musicTracks" style="width: 100%">  
            <el-table-column prop="title" label="歌曲名" />  
            <el-table-column prop="artist" label="艺术家" />  
            <el-table-column prop="duration" label="时长" />  
            <el-table-column label="操作">  
              <template #default="scope">  
                <el-button @click="playMusic(scope.row)" size="small" type="primary">播放</el-button>  
              </template>  
            </el-table-column>  
          </el-table>  
        </div>  
        
        <div class="music-room-list">  
          <h2>当前开启的音乐室</h2>  
          <el-list>  
            <el-list-item v-for="room in musicRooms" :key="room.id">  
              <el-card>  
                <h3>{{ room.name }}</h3>  
                <p>房主: {{ room.host }}</p>  
                <el-button @click="joinRoom(room.id)" type="success">加入房间</el-button>  
              </el-card>  
            </el-list-item>  
          </el-list>  
        </div>  
      </div>  
    </div>  
  </template>  
  
  <script setup>  
  import { ref } from 'vue';  
  
  const musicTracks = ref([  
    { title: "歌曲1", artist: "艺术家1", duration: "3:45" },  
    { title: "歌曲2", artist: "艺术家2", duration: "4:12" },  
    { title: "歌曲3", artist: "艺术家3", duration: "2:58" },  
  ]);  
  
  const musicRooms = ref([  
    { id: 1, name: "房间A", host: "用户A" },  
    { id: 2, name: "房间B", host: "用户B" },  
    { id: 3, name: "房间C", host: "用户C" },  
  ]);  
  
  const playMusic = (track) => {  
    console.log(`播放: ${track.title} - ${track.artist}`);  
    // 这里可以调用播放器逻辑  
  };  
  
  const joinRoom = (roomId) => {  
    console.log(`加入房间: ${roomId}`);  
    // 这里可以添加加入房间逻辑  
  };  
  </script>  
  
  <style scoped lang="scss">  
  .main-page {  
    padding: 20px;  
  
    .title {  
      text-align: center;  
      margin-bottom: 30px;  
      font-size: 28px;  
      color: #409eff;  
    }  
  
    .sections {  
      display: flex;  
      justify-content: space-between;  
  
      .music-list {  
        flex: 1;  
        margin-right: 20px;  
        background-color: #f9f9f9;  
        border: 1px solid #ddd;  
        border-radius: 8px;  
        padding: 15px;  
  
        h2 {  
          margin-bottom: 15px;  
        }  
      }  
  
      .music-room-list {  
        flex: 1;  
        background-color: #f9f9f9;  
        border: 1px solid #ddd;  
        border-radius: 8px;  
        padding: 15px;  
  
        h2 {  
          margin-bottom: 15px;  
        }  
  
        .el-card {  
          margin-bottom: 15px;  
        }  
      }  
    }  
  }  
  </style>