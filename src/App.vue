<template>
  <div id="app">
    <MainHeader></MainHeader>
    <Tab></Tab>
    <keep-alive include="Singer, Search">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader'
import Tab from './components/Tab'
import Player from './views/Player'
export default {
  name: 'App',
  components: {
    MainHeader,
    Tab,
    Player
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">

</style>
