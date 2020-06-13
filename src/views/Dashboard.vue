<template>
  <div>
    <topNav/>
    <accountCompletion/>
    <statistics/>
    <last24/>
    <userperf/>
    <pagefooter/>
  </div>
</template>

<style lang="scss">
@import "../scss/_varibles.scss";
</style>

<script>
import topNav from '@/components/topNav.vue'
import accountCompletion from '@/components/accountCompletion.vue'
import statistics from '@/components/statistics.vue'
import last24 from '@/components/last24.vue'
import userperf from '@/components/userperf.vue'
import pagefooter from '@/components/footer.vue'

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
    statistics,
    last24,
    userperf,
    pagefooter
  }
}
</script>
