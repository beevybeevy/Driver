<script setup>
    import { storeToRefs } from 'pinia'
    import { useCounterStore } from '../../store/counter-store.js'
    const counterStore = useCounterStore()
    //直接对store进行结构，会丢失数据的响应式
    //所以需要对store里面的数据进行storeToRefs的处理，函数不需要
    const { count } = storeToRefs(counterStore)
    const { plus, minus } = counterStore
</script>
<template>
    <view class="counter">
        <button class="button" type="primary" @click="minus">-</button>
        <input class="input" type="text" :value="count" />
        <button class="button" type="primary" @click="plus">+</button>
    </view>
</template>

<style lang="scss" scoped>
    .counter {
        display: flex;
        padding: 100rpx;
    }

    .input {
        flex: 1;
        height: 96rpx;
        text-align: center;
        border: 2rpx solid #eee;
        box-sizing: border-box;
    }

    .button {
        width: 100rpx;
        margin: 0;

        &:first-child {
            border-start-end-radius: 0;
            border-end-end-radius: 0;
        }
        &:last-child {
            border-start-start-radius: 0;
            border-end-start-radius: 0;
        }
    }
</style>
