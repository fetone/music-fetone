<template>
  <swiper :options="swiperOption" class="player-medium">
    <swiper-slide class="cd">
      <div class="cd-imgBorder">
        <img src="https://music.163.com/api/img/blur/109951164923581016" alt="">
      </div>
      <p>哈哈哈哈哈哈哈哈</p>
    </swiper-slide>
    <swiper-slide class="lyric">
      <IScroll>
        <ul>
          <li>我是第1个li</li>
          <li>我是第2个li</li>
          <li>我是第3个li</li>
          <li>我是第4个li</li>
          <li>我是第5个li</li>
          <li>我是第6个li</li>
          <li>我是第7个li</li>
          <li>我是第8个li</li>
          <li>我是第9个li</li>
          <li>我是第10个li</li>
          <li>我是第11个li</li>
          <li>我是第12个li</li>
          <li>我是第13个li</li>
          <li>我是第14个li</li>
          <li>我是第15个li</li>
          <li>我是第16个li</li>
          <li>我是第17个li</li>
          <li>我是第18个li</li>
          <li>我是第19个li</li>
          <li>我是第20个li</li>
          <li>我是第21个li</li>
          <li>我是第22个li</li>
          <li>我是第23个li</li>
          <li>我是第24个li</li>
          <li>我是第25个li</li>
          <li>我是第26个li</li>
          <li>我是第27个li</li>
          <li>我是第28个li</li>
          <li>我是第29个li</li>
          <li>我是第30个li</li>
          <li>我是第31个li</li>
          <li>我是第32个li</li>
          <li>我是第33个li</li>
          <li>我是第34个li</li>
          <li>我是第35个li</li>
          <li>我是第36个li</li>
          <li>我是第37个li</li>
          <li>我是第38个li</li>
          <li>我是第39个li</li>
          <li>我是第40个li</li>
          <li>我是第41个li</li>
          <li>我是第42个li</li>
          <li>我是第43个li</li>
          <li>我是第44个li</li>
          <li>我是第45个li</li>
          <li>我是第46个li</li>
          <li>我是第47个li</li>
          <li>我是第48个li</li>
          <li>我是第49个li</li>
          <li>我是第50个li</li>
        </ul>
      </IScroll>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import IScroll from '../IScroll'

export default {
  name: 'PlayerMedium',
  data () {
    return {
      swiperOption: {
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          // 替换默认类
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        // 监视器  数据是异步加载的,发生变化自动刷新
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    IScroll
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
  .player-medium{
    position: fixed;
    left: 0;
    top: 150px;
    right: 0;
    bottom: 250px;
    .cd{
      .cd-imgBorder{
        width: 500px;
        height: 500px;
        border: 20px solid #eee;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p{
        text-align: center;
        margin-top: 50px;
        @include font_color();
        @include font_size($font_medium)
      }
    }
    .lyric{
      li{
        text-align: center;
        margin: 10px 0;
        @include font_color();
        @include font_size($font_medium);
        &:last-of-type{
          padding-bottom: 100px;
        }
      }
    }
  }
</style>
<style lang="scss">
  /*如果想覆盖swiper的样式,那么style标签不能是scoped的, 否则无法覆盖*/
  @import "../../assets/css/mixin";
  .my-bullet{
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 10px;
    margin: 0 10px;
    &.my-bullet-active{
      width: 50px;
      @include bg_color();
    }
  }
</style>
