<template>
    <div class="detail">
<!--      详情歌曲头部-->
      <DetailHeader :title="playList.name"></DetailHeader>
<!--      详情歌曲图片-->
      <DetailTop :path="playList.coverImgUrl" ref="detailImg"></DetailTop>
<!--      详情歌曲底部-->
      <div class="bottom">
        <IScroll ref="myScroll">
          <DetailBottom :tracks="playList.tracks"></DetailBottom>
        </IScroll>
      </div>
    </div>
</template>

<script>
import DetailHeader from '../components/detail/DetailHeader'
import { getDetailAlbum, getDetailSong } from '../api'
import DetailTop from '../components/detail/DetailTop'
import DetailBottom from '../components/detail/DetailBottom'
import IScroll from '../components/IScroll'

export default {
  name: 'Detail',
  data () {
    return {
      playList: {}
    }
  },
  created () {
    const type = this.$route.params.type
    if (type === 'personalized') {
      getDetailSong({ id: this.$route.params.id })
        .then((data) => {
          this.playList = data.playlist
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (type === 'albums') {
      getDetailAlbum({ id: this.$route.params.id })
        .then((data) => {
          this.playList = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    // 调用iscroll中页面滚动的方法
    this.$refs.myScroll.scrolling((scrollY) => {
      // console.log(scrollY)
      if (scrollY < 0) {
        // 向上  使用高斯模糊  由于高斯模糊太消耗性能,采用蒙版的方法
        // const fil = Math.abs(scrollY) / this.$refs.detailImg.$el.offsetHeight * 20
        // this.$refs.detailImg.$el.style.filter = `blur(${fil}px)`
        const opa = Math.abs(scrollY) / this.$refs.detailImg.$el.offsetHeight
        this.$refs.detailImg.changeDark(opa)
      } else {
        // 向下
        const scale = scrollY / this.$refs.detailImg.$el.offsetHeight + 1
        this.$refs.detailImg.$el.style.transform = `scale(${scale})`
      }
    })
  },
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    IScroll
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
.detail{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .bottom{
    position: fixed;
    top: 500px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
