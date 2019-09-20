<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
@import "./assets/style/zanui.wxss";
page {
  height: 100%;
  background-color: #600;
  background-image: linear-gradient(to bottom , #333, #666);
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  box-sizing: border-box;
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
.detail-title {
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  color: #333;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
}
.form-placeholder {
  color: #999;
}
.card {
  display: flex;
  padding: 20px;
  margin: 10px 20px;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  color: #666;
  font-size: 20px;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
}
.card-link {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
