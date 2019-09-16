<template>
<div>
  <div class="card detail">
    <h1 class="detail-title">请填写您的手机号</h1>
    <div class="detail-list">
      <div class="detail-list__item">
        <div class="detail-list__item-label">手机号:</div>
        <div class="detail-list__item-content">
           <input placeholder="请填写手机号" :value="code" @input="codeInput"/>
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
      code: null
    }
  },
  components: {
    card
  },
  methods: {
    codeInput (evt) {
      this.code = evt.mp.detail.value
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
