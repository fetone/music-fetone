<template>
    <div class="detail">
      <DetailHeader :title="title"></DetailHeader>
    </div>
</template>

<script>
import DetailHeader from '../components/DetailHeader'
import { getDetailSong } from '../api'

export default {
  name: 'Detail',
  data () {
    return {
      title: ''
    }
  },
  created () {
    getDetailSong({ id: this.$route.params.id })
      .then((data) => {
        this.title = data.playlist.name
      })
      .catch((err) => {
        console.log(err)
      })
  },
  components: {
    DetailHeader
  }
}
</script>

<style scoped lang="scss">
.detail{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: red;
}
</style>
