<template>
    <Header class="header">
      <div slot="left" class="header-left"></div>
      <p slot="center" class="header-title">肥冬音乐</p>
      <div slot="right" class="header-right" @click.stop="showPersonCenter"></div>
    </Header>
</template>

<script>
import Header from './Header'
export default {
  name: 'MainHeader',
  methods: {
    showPersonCenter () {
      this.$router.push({
        path: '/account'
      })
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";
  .header{
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
