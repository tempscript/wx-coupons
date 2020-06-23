// pages/index/index.js
import mockArr from './mock.js'
import {debounce} from "../../utils/util"
let winWidth = 414;
let winHeight = 736;
function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  let newObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
  return newObj
}

const app = getApp()

Page({
  data: {
    titleBarHeight: app.globalData.titleBarHeight,
    statusBarHeight: app.globalData.statusBarHeight,
    menuButton:app.globalData.menuButton,
    x: winWidth,
    y: winHeight,
    animationA: {},
    list: [],
    distance: "",
    startX: '', // 初始点X位置
    startY: '', // 初始点Y位置
    currentIndex: -1, // 当前最上层滑块
    ratio: 2 // 屏幕比例
  },
  onLoad: function () {
    var res = wx.getSystemInfoSync();
    winWidth = res.windowWidth;
    winHeight = res.windowHeight;
    console.log(res)
    let ratio = res.pixelRatio
    this.setData({ ratio })
    this.getList()
  },
  touchStart(e) {
    let index = e.currentTarget.dataset.index
    let touches = e.touches
    let list = this.data.list || []
    // 多点触摸让图片回到原位
    if (touches.length > 1) {
      list[index].x = 0
      list[index].y = winHeight
      that.setData({ list })
    } else if (index === (list.length - 1)) {
      let startX = e.touches[0].clientX;
      let startY = e.touches[0].clientY;
      this.setData({ startX, startY }) 
      // console.log(startX,startY)
    }
  },
  // 拖动结束
  touchEnd(e) {
    let index = e.currentTarget.dataset.index
    let list = this.data.list || []
    // console.log(index)
    // console.log(list)
    if (index === (list.length - 1)) {
      let that = this;
      let startX = this.data.startX;
      let startY = this.data.startY;
      let endX = e.changedTouches[0].clientX;
      let endY = e.changedTouches[0].clientY;
      var distance = that.data.distance;
      // 与结束点与图片初始位置距离
      // let disX = Math.abs(distance - winWidth)
      let disY = Math.abs(distance - winHeight)
      // 当前操作，初始点与结束点距离
      let disClientX = Math.abs(endX - startX)
      let disClientY = Math.abs(endY - startY)
      // 当滑动大于 滑块宽度的1/3翻页
      let ratio = this.data.ratio
      let moveDis = 666 / (ratio * 3);
      if (disY > moveDis && disClientY > moveDis) {
        // list[index].x = (endX - startX) > 0 ? winWidth * 2 : -winWidth
        list[index].y = (endY - startY) > 0 ? winHeight * 2 : -winHeight
        // 移除时距离竖向距离
        // list[index].y = disClientY
        that.setData({
          list: list,
          animationA: null
        });
        // 移出动画结束后 从list内移除
        setTimeout(() => {
          list.splice((list.length - 1), 1);
          that.setData({ list })
          // 列表长度小于4的时候请求服务端
          if (list.length < 4) {
            that.getList()
          }
        }, 300)
      } else if (disClientX < 1 && disClientY < 1) {
        // 点击进入
        console.log('点击进入详情')
      } else {
        list[index].x = 0
        list[index].y = winHeight
        that.setData({ list })
      }
    }
  },
  touchMove (e) {
    // 左滑右滑手势可优化
  },
  onChange: debounce(function(e) {
    this.setData({
      distance: e.detail.y
    })
    console.log(e.detail)
},200),
  // 模拟获取列表数据
  getList () {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      let list = this.data.list || [];
      let arr = deepClone(mockArr)
      for (let i of arr) {
        i.x = winWidth
        i.y = 0
        list.unshift(i)
      }
      this.setData({ list })
      wx.hideLoading()
    }, 200)
  },
  goUser(){
    wx.navigateTo({
      url: '/pages/user/user',
    })
  }
})
