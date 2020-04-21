<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
// 引入iscroll专业版本
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'IScroll',
  methods: {
    // 创建一个方法用来监听页面的滚动, 并传递滚动距离的参数
    scrolling (fn) {
      this.iscroll.on('scroll', () => {
        fn(this.iscroll.y)
      })
    }
  },
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disabledPointer: true,
      disableTouch: false,
      disableMouse: true
    })
    // 由于数据是网络获取的,所以要进行刷新
    // setTimeout(() => {
    //   this.iscroll.refresh()
    // }, 1000)

    // 1.创建一个观察者对象
    /*
    MutationObserver构造函数只要监听到了指定内容发生了变化,就会执行传入的回调函数
    mutationList: 发生变化的数据
    observer: 观察者对象
     */
    const observer = new MutationObserver((mutationList, ovserver) => {
      this.iscroll.refresh()
    })
    // 2.告诉观察者对象需要观察的内容
    const config = {
      childList: true, // 观察目标子节点的变化, 添加或删除
      subtree: true, // 默认为false, 设置为true可以观察后代节点
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    // 3.告诉观察者, 我们需要观察谁, 观察什么内容
    observer.observe(this.$refs.wrapper, config)
  }
}
</script>

<style scoped lang="scss">
#wrapper{
  width: 100%;
  height: 100%;
}
</style>
