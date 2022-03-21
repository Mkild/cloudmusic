<template>
  <div class="pagination" v-if="total > pageSize">
    <el-pagination
      background
      :pageSize="pageSize"
      :total="total"
      layout="prev, pager, next"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: ['pageSize', 'total'],
  }
</script>

<style lang="scss" scoped>
  .pagination {
    text-align: right;
  }
</style>
