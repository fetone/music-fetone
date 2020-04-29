<template>
    <Header class="header">
      <div slot="left" class="header-left" @click.stop="back"></div>
      <ul slot="center" class="header-title">
        <li :class="{'active': activeNum === 0}" @click.stop="isActive(0)">我喜欢的</li>
        <li :class="{'active': activeNum === 1}" @click.stop="isActive(1)">最近听的</li>
      </ul>
      <div slot="right" class="header-right"></div>
    </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'AccountHeader',
  data () {
    return {
      activeNum: 0
    }
  },
  methods: {
    // 返回上级页面
    back () {
      window.history.back()
    },
    isActive (num) {
      this.activeNum = num
      this.$emit('fSwitchNum', num)
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
      display: flex;
      color: #FFFFFF;
      font-weight: bold;
      border: 1px solid #fff;
      border-radius: 10px;
      height: 60px;
      margin-top: 20px;
      @include font_size($font_medium);
      @include no-wrap();
      li{
        line-height: 60px;
        padding: 0 20px;
        &:nth-of-type(1){
          border-right: 1px solid #fff;
        }
        &.active{
          background: rgba(255,255,255,0.5);
        }
      }
    }
  }
</style>
