<template>
<div>
  <div class="card detail">
    <h1 class="detail-title">请假申请</h1>
    <div class="detail-list">
      <div class="detail-list__item">
        <div class="detail-list__item-content">
          <picker mode="date" :value="data.beginAt" start="2018-09-01" end="2025-09-01" @change="beginChanged">
            <view class="picker">
              开始日期：{{data.beginAt || ''}}
            </view>
          </picker>
        </div>
      </div>
      <div class="detail-list__item">
        <div class="detail-list__item-content">
          <picker mode="date" :value="data.endAt" start="2018-09-01" end="2025-09-01" @change="endChanged">
            <view class="picker">
              结束日期：{{data.endAt || ''}}
            </view>
          </picker>
        </div>
      </div>
      <div class="detail-list__item">
        <div class="detail-list__item-label">请假事由:</div>
        <div class="detail-list__item-content">
           <textarea placeholder="请填写请假事由" :value="data.cause" @input="causeInput"/>
        </div>
      </div>
    </div>
    <button class="zan-btn zan-btn--primary">提交</button>
  </div>
</div>
</template>

<script>
// import { formatTime } from '@/utils/index'
import card from '@/components/card'

export default {
  data () {
    return {
      data: {
        beginAt: null,
        endAt: null,
        cause: ''
      }
    }
  },
  components: {
    card
  },
  methods: {
    beginChanged (evt) {
      // console.log(evt)
      this.data.beginAt = evt.mp.detail.value
    },
    endChanged (evt) {
      // console.log(evt)
      this.data.endAt = evt.mp.detail.value
    },
    causeInput (evt) {
      this.data.cause = evt.mp.detail.value
    }
  },
  created () {
  }
}
</script>

<style>
.detail,.steps-card {
  flex-direction: column;
  align-items: stretch;
}
.picker {
  width: 100%;
  height: 100%;
}
.zan-btn {
  margin: 10px 0;
}
</style>
