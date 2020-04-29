<template>
    <div class="search">
      <div class="search-box">
        <span class="iconfont icon-icon-"></span>
        <input type="text" placeholder="搜索歌手、歌曲、专辑" v-model="keywords" v-throttle="search">
      </div>
      <div class="search-suggest" v-show="keywords !== ''">
        <IScroll>
          <ul>
            <li v-for="(item) in songs" :key="item.id" @click="showPlayer(item.id)">
              <span class="iconfont icon-icon-"></span>
              <p>{{item.name}} - {{item.artists[0].name}}</p>
            </li>
          </ul>
        </IScroll>
      </div>
      <div class="search-hot">
        <h3>热门搜索</h3>
        <ul>
          <li v-for="value in hotList" :key="value.first" @click="searchHot(value.first)">{{value.first}}</li>
        </ul>
      </div>
      <div class="search-history">
        <h3>搜索历史</h3>
        <ul>
          <li v-for="(value, index) in searchHistory" :key="value" @click="searchHot(value)">
            <div class="history-song">
              <span class="iconfont icon-history"></span>
              <p>{{value}}</p>
            </div>
            <div class="del-history" @click.stop="delHistory(index)"></div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import '../assets/font/iconfont.css'
import IScroll from '../components/IScroll'
import { getSearchList, getSearchHot } from '../api'
import { mapActions } from 'vuex'
export default {
  name: 'Search',
  components: {
    IScroll
  },
  data () {
    return {
      keywords: '',
      songs: [],
      hotList: [],
      searchHistory: []
    }
  },
  directives: {
    throttle: {
      // 指令的定义
      inserted: function (el, obj) {
        let timerId = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timerId && clearTimeout(timerId)
          timerId = setTimeout(function () {
            flag = true
            obj.value()
          }, 1000)
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongsInfo',
      'setSongLyric'
    ]),
    search () {
      if (!this.keywords) {
        return
      }
      getSearchList({ keywords: this.keywords })
        .then((data) => {
          this.songs = data.result.songs
        })
        .catch((err) => {
          console.log(err)
        })
    },
    showPlayer (id) {
      this.setFullScreen(true)
      this.setSongsInfo([id])
      this.setSongLyric(id)
      if (this.searchHistory.includes(this.keywords)) {
        return
      }
      if (this.searchHistory.length > 5) {
        this.searchHistory.shift()
      }
      this.searchHistory.push(this.keywords)
      window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
      this.keywords = ''
    },
    searchHot (text) {
      this.keywords = text
      this.search()
    },
    delHistory (index) {
      this.searchHistory.splice(index, 1)
    }
  },
  created () {
    getSearchHot()
      .then((data) => {
        this.hotList = data.result.hots
      })
    this.searchHistory = JSON.parse(window.localStorage.getItem('searchHistory'))
  },
  watch: {
    searchHistory () {
      window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
.search{
  position: fixed;
  left: 0;
  right: 0;
  top: 180px;
  bottom: 0;
  @include bg_sub_color();
  span{
    @include font_size($font_large);
    margin: 0 20px;
  }
  .search-box{
    height: 60px;
    margin: 30px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    background: #ddd;
    input{
      width: 600px;
      border: none;
      outline: none;
      background: rgba(0,0,0,0);
      @include font_size($font_medium);
    }
  }
  .search-suggest{
    position: fixed;
    left: 0;
    right: 0;
    top: 300px;
    bottom: 0;
    overflow: hidden;
    z-index: 999;
    @include bg_sub_color();
    li{
      display: flex;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #ccc;
      p{
        @include font_size($font_medium);
        @include font_color();
      }
    }
  }
  .search-hot{
    h3{
      padding-left: 30px;
      height: 60px;
      line-height: 60px;
      @include font_color();
      @include font_size($font_medium);
    }
    ul{
       display: flex;
       flex-wrap: wrap;
       li{
         height: 50px;
         line-height: 50px;
         padding: 0 20px;
         margin: 10px 20px;
         border: 1px solid #000;
         border-radius: 25px;
         @include font_size($font_medium_s);
         @include font_color();
       }
     }
  }
  .search-history{
    margin-top: 50px;
    h3{
      padding-left: 30px;
      height: 60px;
      line-height: 60px;
      @include font_color();
      @include font_size($font_medium);
    }
    ul{
      li{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        @include font_color();
        @include font_size($font_medium_s);
        .history-song{
          display: flex;
        }
        .del-history{
          width: 30px;
          height: 30px;
          margin-right: 10px;
          @include bg_img('../assets/images/small_close')
        }
      }
    }
  }
}
</style>
