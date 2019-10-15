<template>
<div>
  <div class="card detail">
    <h1 class="detail-title">请假申请</h1>
    <div class="detail-list">
      <div class="detail-list__item">
        <div class="detail-list__item-label">请假时间:</div>
        <div class="detail-list__item-content">{{record.begin_at}} 至 {{record.end_at}}</div>
      </div>
      <div class="detail-list__item">
        <div class="detail-list__item-label">请假事由:</div>
        <div class="detail-list__item-content">{{record.cause}}</div>
      </div>
      <div class="detail-list__item">
        <div class="detail-list__item-label">联系电话:</div>
        <div class="detail-list__item-content">{{record.tel}}</div>
      </div>
      <div class="detail-list__item">
        <div class="detail-list__item-label">代管人:</div>
        <div class="detail-list__item-content">{{record.agent}}</div>
      </div>
      <div class="detail-list__item">
        <div class="detail-list__item-label">代管人电话:</div>
        <div class="detail-list__item-content">{{record.agent_mobile}}</div>
      </div>
      <van-button @click="downloadPdf(record)" plain type="primary" block size="normal" style="margin-top: 1rem">下载 PDF</van-button>
    </div>
  </div>
  <div class="steps-title">审批进度</div>
  <div class="card steps-card">
    <van-steps :steps="steps" :active="currentStep" direction="vertical"></van-steps>
    <van-button type="primary" block>审批通过</van-button>
  </div>
</div>
</template>

<script>
import { api, apiUrl, formatTime } from '@/utils/index'
import dayjs from 'dayjs'

// const STATUS_MAP = {
//   created: '发起申请',
//   superior: '单位领导通过',
//   college: '校领导通过',
//   filing: '组织部备案'
// }

export default {
  components: {
  },

  data () {
    return {
      steps: [],
      currentStep: 0,
      record: {}
    }
  },
  methods: {
    async loadData (id) {
      let result = await api({
        url: `/records/${id}`,
        method: 'GET'
      })
      if (!result.error) {
        let logs = {}
        // 解决组件中状态不更新问题
        let steps = [
          {
            text: '发起申请',
            desc: '-',
            key: 'created'
          },
          {
            text: '单位领导通过',
            key: 'superior',
            desc: '-'
          },
          {
            text: '校级领导通过',
            key: 'college',
            desc: '-'
          },
          {
            text: '组织部备案',
            key: 'filing',
            desc: '-'
          }
        ]
        this.currentStep = 0
        this.record = result
        this.record.begin_at = formatTime(this.record.begin_at)
        this.record.end_at = formatTime(this.record.end_at)
        this.record.logs.forEach((log) => {
          logs[log.kind] = dayjs(log.created_at).format('YYYY-M-D hh:mm')
        })
        for (let i = 0; i < steps.length; i++) {
          let step = steps[i]
          if (logs[step.key]) {
            step.desc = logs[step.key]
            this.currentStep = i
          }
        }
        steps[0].desc = dayjs(this.record.created_at).format('YYYY-M-D hh:mm')
        this.steps = steps
      }
    },
    downloadPdf (record) {
      let task = wx.downloadFile({
        url: apiUrl(`/records/${record.id}.pdf`),
        success: (res) => {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: (res) => {
              console.log('打开文档成功')
            }
          })
        }
      })
      task.onProgressUpdate((res) => {
        console.log('下载进度', res.progress)
        console.log('已经下载的数据长度', res.totalBytesWritten)
        console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
      })
    }
  },
  onLoad (options) {
    console.log(options)
    this.loadData(options.id)
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
