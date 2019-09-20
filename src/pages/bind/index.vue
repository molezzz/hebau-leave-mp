<template>
<div>
  <div class="card detail">
    <h1 class="detail-title">尚未绑定手机号，请填写您的手机号</h1>
    <div class="detail-list">
      <div class="detail-list__item">
        <div class="detail-list__item-label">手机号:</div>
        <div class="detail-list__item-content" style="padding:10px">
           <input placeholder="请填写手机号" :value="code" @input="codeInput"/>
        </div>
      </div>
    </div>
    <van-button type="primary" block @click="bind">绑定</van-button>
  </div>
</div>
</template>

<script>
// import { formatTime } from '@/utils/index'
import card from '@/components/card'
import { login } from '@/utils/index'

export default {
  data () {
    return {
      code: null
    }
  },
  components: {
    card
  },
  methods: {
    codeInput (evt) {
      this.code = evt.mp.detail.value
    },
    async bind () {
      if (!this.code || this.code === '') {
        wx.showToast({
          title: '请输入手机号后再点保存',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      // console.log(this.code)
      let result = await login(this.code)
      if (result.error) {
        wx.showToast({
          title: result.message,
          icon: 'none',
          duration: 5000
        })
        return false
      } else {
        // 登陆成功
        wx.reLaunch({ url: `../index/main` })
      }
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
.detail-list__item {
  align-items: center;
}
.zan-btn {
  margin: 10px 0;
}
</style>
