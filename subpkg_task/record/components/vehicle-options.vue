<script setup>
    import { ref, defineProps } from 'vue'
    import { useTaskStore } from '../../../store/task.js'

    const taskStore = useTaskStore()
    // 当前被选中选项的索引值
    const tabIndex = ref(-1)

    // 接收传入组件的数据
    const props = defineProps({
        types: Array,
        dataKey: String,
    })

    // 点击选中选项
    function onOptionSelect(index, id, text) {
        // 高亮显示选中的选项
        tabIndex.value = index
        //用户选了哪个值
        console.log(text)
        console.log(props.dataKey)
        taskStore.recordData[props.dataKey] = id
    }
</script>

<template>
    <view class="vehicle-options">
        <view
            class="option"
            :class="{ active: tabIndex === index }"
            v-for="(option, index) in props.types"
            :key="option.id"
            @click="onOptionSelect(index, option.id, option.text)"
        >
            {{ option.text }}
        </view>
    </view>
</template>

<style lang="scss" scoped>
    .vehicle-options {
        display: flex;
        flex-wrap: wrap;
        font-size: $uni-font-size-small;

        .option {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 180rpx;
            height: 70rpx;
            padding-top: 1rpx;
            margin-top: 30rpx;
            margin-right: 38rpx;
            color: $uni-secondary-color;
            border: 2rpx solid $uni-bg-color;
            background-color: $uni-bg-color;
            border-radius: 20rpx;

            &:nth-child(3n) {
                margin-right: 0;
            }

            &.active {
                color: $uni-primary;
                border: 2rpx solid $uni-primary;
                background-color: #ffe0dd;
            }
        }
    }
</style>
