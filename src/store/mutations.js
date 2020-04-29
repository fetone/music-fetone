import {
  CHANGE_FULL_SCREEN,
  CHANGE_MINI_PLAYER,
  CHANGE_LIST_PLAYER,
  CHANGE_IS_PLAYING,
  CHANGE_MODE_TYPE,
  CHANGE_SONGS_INFO,
  CHANGE_SONG_LYRIC,
  CHANGE_DEL_SONG,
  CHANGE_CURRENT_INDEX,
  CHANGE_CURRENT_TIME,
  CHANGE_FAVORITE_LIST,
  CHANGE_LOCALSONG_LIST,
  CHANGE_HISTORY_SONGS,
  CHANGE_HISTORY_LIST
} from './mutations-type'

export default {
  [CHANGE_FULL_SCREEN] (state, flag) {
    state.isFullScreen = flag
    if (flag) {
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
    }
  },
  [CHANGE_MINI_PLAYER] (state, flag) {
    state.isShowMiniPlayer = flag
    if (flag) {
      state.isFullScreen = false
      state.isShowListPlayer = false
    }
  },
  [CHANGE_LIST_PLAYER] (state, flag) {
    state.isShowListPlayer = flag
    if (flag) {
      state.isFullScreen = false
      // state.isShowMiniPlayer = false
    }
  },
  [CHANGE_IS_PLAYING] (state, flag) {
    state.isPlaying = flag
  },
  [CHANGE_MODE_TYPE] (state, flag) {
    state.modeType = flag
  },
  [CHANGE_SONGS_INFO] (state, list) {
    state.songsInfo = list
  },
  [CHANGE_SONG_LYRIC] (state, list) {
    state.songLyric = list
  },
  [CHANGE_DEL_SONG] (state, index) {
    if (index !== undefined) {
      state.songsInfo.splice(index, 1)
    } else {
      state.songsInfo = []
    }
    if (state.songsInfo.length === 0) {
      state.isFullScreen = false
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
    }
    if (index < state.currentIndex) {
      state.currentIndex -= 1
    }
  },
  [CHANGE_CURRENT_INDEX] (state, index) {
    if (index < 0) {
      index = state.songsInfo.length - 1
    } else if (index > state.songsInfo.length - 1) {
      index = 0
    }
    state.currentIndex = index
  },
  [CHANGE_CURRENT_TIME] (state, time) {
    state.curTime = time
  },
  [CHANGE_FAVORITE_LIST] (state, song) {
    const result = state.favoriteList.find((value) => {
      return value.id === song.id
    })
    if (result === undefined) {
      state.favoriteList.push(song)
    }
  },
  [CHANGE_LOCALSONG_LIST] (state, list) {
    state.favoriteList = list
  },
  [CHANGE_HISTORY_SONGS] (state, song) {
    const result = state.historySongs.find((value) => {
      return value.id === song.id
    })
    if (result === undefined) {
      if (state.historySongs.length > 30) {
        state.historySongs.shift()
      }
      state.historySongs.push(song)
    }
  },
  [CHANGE_HISTORY_LIST] (state, list) {
    state.historySongs = list
  }
}
