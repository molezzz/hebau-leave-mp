<template>
  <div class="log-list">
    <h1 class="page-title">请假记录</h1>
    <div class="log-list__item">
      <i class="log-list__item-circle"></i>
      <card>
        <div @click="showDetail" class="card-link">
          <div>
            <div class="log-list__item-date">2018年6月1日</div>
            <div class="log-list__item-detail">拉肚子</div>
          </div>
          <div> 2 天</div>
        </div>
      </card>
    </div>
    <div class="log-list__item">
      <i class="log-list__item-circle"></i>
      <card>
        <div @click="showDetail" class="card-link">
          <div>
            <div class="log-list__item-date">2018年5月30日</div>
            <div class="log-list__item-detail">去吃麻小</div>
          </div>
          <div> 1 天</div>
        </div>
      </card>
    </div>

  </div>
</template>

<script>
// import { formatTime } from '@/utils/index'
import card from '@/components/card'
// import ZanSteps from 'mpvue-zanui/src/components/zan/steps'

export default {
  components: {
    card
  },

  data () {
    return {
      logs: []
    }
  },
  methods: {
    showDetail () {
      const url = '../detail/main'
      wx.navigateTo({ url })
    }
  },
  created () {
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
