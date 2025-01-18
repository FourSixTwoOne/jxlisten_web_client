<script setup>
import { loginUserService, registerUserService } from '@/api/user';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores';
import { User, Lock, Iphone } from '@element-plus/icons-vue';

import { ref } from 'vue';
const form = ref();
// 表单数据
const formModel = ref({
    username: '',
    phone: '',
    password: '',
    rePassword: '',
});
// 表单验证规则
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        {
            pattern: /^(?!.*\s)[\S]{1,15}$/,
            message: '长度必须为1 到 15 个字符且不能包含空格',
            trigger: 'blur',
        },
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'change' },
        {
            pattern: /^(?!.*\s)1\d{10}$/,
            message: '手机号必须是1开头的十一位数字',
            trigger: 'change',
        },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'change' },
        {
            pattern: /^(?!.*\s)(?=.*[a-zA-Z]).{6,15}$/,
            message: '密码必须包含字母且长度为6到15个字符且不能包含空格',
            trigger: 'change',
        },
    ],
    rePassword: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        {
            pattern: /^(?!.*\s)(?=.*[a-zA-Z]).{6,15}$/,
            message: '密码必须包含字母且长度为6到15个字符且不能包含空格',
            trigger: 'change',
        },
        {
            validator: (rule, value, callback) => {
                if (value !== formModel.value.password) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            },
            trigger: 'change',
        },
    ],
};

const isRegister = ref(false);
const router = useRouter();
const userStore = useUserStore();

const register = async () => {
    await form.value.validate();
    const res = await registerUserService(formModel.value);
    console.log(res);
    if (res.data.code === 1) {
        ElMessage.success('注册成功');
        isRegister.value = false;
    } else {
        ElMessage.error(res.data.msg);
    }
};
const login = async () => {
    await form.value.validate();
    const res = await loginUserService(formModel.value);
    // if (res.data.code === 1) {
    //     userStore.setToken(res.data.data.token);
    ElMessage.success('登录成功');
    userStore.setToken('1234w');
    await userStore.getUser();

    router.push('/');
    // } else {
    //     ElMessage.error(res.data.msg);
    // }
};
</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form-container">
            <div class="form-box">
                <el-form
                    :model="formModel"
                    :rules="rules"
                    ref="form"
                    size="large"
                    autocomplete="off"
                    v-if="isRegister">
                    <el-form-item>
                        <h1>注册</h1>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input
                            v-model="formModel.username"
                            :prefix-icon="User"
                            placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input
                            v-model="formModel.phone"
                            :prefix-icon="Iphone"
                            placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="formModel.password"
                            :prefix-icon="Lock"
                            type="password"
                            placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="rePassword">
                        <el-input
                            v-model="formModel.rePassword"
                            :prefix-icon="Lock"
                            type="password"
                            placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="button"
                            type="primary"
                            auto-insert-space
                            @click="register">
                            注册
                        </el-button>
                    </el-form-item>
                    <el-form-item class="flex">
                        <el-link type="info" :underline="false" @click="isRegister = false">
                            ← 登录
                        </el-link>
                    </el-form-item>
                </el-form>
                <el-form
                    :model="formModel"
                    :rules="rules"
                    ref="form"
                    size="large"
                    autocomplete="off"
                    v-else>
                    <el-form-item>
                        <h1>登录</h1>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input
                            v-model="formModel.username"
                            :prefix-icon="User"
                            placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="formModel.password"
                            name="password"
                            :prefix-icon="Lock"
                            type="password"
                            placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item class="flex">
                        <div class="flex">
                            <el-checkbox>记住我</el-checkbox>
                            <el-link type="primary" :underline="false">忘记密码？</el-link>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="button" type="primary" auto-insert-space @click="login">
                            登录
                        </el-button>
                    </el-form-item>
                    <el-form-item class="flex">
                        <el-link type="info" :underline="false" @click="isRegister = true">
                            注册 →
                        </el-link>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.login-page {
    height: 100vh;
    background-color: #fff;
    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }
    .form-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .form-box {
        width: 100%;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;
        .title {
            margin: 0 auto;
        }
        .button {
            width: 100%;
        }
        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
