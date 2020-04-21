<template>
    <div class="normal-player">
      <div class="player-wrapper">
        <PlayHeader></PlayHeader>
        <PlayerMedium></PlayerMedium>
        <PlayerBottom></PlayerBottom>
      </div>
      <div class="player-bg">
        <img src="https://music.163.com/api/img/blur/109951164923581016" alt="">
      </div>
    </div>
</template>

<script>
import PlayHeader from './PlayerHeader'
import PlayerMedium from './PlayerMedium'
import PlayerBottom from './PlayerBottom'
export default {
  name: 'NormalPlayer',
  components: {
    PlayHeader,
    PlayerMedium,
    PlayerBottom
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
.normal-player{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .player-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    img{
      height: 100%;
      filter: blur(10px);
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
  }
}
</style>
