<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<template>
    <div>
        <el-config-provider :locale="zhCn">
            <router-view> </router-view>
        </el-config-provider>
    </div>
</template>
