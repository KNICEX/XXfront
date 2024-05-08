import { ElMessage } from 'element-plus'

const showMessage = (msg, callback, type) => {
    ElMessage({
        message: msg,
        type: type,
        duration: 1500,
        onClose: () => {
            if (callback) {
                callback()
            }
        }
    })

}

export default {
    success: (msg, callback) => {
        showMessage(msg, callback, 'success')
    },
    warning: (msg, callback) => {
        showMessage(msg, callback, 'warning')
    },
    error: (msg, callback) => {
        showMessage(msg, callback, 'error')
    }
}