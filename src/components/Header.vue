<template>
  <div class="header" @click="changeTheme">
    <div class="left">
      <slot name="left">左边</slot>
    </div>
    <slot name="center">中间</slot>
    <div class="right">
      <slot name="right">右边</slot>
    </div>
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
  .left, .right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
    *{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
