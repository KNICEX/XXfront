<template>
  <div class="wrap">
    <div class="header">
      <el-menu :default-active="activeName" :ellipsis="false" mode="horizontal">
        <el-menu-item>
          <LogoView :height="50" color="#0282C6"/>
        </el-menu-item>
        <div class="grow"/>
        <el-menu-item index="rank">排名</el-menu-item>
        <el-menu-item index="vote">投票</el-menu-item>
        <el-menu-item index="about">{{userInfoStore.userInfo?.userName}}</el-menu-item>
      </el-menu>
    </div>
    <div class="content"></div>
    <div class="footer"></div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import LogoView from "@/views/LogoView.vue"
import { useUserInfoStore } from "@/stores/userInfo.js"
const userInfoStore = useUserInfoStore()


const activeName = ref('rank')
</script>


<style scoped>

</style>