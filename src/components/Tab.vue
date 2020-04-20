<template>
<div class="tab">
  <router-link tag="div" to="/recommend">
    <span>推荐</span>
  </router-link>
  <router-link tag="div" to="singer">
    <span>歌手</span>
  </router-link>
  <router-link tag="div" to="rank">
    <span>排行</span>
  </router-link>
  <router-link tag="div" to="search">
    <span>搜索</span>
  </router-link>
</div>
</template>

<script>
export default {
  name: 'Tab'
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
.tab{
  width: 100%;
  height: 80px;
  line-height: 80px;
  display: flex;
  justify-content: space-around;
  @include bg_sub_color();
  @include font_color();
  @include font_size($font_medium);
  .router-link-active{
    border-bottom: 3px solid #000;
    @include border_color();
    span{
      @include font_active_color();
    }
  }
}
</style>
