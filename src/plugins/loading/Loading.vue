<template>
    <div class="container" v-show="isShow">
      <div class="loading"></div>
      <p>{{title}}</p>
    </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      isShow: false,
      title: '加载中...'
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  width: 200px;
  height: 200px;
  border-radius: 20px ;
  background: #999;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .loading{
    width: 60px;
    height: 60px;
    border: 5px solid #fff;
    border-radius: 50%;
    border-right-color: blue;
    margin: 50px auto 0;
    animation: rotate 2s linear infinite;
  }
  p{
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    color: #fff;
  }
}
@keyframes rotate {
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
