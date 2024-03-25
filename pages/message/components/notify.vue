<script setup>
    import { onShow } from '@dcloudio/uni-app'
    import { messageModule } from '../composition/message.js'
    import { getNotityListAPI, readAllAPI } from '../../../apis/message.js'
    //解构出所有
    const {
        getMessage,
        dataList,
        refreshing,
        doRefresh,
        doScrollToLower,
        doClick,
        changeReadStatus,
    } = messageModule(getNotityListAPI, 201)

    onShow(() => {
        if (dataList.value.length) return
        getMessage()
    })
</script>
<template>
    <scroll-view
        class="scroll-view"
        refresher-enabled
        @refresherrefresh="doRefresh"
        :refresher-triggered="refreshing"
        @scrolltolower="doScrollToLower"
        scroll-y
    >
        <view class="scroll-view-wrapper">
            <view class="message-action">
                <text class="iconfont icon-clear"></text>
                <text @click="changeReadStatus"> 全部已读</text>
            </view>
            <uni-card
                :border="false"
                :is-shadow="false"
                v-for="(item, index) in dataList"
            >
                <view class="brief">{{ item.content }}</view>
                <view class="extra">
                    <text class="time">{{ item.created }}</text>
                    <navigator
                        hover-class="none"
                        class="link"
                        url="/subpkg_message/content/index"
                        @click="doClick(item.id)"
                        >查看详情</navigator
                    >
                </view>
                <template v-slot:title>
                    <view class="title" :class="{ unread: item.isRead === 0 }"
                        >您有新的运输任务</view
                    >
                </template>
            </uni-card>
            <view v-if="false" class="message-blank">暂无消息</view>
        </view>
    </scroll-view>
</template>

<style lang="scss" scoped>
    @import './styles.scss';
</style>
