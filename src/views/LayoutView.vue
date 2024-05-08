<template>
  <div class="wrap">
    <div class="header">
      <el-menu :default-active="activeName" :ellipsis="false" mode="horizontal" @select="handleSelect">
        <el-menu-item>
          <LogoView :height="50" color="#0282C6"/>
        </el-menu-item>
        <div class="grow"/>
        <el-menu-item index="rank">排名</el-menu-item>
        <el-menu-item index="vote">投票</el-menu-item>
        <el-menu-item index="user">{{userInfoStore.userInfo?.name}}</el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer"></div>
    <div class="bg"></div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import LogoView from "@/views/LogoView.vue"
import  { useRouter, useRoute } from "vue-router"

import { useUserInfoStore } from "@/stores/userInfo.js"
const userInfoStore = useUserInfoStore()
const router = useRouter()
const route = useRoute()

const activeName = ref(route.name)

const handleSelect = (index) => {
  router.push({name: index})
}
</script>


<style lang="scss" scoped>
.content {
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 100px);
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-image: url('https://pic.imgdb.cn/item/663a0a0e0ea9cb14039a366f.jpg');
  background-size: cover;
}
</style>