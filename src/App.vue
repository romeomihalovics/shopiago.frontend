<template>
  <div id="app">
    <div class="wrapper">
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

.wrapper {
  display: flex;
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
  margin-left:50px;
  width: calc(100% - 50px);
  color:$color_text_dark;
}

.narrow + .content {
  margin-left:50px;
  width: calc(100% - 50px);
}

@media (min-width: 700px) {
  .content {
    margin-left:370px;
    width: calc(100% - 370px);
  }
}
</style>

<script>
import SideNav from '@/components/SideNav.vue'
import searchOverlay from '@/components/searchOverlay.vue'
import data from '@/data.json'

window.jsondata = data
window.userid = 0
window.accountid = 0
window.showSearchOverlay = false
window.showSearchResults = false

export default {
  components: {
    SideNav,
    searchOverlay
  }
}
</script>
