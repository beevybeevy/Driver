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
    } = messageModule(getNotityListAPI, 200)

    onShow(() => {
        if (dataList.value.length) return
        getMessage()
    })
</script>
<template>
    <scroll-view
        class="scroll-view"
        refresher-enabled
        scroll-y
        @refresherrefresh="doRefresh"
        :refresher-triggered="refreshing"
        @scrolltolower="doScrollToLower"
    >
        <view class="scroll-view-wrapper">
            <view class="message-action">
                <text class="iconfont icon-clear"></text>
                <text @click="changeReadStatus">全部已读</text>
            </view>
            <uni-list :border="false">
                <uni-list-item
                    to="/subpkg_message/content/index"
                    ellipsis="1"
                    :title="item.title"
                    :rightText="item.created"
                    v-for="(item, index) in dataList"
                    @click="doClick(item.id)"
                >
                    <template v-slot:header>
                        <text :class="{ dot: item.isRead === 0 }"></text>
                    </template>
                </uni-list-item> </uni-list
        ></view>
    </scroll-view>
</template>

<style lang="scss" scoped>
    @import './styles.scss';
</style>
