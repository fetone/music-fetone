// 这个文件专门用于管理各种请求接口地址的
import Network from './network'
// 获取banner
export const getBanner = () => Network.get('banner?type=2')
// 获取推荐歌单
export const getPersonalized = () => Network.get('personalized?limit=6')
// 最新专辑
export const getAlbum = () => Network.get('album/newest')
// 推荐新音乐
export const getNewSong = () => Network.get('personalized/newsong')
// 歌单详情
export const getDetailSong = (data) => Network.get('playlist/detail', data)
// 最新专辑详情
export const getDetailAlbum = (data) => Network.get('album', data)
// 获取歌曲信息
export const getSongInfo = (data) => Network.get('song/detail', data)
// 获取歌词
export const getSongLyric = (data) => Network.get('lyric', data)
// 获取音乐URL
export const getSongURL = (data) => Network.get('song/url', data)
// 热门歌手
export const getHotArtists = () => {
  return new Promise((resolve, reject) => {
    Network.get('top/artists?offset=0&limit=10')
      .then((result) => {
        resolve(result.artists)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 某个字母开头的歌手
export const getLetterArtists = (letter) => {
  return new Promise((resolve, reject) => {
    const artists = []
    Network.all([
      Network.get(`artist/list?offset=0&limit=10&type=-1&area=7&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=10&type=-1&area=96&initial=${letter}`)
    ])
      .then((result) => {
        result.forEach((item) => {
          artists.push(...item.artists)
        })
        resolve(artists)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 全部歌手
export const getAllArtists = () => {
  return new Promise((resolve, reject) => {
    const keys = ['热']
    const list = [getHotArtists()]
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    const artists = []
    artists.keys = keys
    Network.all(list)
      .then((data) => {
        artists.list = data
        resolve(artists)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 歌手单曲
export const getSingerSongs = (data) => Network.get('/artists', data)
// 排行榜
export const getRankList = () => {
  return new Promise((resolve, reject) => {
    Network.all([
      Network.get('/top/list?idx=0').then((res) => res.playlist),
      Network.get('/top/list?idx=1').then((res) => res.playlist),
      Network.get('/top/list?idx=2').then((res) => res.playlist),
      Network.get('/top/list?idx=3').then((res) => res.playlist),
      Network.get('/top/list?idx=4').then((res) => res.playlist),
      Network.get('/top/list?idx=5').then((res) => res.playlist),
      Network.get('/top/list?idx=6').then((res) => res.playlist),
      Network.get('/top/list?idx=7').then((res) => res.playlist),
      Network.get('/top/list?idx=8').then((res) => res.playlist),
      Network.get('/top/list?idx=9').then((res) => res.playlist),
      Network.get('/top/list?idx=10').then((res) => res.playlist),
      Network.get('/top/list?idx=11').then((res) => res.playlist),
      Network.get('/top/list?idx=12').then((res) => res.playlist),
      Network.get('/top/list?idx=13').then((res) => res.playlist),
      Network.get('/top/list?idx=14').then((res) => res.playlist),
      Network.get('/top/list?idx=15').then((res) => res.playlist),
      Network.get('/top/list?idx=16').then((res) => res.playlist),
      Network.get('/top/list?idx=17').then((res) => res.playlist),
      Network.get('/top/list?idx=18').then((res) => res.playlist),
      Network.get('/top/list?idx=19').then((res) => res.playlist),
      Network.get('/top/list?idx=20').then((res) => res.playlist),
      Network.get('/top/list?idx=21').then((res) => res.playlist)
    ])
      .then((...result) => {
        const offList = []
        const recList = []
        const allList = []
        const moreList = []
        const data = result[0]
        for (let i = 0; i < data.length; i++) {
          if (i < 4) {
            offList.push(data[i])
          } else if (i >= 4 && i < 10) {
            recList.push(data[i])
          } else if (i >= 10 && i < 16) {
            allList.push(data[i])
          } else if (i >= 16 && i < 22) {
            moreList.push(data[i])
          }
        }
        const list = [offList, recList, allList, moreList]
        resolve(list)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
// 单个排行榜数据
export const getOneRankList = (data) => Network.get('/top/list', data).then((data) => data.playlist)
// 搜索
export const getSearchList = (data) => Network.get('/search?type=1', data)
// 热搜 简略
export const getSearchHot = () => Network.get('/search/hot')
