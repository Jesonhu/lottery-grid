// ==============================
// 抽奖-九宫格转盘.
// 
// @inspire: view-source:www.17sucai.com/preview/701856/2017-10-11/大转盘抽奖/index.html
// @version: 0.0.0
// @update : 2019/03/25
// @author : Jesonhu(github)
// @email  : jesonhu_web@163.com
// ==============================

import 'normalize.css';
import './css/index.scss';

const lotteryGrid = {
  /** 当前转动到哪个位置，起点位置 */
  index: 0,
  /** 总共有多少个位置 */
  count: 0,
  /** setTimeout的ID，用clearTimeout清除 */
  timer: 0,
  /** 初始转动速度  */
  initSpeed: 20,
  /** 初始转动速度 */
  speed: 20,
  /** 转动次数 */
  times: 0,
  /** 基本转动次数：进入游戏环节需要转动的次数. */
  cycle: 30,
  /** 中奖位置的索引 */
  prize: -1,
  /** 是否可以抽奖 */
  isCanLottery: true,
  /** 抽奖的容器元素. */
  _el: null,
  /** 抽奖元素的类名.  */
  itemClassName: '',
  /** 指定中奖的索引 */
  winIndex: 0,
  /** 游戏局数  */
  roundNum: 1,
  itemElArr: [],
  isActiving: false,
  lotteryFinished: () => {},

  init(config = {}) {
    this.initData(config);
  },
  initData(config) {
    this._el = config.el;
    this.itemClassName = config.itemClassName;
    this.winIndex = config.winIndex;
    this.roundNum = config.roundNum;
    this.lotteryFinished = config.lotteryFinished;
    

    if (this._el) {
      const className = '.' + this.itemClassName;
      this.itemElArr = this._el.querySelectorAll(className);
      this.count = this.itemElArr.length;
    }
  },
  initEvent() {
    
  },
  roll() {
    // 抽奖局数全部完成
    if (this.roundNum === 0) {
      return;
    };

    this.times += 1;
    const count = this.count;
    let index = this.index;

    this.itemElArr[index].classList.remove('s-active');
    index++;
    if (index > count - 1) {
      index = 0;
    }
    this.itemElArr[index].classList.add('s-active');
    this.index = index;

    if (this.times > this.cycle + 10 && (this.prize === this.index)) {
      clearTimeout(this.timer);
      this.roundNum -= 1;

      this.resetData();
      if (this.roundNum === 0) {
        this.eventFinishHandler();
      }
      
    } else {
      if (this.times < this.cycle) {
        this.speed -= 10;
      } else if (this.times === this.cycle) {
        // const index = this.winIndex || Math.random() * this.count;
        const index = this.winIndex;
        this.prize = index;
      } else {
        if (this.times > this.cycle + 10 && (this.prize === this.index + 1)) {
          this.speed += 110;
        } else {
          this.speed += 20;
        }
      }

      if (this.speed < 40) {
        this.speed = 40;
      }

      // Notice: 下一格样式改变，连续后便形成动画效果.
      this.timer = setTimeout(() => {
        this.roll();
      }, this.speed);
    }
  },
  resetData() {
    this.index = 1;
    this.prize = -1;
    this.times = 0;
    this.speed = this.initSpeed;
    this.isCanLottery = true;
  },
  start() {
    // 当前一局抽奖还未完成，不能进行抽奖
    if (!this.isCanLottery) {
      return;
    };
    this.isCanLottery = false;
    this.roll();
  },

  /** 抽奖是否已经结束. */
  get isLotteryFinished() {
    return this.isCanLottery ? false : true;
  },
  /** 派发游戏结束事件 */
  eventFinishHandler() {
    // 派发：抽奖结束事件. 
    const FINISH_EVENT_NAME = 'finish';
    const evt = document.createEvent('Event');
    evt.initEvent(FINISH_EVENT_NAME, false, false);
    this._el.dispatchEvent(evt);
  },

  /**
   * 自定义事件方法. 
   * 
   * 
   * @
   * @see https://www.zhangxinxu.com/wordpress/2012/04/js-dom自定义事件/
   */
  addEventListener(type, fn, capture = {}) {
    const el = this._el;
    if (window.addEventListener) {
      el.addEventListener(type, fn, capture);        
    } else if (window.attachEvent) {
      el.attachEvent("on" + type, fn);
    }
    return this;
  }
}

window.lotteryGrid = lotteryGrid;

// 模块导出
// if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
//   // AMD. Register as an anonymous module.
//   define(function() {
//     return lotteryGrid;
//   });
// } else if (typeof module !== 'undefined' && module.exports) {
//   module.exports = lotteryGrid;
// } else {
//   console.log('windows', lotteryGrid);
//   window.lotteryGrid = lotteryGrid;
// }