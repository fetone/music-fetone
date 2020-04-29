<template>
<div class="rank">
  <div class="rank-wrapper">
    <IScroll>
      <ul>
        <li v-for="(value, index) in title" :key="value">
          <h3>{{value}}</h3>
          <ul v-if="value === '官方榜'" class="off-list">
            <li v-for="(item, idx) in list[index]" :key="item.id" class="off-item">
              <img v-lazy="item.coverImgUrl" alt="" @click="showDetail(idx)">
              <ul class="right-song">
                <li v-for="(song, num) in item.tracks.slice(0,5)" :key="song.id">{{num+1}}. {{song.al.name}} - {{song.ar[0].name}}</li>
              </ul>
            </li>
          </ul>
          <ul v-else class="other-list">
            <li v-for="(item, idx) in list[index]" :key="item.id">
              <img v-lazy="item.coverImgUrl" alt="" @click="showDetail(idx +4+(index-1)*6)">
              <p>{{item.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </IScroll>
  </div>
  <!--  二级页面-->
  <Transition>
    <router-view></router-view>
  </Transition>
</div>
</template>

<script>
import { getRankList } from '../api'
import IScroll from '../components/IScroll'
export default {
  name: 'Rank',
  data () {
    return {
      title: ['官方榜', '推荐榜', '全球榜', '更多榜单'],
      list: []
    }
  },
  created () {
    getRankList()
      .then((data) => {
        this.list = data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  components: {
    IScroll
  },
  methods: {
    showDetail (idx) {
      this.$router.push({
        path: `/rank/detail/${idx}/rankList`
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
.rank{
  width: 100%;
  height: 100%;
  .rank-wrapper{
    position: fixed;
    left: 0;
    right: 0;
    top: 180px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    h3{
      @include font_color();
      @include font_size($font_large);
      font-weight: bold;
      height: 60px;
      line-height: 60px;
      padding-left: 20px;
      padding-top: 20px;
    }
    .off-list{
      .off-item{
        display: flex;
        align-items: center;
        padding: 10px 20px;
        img{
          width: 200px;
          height: 200px;
          border-radius: 20px;
          margin-right: 20px;
        }
        .right-song{
          li{
            @include font_size($font_medium_s);
            @include font_color();
            @include no-wrap();
          }
        }
      }
    }
    .other-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li{
        @include no-wrap();
        width: 210px;
        margin: 10px;
        img{
          width: 210px;
          height: 210px;
          border-radius: 20px;
        }
        p{
          @include font_size($font_medium_s);
          text-align: center;
          @include font_color();
        }
      }
    }
  }
}
  .v-enter{
    transform: translateX(100%);
  }
  .v-enter-active{
    transition: transform 0.5s;
  }
  .v-enter-to{
    transform: translateX(0%);
  }
  .v-leave{
    transform: translateX(0%);
  }
  .v-leave-active{
    transition: transform 0.5s;
  }
  .v-leave-to{
    transform: translateX(100%);
  }
</style>
