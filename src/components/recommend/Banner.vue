<template>
<!--bug:  如果数据是从网上获取的,轮播到最后一页就不会轮播了, 通过v-if="数据.length>0"解决-->
  <swiper :options="swiperOption" v-if="banners.length > 0" class="banner">
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img :src="value.pic" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'Banner',
  data () {
    return {
      swiperOption: {
        // 循环模式
        loop: true,
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // 自动播放
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 监视器  数据是异步加载的,发生变化自动刷新
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style scoped lang="scss">
.banner{
  .item{
      img{
        width: 100%;
        height: 300px;
      }
  }
}
</style>
<style lang="scss">
/*如果想覆盖swiper的样式,那么style标签不能是scoped的, 否则无法覆盖*/
@import "../../assets/css/mixin";
.banner{
  .swiper-pagination-bullet{
    width: 16px;
    height: 16px;
    opacity: 1;
    background: #fff;
  }
  .swiper-pagination-bullet-active{
    @include bg_color();
  }
}
</style>
