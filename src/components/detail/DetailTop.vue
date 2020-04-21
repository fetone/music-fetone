<template>
<div class="detail-top">
  <img :src="path" alt="">
  <div class="mask" ref="mask"></div>
</div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    changeDark (opacity) {
      this.$refs.mask.style.opacity = opacity
    }
  }
}
</script>

<style scoped lang="scss">
.detail-top{
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  img{
    width: 100%;
  }
  .mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0;
  }
}
</style>
