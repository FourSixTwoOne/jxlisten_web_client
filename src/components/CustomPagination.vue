<script setup>
import { ref } from 'vue';

const props = defineProps({
    total: {
        type: Number,
        required: true,
    },
    page: {
        type: Number,
        required: true,
    },
    pageSize: {
        type: Number,
        required: true,
    },
});

const currentPage = ref(props.page);
const pageSize = ref(props.pageSize);

const emit = defineEmits(['update:page', 'update:pageSize', 'query']);

const handleQuery = () => {
    emit('query');
};

const handleSizeChange = (newSize) => {
    pageSize.value = newSize;
    emit('update:pageSize', newSize);
    handleQuery();
};

const handleCurrentChange = (newPage) => {
    currentPage.value = newPage;
    emit('update:page', newPage);
    handleQuery(); 
};
</script>

<template>
    <div class="pagination">
        <el-pagination
            size="small"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<style lang="scss" scoped>
$primary-color: #5b5fa9;
$font-color: #9d9eb1;
$icon-color: #000;

.pagination {
    display: flex;
    text-align: center;
    align-items: center;
    border: 2px solid $primary-color;
    border-radius: 4px; 
    :deep(.el-pagination) {
        padding: 5px;

        .el-pagination__total,
        .el-pagination__goto,
        .el-pagination__classifier {
            color: $font-color;
        }

        .el-select__wrapper,
        .btn-prev,
        .el-pager,
        .btn-next,
        .el-input__wrapper {
            background-color: $primary-color;
            .el-input__inner{
                color: $font-color;
            }
        }

        .el-select__wrapper {
            font-size: smaller;
            width: 80px;
            padding: 1px 3px;

            .el-select__selected-item {
                display: flex;
                align-items: center;
                color: $font-color;
            }
            .el-icon {
                color: $icon-color;
            }
        }

        .el-pager .is-active {
            background-color: $primary-color;
            color: $font-color;
        }

        .btn-prev,
        .btn-next {
            color: $icon-color;
        }
    }
}
</style>