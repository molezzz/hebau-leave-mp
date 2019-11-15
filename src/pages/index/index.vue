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

    <div class="card">
      <a class="card-link" @click="gotoLogs('normal')">
        <div>本月累计请假</div>
        <div>
          <span class="holiday-count">{{recordCount}}</span>次
        </div>
      </a>
    </div>

    <div class="card">
      <a @click="newApplication" class="card-link">
        <div>请假</div>
        <i class="zan-icon zan-icon-clock card-icon"></i>
      </a>
    </div>

    <div class="card">
      <a class="card-link" @click="gotoLogs('unback')">
        <div>销假</div>
        <i class="zan-icon zan-icon-edit card-icon"></i>
      </a>
    </div>
    <van-panel class="record-panel" v-for="record in unreviewedRecords" :key="record.id" :title="'申请人：' + record.user.realname" status="待批准">
      <view class="record-panel__cause">
        <van-cell class="record-panel__cell" :title="'外出地：' + record.address" icon="location-o" />
        <van-cell :title="record.timeRange" icon="underway-o" />
        <van-cell :title="record.cause" icon="todo-list-o" />
      </view>
      <view>
        <van-button type="primary" block @click="showDetail(record)">查看</van-button>
      </view>  
    </van-panel>
    <van-popup
      :show="showPop"
      position="bottom"
      overlay="true"
      close-on-click-overlay="false"
      @close="onPopClose"
    >
      <van-panel title="登录授权" use-footer-slot>
        <view class="userinfo-pop-content">
          您好，使用本系统时需要您微信授权。
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
import dayjs from 'dayjs'
import { api, currentUser, login, updateCurrentUser } from '@/utils/index'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      showPop: false,
      recordCount: 0,
      unreviewedRecords: []
    }
  },

  components: {
    card
  },

  methods: {
    gotoLogs (kind) {
      let url = '../logs/main'
      if (kind) url = url + '?kind=' + kind
      wx.navigateTo({ url })
    },
    showDetail (log) {
      const url = '../detail/main?id=' + log.id
      wx.redirectTo({ url })
    },
    async getUserInfo () {
      let user = currentUser()
      // console.log('user  ------> :', user)
      if (!user) {
        user = await login()
      }

      console.log(user)
      if (user.error && user.error === 'openid_not_found') {
        wx.redirectTo({ url: `../bind/main` })
        return false
      }
      // 部门领导检查
      if (user.department && user.id === user.department.id) {
        console.log('Get Unreviewed Records ------> ')
        this.getUnreviewed()
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
    async getRecordCount () {
      let result = await api({
        url: '/users/record_count'
      })
      if (!result.error) {
        this.recordCount = result.total
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
    // 获取是否有待批准的申请
    async getUnreviewed () {
      let result = await api({
        url: '/records/unreviewed.json',
        method: 'GET'
      })
      console.log(result)
      result.items.forEach((item) => {
        let f = 'YYYY-MM-DD'
        item.timeRange = `${dayjs(item.begin_at).format(f)} 至 ${dayjs(item.end_at).format(f)}`
      })
      if (!result.error) {
        this.unreviewedRecords = result.items
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
    this.getRecordCount()
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
.record-panel {
  width: 100%;
  margin: 0.5rem auto;
}
.record-panel__cause {
  font-size: 0.6rem;
}
.record-panel__cause .van-cell__title {
  font-size: 14px;
}
</style>
