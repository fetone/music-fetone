<template>
  <div class="header" @click="changeTheme">
    <div class="header-left"></div>
    <p class="header-title">肥冬音乐</p>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      // 创建三个主题的数组
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    // 换肤事件
    changeTheme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      // 修改theme属性
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
@import "../assets/css/mixin";
.header{
  width: 100%;
  height: 100px;
  @include bg_color();
  display: flex;
  justify-content: space-between;
  .header-left, .header-right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left{
    @include bg_img('../assets/images/logo');
  }
  .header-right{
    @include bg_img('../assets/images/account');
  }
  .header-title{
    text-align: center;
    line-height: 100px;
    color: #FFFFFF;
    font-weight: bold;
    @include font_size($font_large);
  }
}
</style>
