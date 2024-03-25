<script setup>
    import { onShow } from '@dcloudio/uni-app'
    import { messageModule } from '../.././message/composition/message.js'
    import { taskListpAPI } from '../../../apis/task.js'
    //解构出所有
    const {
        getMessage,
        dataList,
        refreshing,
        doRefresh,
        doScrollToLower,
        doClick,
        changeReadStatus,
    } = messageModule(taskListpAPI, 1)

    onShow(() => {
        if (dataList.value.length) return
        getMessage()
    })
</script>

<template>
    <scroll-view
        scroll-y
        refresher-enabled
        class="scroll-view"
        @refresherrefresh="doRefresh"
        :refresher-triggered="refreshing"
        @scrolltolower="doScrollToLower"
    >
        <view class="scroll-view-wrapper">
            <view class="task-card" v-for="(item, index) in dataList">
                <navigator
                    hover-class="none"
                    :url="'/subpkg_task/detail/index?id=' + item.id"
                >
                    <view class="header">
                        <text class="no"
                            >任务编号: {{ item.transportTaskId }}</text
                        >
                        <!-- <text class="status">已延迟</text> -->
                    </view>
                    <view class="body">
                        <view class="timeline">
                            <view class="line">{{ item.startAddress }}</view>
                            <view class="line">{{ item.endAddress }}</view>
                        </view>
                    </view>
                </navigator>
                <view class="footer">
                    <view class="label">提货时间</view>
                    <view class="time">{{ item.planDepartureTime }}</view>
                    <navigator
                        hover-class="none"
                        v-if="item.enablePickUp"
                        :url="`/subpkg_task/pickup/index?id=${item.id}`"
                        class="action"
                        >提货</navigator
                    >
                    <button v-else disabled class="action">提货</button>
                </view>
            </view>

            <view v-if="false" class="task-blank">无待提货物</view>
        </view>
    </scroll-view>
</template>

<style lang="scss" scoped>
    @import './styles.scss';
</style>
