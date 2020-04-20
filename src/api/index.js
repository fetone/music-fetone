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
