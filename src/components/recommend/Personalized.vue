<template>
<div class="personalized">
  <div class="personalized-top">
    {{title}}
  </div>
  <div class="personalized-list">
<!--    遍历获取到的数据渲染到页面上-->
    <div class="item" v-for="value in personalized" :key="value.id" @click="jump(value.id)">
      <img v-lazy="value.picUrl" alt="">
      <p>{{value.name}}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Personalized',
  // 接收数据
  props: {
    personalized: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    // 触发父组件中的路由
    jump (id) {
      this.$emit('select', id, this.type)
    }
  }

}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.personalized{
  @include bg_sub_color();
  .personalized-top{
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-weight: bold;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    @include bg_sub_color();
    @include font_size($font_large);
    @include font_color();
  }
  .personalized-list{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .item{
      width: 200px;
      padding-top: 20px;
      img{
        width: 200px;
        border-radius: 20px;
      }
      p{
        @include clamp(2);
        @include font_size($font_samll);
        @include font_color();
        text-align: center;
      }
    }
  }
}
</style>
