<script setup>
import { computed } from 'vue';
import defaultAvatar from '@/assets/微信图片_20250119153431.jpg';

const props = defineProps({
    imageUrl: String,
});

const avatarUrl = computed(() => props.imageUrl || defaultAvatar);
</script>

<template>
    <el-avatar class="user-avatar" :src="avatarUrl" />
</template>

<style lang="scss" scoped>
.el-avatar {
    height: 100%;
    width: 100%;
    margin-right: 10px;
    object-fit: contain;
}
</style>
