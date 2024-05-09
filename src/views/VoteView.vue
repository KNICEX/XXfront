<template>
  <div class="wrap p-2 bg-white rounded-xl mt-5 pt-5 pb-5 h-full">

    <div class="header flex items-center">
      <h1 class="mr-5">投票</h1>
      <h4>剩余票数：{{userInfoStore.userInfo.point}}</h4>
    </div>
    <el-table :data="voteEventList" height="96%" size="large" @expand-change="handleEventChange">
      <el-table-column prop="name" label="活动名称"></el-table-column>
      <el-table-column sortable prop="startTime" label="开始时间"></el-table-column>
      <el-table-column sortable prop="endTime" label="结束时间"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{row}">
          <el-tag v-if="row.status === '进行中'" type="success">进行中</el-tag>
          <el-tag v-else type="info">已结束</el-tag>
        </template>
      </el-table-column>

      <el-table-column type="expand">
        <template #default="{row:eventRow}">
          <el-table :data="eventRankList[eventRow.id.toString()]">
            <el-table-column prop="rank" label="排名"></el-table-column>
            <el-table-column prop="athleteName" label="运动员"></el-table-column>
            <el-table-column prop="sport" label="项目"></el-table-column>
            <el-table-column prop="votes" label="票数"></el-table-column>
            <el-table-column label="操作">
              <template #default="{row:athleteRow}">
                <el-button type="success" :disabled="eventRow.status === '已结束'"  @click="handleVote(athleteRow.athleteId, eventRow.id)">投票</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import {reactive, ref} from 'vue'
import {  vote } from "@/api/vote.js"
import { getEventList } from "@/api/event.js"
import { getRankListByEvent } from "@/api/rank.js"
import { useUserInfoStore } from "@/stores/userInfo.js"
import Message from "@/utils/message.js"
import {onBeforeMount} from "vue"
const voteEventList = ref([])
const userInfoStore = useUserInfoStore()
onBeforeMount(async () => {
  let res = await getEventList()
  res.forEach(item => {
    const startTime = new Date(item.startTime)
    const endTime = new Date(item.endTime)
    item.startTime = startTime.toLocaleString()
    item.endTime = endTime.toLocaleString()
    item.status = endTime > new Date() ? '进行中' : '已结束'
  })
  voteEventList.value = res
})

const eventRankList = reactive({})
const loadEventRank = async (id) => {
  eventRankList[id.toString()] = await getRankListByEvent(id)
}

const handleEventChange = (row) => {
  loadEventRank(row.id)
}

const handleVote = async (athleteId, eventId) => {
  await vote({
    userId: userInfoStore.userInfo.id,
    athleteId,
    voteEventId: eventId,
    votes: 1,
  })
  console.log(userInfoStore.userInfo)
  Message.success('投票成功')
  loadEventRank(eventId)

}
</script>

<style scoped>

</style>