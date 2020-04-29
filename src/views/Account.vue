<template>
   <Transition appear>
     <div>
       <AccountHeader @fSwitchNum="switchNum"></AccountHeader>
       <AccountBottom :activeNum="activeNum"></AccountBottom>
     </div>
   </Transition>
</template>

<script>
import AccountHeader from '../components/account/AccountHeader'
import AccountBottom from '../components/account/AccountBottom'
export default {
  name: 'Account',
  components: {
    AccountHeader,
    AccountBottom
  },
  data () {
    return {
      activeNum: 0
    }
  },
  methods: {
    switchNum (num) {
      this.activeNum = num
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
div{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
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
