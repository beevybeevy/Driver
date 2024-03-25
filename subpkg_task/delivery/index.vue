<template>
    <view class="page-container">
        <view class="receipt-info">
            <uni-file-picker
                limit="3"
                title="请拍照上传回单凭证"
                v-model="certificatePictureList"
            ></uni-file-picker>
            <uni-file-picker
                limit="3"
                title="请拍照上传货品照片"
                v-model="deliverPictureList"
            ></uni-file-picker>
        </view>
        <button :disabled="!isOk" class="button" @click="doSubmit">提交</button>
    </view>
</template>

<script setup>
    import { onLoad } from '@dcloudio/uni-app'
    import { reactive, ref, computed } from 'vue'
    import { finishDispatchedAPI } from '../../apis/task.js'
    const id = ref('')
    onLoad((options) => {
        if (!options.id) {
            uni.utils.toast('参数错误')
            return
        }
        id.value = options.id
    })
    //回单凭证数组
    const certificatePictureList = ref([])
    //提货照片数组
    const deliverPictureList = ref([])

    const isOk = computed(() => {
        return (
            certificatePictureList.value.length &&
            deliverPictureList.value.length &&
            id.value
        )
    })

    function doSubmit() {
        const postData = {
            certificatePictureList: certificatePictureList.value.map(
                (item) => ({
                    url: item.url,
                })
            ),
            deliverPictureList: deliverPictureList.value.map((item) => ({
                url: item.url,
            })),
            id: id.value,
        }
        finishDispatchedAPI(postData)
            .then(() => {
                return uni.utils.toast('交付成功成功')
            })
            .then(() => {
                uni.reLaunch({ url: '/pages/task/index' })
            })
    }
</script>

<style lang="scss" scoped>
    .page-container {
        padding: 30rpx;
    }

    .receipt-info {
        min-height: 600rpx;
        background-color: #fff;
        padding: 20rpx 30rpx;
        border-radius: 16rpx;

        ::v-deep .uni-file-picker {
            margin-bottom: 30rpx;
        }
    }

    .button {
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        /* #ifdef APP */
        padding-top: 4rpx;
        /* #endif */
        border-radius: 100rpx;
        margin-top: 60rpx;
        color: #fff;
        font-size: $uni-font-size-big;
        background-color: $uni-primary;

        &[disabled] {
            color: #fff;
            background-color: #fadcd9;
        }
    }
</style>
