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
    } = messageModule(taskListpAPI, 6)

    onMounted(() => {
        if (dataList.value.length) return
        getMessage()
        // console.log(typeof dataList.value.length)
    })
</script>

<template>
    <view class="task-search">
        <view class="search-bar">
            <text class="iconfont icon-search"></text>
            <input class="input" type="text" placeholder="输入任务编号" />
        </view>
        <view class="filter-bar">
            <picker class="picker" mode="date">2023.05.20</picker>
            <text class="text">至</text>
            <picker class="picker" mode="date">结束时间</picker>
            <button disabled class="button">筛选</button>
        </view>
    </view>
    <scroll-view
        scroll-y
        refresher-enabled
        class="scroll-view"
        @refresherrefresh="doRefresh"
        :refresher-triggered="refreshing"
        @scrolltolower="doScrollToLower"
    >
        <view class="scroll-view-wrapper">
            <view v-for="item in dataList" class="task-card">
                <navigator
                    hover-class="none"
                    :url="`/subpkg_task/detail/index?id=${transportTaskId}`"
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
                <view class="footer flex">
                    <view class="label">提货时间</view>
                    <view class="time">{{ item.actualDepartureTime }}</view>
                </view>
            </view>
            <view class="task-blank" v-if="!dataList.length">无完成货物</view>
        </view>
    </scroll-view>
</template>

<style lang="scss" scoped>
    @import './styles.scss';

    .task-search {
        padding: 30rpx;
        // margin-top: -1rpx;
        background-color: #fff;
        border-bottom: 1rpx solid #eee;

        .search-bar {
            position: relative;

            .icon-search {
                position: absolute;
                top: 22rpx;
                left: 24rpx;
                color: $uni-secondary-color;
                font-size: $uni-font-size-small;
            }

            .input {
                height: 72rpx;
                background-color: #f4f4f4;
                border-radius: 72rpx;
                padding-left: 72rpx;
                font-size: $uni-font-size-small;
            }
        }

        .filter-bar {
            display: flex;
            margin-top: 30rpx;
            font-size: $uni-font-size-small;
            text-align: center;
            line-height: 64rpx;
            color: $uni-secondary-color;

            .picker {
                width: 230rpx;
                height: 64rpx;
                border-radius: 64rpx;
                background-color: $uni-bg-color;
            }

            .text {
                margin: 0 24rpx;
            }

            .button {
                width: 120rpx;
                height: 64rpx;
                padding: 0;
                margin-left: 40rpx;
                line-height: 64rpx;
                border-radius: 64rpx;
                font-size: $uni-font-size-small;
                color: #fff;
                background-color: $uni-primary;

                &[disabled] {
                    background-color: #fadcd9;
                }
            }
        }
    }
</style>
