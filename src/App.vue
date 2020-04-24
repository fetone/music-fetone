<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <router-view></router-view>
    <Player></Player>
  </div>
</template>

<script>
import Header from './components/Header'
import Tab from './components/Tab'
import Player from './views/Player'
export default {
  name: 'App',
  components: {
    Header,
    Tab,
    Player
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">

</style>
