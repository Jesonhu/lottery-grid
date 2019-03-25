export class axaxaxaxaxd {}

/**
 * 九宫格抽奖. 
 */
interface lotteryGrid {
  /** 抽奖的容器元素. */
  _el: HTMLElement,
  /** 当前转动到哪个位置，起点位置 */
  index: number,
  /** 总共有多少个位置 */
  count: number,
  /** setTimeout的ID，用clearTimeout清除 */
  timer: number,
  /** 初始转动速度  */
  initSpeed: number,
  /** 初始转动速度 */
  speed: number,
  /** 转动次数 */
  times: number,
  /** 基本转动次数：进入游戏环节需要转动的次数. */
  cycle: number,
  /** 中奖位置的索引 */
  prize: number,
  /** 是否可以抽奖 */
  isCanLottery: boolean,
  /** 抽奖元素的类名.  */
  itemClassName: string,
  /** 指定中奖的索引 */
  winIndex: number,
  /** 游戏局数  */
  roundNum: number,
  itemElArr: Array<HTMLElement>,
  init(config: {}): void,
  initData(config: {}): void,
  initEvent(): void,
  roll(): void,
  resetData(): void,
  /** 开始动画. */
  start(): void,
  /** 抽奖是否结束，完成指定的局数后返回 `true`, 否则返回 `false` */
  isLotteryFinished: boolean,
  /** 游戏结束事件处理. */
  eventFinishHandler(): void,
  /** 
   * 添加事件监听. 
   * 
   * @param {} type 事件的类型标识.
   * @param {} fn   事件处理回调.
   * @param {} capture   事件触发时冒泡捕获等设置
   */
  addEventListener(type: number, fn: Function, capture = {}),
}

declare global {
  interface Window {
    lotteryGrid: lotteryGrid
  }
}

