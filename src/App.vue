<template>
  <div id="app">
    <div class="wrapper">
      <side-nav/>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "scss/_varibles.scss";

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

@media (min-width: 700px) {
  .content {
    margin-left:370px;
    width: calc(100% - 370px);
  }
}
</style>

<script>
import SideNav from '@/components/SideNav.vue'
import data from '@/data.json'

window.jsondata = data
window.userid = 0
window.accountid = 0

export default {
  components: {
    SideNav
  }
}
</script>
