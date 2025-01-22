<script setup>
import { ref, defineProps, computed } from 'vue';
import { Plus } from '@element-plus/icons-vue'; // 引入图标

const props = defineProps({
    placeholder: {
        type: String,
        default: '请上传文件',
    },

    type: {
        type: String,
        required: true, // 接受 "image" 或 "audio"
    },
});

// 反应式变量
const fileUrl = ref('');
const file = ref(null);
const fileName = ref('');
const isImage = computed(() => props.type === 'image');
const emit = defineEmits(['file-selected']);
// 处理文件变更
const handleChange = (uploadFile) => {
    if (uploadFile && uploadFile.raw) {
        fileUrl.value = URL.createObjectURL(uploadFile.raw); // 创建文件的 URL
        fileName.value = uploadFile.name; // 获取文件名
        file.value = uploadFile.raw;
        emit('file-selected', uploadFile.raw); // 触发 file-selected 事件，传递文件对象
    }
};

// 检查上传条件
const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 30; // 文件大小限制为30MB
    let isValid = true;

    if (props.type === 'image') {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            isValid = false;
            ElMessage.error('已选择文件不是图片！');
        }
    } else if (props.type === 'audio') {
        const isAudio = file.type.startsWith('audio/');
        if (!isAudio) {
            isValid = false;
            ElMessage.error('已选择文件不是音频！');
        }
    }

    if (!isLt2M) {
        isValid = false;
        ElMessage.error('文件大小不能超过 2MB!');
    }

    return isValid; // 检查通过则返回true
};

// 移除音频文件
const removeAudio = () => {
    fileUrl.value = '';
    fileName.value = '';
    file.value = null;
};
</script>

<template>
    <el-upload
        class="avatar-uploader"
        :before-upload="beforeUpload"
        :on-change="handleChange"
        :show-file-list="false"
        :auto-upload="false">
        <img v-if="fileUrl && isImage" :src="fileUrl" class="avatar" />
        <el-icon v-else-if="fileUrl && !isImage" class="audio-icon">
            <!-- 显示音乐名称和取消按钮 -->
            <div v-if="fileName && !isImage" class="audio-info">
                <span class="file-name">{{ fileName }}</span>
                <el-button size="small" type="danger" @click="removeAudio">×</el-button>
            </div>
        </el-icon>
        <div v-else class="el-upload__text">
            <el-icon class="avatar-uploader-icon"><Plus /> </el-icon>
            {{ placeholder }}
        </div>
    </el-upload>
</template>

<style scoped>
.avatar-uploader {
    border: 1px dashed #7d7070;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   

    
}

.avatar {
    width: 70px;
    height: 70px;
    object-fit: cover;
}

.avatar-uploader-icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8c939d;
}

.audio-icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;

    color: #8c939d;

}

.audio-info span {
    margin-right: 10px;
    color: #333; /* 音频名称颜色 */
}
</style>
