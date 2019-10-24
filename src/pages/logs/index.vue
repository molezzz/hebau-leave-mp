<template>
  <div class="log-list">
    <h1 class="page-title">{{kind == 'normal' ? '请假记录' : '待销假'}}</h1>
    <div class="log-list__item" v-for="(log, k) in logs" :key="k">
      <i class="log-list__item-circle"></i>
      <div class="card">
        <div @click="showDetail(log)" class="card-link">
          <div>
            <div class="log-list__item-date">{{ log.begin_at}}</div>
            <div class="log-list__item-detail">{{log.cause}}</div>
            <div>
              <van-tag round type="danger" v-if="!log.back_at">未销假</van-tag>
              <van-tag plain type="success" v-if="log.status != 'created'">已通过</van-tag>
            </div>
          </div>
          <div> {{log.duration}} 天</div>
        </div>
      </div>
    </div>
    <van-button v-if="pageInfo.next_page" style="margin-top: 2rem" :loading="loading" type="primary" block size="small" @click="loadItems">查看更多</van-button>
  </div>
</template>

<script>
// import { formatTime } from '@/utils/index'
import dayjs from 'dayjs'
import { api, formatTime } from '@/utils/index'
// import ZanSteps from 'mpvue-zanui/src/components/zan/steps'

export default {
  data () {
    return {
      logs: [],
      loading: false,
      kind: 'normal',
      pageInfo: {}
    }
  },
  filters: {
    formatTime
  },
  methods: {
    showDetail (log) {
      const url = '../detail/main?id=' + log.id
      wx.navigateTo({ url })
    },
    duration (item) {
      return dayjs(item.end_at).diff(dayjs(item.begin_at), 'day')
    },
    async loadItems () {
      if (this.loading || !this.pageInfo.next_page) return
      let params = {
        page: this.pageInfo.next_page,
        perpage: this.pageInfo.perpage
      }
      if (this.kind === 'unback') {
        params['q[back_at_null]'] = 1
      }
      console.log(params)
      this.loading = true
      let result = await api({
        method: 'GET',
        url: '/records.json',
        data: params
      })
      this.loading = false
      if (!result.items) return
      result.items.forEach(item => {
        item.duration = this.duration(item)
        item.begin_at = formatTime(item.begin_at, 'YYYY年M月D日')
        this.logs.push(item)
      })
      // console.log(this.logs)
      this.pageInfo = Object.assign({}, this.pageInfo, result.page_info)
    }
  },
  onLoad (options) {
    console.log('loaded ........', options)
    if (options.kind) {
      this.kind = options.kind
    } else {
      this.kind = 'normal'
    }
    this.pageInfo = {
      current_page: 1,
      next_page: 1,
      pervious_page: null,
      total_page: 1,
      perpage: 5
    }
    this.logs = []
    this.loadItems()
  }
}
</script>

<style>
.page-title {
  font-size: 24px;
  color: #FFF;
  margin: 20px 0;
}
.log-list {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

.log-item {
  margin: 10rpx;
}
.log-list__item {
  padding-left: 20px;
  min-height: 16px;
  position: relative;
}
.log-list__item-circle {
  width: 10px;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #ddd;
  border-radius: 100%;
}
.log-list__item:after {
  content: ' ';
  position: absolute;
  left: 4px;
  top: 0;
  bottom: 0;
  z-index: 0;
  border-left: 1px solid #ddd;
}
.log-list__item-date {
  color: #333;
}
.log-list__item-detail {
  font-size: 14px;
  color: #666;
}
.card {
  margin-left: 0;
}
</style>
