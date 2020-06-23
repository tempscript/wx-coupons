let touchDotX = 0; //X按下时坐标
let touchDotY = 0; //y按下时坐标
const app = getApp()
Page({
  data: {
    titleBarHeight: app.globalData.titleBarHeight,
    statusBarHeight: app.globalData.statusBarHeight,
    menuButton:app.globalData.menuButton,
    isFront1: true,
    isFront2: true,
    isFront3: true,
    animationData1: {},
    animationData2: {},
    animationData3: {},
    ballTop1: 130,
    ballTop2: 145,
    ballTop3: 160,
    ballWidth1: 670,
    ballWidth2: 630,
    ballWidth3: 590,
    index1: 3,
    index2: 2,
    index3: 1,
  },
  onLoad(options) {},

  /**
   *  卡片1手势
   */
  touchstart1: function (event) {
    touchDotX = event.touches[0].pageX; // 获取触摸时的原点
    touchDotY = event.touches[0].pageY;
    console.log("起始点的坐标X:" + touchDotX);
    console.log("起始点的坐标Y:" + touchDotY);
  },
  // 移动结束处理动画
  touchend1: function (event) {
    // 手指离开屏幕时记录的坐标
    let touchMoveX = event.changedTouches[0].pageX;
    let touchMoveY = event.changedTouches[0].pageY;
    // 起始点的坐标(x0,y0)和手指离开时的坐标(x1,y1)之差
    let tmX = touchMoveX - touchDotX;
    let tmY = touchMoveY - touchDotY;
    // 两点横纵坐标差的绝对值
    let absX = Math.abs(tmX);
    let absY = Math.abs(tmY);
    //起始点的坐标(x0,y0)和手指离开时的坐标(x1,y1)之间的距离
    let delta = Math.sqrt(absX * absX + absY * absY);
    console.log('起始点和离开点距离:' + delta + 'px');
    // 如果delta超过60px（可以视情况自己微调）,判定为手势触发
    if (delta >= 60) {
      // 如果 |x0-x1|>|y0-y1|,即absX>abxY,判定为左右滑动
      if (absX > absY) {
        // 如更tmX<0，即(离开点的X)-(起始点X)小于0 ，判定为左滑
        if (tmX < 0) {
          console.log("左滑=====");
      
          // 如更tmX>0，即(离开点的X)-(起始点X)大于0 ，判定为右滑
        } else {
          console.log("右滑=====");
          // 执行右滑动画
          this.Animation1(500);
        }
        // 如果 |x0-x1|<|y0-y1|,即absX<abxY,判定为上下滑动
      } else {
        // 如更tmY<0，即(离开点的Y)-(起始点Y)小于0 ，判定为上滑
        if (tmY < 0) {
          console.log("上滑动=====");
             // 执行左滑动画
             this.Animation1(-500);
          // 如更tmY>0，即(离开点的Y)-(起始点Y)大于0 ，判定为下滑
        } else {
          console.log("下滑成功")
          console.log("下滑动=====");
          // this.setData({
          //   isFront1: !this.data.isFront1
          // });
           // 执行右滑动画
           this.Animation1(500);
        }
      }
    } else {
      console.log("手势未触发=====");
    }

    // 让上一张卡片展现正面（如果之前翻转过的话）
    this.setData({
      isFront3: true,
    });
  },

  /**
   *  卡片2手势
   */
  touchstart2: function (event) {
    touchDotX = event.touches[0].pageX; // 获取触摸时的原点
    touchDotY = event.touches[0].pageY;

    console.log("起始点的坐标X:" + touchDotX);
    console.log("起始点的坐标Y:" + touchDotY);

  },
  // 移动结束处理动画
  touchend2: function (event) {
    let touchMoveX = event.changedTouches[0].pageX;
    let touchMoveY = event.changedTouches[0].pageY;
    let tmX = touchMoveX - touchDotX;
    let tmY = touchMoveY - touchDotY;
    let absX = Math.abs(tmX);
    let absY = Math.abs(tmY);
    let delta = Math.sqrt(absX * absX + absY * absY);
    console.log('起始点和离开点距离:' + delta + 'px');
    if (delta >= 60) {
      if (absX > absY) {
        if (tmX < 0) {
          console.log("左滑=====");
          
        } else {
          console.log("右滑=====");
         
        }
      } else {
        if (tmY < 0) {
          console.log("上滑动=====");
          this.Animation2(-500);
        } else {
          console.log("下滑动=====");
          this.Animation2(500);
        }

      }
    } else {
      console.log("手势未触发=====");
    }

    this.setData({
      isFront1: true,
    });

  },

  /**
   *  卡片3手势
   */
  touchstart3: function (event) {
    touchDotX = event.touches[0].pageX; // 获取触摸时的原点
    touchDotY = event.touches[0].pageY;
    console.log("起始点的坐标X:" + touchDotX);
    console.log("起始点的坐标Y:" + touchDotY);
  },
  // 移动结束处理动画
  touchend3: function (event) {
    let touchMoveX = event.changedTouches[0].pageX;
    let touchMoveY = event.changedTouches[0].pageY;
    let tmX = touchMoveX - touchDotX;
    let tmY = touchMoveY - touchDotY;
    let absX = Math.abs(tmX);
    let absY = Math.abs(tmY);
    let delta = Math.sqrt(absX * absX + absY * absY);
    console.log('起始点和离开点距离:' + delta + 'px');
    if (delta >= 60) {
      if (absX > absY) {
        if (tmX < 0) {
          console.log("左滑=====");
         
        } else {
          console.log("右滑=====");
          this.Animation3(500);
        }
      } else {

        if (tmY < 0) {
          console.log("上滑动=====");
          this.Animation3(-500);
        } else {
          console.log("下滑动=====");
          this.Animation3(500);
        }
      }
    } else {
      console.log("手势未触发=====");
    }

    this.setData({
      isFront2: true,
    });

  },

  /**
   * 卡片1:
   * 左滑动右滑动动画
   */
  Animation1: function (translateXX) {
    let animation = wx.createAnimation({
      duration: 680,
      timingFunction: "ease",
    });
    this.animation = animation;

    if (translateXX > 0) {
      this.animation.translateY(translateXX).rotate(20).translateX(0).opacity(0).step();
    } else {
      this.animation.translateY(translateXX).rotate(-20).translateX(0).opacity(0).step();
    }
    this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({
      duration: 10
    });

    this.setData({
      animationData1: this.animation.export(),
    });

    setTimeout(() => {
      this.setData({
        ballTop1: 160,
        ballLeft1: -302.5,
        ballWidth1: 550,
        index1: 1,

        ballTop2: 130,
        ballLeft2: -335,
        ballWidth2: 670,
        index2: 3,

        ballTop3: 145,
        ballLeft3: -320,
        ballWidth3: 605,
        index3: 2,
      })
    }, 500);
  },

  /**
   * 卡片2:
   * 左滑动右滑动动画
   */
  Animation2: function (translateXX) {
    let animation = wx.createAnimation({
      duration: 680,
      timingFunction: "ease",
    });

    this.animation = animation;

    if (translateXX > 0) {
      this.animation.translateY(translateXX).rotate(20).translateX(0).opacity(0).step();
    } else {
      this.animation.translateY(translateXX).rotate(-20).translateX(0).opacity(0).step();
    }

    this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({
      duration: 10
    });

    this.setData({
      animationData2: this.animation.export(),
    });

    setTimeout(() => {
      this.setData({
        ballTop2: 160,
        ballLeft2: -302.5,
        ballWidth2: 550,
        index2: 1,

        ballTop3: 130,
        ballLeft3: -335,
        ballWidth3: 670,
        index3: 3,

        ballTop1: 145,
        ballLeft1: -320,
        ballWidth1: 605,
        index1: 2,
      })
    }, 500)
  },

  /**
   * 卡片3:
   * 左滑动右滑动动画
   */
  Animation3: function (translateXX) {
    let animation = wx.createAnimation({
      duration: 680,
      timingFunction: "ease",
    });

    this.animation = animation;
    if (translateXX > 0) {
      this.animation.translateY(translateXX).rotate(20).translateX(0).opacity(0).step();
    } else {
      this.animation.translateY(translateXX).rotate(-20).translateX(0).opacity(0).step();
    }

    this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({
      duration: 10
    });

    this.setData({
      animationData3: this.animation.export(),
    });

    setTimeout(() => {
      this.setData({
        ballTop3: 160,
        ballLeft3: -302.5,
        ballWidth3: 550,
        index3: 1,

        ballTop1: 130,
        ballLeft1: -335,
        ballWidth1: 670,
        index1: 3,

        ballTop2: 145,
        ballLeft2: -320,
        ballWidth2: 605,
        index2: 2,
      })
    }, 500)
  },
})