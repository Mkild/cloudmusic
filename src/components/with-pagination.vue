<template>
  <div class="with-pagination">
    <slot></slot>
    <div class="pagination-wrap">
      <Pagination
        :current-page.sync="currentPage"
        :page-size="limit"
        :total="total"
        @current-change="onPageChange"
        class="pagination"
      />
    </div>
  </div>
</template>

<script>
  import { isDef, getPageOffset, scrollInto } from '@/utils'

  export default {
    name: 'WithPagination',
    props: {
      getData: {
        type: Function,
        required: true,
      },
      getDataParams: {
        type: Object,
        default: () => ({}),
      },
      limit: {
        type: Number,
        default: 10,
      },
      scrollTarget: {
        type: HTMLElement,
      },
      total: {
        type: Number,
        default: 0,
      },
    },
    created() {
      this.currentPage = 1
      this.init()
    },
    methods: {
      async init() {
        try {
          if (isDef(this.$route.query.page) && this.$route.query.page !== 1) {
            const result = await this.getResult(this.$route.query.page)
            if (parseInt(this.$route.query.page) !== this.currentPage) {
              // 重新发请求获取当前分页的总数
              const initData = await this.getResult(1, 1)
              result.count = initData.count
            }
            this.currentPage = parseInt(this.$route.query.page) || 1
            this.$emit('getDataSuccess', result)
          } else {
            this.currentPage = 1
            const result = await this.getResult(1)
            this.$emit('getDataSuccess', result)
          }
          // 如果传入了滚动的目标对象 分页后自动滚入
          if (this.scrollTarget) {
            scrollInto(this.scrollTarget)
          }
        } catch (error) {
          this.$emit('getDataError', error)
        }
      },
      onPageChange() {
        this.$router.push({
          query: {
            area: this.$route.query.area,
            type: this.$route.query.type,
            order: this.$route.query.order,
            page: this.currentPage,
          },
        })
      },
      getResult(page, limit = this.limit) {
        return this.getData({
          limit: limit,
          offset: getPageOffset(page, limit),
          ...this.getDataParams,
        })
      },
    },
    watch: {
      getDataParams: {
        deep: true,
        handler() {
          this.init()
        },
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pagination-wrap {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 60px;
  }
</style>
