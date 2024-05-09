<template>
  <div class="wrap p-2 bg-white rounded-xl mt-5 pt-5 h-full">
    <div class="header">
      <h1>投票管理</h1>
    </div>
    <el-table :data="voteList" size="large" height="94%">
      <el-table-column prop="voteEvent.name" label="活动名称"></el-table-column>
      <el-table-column prop="user.userName" label="投票人"></el-table-column>
<!--      <el-table-column prop="voteTime" label="投票时间"></el-table-column>-->
      <el-table-column prop="athlete.name" label="投票运动员"></el-table-column>
      <el-table-column prop="athlete.sport" label="项目"></el-table-column>
      <el-table-column prop="votes" sortable label="票数"></el-table-column>


    </el-table>
  </div>
</template>
<script setup>
import {onBeforeMount, ref} from 'vue'
import { getAllVotes } from "@/api/admin.js"

const voteList = ref([])
onBeforeMount(async () => {
  let res = await getAllVotes()
  console.log(res)
  voteList.value = res
})

</script>
<style scoped lang="scss">

</style>