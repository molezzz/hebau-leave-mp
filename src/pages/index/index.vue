<template>
  <div class="container">
    <div class="user-panel">
      <div class="userinfo">
        <img class="userinfo-avatar" v-if="userInfo.wxAvatarUrl" :src="userInfo.wxAvatarUrl" background-size="cover" />
      </div>
      <div class="user-detial">
        <div class="user-detial-nickname" v-if="userInfo && userInfo.department">
          <div class="user-detial-name">{{userInfo.realname}}</div> <div class="user-detial-position">{{userInfo.department.name}} {{userInfo.job}}</div>
        </div>
      </div>
    </div>

    <card>
      <a class="card-link" @click="gotoLogs">
        <div>本月累计请假</div>
        <div>
          <span class="holiday-count">1</span>次
        </div>
      </a>
    </card>

    <card>
      <a @click="newApplication" class="card-link">
        <div>请假</div>
        <i class="zan-icon zan-icon-clock card-icon"></i>
      </a>
    </card>

    <card>
      <div>销假</div>
      <i class="zan-icon zan-icon-edit card-icon"></i>
      
    </card>
    <van-popup
      :show="showPop"
      position="bottom"
      overlay="true"
      close-on-click-overlay="false"
      @close="onPopClose"
    >
      <van-panel title="登录授权" use-footer-slot>
        <view class="userinfo-pop-content">
          您好，使用本系统时需要您微信授权并绑定手机号。
        </view>
        <view slot="footer">
          <van-button @getuserinfo="onPopGetUserInfo" type="primary"  block="true" style="width: 100%" open-type="getUserInfo">授权</van-button>
        </view>
      </van-panel>
    </van-popup>
  </div>
</template>

<script>
import card from '@/components/card'
import wxp from 'minapp-api-promise'
import { currentUser, login, updateCurrentUser } from '@/utils/index'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      showPop: false
    }
  },

  components: {
    card
  },

  methods: {
    gotoLogs () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    async getUserInfo () {
      let user = currentUser()

      if (!user) {
        user = await login()
      }

      console.log(user)
      if (user.error && user.error === 'openid_not_found') {
        wx.redirectTo({ url: `../bind/main` })
        return false
      }

      try {
        let info = await wxp.getUserInfo()
        this.setUserInfo(info)
      } catch (err) {
        console.log(err)
        this.showPop = true
        return false
      }
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    newApplication () {
      const url = '../new_application/main'
      wx.navigateTo({ url })
    },
    async setUserInfo (info) {
      // console.log(info)
      let result = updateCurrentUser({ wxAvatarUrl: info.userInfo.avatarUrl })
      // console.log(result)
      if (result) {
        this.userInfo = result
      }
    },
    onPopClose () {
      console.log('close pop')
    },
    onPopGetUserInfo (evt) {
      this.showPop = false
      this.setUserInfo(evt.target)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
    // console.log('create !!!!!!!!!!!!')
  },
  onLoad (options) {
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
.card {
  width: 100%;
}
.userinfo-pop-content  {
  padding: 20px;
}
</style>
