<template>
    <Header class="header">
      <div slot="left" class="header-left" @click.stop="back"></div>
      <p slot="center" class="header-title">{{title}}</p>
      <div slot="right" class="header-right"></div>
    </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'DetailHeader',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    // 返回上级页面
    back () {
      window.history.back()
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
@import "../../assets/css/mixin";
.header{
  .header-left{
    @include bg_img('../../assets/images/back');
  }
  .header-right{
    @include bg_img('../../assets/images/more');
  }
  .header-title{
    text-align: center;
    line-height: 100px;
    color: #FFFFFF;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>
