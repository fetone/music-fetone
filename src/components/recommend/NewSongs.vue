<template>
<div class="new-song">
  <div class="song-top">
    最新音乐
  </div>
  <SongList :newSongs="newSongs"></SongList>
</div>
</template>

<script>
import SongList from '../SongList'
export default {
  name: 'NewSongs',
  props: {
    newSongs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    SongList
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
  }
</style>
