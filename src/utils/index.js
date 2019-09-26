import wxp from 'minapp-api-promise'
import dayjs from 'dayjs'

const Platform = wx.getSystemInfoSync().platform
const CurrentUserKey = 'current_user'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export async function api (data) {
  let host = Platform === 'devtools' ? 'https://dev.auhzzb.cn:5000' : 'https://api.auhzzb.cn'
  let user = currentUser()
  if (data.url && !data.url.startsWith('http')) {
    data.url = `${host}${data.url}`
  }
  if (user) {
    data = Object.assign({}, { header: {
      Authorization: `Bearer ${user.jwt_token}`
    } }, data)
  }
  console.log(data)
  try {
    let result = await wxp.request(data)
    if (result.statusCode === 422) {
      return { error: 'vaild_error', message: '表单验证错误', data: result.data }
    }
    if (result.data && result.data.error) {
      wx.showToast({
        title: result.data.message,
        icon: 'none',
        duration: 2000
      })
    }
    return result.data
  } catch (err) {
    return { error: 'system_error', data: err }
  }
}

export function currentUser () {
  try {
    let user = wx.getStorageSync(CurrentUserKey) || {}
    if (user.jwt_token && user.expiredAt > dayjs().unix()) {
      return user
    }
    wx.removeStorageSync(CurrentUserKey)
    return null
  } catch (err) {
    console.log(err)
    return null
  }
}

export function updateCurrentUser (data) {
  let user = currentUser()
  if (!user) {
    return false
  }
  user = Object.assign({}, user, data)
  wx.setStorageSync(CurrentUserKey, user)
  return user
}

export async function login (mobile) {
  let user = {}
  try {
    let loginData = await wxp.login()
    let result = await api({
      url: '/users/login.json',
      method: 'POST',
      data: {
        user: {
          code: loginData.code,
          mobile: mobile
        }
      }
    })
    if (!result.error) {
      user = Object.assign({}, result, { expiredAt: dayjs().add(90, 'day').unix() })
      wx.setStorageSync(CurrentUserKey, user)
      return user
    }

    return result
  } catch (err) {
    console.error(err)
    return { error: 'system_error', data: err }
  }
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime,
  api
}
