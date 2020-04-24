<template>
  <Transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-wrapper">
        <PlayHeader></PlayHeader>
        <PlayerMedium :currentTime="currentTime"></PlayerMedium>
        <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
      </div>
      <div class="player-bg">
        <img :src="currentSong.imgUrl" alt="">
      </div>
    </div>
  </Transition>
</template>

<script>
import PlayHeader from './PlayerHeader'
import PlayerMedium from './PlayerMedium'
import PlayerBottom from './PlayerBottom'
import { mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui.js'

export default {
  name: 'NormalPlayer',
  methods: {
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
        done()
      })
    }
  },
  computed: {
    ...mapGetters([
      'isFullScreen',
      'currentSong'
    ])
  },
  components: {
    PlayHeader,
    PlayerMedium,
    PlayerBottom
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
.normal-player{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .player-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    img{
      height: 100%;
      filter: blur(10px);
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
  }
}
</style>
