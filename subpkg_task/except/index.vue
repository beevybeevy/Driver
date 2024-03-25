<script setup>
    import { ref, computed, reactive } from 'vue'
    import { onLoad } from '@dcloudio/uni-app'
    import { reportUnUsualAPI } from '../../apis/task.js'
    // 组件 ref
    const popup = ref(null)

    //获取当前页面的id
    const transportTaskId = ref('')
    onLoad((options) => {
        if (!options.id) {
            uni.utils.toast('参数错误')
            return
        }
        transportTaskId.value = options.id
    })

    // 文件提示
    const exceptTime = computed(() => {
        return timePicker.value || '请选择'
    })
    // 异常日期
    const timePicker = ref('')

    const exceptionType = ref('')
    // 点击类型弹层确认按钮
    function onPopupConfirm() {
        popup.value.close()
        exceptionType.value = exceptionTypes
            .filter((item) => {
                return item.checked
            })
            .map((item) => item.text)
            .join('|')
        // console.log(exceptionType.value)
    }

    // 打开弹层
    function onPopupOpen() {
        popup.value.open()
    }

    const exceptionTypes = reactive([
        { text: '发动机启动困难', checked: true },
        { text: '不着车，漏油', checked: false },
        { text: '照明失灵', checked: false },
        { text: '排烟异常、温度异常', checked: false },
        { text: '其他问题', checked: false },
    ])

    function onCheckBoxChange(index) {
        exceptionTypes[index].checked = !exceptionTypes[index].checked
    }

    //异常原因
    const exceptionDescribe = ref('')

    const onTextareaChange = computed(function () {
        return exceptionDescribe.value.length
    })

    //选择地点
    const exceptionPlace = ref('')
    // 打开地图
    async function onLocationChoose() {
        try {
            // 获取位置
            const { address } = await uni.chooseLocation({})
            exceptionPlace.value = address
            // console.log(address)
        } catch (err) {}
    }

    //上传图片
    const exceptionImagesList = ref([])
    function doSubmit() {
        const postData = {
            transportTaskId: transportTaskId.value,
            exceptionTime: timePicker.value,
            exceptionPlace: exceptionPlace.value,
            exceptionDescribe: exceptionDescribe.value,
            exceptionType: exceptionType.value,
            exceptionImagesList: exceptionImagesList.value.map((item) => ({
                url: item.url,
            })),
        }
        // console.log(postData)
        reportUnUsualAPI(postData)
            .then((res) => {
                // console.log('成功', res)
                return uni.utils.toast('异常上报成功')
            })
            .then(() => {
                uni.reLaunch({ url: '/pages/task/index' })
            })
    }
</script>

<template>
    <view class="page-container">
        <scroll-view class="scroll-view" scroll-y>
            <view style="margin: 30rpx" class="scroll-view-wrapper">
                <uni-list :border="false">
                    <uni-list-item show-arrow title="异常时间">
                        <template v-slot:footer>
                            <uni-datetime-picker v-model="timePicker">
                                <view class="picker-value">{{
                                    exceptTime
                                }}</view>
                            </uni-datetime-picker>
                        </template>
                    </uni-list-item>

                    <uni-list-item
                        show-arrow
                        clickable
                        ellipsis="1"
                        @click="onLocationChoose"
                        title="上报位置"
                        :rightText="exceptionPlace || '请选择'"
                    />
                    <uni-list-item
                        show-arrow
                        clickable
                        @click="onPopupOpen"
                        title="异常类型"
                        :rightText="exceptionType || '请选择'"
                    />
                    <uni-list-item direction="column" title="异常描述">
                        <template v-slot:footer>
                            <view class="textarea-wrapper">
                                <textarea
                                    class="textarea"
                                    placeholder="请输入异常描述"
                                    v-model="exceptionDescribe"
                                    @change="onTextareaChange"
                                    maxlength="50"
                                ></textarea>
                                <view class="words-count"
                                    >{{ onTextareaChange }}/50</view
                                >
                            </view>
                        </template>
                    </uni-list-item>
                    <uni-list-item
                        :border="false"
                        style="margin-top: -30rpx"
                        direction="column"
                        title="上传图片（最多6张）"
                    >
                        <template v-slot:footer>
                            <uni-file-picker
                                limit="6"
                                v-model="exceptionImagesList"
                            ></uni-file-picker>
                        </template>
                    </uni-list-item>
                </uni-list>
            </view>
        </scroll-view>
        <view class="fixbar">
            <button class="button disable" @click="doSubmit">提交</button>
        </view>
        <!-- 异常类型弹层 -->
        <uni-popup ref="popup" :mask-click="false" type="bottom">
            <uni-list class="popup-action-sheet">
                <uni-list-item>
                    <template v-slot:header>
                        <view class="header">选择类型</view>
                    </template>
                </uni-list-item>
                <uni-list-item
                    :title="item.text"
                    v-for="(item, index) in exceptionTypes"
                    :key="item.text"
                >
                    <template v-slot:footer>
                        <checkbox-group
                            class="checkbox"
                            @change="onCheckBoxChange(index)"
                        >
                            <checkbox
                                color="#EF4F3F"
                                :value="item.type"
                                :checked="item.checked"
                            />
                        </checkbox-group>
                    </template>
                </uni-list-item>
                <uni-list-item>
                    <template v-slot:body>
                        <button @click="onPopupConfirm" class="button">
                            确定
                        </button>
                    </template>
                </uni-list-item>
            </uni-list>
        </uni-popup>
    </view>
</template>

<style lang="scss" scoped>
    @import './index.scss';
</style>
