<script setup>
const porp = defineProps({
    userId: {
        type: Number,
       
    },
});
</script>

<template>
    <div class="friend-view">好友id: {{ porp.userId }}</div>
</template>
