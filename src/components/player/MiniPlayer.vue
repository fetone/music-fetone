<template>
  <Transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="mini-player" v-show="isShowMiniPlayer">
      <div class="player-wrapper">
        <div class="player-left" @click="showNormalPlayer">
          <img :src="currentSong.imgUrl" alt="" ref="cdImg">
          <div class="desc">
            <h3>{{currentSong.name}}</h3>
            <p>{{currentSong.singer}}</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play" @click="isPlay" ref="play"></div>
          <div class="list" @click="showList"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui.js'
export default {
  name: 'MiniPlayer',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setListPlayer',
      'setIsPlaying'
    ]),
    showNormalPlayer () {
      this.setFullScreen(true)
    },
    showList () {
      this.setListPlayer(true)
    },
    enter (el, done) {
      Velocity(el, 'transition.bounceDownIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 500 }, function () {
        done()
      })
    },
    isPlay () {
      this.setIsPlaying(!this.isPlaying)
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying',
      'currentSong'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
        this.$refs.cdImg.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.cdImg.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.mini-player{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 150px;
  @include bg_color();
  .player-wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .player-left{
      display: flex;
      align-items: center;
      img{
        width: 100px;
        height: 100px;
        margin: 0 30px;
        border-radius: 50%;
        animation: sport 4s linear infinite;
        animation-play-state: paused;
        &.active{
          animation-play-state: running;
        }
        @keyframes sport {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      }
      .desc{
        h3{
          @include font_color();
          @include font_size($font_medium)
        }
        p{
          @include font_color();
          @include font_size($font_medium_s)
        }
      }
    }
    .player-right{
      display: flex;
      align-items: center;
      .play{
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
      }
      .list{
        width: 140px;
        height: 140px;
        @include bg_img('../../assets/images/list');
      }
    }
  }
}
</style>
