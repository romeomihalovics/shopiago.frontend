<template>
  <div>
    <topNav/>
    <accountCompletion/>
    <statistics/>
  </div>
</template>

<style lang="scss">
@import "../scss/_varibles.scss";
</style>

<script>
import topNav from '@/components/topNav.vue'
import accountCompletion from '@/components/accountCompletion.vue'
import statistics from '@/components/statistics.vue'

export default {
  data () {
    return {
      navToggled: false,
      jsondata: window.jsondata,
      userid: window.userid,
      accountid: window.accountid
    }
  },
  components: {
    topNav,
    accountCompletion,
    statistics
  }
}
</script>
