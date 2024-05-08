<template>
  <div class="wrap p-2 bg-white rounded-xl mt-5 pt-5 h-full">
    <el-descriptions title="用户信息">
      <el-descriptions-item label="用户名">{{userInfoStore.userInfo.name}}</el-descriptions-item>
      <el-descriptions-item label="电话号码">18100000000</el-descriptions-item>
      <el-descriptions-item label="剩余票数">
        <el-tag size="small">{{userInfoStore.userInfo.point}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="地址">
        {{userInfoStore.userInfo.address}}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script setup>
import { useUserInfoStore } from "@/stores/userInfo.js"
import {onMounted} from "vue";
const userInfoStore = useUserInfoStore()

onMounted(() => {
  console.log(userInfoStore.userInfo)
})
</script>



<style lang="scss" scoped>

</style>