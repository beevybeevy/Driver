<script setup>
    import { ref } from 'vue'
    import slVehicleViolation from './components/vehicle-violation'
    import slVehicleBreakdown from './components/vehicle-breakdown'
    import slVehicleAccident from './components/vehicle-accident'
    import { onLoad } from '@dcloudio/uni-app'
    import { storeToRefs } from 'pinia'
    import { useTaskStore } from '../../store/task.js'
    import { reportTaskDoneAPI } from '../../apis/task.js'

    const { recordData } = storeToRefs(useTaskStore())
    // const recordData = useTaskStore()
    // 回车时间
    const endTime = ref('')

    const startTime = ref('')
    const id = ref('')
    onLoad((options) => {
        // console.log(options)
        startTime.value = options.time
        id.value = options.id
    })

    function doSubmit() {
        recordData.value.endTime = endTime.value
        recordData.value.id = id.value
        recordData.value.startTime = startTime.value
        const { accidentImagesList, faultImagesList } = recordData.value
        //事故照片
        recordData.value.accidentImagesList = accidentImagesList.map(
            ({ url }) => {
                return { url }
            }
        )
        //故障照片
        recordData.value.faultImagesList = faultImagesList.map(({ url }) => {
            return { url }
        })
        console.log(recordData.value)
        reportTaskDoneAPI(recordData.value).then((res) => {
            console.log(res)
            uni.reLaunch({ url: '/pages/task/index' })
        })
    }
</script>
<template>
    <view class="page-container">
        <scroll-view class="scroll-view" scroll-y>
            <view class="scroll-view-wrapper">
                <uni-list class="base-info">
                    <uni-list-item
                        title="出车时间"
                        show-arrow
                        :right-text="startTime"
                    />
                    <uni-list-item show-arrow title="回车时间">
                        <template v-slot:footer>
                            <uni-datetime-picker v-model="endTime">
                                <view class="picker-value">{{
                                    endTime || '请选择'
                                }}</view>
                            </uni-datetime-picker>
                        </template>
                    </uni-list-item>
                </uni-list>
                <sl-vehicle-violation></sl-vehicle-violation>
                <sl-vehicle-breakdown></sl-vehicle-breakdown>
                <sl-vehicle-accident></sl-vehicle-accident>
            </view>
        </scroll-view>
        <view class="toolbar">
            <button class="button" @click="doSubmit">提交登记</button>
        </view>
    </view>
</template>

<style lang="scss" scoped>
    @import './index.scss';
</style>
