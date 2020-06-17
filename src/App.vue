<template>
  <div id="app">
    <div class="wrapper d-flex flex-row">
      <searchOverlay/>
      <side-nav/>
      <div class="content position-relative">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color_text_light;
  overflow-x: hidden;
  background-color:$color_body_bg;
  min-height: 100vh;
}

.search-overlay {
  z-index: 999999;
  position: absolute;
  background-color: $color_blue;
  opacity: .5;
  width: 100%;
  height: 100%;
}

.content {
  -o-transition: .3s;
  -ms-transition: .3s;
  -moz-transition: .3s;
  -webkit-transition: .3s;
  transition: .3s;
  flex:1;
  color:$color_text_dark;
}
</style>

<script>
import SideNav from '@/components/SideNav.vue'
import searchOverlay from '@/components/searchOverlay.vue'
import data from '@/data.json'

export default {
  beforeMount () {
    this.$store.commit('setJsonData', data)
    this.$store.commit('setUserId', 0)
    this.$store.commit('setAccountId', 0)
    this.$store.commit('setShowSearchOverlay', false)
    this.$store.commit('setShowSearchResults', false)
  },
  components: {
    SideNav,
    searchOverlay
  }
}
</script>
