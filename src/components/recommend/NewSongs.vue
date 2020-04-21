<template>
<div class="new-song">
  <div class="song-top">
    最新音乐
  </div>
  <ul class="song-list">
    <li v-for="value in newSongs" :key="value.id">
      <img v-lazy="value.picUrl" alt="">
      <div class="desc">
        <h3>{{value.name}}</h3>
        <p>{{value.song.artists[0].name}}</p>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'NewSongs',
  props: {
    newSongs: {
      type: Array,
      default: () => [],
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
  .new-song {
    @include bg_sub_color();
    .song-top {
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-weight: bold;
      padding: 0 20px;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      @include bg_sub_color();
      @include font_size($font_large);
      @include font_color();
    }
    .song-list{
      li{
        width: 100%;
        display: flex;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
        img{
          width: 100px;
          border-radius: 10px;
          margin-right: 20px;
        }
        .desc{
          h3{
            @include font_color();
            @include font_size($font_large)
          }
          p{
            margin-top: 10px;
            opacity: 0.7;
            @include font_color();
            @include font_size($font_medium_s)
          }
        }
      }
    }
  }
</style>
