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
import { getSongInfo, getSongLyric, getSongURL } from '../api'

export default {
  setFullScreen ({ commit }, flag) {
    commit(CHANGE_FULL_SCREEN, flag)
  },
  setMiniPlayer ({ commit }, flag) {
    commit(CHANGE_MINI_PLAYER, flag)
  },
  setListPlayer ({ commit }, flag) {
    commit(CHANGE_LIST_PLAYER, flag)
  },
  setIsPlaying ({ commit }, flag) {
    commit(CHANGE_IS_PLAYING, flag)
  },
  setModeType ({ commit }, flag) {
    commit(CHANGE_MODE_TYPE, flag)
  },
  async setSongsInfo ({ commit }, id) {
    const data = await getSongInfo({ ids: id.join(',') })
    const urls = await getSongURL({ id: id.join(',') })
    const list = []
    data.songs.forEach((value, index) => {
      const obj = {}
      obj.name = value.name
      for (const item of urls.data) {
        if (item.id === value.id) {
          obj.songUrl = item.url
          break
        }
      }
      let singer = ''
      value.ar.forEach((item, index) => {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '-' + item.name
        }
      })
      obj.singer = singer
      obj.imgUrl = value.al.picUrl
      obj.id = value.id
      list.push(obj)
    })
    commit(CHANGE_SONGS_INFO, list)
  },
  async setSongLyric ({ commit }, id) {
    const lyricObj = await getSongLyric({ id: id })
    const lyricStr = lyricObj.lrc.lyric
    let lyric = parseLyric(lyricStr)
    if (Object.keys(lyric).length === 0) {
      lyric = { 0: '找不到歌词' }
    }
    commit(CHANGE_SONG_LYRIC, lyric)
  },
  delSong ({ commit }, index) {
    commit(CHANGE_DEL_SONG, index)
  },
  setCurrentIndex ({ commit }, index) {
    commit(CHANGE_CURRENT_INDEX, index)
  },
  setCurrentTime ({ commit }, time) {
    commit(CHANGE_CURRENT_TIME, time)
  },
  setFavoriteList ({ commit }, song) {
    commit(CHANGE_FAVORITE_LIST, song)
  },
  setLocalSongList ({ commit }, list) {
    commit(CHANGE_LOCALSONG_LIST, list)
  },
  setHistorySongs ({ commit }, song) {
    commit(CHANGE_HISTORY_SONGS, song)
  },
  setHistoryList ({ commit }, list) {
    commit(CHANGE_HISTORY_LIST, list)
  }
}

// 格式化歌词方法
function parseLyric (lrc) {
  const lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  const reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  const reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  const reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  const lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    const minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    const secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    const time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    const text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
