<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
import Tab from './components/Tab'
export default {
  name: 'App',
  components: {
    Header,
    Tab
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">

</style>
