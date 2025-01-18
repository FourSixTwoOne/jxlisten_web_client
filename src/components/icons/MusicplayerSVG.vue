<script setup>
const props = defineProps({
    isPlaying: {
        type: Boolean,
        required: true,
    },
});
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" v-if="!props.isPlaying">
        <path
            fill="currentColor"
            fill-opacity="0"
            stroke="currentColor"
            stroke-dasharray="40"
            stroke-dashoffset="40"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 6l10 6l-10 6Z">
            <animate
                fill="freeze"
                attributeName="fill-opacity"
                begin="0.5s"
                dur="0.5s"
                values="0;1" />
            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="40;0" />
        </path>
    </svg>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        v-if="props.isPlaying">
        <path
            fill="currentColor"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 15L8 18L8 6L13 9L13 9M13 9L18 12L18 12L13 15L13 15">
            <animate
                fill="freeze"
                attributeName="d"
                dur="0.6s"
                keyTimes="0;0.33;1"
                values="M13 15L8 18L8 6L13 9L13 9M13 9L18 12L18 12L13 15L13 15;M13 15L8 18L8 6L13 9L13 15M13 9L18 12L18 12L13 15L13 9;M9 18L7 18L7 6L9 6L9 18M15 6L17 6L17 18L15 18L15 6" />
        </path>
    </svg>
</template>

<style scoped>
/* 可以在这里添加样式 */
</style>
