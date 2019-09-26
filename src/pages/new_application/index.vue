<template>
<div>
  <div class="card detail">
    <h1 class="detail-title">请假申请</h1>
    <van-cell-group  title="时间事由">
      <van-field
        label="开始日期"
        :value="data.begin_at"
        placeholder="请选择时间"
        required
        :border="false"
        @click="showDatePicker('begin_at')"
        :error-message="formError.begin_at"
      />
      <van-field
        label="结束日期"
        :value="data.end_at"
        placeholder="请选择时间"
        required
        :border="false"
        @click="showDatePicker('end_at')"
        :error-message="formError.end_at"
      />
      <van-field
        :value="data.tel"
        label="联系电话"
        required
        placeholder="请输入联系电话"
        :border="false"
        @change="fieldChange('tel', $event)"
        :error-message="formError.tel"
      />
      <van-field
        :value="data.address"
        label="外出地点"
        required
        placeholder="请输入外出地点"
        :border="false"
        @change="fieldChange('address', $event)"
        :error-message="formError.address"
      />
      <van-field
        :value="data.cause"
        label="事由"
        type="textarea"
        placeholder="请输入请假事由"
        autosize
        required
        :border="false"
        @change="fieldChange('cause', $event)"
        :error-message="formError.cause"
      />
    </van-cell-group>
    <van-cell-group title="工作代管人">
      <van-field
        :value="data.agent"
        label="姓名"
        required
        placeholder="请输入代管人姓名"
        :border="false"
        @change="fieldChange('agent', $event)"
        :error-message="formError.agent"
      />
      <van-field
        :value="data.agent_office"
        label="岗位"
        required
        placeholder="请输入代管人岗位"
        :border="false"
        @change="fieldChange('agent_office', $event)"
        :error-message="formError.agent_office"
      />
      <van-field
        :value="data.agent_mobile"
        label="手机号"
        required
        placeholder="请输入代管人手机号"
        :border="false"
        @change="fieldChange('agent_mobile', $event)"
        :error-message="formError.agent_mobile"
      />
      <van-field
        :value="data.agent_office_tel"
        label="办公电话"
        placeholder="请输入代管人办公电话"
        :border="false"
        @change="fieldChange('agent_office_tel', $event)"
        :error-message="formError.agent_office_tel"
      />
    </van-cell-group>
    <van-button type="primary" block style="margin-top: 2rem" @click="onSubmit">提交</van-button>
  </div>
  <van-popup :show="datePickerShow" @close="onDatePickerClose" position="bottom">
    <van-datetime-picker
        type="date"
        :min-date="minDate"
        :value="currentDate"
        @confirm="onDatePickerConfirm"
        @cancel="datePickerShow = false"
      />
  </van-popup>
</div>
</template>

<script>
// import { formatTime } from '@/utils/index'
import card from '@/components/card'
import dayjs from 'dayjs'
import { api, currentUser } from '@/utils/index'

export default {
  data () {
    return {
      data: {
        begin_at: null,
        end_at: null,
        address: '',
        tel: '',
        cause: '',
        agent: '',
        agent_office: '',
        agent_mobile: '',
        agent_office_tel: ''
      },
      formError: {
        begin_at: null,
        end_at: null,
        address: null,
        cause: null,
        agent: null,
        agent_office: null,
        agent_mobile: null,
        agent_office_tel: null
      },
      datePickerShow: false,
      timeKind: null,
      minDate: dayjs().add(-2, 'day').valueOf(),
      currentDate: new Date().getTime()
    }
  },
  components: {
    card
  },
  methods: {
    fieldChange (key, evt) {
      this.data[key] = evt.mp.detail
    },
    showDatePicker (kind) {
      console.log(kind)
      this.datePickerShow = true
      this.timeKind = kind
    },
    timeDisplay (kind) {
      let time = kind === 'begin_at' ? this.data.begin_at : this.date.end_at
      return dayjs(time).format('YYYY-MM-DD')
    },
    onDatePickerClose () {
      this.datePickerShow = false
    },
    onDatePickerConfirm (evt) {
      console.log(evt)
      let stamp = evt.mp.detail
      this.datePickerShow = false
      console.log(this.timeKind)
      this.data[this.timeKind] = dayjs(stamp).format('YYYY-MM-DD')
    },
    checkForm () {
      let keys = [
        'begin_at', 'end_at', 'tel', 'address', 'cause', 'agent', 'agent_office', 'agent_mobile'
      ]
      for (let i in keys) {
        let k = keys[i]
        this.formError[k] = null
        if (this.data[k] === null || this.data[k] === '') {
          console.log(k, this.data[k])
          this.formError[k] = '此项不能为空'
          return false
        }
      }
      if (dayjs(this.data.end_at).unix() < dayjs(this.data.begin_at).unix()) {
        this.formError.end_at = '结束时间不得早于开始时间'
        return false
      }
      return true
    },
    async onSubmit () {
      console.log(this.data)
      if (!this.checkForm()) {
        return false
      }
      let result = await api({
        url: '/records.json',
        method: 'POST',
        data: {
          record: this.data
        }
      })
      if (!result.error) {
        // reset from
        for (let key in this.data) {
          this.data[key] = null
        }
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 3000,
          success: () => {
            wx.redirectTo({ url: `../index/main` })
          }
        })
      } else {
        wx.showToast({
          title: '保存失败！' + result.message,
          icon: 'none',
          duration: 3000
        })
      }
    }
  },
  created () {
    let user = currentUser()
    if (user) {
      this.data.tel = user.mobile
    }
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
