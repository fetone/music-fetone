<template>
<div class="play">
  <NormalPlayer></NormalPlayer>
</div>
</template>

<script>
import NormalPlayer from '../components/player/NormalPlayer'
export default {
  name: 'Play',
  components: {
    NormalPlayer
  }
}
</script>

<style scoped lang="scss">
.play{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
