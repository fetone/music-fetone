<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <router-view></router-view>
    <Play></Play>
  </div>
</template>

<script>
import Header from './components/Header'
import Tab from './components/Tab'
import Play from './views/Play'
export default {
  name: 'App',
  components: {
    Header,
    Tab,
    Play
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">

</style>
