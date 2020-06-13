<template>
  <div v-bind:class="(navToggled) ? '' : 'narrow'">
    <nav v-bind:class="'sideNav ' + ((navToggled) ? '' : 'narrow')">
        <span v-bind:class="'sideNav-btn '+((navToggled) ? 'active' : '')" @click="toggleNav">
          <span class="lt"></span>
          <span class="lm"></span>
          <span class="lb"></span>
        </span>
        <div class="sideNav-header d-full-width">
          <div class="sideNav-brand">
            <img src="./../assets/img/logo.png">
          </div>
          <div class="sideNav-user d-full-width">
            <span class="username d-block">{{ jsondata[userid]["name"] }}</span>
            <span class="userrole d-block">{{ jsondata[userid]["type"]  }}</span>
          </div>
        </div>
        <div class="sideNav-links">
          <ul class="list-unstyled text-uppercase">
            <li>
              <router-link to="/dashboard">
                <span class="ti-home"></span>
                <span class="navlink-text">Dashboard</span>
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <span class="ti-harddrives"></span>
                <span class="navlink-text">Inventory</span>
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <span class="ti-view-list"></span>
                <span class="navlink-text">Listings</span>
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <span class="ti-camera"></span>
                <span class="navlink-text">Images</span>
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <span class="ti-settings"></span>
                <span class="navlink-text">Settings</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="sideNav-footer d-full-width">
          <ul class="list-unstyled text-uppercase">
            <li class="list-title">Quick Links</li>
            <li>
              <router-link to="/">
                <span class="navlink-text">Add New Item</span>
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <span class="navlink-text">Create New Listing</span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
  </div>
</template>

<style lang="scss">
@import "../scss/_varibles.scss";

.sideNav {
  z-index:888888;
  -o-transition: .3s;
  -ms-transition: .3s;
  -moz-transition: .3s;
  -webkit-transition: .3s;
  transition: .3s;
  position: fixed;
  max-width: 370px;
  width: 100%;
  background-color:$color_navbar_bg;
  height: 100%;
  font-size: 14px;
  &.narrow {
    width: 50px;
    background-color: $color_narrow_bg;
  }
  &.narrow .d-full-width {
    display: none;
  }
  &.narrow .sideNav-links {
    padding:0;
    margin-top:70px;
    & li {
      border:none;
      margin:5px 0;
    }
    & a {
      text-align: center;
      display: inline-block;
      width: 100%;
      position: relative;
      & .navlink-text {
        font-size: 14px;
        -o-transition: .3s;
        -ms-transition: .3s;
        -moz-transition: .3s;
        -webkit-transition: .3s;
        transition: .3s;
        position: absolute;
        background-color: $color_navbar_bg;
        left: 60px;
        top:-5px;
        padding:5px 20px;
        border-radius: 3px;
        text-transform: none;
        font-weight: normal;
        visibility: hidden;
        opacity: 0;
        transform: scale(0);
        transform-origin: left;
        &:after {
          content:'';
          width: 0;
          height: 0;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-right: 10px solid $color_navbar_bg;
          position: absolute;
          left: -9px;
          top:0;
          bottom: 0;
          margin: auto;
        }
      }
      &:hover .navlink-text {
        visibility:visible;
        opacity: 1;
        transform: scale(1);
      }
    }
    & [class^="ti-"], [class*=" ti-"] {
      position: static;
    }
  }
  &.narrow .sideNav-btn {
    right:0;
    left:0;
    margin: auto;
  }
}

.sideNav-header, .sideNav-links, .sideNav-footer {
  padding: 10px 95px 20px 60px;
}

.sideNav-user {
  margin-top:20px;
  & .username {
    font-weight: bold;
  }
  & .userrole {
    font-size: 12px;
  }
}

.list-title {
  color:$color_text_darker;
  font-size: 12px;
}

.sideNav-links {
  & li {
    border-bottom:1px solid $color_border_light;
    margin:10px 0;
    padding-bottom:5px;
  }
  & a, a:hover, a:focus {
    text-decoration: none;
    color:$color_text_light;
    outline: none;
    font-weight: bold;
  }
  & [class^="ti-"], [class*=" ti-"] {
    position: absolute;
    left:20px;
    font-size: 20px;
  }
}

.sideNav-footer {
  & li {
    margin:10px 0;
    padding-bottom:5px;
  }
  & a, a:hover, a:focus {
    text-decoration: none;
    color:$color_text_light;
    outline: none;
    font-weight: bold;
  }
}

.sideNav-btn {
  display: block;
  position: absolute;
  width: 35px;
  height: 35px;
  padding: 6px;
  text-align: center;
  cursor: pointer;
  right: 20px;
  top:20px;
  & .lt, .lm, .lb {
    -o-transition: .3s;
    -ms-transition: .3s;
    -moz-transition: .3s;
    -webkit-transition: .3s;
    transition: .3s;
    display: block;
    position: absolute;
    width: 25px;
    height: 2px;
    background: $color_text_light;
    content: '';
  }
  & .lt {
    top: 0px;
  }
  & .lm {
    top: 10px;
  }
  & .lb {
    top: 20px;
  }
  &.active .lt {
    top: 10px;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  &.active .lm {
    width: 0;
    opacity: 0;
  }
  &.active .lb {
    top: 10px;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}

.narrow + .content {
  margin-left:50px;
  width: calc(100% - 50px);
}
</style>

<script>
export default {
  name: 'SideNav',
  data () {
    return {
      navToggled: false,
      jsondata: window.jsondata,
      userid: window.userid
    }
  },
  methods: {
    toggleNav () {
      this.$root.$emit('toggleSideNav')
      this.navToggled = !this.navToggled
    }
  }
}
</script>
