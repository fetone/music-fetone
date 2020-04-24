export default {
  isFullScreen (state) {
    return state.isFullScreen
  },
  isShowMiniPlayer (state) {
    return state.isShowMiniPlayer
  },
  isShowListPlayer (state) {
    return state.isShowListPlayer
  },
  isPlaying (state) {
    return state.isPlaying
  },
  modeType (state) {
    return state.modeType
  },
  songsInfo (state) {
    return state.songsInfo
  },
  currentSong (state) {
    const obj = {
      name: '加载失败',
      singer: '加载失败',
      imgUrl: '',
      songUrl: ''
    }
    if (state.songsInfo.length > 0) {
      return state.songsInfo[state.currentIndex]
    }
    return obj
  },
  currentIndex (state) {
    return state.currentIndex
  },
  songLyric (state) {
    return state.songLyric
  },
  curTime (state) {
    return state.curTime
  }
}
