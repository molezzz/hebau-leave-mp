<template>
  <div class="container">
    <div class="user-panel">
      <div class="userinfo">
        <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      </div>
      <div class="user-detial">
        <div class="user-detial-nickname">
          <div class="user-detial-name">{{userInfo.nickName}}</div> <div class="user-detial-position">动科 副院长</div>
        </div>
      </div>
    </div>

    <card>
      <div>本月累计请假</div>
      <div>
        <span class="holiday-count">1</span>次
      </div>
    </card>

    <card>
      <div>请假</div>
      <i class="zan-icon zan-icon-clock card-icon"></i>
    </card>

    <card>
      <div>销假</div>
      <i class="zan-icon zan-icon-edit card-icon"></i>
      
    </card>

  </div>
</template>

<script>
import card from '@/components/card'
import wxp from 'minapp-api-promise'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    async getUserInfo () {
      // 调用登录接口
      try {
        await wxp.login()
        let info = await wxp.getUserInfo()
        this.userInfo = info.userInfo
      } catch (err) {
        console.log(err)
      }
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style>
.user-panel {
  width: 100%;
  display: flex;
  margin-bottom: 15px;
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 96rpx;
  height: 96rpx;
  margin: 5rpx;
  border-radius: 50%;
}

.user-detial {
  flex-flow: 1;
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.user-detial-nickname {
  color: #fff;
  font-size: 14px;
  
}
.user-detial-name {
  font-size: 16px;
}
.user-detial-position {
  font-size: 14px;
  color: #bbb;
}
.holiday-count {
  font-size: 32px;
  color: #900;
  box-sizing: border-box;
  padding: 10px;
}
.card-icon {
  font-size: 20px;
}
</style>
