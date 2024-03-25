<script setup>
    import { onLoad } from '@dcloudio/uni-app'
    import { ref, computed } from 'vue'
    import { suspendPickup } from '../../apis/task.js'
    const detailData = ref({})
    onLoad((options) => {
        console.log(options)
        detailData.value = options.time
        id.value = options.id
    })
    const delayTime = ref('')
    function onTimeChange(e) {
        delayTime.value = `${detailData.value.split(' ')[0]} ${e.detail.value}`
        console.log(delayTime)
    }

    const delayReason = ref('')
    //校验按钮是否禁用
    const verifacationPassed = computed(function () {
        const time1 = new Date(detailData.value)
        const time2 = new Date(delayTime.value)
        if (time2 - time1 <= 0 || time2 - time1 > 7200000) {
            uni.utils.toast('延迟时间不得提前，且只能延后2小时')
            return false
        }
        if (delayReason.value.length < 1) return false
        return true
    })
    const id = ref('')
    //提交表单
    function doSubmit() {
        suspendPickup(delayReason.value, delayTime.value, id.value).then(
            (res) => {
                uni.utils.toast('延迟提货成功')
                uni.navigateBack()
            }
        )
    }
</script>

<template>
    <view class="page-container">
        <uni-list :border="false">
            <uni-list-item
                title="原定时间 "
                showArrow
                :rightText="detailData"
            />
            <uni-list-item title="延迟时间" showArrow>
                <template v-slot:footer>
                    <picker
                        class="time-picker"
                        mode="time"
                        @change="onTimeChange"
                    >
                        <text>{{
                            delayTime
                                ? delayTime + ':00'
                                : '不可以延迟超过2小时'
                        }}</text>
                    </picker>
                </template>
            </uni-list-item>
            <uni-list-item direction="column">
                <template v-slot:body>
                    <view class="textarea-wrapper">
                        <textarea
                            class="textarea"
                            maxlength="50"
                            placeholder-style="color: #818181"
                            placeholder="请输入延迟提货原因"
                            v-model="delayReason"
                        >
                        </textarea>
                        <text class="words-count"
                            >{{ delayReason.length }}/50</text
                        >
                    </view>
                </template>
            </uni-list-item>
            <uni-list-item :border="false">
                <template v-slot:body>
                    <button
                        :disabled="!verifacationPassed"
                        class="button"
                        @click="doSubmit"
                    >
                        提交
                    </button>
                </template>
            </uni-list-item>
        </uni-list>
    </view>
</template>

<style lang="scss" scoped>
    @import './index.scss';
</style>
