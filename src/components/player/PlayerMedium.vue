<template>
  <swiper :options="swiperOption" class="player-medium">
    <swiper-slide class="cd">
      <div class="cd-imgBorder" ref="cdImg">
        <img :src="currentSong.imgUrl" alt="">
      </div>
      <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="slide">
      <IScroll ref="iscroll">
        <ul>
          <li v-for="(value, index) in songLyric" :key="index" :class="{'active': currentNum === index}">{{value}}</li>
        </ul>
      </IScroll>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import IScroll from '../IScroll'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PlayerMedium',
  data () {
    return {
      swiperOption: {
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          // 替换默认类
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        // 监视器  数据是异步加载的,发生变化自动刷新
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentNum: '0'
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'songLyric'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdImg.classList.add('active')
      } else {
        this.$refs.cdImg.classList.remove('active')
      }
    },
    currentSong (newValue, oldValue) {
      this.setSongLyric(newValue.id)
    },
    currentTime (newValue) {
      /* // 高亮歌词
      const lineNum = Math.floor(newValue)
      const currentLyric = this.songLyric[lineNum]
      if (currentLyric !== undefined && currentLyric !== '') {
        this.currentNum = lineNum + ''
        // 歌词同步
        const activeHeight = document.querySelector('li.active').offsetTop
        const slideHeight = this.$refs.slide.$el.offsetHeight
        if (activeHeight > slideHeight / 2) {
          this.$refs.iscroll.scrollTo(0, slideHeight / 2 - activeHeight, 1000)
        }
      } */
      // 高亮歌词
      const lineNum = Math.floor(newValue)
      this.currentNum = this.calCurrentNum(lineNum)
      // 歌词同步
      const activeHeight = document.querySelector('li.active').offsetTop
      const slideHeight = this.$refs.slide.$el.offsetHeight
      if (activeHeight > slideHeight / 2) {
        this.$refs.iscroll.scrollTo(0, slideHeight / 2 - activeHeight, 1000)
      } else {
        this.$refs.iscroll.scrollTo(0, 0, 1000)
      }
    },
    songLyric (newValue) {
      for (const key in newValue) {
        this.currentNum = key
        return
      }
    }
  },
  methods: {
    getFirstLyric () {
      for (const key in this.songLyric) {
        return this.songLyric[key]
      }
    },
    ...mapActions([
      'setSongLyric'
    ]),
    calCurrentNum (lineNum) {
      if (lineNum < 0) {
        return this.currentNum
      }
      const currentLyric = this.songLyric[lineNum]
      if (currentLyric === undefined || currentLyric === '') {
        lineNum--
        return this.calCurrentNum(lineNum)
      } else {
        return lineNum + ''
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    IScroll
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
  .player-medium{
    position: fixed;
    left: 0;
    top: 150px;
    right: 0;
    bottom: 250px;
    .cd{
      .cd-imgBorder{
        width: 500px;
        height: 500px;
        border: 20px solid #eee;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        animation: sport 4s linear infinite;
        animation-play-state: paused;
        &.active{
          animation-play-state: running;
        }
        @keyframes sport {
          from {
            transform: rotate(0deg);
          }
          to{
            transform: rotate(360deg);
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      p{
        text-align: center;
        margin-top: 50px;
        @include font_color();
        @include font_size($font_medium)
      }
    }
    .lyric{
      li{
        text-align: center;
        margin: 10px 0;
        @include font_color();
        @include font_size($font_medium);
        &:last-of-type{
          padding-bottom: 100px;
        }
        &.active {
          color: #ffffff;
        }
      }
    }
  }
</style>
<style lang="scss">
  /*如果想覆盖swiper的样式,那么style标签不能是scoped的, 否则无法覆盖*/
  @import "../../assets/css/mixin";
  .my-bullet{
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 10px;
    margin: 0 10px;
    &.my-bullet-active{
      width: 50px;
      @include bg_color();
    }
  }
</style>
