<template>
<div>
  <card card-class="detail">
    <h1 class="detail-title">请假申请</h1>
    <div class="detail-list">
      <div class="detail-list__item">
        <div class="detail-list__item-label">请假时间:</div>
        <div class="detail-list__item-content">2018-06-01 至 2018-05-30</div>
      </div>
      <div class="detail-list__item">
        <div class="detail-list__item-label">请假事由:</div>
        <div class="detail-list__item-content">这个事由非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长</div>
      </div>
      <div class="detail-list__item">
        <div class="detail-list__item-label">本月累计:</div>
        <div class="detail-list__item-content">1次</div>
      </div>
    </div>
  </card>
  <div class="steps-title">审批进度</div>
  <card card-class="steps-card">
    <zan-steps type="vertical" :steps="steps" :has-desc="true"></zan-steps>
    <button class="zan-btn zan-btn--primary">审批通过</button>
  </card>
</div>
</template>

<script>
// import { formatTime } from '@/utils/index'
import card from '@/components/card'
import ZanSteps from 'mpvue-zanui/src/components/zan/steps'

export default {
  components: {
    card,
    ZanSteps
  },

  data () {
    return {
      steps: [
        {
          text: 'xxx 发起申请',
          desc: '2018-06-01 12:00',
          done: true
        },
        {
          text: '单位领导通过',
          desc: '2018-06-01 13:00',
          done: true
        },
        {
          text: '校级领导通过',
          desc: '2018-06-01 13:00',
          done: true
        },
        {
          text: '组织部备案',
          current: true
        }
      ]
    }
  },
  methods: {
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
.detail-list__item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
  text-align: left;
  padding: 10px 0;
  border-top:  1px solid #EEE;
}
.detail-list__item-label {
  min-width: 30%;
  max-width: 30%;
}
.detail-list__item-content {
  flex-grow: 1;
}
.steps-card {
  margin-bottom: 20px;
}
.steps-title {
  font-size: 16px;
  color: #EEE;
  margin: 15px 20px;
}
.zan-btn {
  margin: 10px 0;
}
</style>
