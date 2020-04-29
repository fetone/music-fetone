<template>
<div class="singer">
  <div class="singer-wrapper">
    <IScroll ref="scroll">
      <ul class="list-wrapper">
        <li v-for="(letter, index) in keys" :key="index" class="letter-group" ref="letterGroup">
          <h3>{{letter}}</h3>
          <ul>
            <li v-for="(item) in list[index]" :key="item.id" class="singer-info" @click.stop="showSingerDetail(item.id)">
              <img v-lazy="item.picUrl" alt="">
              <p>{{item.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </IScroll>
    <ul class="singer-letter">
      <li
        v-for="(value, index) in keys"
        :key="value"
        :data-index="index"
        @touchstart.stop.prevent="touchStart"
        @touchmove.stop.prevent="touchMove"
        :class="{'active': activeIndex === index}"
      >
        {{value}}
      </li>
    </ul>
    <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">
      {{fixTitle}}
    </div>
  </div>
  <!--  二级页面-->
  <Transition>
    <router-view></router-view>
  </Transition>
</div>
</template>

<script>
import { getAllArtists } from '../api'
import IScroll from '../components/IScroll'
export default {
  name: 'Singer',
  created () {
    getAllArtists()
      .then((data) => {
        this.keys = data.keys
        this.list = data.list
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data () {
    return {
      keys: [],
      list: [],
      activeTop: [],
      activeIndex: 0,
      beginY: 0,
      moveY: 0,
      scrollY: 0,
      offsetY: 0
    }
  },
  computed: {
    fixTitle () {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.activeIndex]
      }
    }
  },
  components: {
    IScroll
  },
  watch: {
    list () {
      // $nextTick 只有渲染完成之后才会执行 解决数据发生变化但还没有渲染就获取元素结果为undefined的问题
      this.$nextTick(() => {
        // 把每个li的offsetTop存储到一个数组中
        this.$refs.letterGroup.forEach((value) => {
          this.activeTop.push(value.offsetTop)
        })
      })
    },
    offsetY () {
      // 推动效果
      this.$nextTick(() => {
        if (this.offsetY > 60 || this.offsetY < 0) {
          this.$refs.fixTitle.style.top = 0
        }
        if (this.offsetY <= 60 && this.offsetY >= 0) {
          this.$refs.fixTitle.style.top = this.offsetY - 60 + 'px'
        }
      })
    }
  },
  methods: {
    move (index) {
      // 监听点击事件, 计算滚动的距离
      this.$refs.scroll.scrollTo(0, -this.activeTop[index], 500)
      // 为了判断是否添加active类的属性
      this.activeIndex = index
    },
    touchStart (e) {
      const index = parseInt(e.target.dataset.index)
      this.move(index)
      // 拿到一开始触摸的位置
      this.beginY = e.touches[0].pageY
    },
    touchMove (e) {
      // 拿到移动之后的位置
      this.moveY = e.touches[0].pageY
      // 计算移动了几个li的高度
      const offsetIndex = Math.floor((this.moveY - this.beginY) / e.target.offsetHeight)
      // 在当前index的基础上加上移动之后的index个数
      let index = offsetIndex + parseInt(e.target.dataset.index)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this.move(index)
    },
    showSingerDetail (id) {
      this.$router.push({
        path: `/singer/detail/${id}/singerSongs`
      })
    }
  },
  mounted () {
    // 监听滚动事件,判断滚动距离 赋值 activeIndex,给对应的元素添加类
    this.$refs.scroll.scrolling((y) => {
      this.scrollY = y
      // 处理第一个区域
      if (y > 0) {
        this.activeIndex = 0
        return
      }
      // 处理中间区域
      for (let i = 0; i < this.activeTop.length; i++) {
        const preTop = this.activeTop[i]
        const nextTop = this.activeTop[i + 1]
        if (-y >= preTop && -y <= nextTop) {
          this.activeIndex = i

          this.offsetY = nextTop - Math.abs(this.scrollY)

          return
        }
      }
      // 处理最后一个区域
      this.activeIndex = this.activeTop.length - 1
    })
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
.singer{
  width: 100%;
  height: 100%;
  .singer-wrapper{
    position: fixed;
    top: 180px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    .list-wrapper{
      .letter-group{
        h3{
          @include font_size($font_medium);
          color: #fff;
          @include bg_color();
          height: 60px;
          line-height: 60px;
          padding-left: 20px;
        }
        .singer-info{
          display: flex;
          align-items: center;
          padding: 20px;
          border-bottom: 2px solid #ccc;
          box-sizing: border-box;
          @include bg_sub_color();
          img{
            width: 80px;
            height: 80px;
            margin-right: 20px;
          }
          p{
            @include font_color();
            @include font_size($font_medium);
          }
        }
      }
    }
    .singer-letter{
      position: fixed;
      right: 20px;
      top: 57%;
      transform: translateY(-50%);
      li{
        padding: 5px 0;
        @include font_color();
        @include font_size($font_samll);
        &.active{
          @include font_active_color();
        }
      }
    }
    .fix-title{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      color: #fff;
      height: 60px;
      line-height: 60px;
      padding-left: 20px;
      @include font_size($font_medium);
      @include bg_color();
    }
  }
}
  .v-enter{
    transform: translateX(100%);
  }
  .v-enter-active{
    transition: transform 0.5s;
  }
  .v-enter-to{
    transform: translateX(0%);
  }
  .v-leave{
    transform: translateX(0%);
  }
  .v-leave-active{
    transition: transform 0.5s;
  }
  .v-leave-to{
    transform: translateX(100%);
  }
</style>
