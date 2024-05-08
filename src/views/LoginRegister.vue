<template>
  <div class="bg flex justify-center items-center">
    <div :class="['panel bg-white p-3 rounded-xl', route.name === 'login' ? 'login' :'register']">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
        <transition
            enter-active-class="animate__animated animate__fadeIn animate__faster"
            >
          <el-tab-pane label="登录" name="login">

            <el-form
                ref="loginFormRef"
                style="max-width: 600px"
                :model="loginForm"
                status-icon
                :rules="loginRules"
                label-position="top"
                label-width="auto"
                class="demo-ruleForm"
                v-if = "activeName === 'login'"
            >
              <el-form-item label="Username" prop="userName">
                <el-input v-model.number="loginForm.userName"/>
              </el-form-item>

              <el-form-item label="Password" prop="password">
                <el-input show-password	 v-model="loginForm.password" type="password" autocomplete="off"/>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="login(loginForm)">
                  登录
                </el-button>
              </el-form-item>
            </el-form>

          </el-tab-pane>
        </transition>
        <transition
            enter-active-class="animate__animated animate__fadeIn animate__faster"
        >
          <el-tab-pane label="注册" name="register" >
            <el-form
                ref="registerFormRef"
                style="max-width: 600px"
                :model="registerForm"
                status-icon
                :rules="registerRules"
                label-position="top"
                label-width="auto"
                class="demo-ruleForm"

                v-if = "activeName === 'register'"
            >
              <el-form-item label="Username" prop="userName">
                <el-input v-model.number="registerForm.userName"/>
              </el-form-item>

              <el-form-item label="Password" prop="password">
                <el-input show-password	 v-model="registerForm.password" type="password" autocomplete="off"/>
              </el-form-item>

              <el-form-item label="Confirm Password" prop="confirmPassword">
                <el-input show-password	 v-model="registerForm.confirmPassword" type="password" autocomplete="off"/>
              </el-form-item>

              <el-form-item label="Phone Number" prop="phoneNumber">
                <el-input v-model.number="registerForm.phoneNumber"/>
              </el-form-item>

              <el-form-item label="Address" prop="address">
                <el-input v-model="registerForm.address"/>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="register(registerForm)">
                  注册
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </transition>
      </el-tabs>

    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {useRoute, useRouter} from "vue-router"
import { useUserInfoStore } from "@/stores/userInfo.js"
import {login as loginReq, register as registerReq} from '@/api/user.js'
import Message from '@/utils/message.js'

const route = useRoute()
const router = useRouter()
const userInfoStore = useUserInfoStore()
const activeName = ref(route.name)

const handleChange = (name) => {
  router.push({name: name})
}


const loginForm = ref({
  userName: '',
  password: ''
})

const registerForm = ref({
  userName: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  address: ''
})

const loginFormRef = ref(null)
const registerFormRef = ref(null)

const loginRules = reactive({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 20, message: '用户名长度为1-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '密码长度在6-10', trigger: 'blur' }
  ]
})

const registerRules = reactive({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 20, message: '用户名长度为1-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '密码长度在6-10', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== registerForm.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    }
  ],
  phoneNumber: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入手机号'))
        } else if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      },
      trigger: 'blur', }
  ],
  address: [
    { required: true, message: '请输入地址', trigger: 'blur' },
    { min: 1, max: 100, message: '地址长度为1-100个字符', trigger: 'blur' }
  ]

})
const login = (form) => {
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      userInfoStore.userInfo = await loginReq(form)
      router.push(router.query?.redirect || '/')
      Message.success('登录成功')
    } else {
      return false
    }
  })
}
const register = (form) => {
  registerFormRef.value.validate(async (valid) => {
    if (valid) {
      await registerReq(form)
      Message.success('注册成功')
      loginForm.value.userName = form.userName
      loginForm.value.password = form.password
      activeName.value = 'login'
      await router.replace({name: 'login'})
      return true
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.bg {
  height: 100%;
  background-image: url('https://pic.imgdb.cn/item/663a0a0e0ea9cb14039a366f.jpg');
  background-size: cover;

  .panel {
    //height: 400px;
    width: 400px;
    max-height:  0;
    transition: max-height 0.2s;
  }

  .login {
    max-height: 400px;
  }

  .register {
    max-height: 600px;
  }

}
</style>