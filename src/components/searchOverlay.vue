<template>
  <div>
    <transition name="overlay-transition">
      <div v-if="show" class="searchOverlay"></div>
    </transition>
  </div>
</template>

<style lang="scss">
@import "../scss/_varibles.scss";

.searchOverlay {
  position: fixed;
  background-color: $color_blue;
  opacity: .5;
  width: 100%;
  height: 100%;
  z-index: 999999;
}

.overlay-transition-enter-active, .overlay-transition-leave-active {
  transition: .3s;
  opacity: .5;
}

.overlay-transition-enter, .overlay-transition-leave-to {
  opacity: 0;
}
</style>

<script>
export default {
  name: 'searchOverlay',
  mounted () {
    this.$root.$on('toggleOverlay', () => {
      this.show = !this.show
    })
  },
  data () {
    return {
      show: window.showSearchOverlay
    }
  }
}
</script>
