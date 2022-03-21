<template>
  <div class="Subscribers" ref="subscribers">
    <template v-if="loading">
      <Loading :loading="loading" />
    </template>
    <template v-else>
      <Subscriber
        :subscriber="subscriber"
        :key="subscriber.userId"
        v-for="subscriber in subscribers"
        class="subscriber"
      />
      <Pagination
        :current-page.sync="currentPage"
        :page-size="PAGE_SIZE"
        :total="total"
        @current-change="onPageChange"
        class="pagination"
      />
    </template>
    <empty v-if="!shouldSubscriberShow" class="nosubscriber">暂无收藏者</empty>
  </div>
</template>

<script>
  import { getListSubscribers } from '@/api'
  import { getPageOffset, scrollInto } from '@/utils'
  import Subscriber from './Subscriber'

  const PAGE_SIZE = 60

  export default {
    name: 'Subscribers',
    components: { Subscriber },
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    created() {
      this.PAGE_SIZE = PAGE_SIZE
    },
    data() {
      return {
        loading: false,
        subscribers: [],
        total: 0,
        currentPage: 1,
      }
    },
    methods: {
      async getSubscriber() {
        this.loading = true
        const { subscribers = [], total } = await getListSubscribers({
          id: this.id,
          limit: PAGE_SIZE,
          offset: getPageOffset(this.currentPage, PAGE_SIZE),
        }).finally(() => {
          this.loading = false
        })
        this.subscribers = subscribers
        this.total = total
      },
      async onPageChange() {
        await this.getSubscriber()
        this.$nextTick(() => {
          scrollInto(this.$refs.subscribers)
        })
      },
    },
    watch: {
      id: {
        handler(newId) {
          if (newId) {
            this.currentPage = 1
            this.getSubscriber()
          }
        },
        immediate: true,
      },
    },
    computed: {
      shouldSubscriberShow() {
        return this.subscribers.length > 0
      },
    },
  }
</script>

<style lang="scss" scoped>
  .subscriber {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .pagination {
    text-align: right;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    padding-bottom: 60px;
  }
</style>
