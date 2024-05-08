<template>
  <div class="my-table-content-wrap">
    <div class="my-table-el-table-wrap">
      <el-table :data="dataSource.list" :flexible="true"
                size="large"
                :class="['my-table-content', columnOptions?.hoverSelection ? 'hover-selection' : '', columnOptions?.autoPadding ?? true ? '' : 'cancel-auto-padding']"
                ref="elTableRef" @row-click="rowClick" @sort-change="sortChange" @selection-change="selectionChange"
                row-key="fileId"
                @select="select" :row-class-name="({ row }) => row.selected ? 'my-table-row-selected' : ''">
        <!-- 复选框 -->
        <el-table-column class-name="my-table-selection" v-if="columnOptions?.showSelection ?? true"
                         type="selection" width="50" align="center"></el-table-column>
        <!-- 序号 -->
        <el-table-column v-if="(columnOptions?.showIndex ?? true)" label="序号" type="index" width="60"
                         align="center"></el-table-column>

        <!-- 数据列 -->
        <el-table-column v-for="(column, index) in columns" :key="index" :prop="column.prop" :label="column.label"
                         :width="column?.width" :min-width="column.minWidth" :align="column.align || 'left'"
                         :sortable="column.sortable || false">
          <template #default="scope">
            <slot :name="column.prop" :index="scope.$index" :column="scope.column" :row="scope.row">
              {{ scope.row[column.prop] }}
            </slot>
          </template>
        </el-table-column>
        <template #empty>
          <slot name="empty">
            <div class="my-table-empty">
              <el-empty :image-size="200" />
            </div>
          </slot>
        </template>
        <template #append>
          <slot name="append"></slot>
        </template>
      </el-table>

    </div>
    <div class="my-table-pagination" v-if="columnOptions.showPagination">
      <el-pagination v-if="dataSource.total" :total="dataSource.total" hide-on-single-page
                     :page-size="dataSource.pageSize" :current-page="dataSource.pageNo" :page-count="dataSource.totalPage"
                     @update:current-page="pageNoChange" layout="prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
  columns: {
    type: Array,
    default: () => {
      return []
    }
  },
  dataSource: {
    type: Object,
    default: () => {
      return {
        total: 0,
        totalPage: 0,
        pageNo: 1,
        pageSize: 20,
        list: []
      }
    }
  },
  columnOptions: {
    type: Object,
    default: () => {
      return {
        autoPadding: true,
        showIndex: true,
        showPagination: true,
        showSelection: true,
        hoverSelection: true,
        mouseFrameSelection: true,
        mouseFrameSelectionConfig: {
          boxStyle: {},
        }
      }
    }
  },
})
const elTableRef = ref(null)
const emit = defineEmits(['pageNoChange', 'rowClick', 'selectionChange', 'sortChange', 'select', 'scrollToBottom'])
const pageNoChange = (pageNo) => {
  emit('pageNoChange', pageNo)
}
const rowClick = (row) => {
  emit('rowClick', row)
}
const selectionChange = (selection) => {
  emit('selectionChange', selection)
}
const sortChange = (sort) => {
  emit('sortChange', sort)
}
const select = (selection, row) => {
  emit('select', selection, row)
}


let elTableWrapper
// 触底事件
onMounted(() => {
  let preLoadHeight = 100
  elTableWrapper = document.querySelector('.el-scrollbar__wrap--hidden-default')
  elTableWrapper.addEventListener('scroll', () => {
    if (elTableWrapper.scrollTop + elTableWrapper.clientHeight + preLoadHeight >= elTableWrapper.scrollHeight) {
      emit('scrollToBottom')
    }
  })

})

defineExpose({
  getSelectionRows: () => {
    return elTableRef.value.getSelectionRows()
  },
  clearSelection: () => {
    elTableRef.value.clearSelection()
  },
  toggleRowSelection: (row) => {
    elTableRef.value.toggleRowSelection(row)
  },
  setCurrentRow: (row) => {
    elTableRef.value.setCurrentRow(row)
  },
  scrollTo: (y) => {
    elTableWrapper.scrollTo({
      top: y,
      behavior: 'smooth'
    })
  },
})
</script>

<style lang="scss" scoped>
.my-table-content-wrap {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // 解决el-table在flex:1的宽度自适应问题
  .my-table-el-table-wrap {
    flex: 1;
    position: relative;
    overflow: hidden;
    &:deep(.el-table--fit) {
      height: 100%;
    }
    .my-table-content {
      position: absolute;
      overflow: auto;
      overflow-y: scroll;

      // 去除表格底部横线
      &:deep(.el-table__inner-wrapper) {
        &::before {
          height: 0;
        }
      }

      &:deep(.el-table__empty-block) {
        position: absolute;
        height: 100%;
      }

      &:deep(.el-checkbox__input) {
        zoom: 120%;
      }
    }
    .cancel-auto-padding {
      &:deep(.el-table__cell) {
        padding: 0px;
      }
    }
    .hover-selection {
      &:deep(.el-table__row) {
        .el-checkbox {
          visibility: v-bind('columnOptions.hoverSelection ? "hidden" : "visible"');
        }

        &:hover {
          .el-checkbox {
            visibility: visible;
          }
        }
      }

      &:deep(.is-checked) {
        visibility: visible !important;
      }
    }
  }

  .my-table-pagination {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
}
</style>