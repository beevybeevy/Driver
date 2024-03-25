<script setup>
    import { onLoad } from '@dcloudio/uni-app'
    import { pickUpDetailAPI } from '../../apis/task.js'
    import { ref } from 'vue'

    const detail = ref([])
    const exceptionList = ref([])
    // 获取地址参数
    onLoad((params) => {
        console.log(params.id)
        pickUpDetailAPI(params.id).then((res) => {
            console.log(res)
            detail.value = res.data
            if (!res.data.exceptionList) return
            exceptionList.value = res.data.exceptionList
        })
    })
</script>

<template>
    <view class="page-container">
        <view class="search-bar">
            <!-- #ifdef H5 -->
            <text class="iconfont icon-search"></text>
            <!-- #endif -->
            <!-- #ifndef H5 -->
            <text class="iconfont icon-scan"></text>
            <!-- #endif -->
            <input class="input" type="text" placeholder="输入运单号" />
        </view>
        <scroll-view scroll-y class="task-detail">
            <view class="scroll-view-wrapper">
                <view class="basic-info panel">
                    <view class="panel-title">基本信息</view>
                    <view class="timeline">
                        <view class="line">{{ detail.startAddress }}</view>
                        <view class="line">{{ detail.endAddress }}</view>
                        <navigator
                            hover-class="none"
                            url="/subpkg_task/guide/index"
                            class="guide"
                        >
                            <text class="iconfont icon-guide"></text>
                            <text>开始导航</text>
                        </navigator>
                    </view>
                    <view class="info-list">
                        <view class="info-list-item">
                            <text class="label">任务编号</text>
                            <text class="value">{{
                                detail.transportTaskId
                            }}</text>
                        </view>
                        <view class="info-list-item">
                            <text class="label">提货联系人</text>
                            <text class="value">{{
                                detail.startHandoverName
                            }}</text>
                        </view>
                        <view class="info-list-item">
                            <text class="label">联系电话</text>
                            <text class="value">{{
                                detail.startHandoverPhone
                            }}</text>
                        </view>
                        <view class="info-list-item">
                            <text class="label">预计提货时间</text>
                            <text class="value">{{
                                detail.planDepartureTime
                            }}</text>
                        </view>
                        <view class="info-list-item">
                            <text class="label">实际提货时间</text>
                            <text class="value">{{
                                detail.actualDepartureTime
                            }}</text>
                        </view>

                        <view class="hr"></view>

                        <view class="info-list-item">
                            <text class="label">交付联系人</text>
                            <text class="value">{{
                                detail.finishHandoverName
                            }}</text>
                        </view>
                        <view class="info-list-item">
                            <text class="label">联系电话</text>
                            <text class="value">{{
                                detail.finishHandoverPhone
                            }}</text>
                        </view>
                        <view class="info-list-item">
                            <text class="label">预计送达时间</text>
                            <text class="value">{{
                                detail.planArrivalTime
                            }}</text>
                        </view>
                        <view class="info-list-item">
                            <text class="label">实际送达时间</text>
                            <text class="value">{{
                                detail.actualArrivalTime
                            }}</text>
                        </view>
                    </view>
                </view>

                <view class="except-info panel">
                    <view class="panel-title">异常信息</view>
                    <view
                        class="info-list"
                        v-for="(item, index) in exceptionList"
                        :key="index"
                    >
                        <view class="info-list-item">
                            <text class="label">上报时间</text>
                            <text class="value">{{ item.exceptionTime }}</text>
                        </view>
                        <view class="info-list-item">
                            <text class="label">异常类型</text>
                            <text class="value">{{ item.exceptionType }}</text>
                        </view>
                        <view class="info-list-item">
                            <text class="label">处理结果</text>
                            <text class="value">{{ item.handleResult }}</text>
                        </view>
                    </view>
                </view>

                <view class="panel pickup-info">
                    <view class="panel-title">提货信息</view>
                    <view class="label">提货凭证</view>
                    <view class="pictures">
                        <image
                            v-for="receipt in detail.cargoPictureList"
                            :key="receipt.url"
                            class="picture"
                            :src="receipt.url"
                        />
                    </view>
                    <view class="label">货品照片</view>
                    <view class="pictures">
                        <image
                            v-for="goods in detail.cargoPickUpPictureList"
                            :key="goods.url"
                            class="picture"
                            :src="goods.url"
                        />
                    </view>
                </view>

                <view class="delivery-info panel">
                    <view class="panel-title">交货信息</view>
                    <view class="label">交货凭证</view>
                    <view class="pictures">
                        <image
                            v-for="receipt in detail.certificatePictureList"
                            :key="receipt.url"
                            class="picture"
                            :src="receipt.url"
                        />
                    </view>
                    <view class="label">货品照片</view>
                    <view class="pictures">
                        <image
                            v-for="goods in detail.deliverPictureList"
                            :key="goods.url"
                            class="picture"
                            :src="goods.url"
                        />
                    </view>
                </view>
            </view>
        </scroll-view>

        <view class="toolbar" v-if="detail.status === 1">
            <navigator
                :url="`/subpkg_task/delay/index?id=${detail.id}&time=${detail.planDepartureTime}`"
                hover-class="none"
                class="button secondary"
                >延迟提货</navigator
            >
            <navigator
                :url="`/subpkg_task/pickup/index?id=${detail.id}`"
                hover-class="none"
                class="button primary"
                >提货</navigator
            >
        </view>
        <view class="toolbar" v-if="detail.status === 2">
            <navigator
                :url="`/subpkg_task/except/index?id=${detail.transportTaskId}`"
                hover-class="none"
                class="button secondary"
                >异常上报
            </navigator>
            <navigator
                :url="`/subpkg_task/delivery/index?id=${detail.id}`"
                hover-class="none"
                class="button primary"
                >交付</navigator
            >
        </view>
        <view class="toolbar" v-if="detail.status === 4">
            <navigator
                :url="`/subpkg_task/record/index?id=${detail.transportTaskId}&time=${detail.actualDepartureTime}`"
                hover-class="none"
                class="button primary block"
                >回车登记</navigator
            >
        </view>
    </view>
</template>

<style lang="scss" scoped>
    @import './index.scss';
</style>
