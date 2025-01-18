<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores'; // 修正导入路径

const userStore = useUserStore();
const user = computed(() => userStore.user);

const test = () => {
    console.log('test')
    console.log('user:::', user.value);
    console.log('userStore:::', userStore.user);
    const user1 = userStore.user; // 直接访问 user，不需要 .value
    console.log('user:::', user1);

}
</script>

<template>
    <div class="test-view">
        <el-button @click="test">test</el-button>
    </div>
</template>