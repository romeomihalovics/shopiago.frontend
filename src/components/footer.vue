<template>
  <div class="section section-light" :class="((sideOpen) ? 'sideOpen' : '')">
    <div class="section-left footer-links">
      <a href="/">Home</a>
      <a href="/">Privacy Policy</a>
      <a href="/">Terms of Service</a>
      <a href="/">Help Center</a>
    </div>
    <div class="section-right footer-social">
      <a href="/">
        <span class="ti-facebook"></span>
      </a>
      <a href="/">
        <span class="ti-twitter-alt"></span>
      </a>
      <a href="/">
        <span class="ti-google"></span>
      </a>
    </div>
  </div>
</template>

<style lang="scss">
@import '../scss/_varibles.scss';

.section {
  &.section-light {
    background-color:$color_text_light;
    border-top:1px solid $color_topnav_border;
  }
  position: relative;
}

.section-left {
  padding:15px;
}

.section-right {
  position: absolute;
  bottom:14px;
  right: 15px;
}

.footer-links {
  & a, a:hover, a:focus {
    color:$color_text_dark;
    text-decoration: none;
    padding-right: 40px;
    font-size: 14px;
    line-height: 1;
  }
}

.footer-social {
  & a, a:hover, a:focus {
    color:$color_text_darkest;
    text-decoration: none;
    padding-right: 20px;
    font-size: 18px;
    line-height: 1;
    position: relative;
    &:after {
      content:'';
      width: 30px;
      height: 30px;
      position: absolute;
      top:-8px;
      bottom:0;
      left: -6px;
      right: 0;
      border-radius: 50%;
      border:1px solid $color_text_darkest;
    }
  }
}

@media (max-width: 635px) {
  .section-right {
    position: static;
    text-align: center;
    padding-bottom:15px;
  }
  .section-left {
    text-align: center;
    padding:15px 0;
    & a {
      padding-right: 20px;
      display: inline-block;
    }
  }
}

@media (max-width: 945px) {
  .sideOpen {
    & .section-right {
      position: static;
      text-align: center;
      padding-bottom:15px;
    }
    & .section-left {
      text-align: center;
      padding:15px 0;
      & a {
        padding-right: 20px;
        display: inline-block;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'pagefooter',
  mounted () {
    this.$root.$on('toggleSideNav', () => {
      this.sideOpen = !this.sideOpen
    })
  },
  data () {
    return {
      sideOpen: false
    }
  }
}
</script>
