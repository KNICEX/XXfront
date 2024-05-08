<template>
  <div class="wrap p-2 bg-white rounded-xl mt-5 pt-5 h-full">
    <div class="header">
      <h1>活动管理</h1>
      <el-button type="primary" @click="handleAdd">添加活动</el-button>
    </div>
    <el-table :data="eventList" size="large">
      <el-table-column prop="name" label="活动名称"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>

      <el-table-column label="操作">
        <template #default="{row}">
          <el-button type="warning" @click="showUpdate(row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="添加活动" v-model="dialogVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>

        <el-form-item label="最大可投票数" prop="maxVotesPerUser">
          <el-input v-model="form.maxVotesPerUser" type="number" placeholder="0为无限制"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
import { addEvent as addEventReq, getEventList, updateEvent as updateEventReq } from "@/api/event.js"
import Message from "@/utils/message.js"
const eventList = ref([])
const formRef = ref(null)

const loadEvenList = async () => {
  let res = await getEventList()
  res.forEach(item => {
    const startTime = new Date(item.startTime)
    const endTime = new Date(item.endTime)
    item.startTime = startTime.toLocaleString()
    item.endTime = endTime.toLocaleString()
    item.status = endTime > new Date() ? '进行中' : '已结束'
  })
  eventList.value = res
}

onBeforeMount(() => {
  loadEvenList()
})

const dialogVisible = ref(false)
const zeroForm = {
  name: '',
  startTime: '',
  endTime: '',
}
const form = ref(zeroForm)


const rules = ref({
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' }
  ],
  startTime: [
    { required: true, message: '请选择开始时间', trigger: 'change' }
  ],
  endTime: [
    { required: true, message: '请选择结束时间', trigger: 'change' }
  ],
  maxVotesPerUser: [
    { required: true, message: '请输入最大可投票数', trigger: 'blur' }
  ]
})

const handleAdd = () => {
  form.value = zeroForm
  dialogVisible.value = true
}

const pad = (num)  =>{
  return num.toString().padStart(2, '0');
}
const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}`
}

const handleConfirm = () => {
  if (form.value.id) {
    updateEvent(form.value)
  } else {
    addEvent()
  }
}
const addEvent = async () => {
  formRef.value.validate(async valid => {
    if (valid) {
      form.value.startTime = formatTime(new Date(form.value.startTime))
      form.value.endTime = formatTime(new Date(form.value.endTime))
      await addEventReq(form.value)
      Message.success('添加成功')
      dialogVisible.value = false
      await loadEvenList()
    }
  })
}

const showUpdate = (row) => {
  form.value = { ...row }
  dialogVisible.value = true
}
const updateEvent = async () => {
  formRef.value.validate(async valid => {
    if (valid) {
      form.value.startTime = formatTime(new Date(form.value.startTime))
      form.value.endTime = formatTime(new Date(form.value.endTime))
      await updateEventReq(form.value)
      Message.success('修改成功')
      dialogVisible.value = false
      await loadEvenList()
    }
  })
}
</script>
<style scoped lang="scss">

</style>