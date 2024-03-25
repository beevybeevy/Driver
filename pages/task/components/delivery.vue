<script setup>
    import { onShow } from '@dcloudio/uni-app'
    import { messageModule } from '../.././message/composition/message.js'
    import { taskListpAPI } from '../../../apis/task.js'
    import { onMounted } from 'vue'
    //解构出所有
    const {
        getMessage,
        dataList,
        refreshing,
        doRefresh,
        doScrollToLower,
        doClick,
        changeReadStatus,
    } = messageModule(taskListpAPI, 2)

    onMounted(() => {
        if (dataList.value.length) return
        getMessage()
        // console.log(typeof dataList.value.length)
    })
</script>
<template>
    <scroll-view
        scroll-y
        refresher-enabled
        class="scroll-view"
        @refresherrefresh="doRefresh"
        :refresher-triggered="refreshing"
        v-for="item in dataList"
        :key="item.id"
    >
        <view class="scroll-view-wrapper">
            <view class="task-card">
                <navigator
                    hover-class="none"
                    :url="'/subpkg_task/detail/index?id=' + item.id"
                >
                    <view class="header">
                        <text class="no"
                            >任务编号: {{ item.transportTaskId }}</text
                        >
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
                    <view class="time">{{ item.actualDepartureTime }}</view>
                    <navigator
                        hover-class="none"
                        :url="`/subpkg_task/delivery/index?id=${item.id}`"
                        class="action"
                        v-if="item.status === 2"
                    >
                        交付
                    </navigator>
                    <navigator
                        hover-class="none"
                        :url="`/subpkg_task/record/index?id=${item.transportTaskId}&time=${item.actualDepartureTime}`"
                        class="action"
                        v-if="item.status === 4"
                        >回车登记</navigator
                    >
                </view>
            </view>
        </view>
    </scroll-view>
    <view v-if="!dataList.length" class="task-blank">无在途货物</view>
</template>

<style lang="scss" scoped>
    @import './styles.scss';
</style>
