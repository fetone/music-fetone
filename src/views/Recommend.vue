<template>
<div class="recommend">
  <div class="recommend-iscroll">
    <IScroll>
      <div>
        <!--  banners-->
        <Banner :banners="banners"></Banner>
        <!--  推荐歌单-->
        <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelect" :type="'personalized'"></Personalized>
        <!--  最新专辑-->
        <Personalized :personalized="albums" :title="'最新专辑'" @select="fatherSelect" :type="'albums'"></Personalized>
        <!--  推荐新音乐-->
        <NewSongs :newSongs="newSongs"></NewSongs>
      </div>
    </IScroll>
  </div>
<!--  二级页面-->
  <Transition>
    <router-view></router-view>
  </Transition>
</div>
</template>

<script>
import { getAlbum, getBanner, getNewSong, getPersonalized } from '../api'
import Banner from '../components/recommend/Banner'
import Personalized from '../components/recommend/Personalized'
import NewSongs from '../components/recommend/NewSongs'
import IScroll from '../components/IScroll'
export default {
  name: 'Recommend',
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      newSongs: []
    }
  },
  methods: {
    // 二级页面链接
    fatherSelect (id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  created () {
    // 获取banners数据
    getBanner()
      .then((data) => {
        this.banners = data.banners
      })
      .catch((error) => {
        console.log(error)
      })
    // 获取推荐歌单数据
    getPersonalized()
      .then((data) => {
        this.personalized = data.result
      })
      .catch((error) => {
        console.log(error)
      })
    // 获取最新专辑数据
    getAlbum()
      .then((data) => {
        this.albums = data.albums.slice(0, 6)
      })
      .catch((error) => {
        console.log(error)
      })
    // 获取最新音乐
    getNewSong()
      .then((data) => {
        this.newSongs = data.result
      })
      .catch((error) => {
        console.log(error)
      })
  },
  components: {
    Banner,
    Personalized,
    NewSongs,
    IScroll
  }
}
</script>

<style scoped lang="scss">
  //设置推荐页面的大小
.recommend{
  position: fixed;
  top: 180px;
  left: 0;
  right: 0;
  bottom: 0;
  .recommend-iscroll{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
  .v-enter{
     transform: translateX(100%);
   }
  .v-enter-active{
    transition: transform 0.5s;
  }
  .v-enter-to{
    transform: translateX(0%);
  }
  .v-leave{
    transform: translateX(0%);
  }
  .v-leave-active{
    transition: transform 0.5s;
  }
  .v-leave-to{
    transform: translateX(100%);
  }
</style>
