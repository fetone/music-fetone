<template>
  <div>
    <ul class="song-list">
      <li v-for="value in newSongs" :key="value.id" @click="showNormalPlayer(value.id)">
        <img v-lazy="value.imgUrl" alt="">
        <div class="desc">
          <h3>{{value.name}}</h3>
          <p>{{value.singer}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SongList',
  props: {
    newSongs: {
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
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
  .song-list{
    width: 100%;
    li{
      width: 100%;
      height: 150px;
      display: flex;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      img{
        width: 100px;
        height: 100px;
        border-radius: 10px;
        margin-right: 20px;
      }
      .desc{
        h3{
          @include font_color();
          @include font_size($font_large);
          @include no-wrap();
        }
        p{
          margin-top: 10px;
          opacity: 0.7;
          @include font_color();
          @include font_size($font_medium_s);
          @include no-wrap();
        }
      }
    }
  }
</style>
