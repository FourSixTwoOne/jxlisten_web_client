<script setup>
import { defineProps, computed } from 'vue';
import Music from '@/views/otherView/MusicPlayer.vue';
import Favorite from '@/views/otherView/FavoriteView.vue';
import Friend from '@/views/otherView/FriendView.vue';
import Record from '@/views/otherView/RecordView.vue';
import Upload from '@/views/otherView/MyUploadView.vue';
import Room from '@/views/otherView/ListeningRoom.vue';

const props = defineProps({
    viewName: {
        type: String,
        default: 'music',
    },
});

const currentComponent = computed(() => {
    switch (props.viewName) {
        case 'music':
            return Music;
        case 'favorite':
            return Favorite;
        case 'friend':
            return Friend;
        case 'record':
            return Record;
        case 'upload':
            return Upload;
            case 'room':
                return Room;
        default:
            return Music; // 默认视图
    }
});
</script>

<template>
    <div class="three-container">
        <component :is="currentComponent"></component>
    </div>
</template>
