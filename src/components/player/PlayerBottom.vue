<template>
    <div class="player-bottom">
      <div class="progress">
        <span>00:00</span>
        <div class="progress-bar">
          <div class="progress-line">
            <div class="progress-dot"></div>
          </div>
        </div>
        <span>00:00</span>
      </div>
      <div class="control">
        <div class="mode"></div>
        <div class="prev"></div>
        <div class="play"></div>
        <div class="next"></div>
        <div class="favorite"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'PlayerBottom'
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
.player-bottom{
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  .progress{
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    span{
      @include font_size($font_samll);
      @include font_color();
    }
    .progress-bar{
      width: 100%;
      height: 10px;
      background: #fff;
      margin: 0 20px;
      position: relative;
      .progress-line{
        width: 50%;
        height: 100%;
        background: cadetblue;
        .progress-dot{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .control{
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 40px;
    div{
      width: 80px;
      height: 80px;
    }
    .mode{
      @include bg_img('../../assets/images/loop');
    }
    .prev{
      @include bg_img('../../assets/images/prev');
    }
    .play{
      @include bg_img('../../assets/images/play');
    }
    .next{
      @include bg_img('../../assets/images/next');
    }
    .favorite{
      @include bg_img('../../assets/images/un_favorite');
    }
  }
}
</style>
