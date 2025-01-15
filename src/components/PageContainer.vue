<script setup>
defineProps({
    title: {
        required: true,
        type: String,
    },
});
</script>

<template>
    <div class="page-container">
        <el-header class="header">
            <span>{{ title }}</span>
            <div class="extra">
                <slot name="extra"></slot>
            </div>
        </el-header>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        height: 10%;
        width: 100%;
        flex-direction: row;
        align-items: center;
        span {
            min-width: 30px;
            font-size: 15px;
            color:#909399;
        }
        .extra {
            width: 100%;
            display: flex;
        }
    }
    .slot{
        background-color: #131b2b;
    }
}
</style>
