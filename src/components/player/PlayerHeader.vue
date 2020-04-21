<template>
  <div class="header">
    <div class="header-left"></div>
    <div class="header-title">
      <h3>模特</h3>
      <p>李荣浩</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'PlayerHeader'
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
@import "../../assets/css/mixin";
.header{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 999;
  .header-left, .header-right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left{
    @include bg_img('../../assets/images/down');
  }
  .header-title{
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    color: #FFFFFF;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>
