<template>
    <div class="detail-bottom">
      <ul>
        <li class="bottom-top" @click="playAll">
          <div class="play-all"></div>
          <p>播放全部</p>
        </li>
        <li v-for="value in tracks" :key="value.id" @click="showNormalPlayer(value.id)">
          <p class="list-title">{{value.name}}</p>
          <p class="list-desc">{{value.al.name}} —— {{value.ar[0].name}}</p>
        </li>
      </ul>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DetailBottom',
  props: {
    tracks: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setSongsInfo',
      'setSongLyric'
    ]),
    showNormalPlayer (id) {
      this.setFullScreen(true)
      this.setSongsInfo([id])
      this.setSongLyric(id)
    },
    playAll () {
      const arr = []
      this.tracks.forEach((value) => {
        arr.push(value.id)
      })
      this.setSongsInfo(arr)
      this.setFullScreen(true)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.detail-bottom{
  width: 100%;
  li{
    width: 100%;
    height: 100px;
    padding: 20px;
    border-bottom: 2px solid #ccc;
    box-sizing: border-box;
    @include clamp(2);
    @include bg_sub_color();
    @include font_color();
    .list-title{
      margin-top: -10px;
      margin-bottom: 5px;
      @include font_size($font_medium);
    }
    .list-desc{
      opacity: 0.8;
      @include font_size($font_samll);
    }
  }
  .bottom-top{
    display: flex;
    align-items: center;
    border-radius: 50px 50px 0 0;
    @include font_size($font_medium);
    font-weight: bold;
    .play-all{
      width: 60px;
      height: 60px;
      margin-right: 20px;
      @include bg_img("../../assets/images/small_play");
    }
  }
}
</style>
