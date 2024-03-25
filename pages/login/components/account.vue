<template>
    <uni-forms class="login-form" ref="form" :model="formData" :rules="rules">
        <uni-forms-item name="name">
            <input
                type="text"
                placeholder="请输入账号"
                class="uni-input-input"
                placeholder-style="color: #818181"
                v-model="formData.account"
            />
        </uni-forms-item>
        <uni-forms-item name="password">
            <input
                type="password"
                placeholder="请输入密码"
                class="uni-input-input"
                placeholder-style="color: #818181"
                v-model="formData.password"
            />
        </uni-forms-item>
        <button class="submit-button" @click="doLogin">登录</button>
    </uni-forms>
</template>

<script setup>
    import { ref } from 'vue'
    import { onLoad } from '@dcloudio/uni-app'
    const formData = ref({
        account: 'beevy222',
        password: '123456',
    })

    const tabbarPages = ref([
        '/pages/task/index',
        '/pages/message/index',
        '/pages/my/index',
    ])
    const backUrl = ref('/pages/task/index')
    onLoad((options) => {
        console.log(options)
        backUrl.value = options.backUrl || '/pages/task/index'
    })
    // onLoad(function(){})
    const form = ref(null)
    import { useUserStore } from '../../../store/user-store.js'
    import { loginAPI } from '../../../apis/user.js'
    const { setToken } = useUserStore()
    // const doLogin = () => {
    //  return loginAPI(formData.value)
    //     }).then((res) => {
    //         console.log('登录成功', res)
    // }
    const doLogin = () => {
        form.value
            .validate()
            .then(() => {
                return loginAPI(formData.value)
            })
            .then((res) => {
                console.log('登录成功', res)
                setToken(res.data)
            })
            .then(() => {
                if (tabbarPages.value.includes(backUrl.value)) {
                    uni.switchTab({
                        url: backUrl.value,
                    })
                } else {
                    uni.redirectTo({
                        url: backUrl.value,
                    })
                }
            })
    }

    const rules = ref({
        account: {
            rules: [
                // 校验 account 不能为空
                { required: true, errorMessage: '请填写账号' },
                {
                    pattern: '^[a-zA-Z0-9]{6,8}$',
                    errorMessage: '登录账号格式不正确',
                },
            ],
        },
        password: {
            rules: [
                // 校验 password 不能为空
                {
                    required: true,
                    errorMessage: '请填写密码',
                },
                {
                    pattern: /^[0-9]{6,8}$/,
                    errorMessage: '密码必须由数字组成，最小6位，最长8位',
                },
            ],
        },
    })
</script>

<style lang="scss" scoped>
    @import './styles.scss';
</style>
