<template>
  <div class="wrap p-2 bg-white rounded-xl mt-5 pt-5 h-full">
    <MyTable :columns="Column" :data-source="dataSource" :column-options="ColumnOption">
    </MyTable>

  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getRankList } from "@/api/rank"
import {onBeforeMount} from "vue"
import MyTable from "@/components/MyTable.vue";

const dataSource = ref({
  total: 0,
  totalPage: 0,
  pageNo: 1,
  pageSize: 20,
  list: []
})
onBeforeMount(async () => {
  dataSource.value.list = await getRankList()
})

const Column = [
  {
    prop: 'rank',
    label: '排名',
    width: 100
  },
  {
    prop: 'athleteName',
    label: '运动员',
  },
  {
    prop: 'sport',
    label: '项目',
  },
  {
    prop: 'votes',
    label: '票数',
    width: 200
  }
]
const ColumnOption = {
  showSelection: false,
  showIndex: false,
}
</script>



<style lang="scss" scoped>
.wrap {
  overflow: scroll;
}
</style>