import axios, { CanceledError } from "axios"
import { ElLoading } from "element-plus"
import Message from "./message.js"
import router from "@/router/index.js"
const instance = axios.create({
    baseURL: "/api",
    timeout: 30000,

})


instance.interceptors.request.use((config) => {
    if (config.showLoading) {
        config.loadingInstance = ElLoading.service(config.loadingConfig)
    }
    return config
}, (error) => {
    if (error.config.showLoading && error.config.loadingInstance) {
        error.config.loadingInstance.close()
    }
    Message.error("请检查网络连接")
    return Promise.reject(error)
})

const SuccessCode = 0
const NeedLoginCode = 3


instance.interceptors.response.use((response) => {

    const { showLoading, errorCallback, showError, responseType, loadingInstance, checkLogin } = response.config
    if (showLoading && loadingInstance) {
        loadingInstance.close()
    }
    // 此为http返回data的内容
    const responseData = response.data
    if (responseType === "blob" || responseType === "arraybuffer") {
        return responseData
    }
    // 请求成功
    if (responseData.code === SuccessCode) {
        // 此为后端返回的统一相应格式的data内容
        return responseData.data
    }
    // 需要登录
    if (responseData.code === NeedLoginCode && checkLogin) {
        router.push("/login?redirect=" + window.location.pathname + window.location.search)
        return Promise.reject(response)
    } else {
        // 各种错误
        if (errorCallback) {
            errorCallback(responseData)
        }
        if (showError) {
            Message.error(responseData.msg)
        }
        return Promise.reject(response)
    }
}, (error) => {
    console.log(error)
    if (error.config.showLoading && error.config.loadingInstance) {
        error.config.loadingInstance.close()
    }

    if (!(error instanceof CanceledError)) {
        Message.error(error.message)
        return Promise.reject(error)
    }

})

const toForm = (data) => {
    if (data === undefined || data === null) {
        return data
    }

    if (data instanceof FormData) {
        return data
    }

    const formData = new FormData()
    for (const key in data) {
        formData.append(key, data[key])
    }
    return formData
}

const request = (config) => {
    const { url, params, data, method, showLoading = true, checkLogin = true, errorCallback, showError = true, loadingConfig = {
        fullScreen: true,
        target: undefined,
        lock: true,
        body: false,
        text: 'Loading...',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: undefined
    }} = config
    return instance({
        ...config,
        url,
        data: toForm(data),
        params,
        method,
        showLoading,
        checkLogin,
        errorCallback,
        showError,
        loadingConfig,
    })
}

export default request