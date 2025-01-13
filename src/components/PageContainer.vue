<script setup>
defineProps({
    title: 
    {
        required: true,
        type: String,
    },
})

</script>



<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>{{title}}</span>
                <div class="extra">
                    <slot name="extra"></slot>
                </div>
            </div>
        </template>
        <slot></slot>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    /* 设置容器的最小高度为100%，确保内容至少占满整个视口高度 */
    min-height: 100%;
    /* 设置盒模型为 border-box，使得内边距和边框包含在元素的总宽度和高度内 */
    box-sizing: border-box;

    .header {
        /* 使用 Flexbox 布局 */
        display: flex;
        /* 将子元素在主轴上两端对齐 */
        justify-content: space-between;
        /* 将子元素在交叉轴上居中对齐 */
        align-items: center;
    }
}
</style>