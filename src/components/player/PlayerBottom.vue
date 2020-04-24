<template>
    <div class="player-bottom">
      <div class="progress">
        <span ref="eleCurrentTime">00:00</span>
        <div class="progress-bar" @click.stop="changeProgress" ref="progressBar">
          <div class="progress-line" ref="line">
            <div class="progress-dot"></div>
          </div>
        </div>
        <span ref="eleTotalTime">00:00</span>
      </div>
      <div class="control">
        <div class="mode loop" @click="changeMode" ref="mode"></div>
        <div class="prev" @click="prevMusic"></div>
        <div class="play" @click="isPlay" ref="play"></div>
        <div class="next" @click="nextMusic"></div>
        <div class="favorite"></div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurrentTime'
    ]),
    isPlay () {
      this.setIsPlaying(!this.isPlaying)
    },
    changeMode () {
      if (this.modeType === 0) {
        this.setModeType(1)
      } else if (this.modeType === 1) {
        this.setModeType(2)
      } else if (this.modeType === 2) {
        this.setModeType(0)
      }
    },
    prevMusic () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    nextMusic () {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    // 秒 格式化成 时分秒
    getDifferentTime (allSecond) {
    // 计算总小时
      let hour = Math.floor(allSecond / (60 * 60) % 24)
      hour = hour >= 10 ? hour : '0' + hour

      // 计算总分钟
      let minute = Math.floor(allSecond / 60 % 60)
      minute = minute >= 10 ? minute : '0' + minute

      // 计算总秒
      let second = Math.floor(allSecond % 60)
      second = second >= 10 ? second : '0' + second

      return {
        hour: hour,
        minute: minute,
        second: second
      }
    },
    changeProgress (e) {
      const widthX = e.offsetX
      this.$refs.line.style.width = widthX + 'px'
      const time = widthX / this.$refs.progressBar.offsetWidth * this.totalTime
      this.setCurrentTime(time)
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    modeType (newValue, oldValue) {
      if (newValue === 0) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === 1) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === 2) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    totalTime (newValue) {
      const totalObj = this.getDifferentTime(newValue)
      this.$refs.eleTotalTime.innerHTML = totalObj.minute + ':' + totalObj.second
    },
    currentTime (newValue) {
      const currentObj = this.getDifferentTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = currentObj.minute + ':' + currentObj.second
      const width = this.currentTime / this.totalTime * 100
      this.$refs.line.style.width = width + '%'
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex'
    ])
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
.player-bottom{
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  .progress{
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    span{
      @include font_size($font_samll);
      @include font_color();
    }
    .progress-bar{
      width: 100%;
      height: 10px;
      background: #fff;
      margin: 0 20px;
      .progress-line{
        width: 0%;
        height: 100%;
        @include bg_color();
        position: relative;
        .progress-dot{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .control{
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 40px;
    div{
      width: 80px;
      height: 80px;
    }
    .mode{
      &.loop{
        @include bg_img('../../assets/images/loop');
      }
      &.one{
        @include bg_img('../../assets/images/one');
      }
      &.random{
        @include bg_img('../../assets/images/shuffle');
      }
    }
    .prev{
      @include bg_img('../../assets/images/prev');
    }
    .play{
      @include bg_img('../../assets/images/play');
      &.active{
        @include bg_img('../../assets/images/pause');
      }
    }
    .next{
      @include bg_img('../../assets/images/next');
    }
    .favorite{
      @include bg_img('../../assets/images/un_favorite');
    }
  }
}
</style>
