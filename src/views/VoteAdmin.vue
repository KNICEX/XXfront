<template>
  <div class="wrap p-2 bg-white rounded-xl mt-5 pt-5 h-full">
    <div class="header">
      <h1>投票管理</h1>
    </div>
    <el-table :data="voteList">

    </el-table>
  </div>
</template>
<script setup>
import {onBeforeMount, ref} from 'vue'
import { getAllVotes } from "@/api/vote.js"

const voteList = ref([])
onBeforeMount(async () => {
  let res = await getAllVotes()
  voteList.value = res
})

</script>
<style scoped lang="scss">

</style>