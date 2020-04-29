<template>
    <div class="account-bottom">
      <div class="bottom-play" @click="playAll">
        <span></span>
        <span>播放全部</span>
      </div>
      <div class="song-list">
        <IScroll ref="scroll">
          <SongList :newSongs="activeNum === 0 ? favoriteList : historySongs" ></SongList>
        </IScroll>
      </div>
    </div>
</template>

<script>
import SongList from '../SongList'
import IScroll from '../IScroll'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'AccountBottom',
  components: {
    SongList,
    IScroll
  },
  computed: {
    ...mapGetters([
      'favoriteList',
      'historySongs'
    ])
  },
  props: {
    activeNum: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongsInfo',
      'setCurrentIndex'
    ]),
    ...mapMutations([
      'CHANGE_SONGS_INFO'
    ]),
    playAll () {
      const arr = []
      if (this.activeNum === 0) {
        this.favoriteList.forEach((value) => {
          arr.push(value.id)
        })
        // this.CHANGE_SONGS_INFO(this.favoriteList)
      } else if (this.activeNum === 1) {
        this.historySongs.forEach((value) => {
          arr.push(value.id)
        })
        // this.CHANGE_SONGS_INFO(this.historySongs)
      }
      this.setSongsInfo(arr)
      this.setFullScreen(true)
      this.setCurrentIndex(0)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.account-bottom{
  position: fixed;
  left: 0;
  top: 100px;
  right: 0;
  bottom: 0;
  .bottom-play{
    width: 300px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
    height: 80px;
    line-height: 60px;
    border-radius: 40px;
    span{
      &:nth-of-type(1){
        width: 50px;
        height: 50px;
        margin-right: 10px;
        @include bg_img('../../assets/images/small_play')
      }
    }
  }
  .song-list{
    position: fixed;
    top: 220px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
}
</style>
