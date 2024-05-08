<template>
  <div class="wrap p-2 bg-white rounded-xl mt-5 pt-5 h-full">
    <div class="header">
      <h1>运动员排名</h1>
    </div>
    <el-table :data="rankList" size="large">
      <el-table-column prop="rank" label="排名"></el-table-column>
      <el-table-column prop="athleteName" label="运动员"></el-table-column>
      <el-table-column prop="sport" label="项目"></el-table-column>
      <el-table-column prop="votes" label="票数"></el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getRankList } from "@/api/rank"
import {onBeforeMount} from "vue"

const rankList = ref([])
onBeforeMount(async () => {
  rankList.value = await getRankList()
})

</script>



<style lang="scss" scoped>

</style>