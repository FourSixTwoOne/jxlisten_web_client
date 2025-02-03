<script setup>
import { computed } from 'vue';
import Music from '@/views/otherView/MusicPlayer.vue';
import Favorite from '@/views/otherView/FavoriteView.vue';
import Record from '@/views/otherView/RecordView.vue';
import Upload from '@/views/otherView/MyUploadView.vue';
import Room from '@/views/otherView/ListeningRoom.vue';
import friend from '@/views/otherView/FriendView.vue';

const props = defineProps({
    viewName: {
        type: String,
        default: 'music',
    },
    // 新增动态参数
    params: {
        type: Object,
        default: () => ({}),
    },
});

const currentComponent = computed(() => {
    switch (props.viewName) {
        case 'music':
            return Music;
        case 'favorites':
            return Favorite;
        case 'record':
            return Record;
        case 'upload':
            return Upload;
        case 'room':
            return Room;
        case 'friend':
            return friend;
        default:
            return Music;
    }
});
</script>

<template>
    <div class="three-container">
        <!-- 传递动态参数到组件 -->
        <component :is="currentComponent" v-bind="params"></component>
    </div>
</template>
