<template>
<div class="player">
  <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
  <MiniPlayer></MiniPlayer>
  <ListPlayer></ListPlayer>
  <audio :src="currentSong.songUrl" ref="audio" @timeupdate="timeUpDate" @ended="ended"></audio>
</div>
</template>

<script>
import NormalPlayer from '../components/player/NormalPlayer'
import MiniPlayer from '../components/player/MiniPlayer'
import ListPlayer from '../components/player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import mode from '../store/modeType'
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'curTime',
      'modeType',
      'songsInfo',
      'currentIndex',
      'favoriteList',
      'historySongs'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.audio.play()
        this.setHistorySongs(this.currentSong)
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      if (this.isPlaying) {
        // 在 iOS中,永远不会自动加载歌曲,也就是永远执行不到oncanplay
        // 在PC端和android中会自动加载
        // 解决方案: 监听iOS中audio的歌曲是否准备好了,通过ondurationchange事件来监听
        // 歌曲加载完成之后会执行ondurationchange, 因为只有加载完成之后才能获取歌曲的总时长
        // this.$refs.audio.oncanplay = () => {
        this.$refs.audio.ondurationchange = () => {
          this.$refs.audio.play()
          this.totalTime = this.$refs.audio.duration
        }
        this.setHistorySongs(this.currentSong)
      } else {
        this.$refs.audio.pause()
      }
    },
    curTime (newValue) {
      this.$refs.audio.currentTime = newValue
    },
    favoriteList (newValue) {
      window.localStorage.setItem('songList', JSON.stringify(newValue))
    },
    historySongs (newValue) {
      window.localStorage.setItem('historyList', JSON.stringify(newValue))
    }
  },
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },
  mounted () {
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },
  created () {
    const songList = JSON.parse(window.localStorage.getItem('songList'))
    if (songList === null) {
      return
    }
    this.setLocalSongList(songList)

    const historyList = JSON.parse(window.localStorage.getItem('historyList'))
    if (historyList === null) {
      return
    }
    this.setHistoryList(historyList)
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setLocalSongList',
      'setHistorySongs',
      'setHistoryList'
    ]),
    timeUpDate (e) {
      this.currentTime = e.target.currentTime
    },
    ended () {
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play()
      } else if (this.modeType === mode.random) {
        this.setCurrentIndex(Math.floor(Math.random() * this.songsInfo.length))
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
