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
      'currentIndex'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      if (this.isPlaying) {
        this.$refs.audio.oncanplay = () => {
          this.$refs.audio.play()
          this.totalTime = this.$refs.audio.duration
        }
      } else {
        this.$refs.audio.pause()
      }
    },
    curTime (newValue) {
      this.$refs.audio.currentTime = newValue
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
  methods: {
    ...mapActions([
      'setCurrentIndex'
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
