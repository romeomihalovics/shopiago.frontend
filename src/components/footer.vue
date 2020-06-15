<template>
  <footer class="light" :class="((sideOpen) ? 'sideOpen' : '')">
    <div class="footer-links">
      <a href="/">Home</a>
      <a href="/">Privacy Policy</a>
      <a href="/">Terms of Service</a>
      <a href="/">Help Center</a>
    </div>
    <div class="footer-social">
      <a href="/">
        <span class="icon-facebook"></span>
      </a>
      <a href="/">
        <span class="icon-twitter-alt"></span>
      </a>
      <a href="/">
        <span class="icon-google"></span>
      </a>
    </div>
  </footer>
</template>

<style lang="scss">
footer {
  position: relative;
  &.light {
    background-color:$color_text_light;
    border-top:1px solid $color_topnav_border;
  }
  .footer-links {
    padding:15px;
    a, a:hover, a:focus {
      color:$color_text_dark;
      text-decoration: none;
      padding-right: 40px;
      font-size: 14px;
      line-height: 1;
    }
  }

  .footer-social {
    position: absolute;
    bottom:14px;
    right: 15px;
    a, a:hover, a:focus {
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
}

@media (max-width: 635px) {
  footer {
    .footer-social {
      position: static;
      text-align: center;
      padding-bottom:15px;
    }
    .footer-links {
      text-align: center;
      padding:15px 0;
      a {
        padding-right: 20px !important;
        display: inline-block;
      }
    }
  }
}

@media (max-width: 945px) {
  footer {
    &.sideOpen {
      .footer-social {
        position: static;
        text-align: center;
        padding-bottom:15px;
      }
      .footer-links {
        text-align: center;
        padding:15px 0;
        a {
          padding-right: 20px !important;
          display: inline-block;
        }
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
