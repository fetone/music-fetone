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
