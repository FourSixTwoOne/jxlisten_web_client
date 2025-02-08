<script setup>
const props = defineProps({
    mode: {
        type: Number,
        default: 0,
    },
});
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 48 48"
        v-if="props.mode === 0">
        <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="4">
            <path d="M4 25c0-6.65 5.396-12 12-12h28" />
            <path d="m38 7l6 6l-6 6m6 4c0 6.65-5.396 12-12 12H4" />
            <path d="m10 41l-6-6l6-6" />
        </g>
    </svg>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 48 48"
        v-if="props.mode === 1">
        <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="4">
            <path
                d="M43.823 25.23a14 14 0 0 1-2.837 6.448A13.98 13.98 0 0 1 30 37H16C9.397 37 4 31.679 4 25c0-6.65 5.396-12 12-12h28" />
            <path d="m38 7l6 6l-6 6m-14 0v12m0-12l-3 3l-1.5 1.5" />
        </g>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" v-if="props.mode === 2">
        <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 17h2.735a4 4 0 0 0 3.43-1.942l3.67-6.116A4 4 0 0 1 16.265 7H21m0 0l-2-2m2 2l-2 2M3 7h2.735a4 4 0 0 1 2.871 1.215M21 17h-4.735a4 4 0 0 1-2.871-1.215M21 17l-2 2m2-2l-2-2" />
    </svg>
</template>
