<template>
  <div class="wrap p-2 bg-white rounded-xl mt-5 pt-5 h-full">
    <div class="header">
      <h1>用户管理</h1>
    </div>
    <el-table :data="userList" size="large">
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="电话号码"></el-table-column>
      <el-table-column prop="point" label="剩余票数"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="authority" label="角色">
        <template #default="{row}">
          <el-tag v-if="row.authority === AdminAuthority" type="success">管理员</el-tag>
          <el-tag v-else type="info">普通用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100px">
        <template #default="{row}">
          <el-button type="danger" @click="banUser(row.id)" v-if="row.authority !== AdminAuthority">封禁</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { getAllUser } from "@/api/admin.js"
import {onBeforeMount} from "vue"
import { ref } from 'vue'
const userList = ref([])
const AdminAuthority = '1'
onBeforeMount(async () => {
  userList.value = await getAllUser()
})

const banUser = async (userId) => {
  console.log(userId)
}
</script>
<style scoped lang="scss">

</style>