<template>
    <div class="history-container">
        <h2>历史听歌记录</h2>

        <input type="text" placeholder="搜索歌曲..." v-model="searchQuery" />

        <el-table :data="filteredHistoryList" stripe style="width: 100%">
            <!-- 列定义保持不变 -->
        </el-table>

        <button @click="clearAllHistory" style="margin-top: 20px; width: 100%">
            清空所有历史记录
        </button>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';

const historyList = ref([
    { id: 1, songName: '歌曲1', singer: '歌手1', time: '2023-09-01 10:00' },
    { id: 2, songName: '歌曲2', singer: '歌手2', time: '2023-09-01 09:30' },
]);

const searchQuery = ref('');

// 使用 computed 自动计算过滤后的列表
const filteredHistoryList = computed(() => {
    return historyList.value.filter(
        (item) =>
            item.songName.includes(searchQuery.value) || item.singer.includes(searchQuery.value)
    );
});

const deleteHistory = (id) => {
    ElMessageBox.confirm('确定要删除该歌曲吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            historyList.value = historyList.value.filter((item) => item.id !== id);
        })
        .catch(() => {
            // 取消操作无需处理
        });
};

const clearAllHistory = () => {
    historyList.value = [];
};
</script>
<style scoped>
.history-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.delete-btn {
    background-color: #ff4444;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

.delete-btn:hover {
    background-color: #cc0000;
}
</style>
