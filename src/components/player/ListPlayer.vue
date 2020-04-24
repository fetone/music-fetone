<template>
  <Transition :css="false" @enter="enter" @leave="leave">
    <div class="list-player" v-show="this.isShowListPlayer">
      <div class="player-top">
        <div class="top-left">
          <div class="mode loop" ref="mode" @click="changeMode"></div>
          <p v-if="this.modeType === 0">顺序播放</p>
          <p v-else-if="this.modeType === 1">单曲播放</p>
          <p v-else-if="this.modeType === 2">随机播放</p>
        </div>
        <div class="top-right">
          <div class="del" @click="delAll"></div>
        </div>
      </div>
      <div class="player-medium">
        <IScroll ref="iscroll">
          <ul ref="play">
            <li class="item" v-for="(value, index) in songsInfo" :key="value.id" @click="selectMusic(index)">
              <div class="item-left">
                <div class="play" @click.stop="isPlay" v-show="currentIndex === index"></div>
                <p>{{value.name}}</p>
              </div>
              <div class="item-right">
                <div class="favorite"></div>
                <div class="remove" @click.stop="del(index)"></div>
              </div>
            </li>
          </ul>
        </IScroll>
      </div>
      <div class="player-bottom" @click="hidden">
        关闭
      </div>
    </div>
  </Transition>
</template>

<script>
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui.js'
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'
import IScroll from '../IScroll'

export default {
  name: 'ListPlayer',
  methods: {
    hidden () {
      this.setListPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.expandIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.expandOut', { duration: 500 }, function () {
        done()
      })
    },
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setListPlayer',
      'delSong',
      'setCurrentIndex'
    ]),
    isPlay () {
      this.setIsPlaying(!this.isPlaying)
    },
    changeMode () {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    },
    del (index) {
      this.delSong(index)
    },
    delAll () {
      this.delSong()
    },
    selectMusic (index) {
      this.setCurrentIndex(index)
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'isShowListPlayer',
      'songsInfo',
      'currentIndex'
    ])
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
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    isShowListPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.iscroll.refresh()
      }
    }
  },
  components: {
    IScroll
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.list-player {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .player-top {
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top-left {
      display: flex;
      align-items: center;
      .mode {
        width: 70px;
        height: 70px;
        margin: 0 20px;
        &.loop{
          @include bg_img("../../assets/images/small_loop");
        }
        &.one{
          @include bg_img("../../assets/images/small_one");
        }
        &.random{
          @include bg_img("../../assets/images/small_shuffle");
        }
      }
      p {
        @include font_size($font_medium);
        @include font_color();
      }
    }
    .top-right {
      .del {
        width: 100px;
        height: 100px;
        @include bg_img("../../assets/images/small_del");
      }
    }
  }
  .player-medium {
    ul{
      &.active{
        .item{
          .item-left{
            .play{
              @include bg_img("../../assets/images/small_pause");
            }
          }
        }
      }
    }
    width: 100%;
    height: 700px;
    overflow: hidden;
    .item {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #ccc;
      .item-left {
        display: flex;
        align-items: center;
        margin-left: 30px;
        .play {
          width: 60px;
          height: 60px;
          margin-right: 30px;
          @include bg_img("../../assets/images/small_play");
        }
        p {
          @include font_color();
          @include font_size($font_medium);
        }
      }
      .item-right {
        display: flex;
        .favorite {
          width: 60px;
          height: 60px;
          @include bg_img("../../assets/images/small_favorite");
        }
        .remove {
          width: 60px;
          height: 60px;
          margin: 0 20px;
          @include bg_img("../../assets/images/small_close");
        }
      }
    }
  }
  .player-bottom {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #fff;
    @include bg_color();
    @include font_size($font_large);
  }
}
</style>
