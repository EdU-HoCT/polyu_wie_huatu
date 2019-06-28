// common.js defines all api connection
var common_js = require('utils/common.js')

App({
    onLaunch: function () {
        console.log('App Launch')
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false
    },
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
        //get audio from server to prevent loading delay.
        this.globalData.audio_correct = wx.createInnerAudioContext()
        this.globalData.audio_correct.src = 'https://huatu.project.tszho.me/CoolAdmin-master/images/front-end/multiple_choice/correct.mp3'

        this.globalData.audio_fighting = wx.createInnerAudioContext()
        this.globalData.audio_fighting.src = 'https://huatu.project.tszho.me/CoolAdmin-master/images/front-end/multiple_choice/fighting.mp3'

        this.globalData.audio_result = wx.createInnerAudioContext()
        this.globalData.audio_result.src = 'https://huatu.project.tszho.me/CoolAdmin-master/images/front-end/multiple_choice/result.mp3'
    },
    globalData: {
        userInfo: null,
        audio_correct: null,
        audio_fighting: null,
        audio_result: null
    },
    //define all api connection
    func: {
        requestTestOption: common_js.requestTestOption,
        requestTestDetail: common_js.requestTestDetail,
        requestTestResult: common_js.requestTestResult,
        requestTestResult_Option: common_js.requestTestResult_Option,
        submitTestResult: common_js.submitTestResult,
        requestUserData: common_js.requestUserData,
        requestArticle: common_js.requestArticle
    }
});