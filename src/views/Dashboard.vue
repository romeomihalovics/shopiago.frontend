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

<script>
import topNav from '@/components/topNav.vue'
import accountCompletion from '@/components/accountCompletion.vue'
import statistics from '@/components/statistics.vue'
import last24 from '@/components/last24.vue'
import userperf from '@/components/userperf.vue'
import pagefooter from '@/components/footer.vue'

export default {
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
