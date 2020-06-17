<template>
  <div :class="['d-flex', (navToggled) ? '' : 'narrow']">
    <nav :class="['sideNav', ((navToggled) ? '' : 'narrow')]">
        <span
          :class="['sideNav-btn', ((navToggled) ? 'active' : '')]"
          @click="toggleNav"
        >
          <span class="lt"></span>
          <span class="lm"></span>
          <span class="lb"></span>
        </span>
        <div class="sideNav-header d-full-width">
          <div class="sideNav-brand">
            <img src="./../assets/img/logo.png">
          </div>
          <div class="sideNav-user d-full-width">
            <span class="username d-block">
              {{ jsondata[userid]["name"] }}
            </span>
            <span class="userrole d-block">
              {{ jsondata[userid]["type"]  }}
            </span>
          </div>
        </div>
        <div class="sideNav-links">
          <ul class="list-unstyled text-uppercase">
            <li>
              <router-link to="/dashboard">
                <span class="icon-home"></span>
                <span class="d-full-width">
                  Dashboard
                </span>
                <span class="navlink-text">
                  Dashboard
                </span>
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <span class="icon-harddrives"></span>
                <span class="d-full-width">
                  Inventory
                </span>
                <span class="navlink-text">
                  Inventory
                </span>
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <span class="icon-view-list"></span>
                <span class="d-full-width">
                  Listings
                </span>
                <span class="navlink-text">
                  Listings
                </span>
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <span class="icon-camera"></span>
                <span class="d-full-width">
                  Images
                </span>
                <span class="navlink-text">
                  Images
                </span>
              </router-link>
            </li>
            <li :class="(settingsSub) ? 'subopen' : ''">
              <a href="#" @click="showSettingsSubmenu">
                <span class="icon-settings"></span>
                <span class="d-full-width">
                  Settings
                </span>
                <span class="navlink-text">
                  Settings
                </span>
              </a>
              <transition name="submenu-transition">
                <div class="submenu settings-submenu" v-if="settingsSub">
                  <ul class="list-unstyled text-uppercase">
                    <li class="list-title">
                      Settings
                    </li>
                    <li>
                      <a href="#">
                        Company Account
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Profile Settings
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        eBay Accounts
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Team Members
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Plan & Payment
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Inventory Settings
                      </a>
                    </li>
                  </ul>
                </div>
              </transition>
            </li>
          </ul>
        </div>
        <div class="sideNav-footer d-full-width">
          <ul class="list-unstyled text-uppercase">
            <li class="list-title">
              Quick Links
            </li>
            <li>
              <router-link to="/">
                <span>
                  Add New Item
                </span>
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <span>
                  Create New Listing
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
  </div>
</template>

<style lang="scss">
.sideNav {
  z-index:888888;
  -o-transition: .3s;
  -ms-transition: .3s;
  -moz-transition: .3s;
  -webkit-transition: .3s;
  transition: .3s;
  position: relative;
  max-width: 100vw;
  min-width: 50px;
  width: 370px;
  background-color:$color_navbar_bg;
  height: 100%;
  font-size: 14px;
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
    .lt, .lm, .lb {
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
    .lt {
      top: 0px;
    }
    .lm {
      top: 10px;
    }
    .lb {
      top: 20px;
    }
    &.active {
      .lt {
        top: 10px;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
      .lm {
        width: 0;
        opacity: 0;
      }
      .lb {
        top: 10px;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }
  .sideNav-header {
    padding: 10px 95px 20px 60px;
    .sideNav-user {
      margin-top:20px;
      .username {
        font-weight: bold;
      }
      .userrole {
        font-size: 12px;
      }
    }
  }
  .sideNav-links {
    padding: 10px 95px 20px 60px;
    li {
      border-bottom:1px solid $color_border_light;
      margin:10px 0;
      -o-transition: .3s;
      -ms-transition: .3s;
      -moz-transition: .3s;
      -webkit-transition: .3s;
      transition: .3s;
      &.subopen {
        background-color: $color_subbar_bg;
      }
    }
    a, a:hover, a:focus {
      text-decoration: none;
      color:$color_text_light;
      outline: none;
      font-weight: bold;
    }
    [class^="icon-"], [class*=" icon-"] {
      position: absolute;
      left:20px;
      font-size: 20px;
    }
  }
  &:not(.narrow) {
    & .subopen {
      padding:10px;
    }
  }
  .submenu {
    -o-transition: .3s;
    -ms-transition: .3s;
    -moz-transition: .3s;
    -webkit-transition: .3s;
    transition: .3s;
    background-color: $color_subbar_bg;
    position: absolute;
    width: 100vw;
    max-width: 220px;
    top: 0;
    left: 370px;
    padding:50px 20px;
    height: 100%;
    li {
      border-bottom:1px solid $color_border_light !important;
      a {
        text-align: left !important;
      }
    }
  }
  .navlink-text {
    display: none;
  }
  &.narrow {
    width: 50px;
    background-color: $color_narrow_bg;
    .submenu {
      left:50px;
    }
    .d-full-width {
      display: none;
    }
    .sideNav-links {
      padding:0;
      margin-top:70px;
      li {
        border:none;
        margin:5px 0;
        padding:10px 0;
      }
      a {
        text-align: center;
        display: inline-block;
        width: 100%;
        position: relative;
        .navlink-text {
          display: block;
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
      [class^="icon-"], [class*=" icon-"] {
        position: static;
      }
    }
    .sideNav-btn {
      right:0;
      left:0;
      margin: auto;
    }
  }
  .sideNav-footer {
    padding: 10px 95px 20px 60px;
    li {
      margin:10px 0;
      padding-bottom:5px;
    }
    a, a:hover, a:focus {
      text-decoration: none;
      color:$color_text_light;
      outline: none;
      font-weight: bold;
    }
  }
  .list-title {
    color:$color_text_darker;
    font-size: 12px;
  }
}

.submenu-transition-enter-active, .submenu-transition-leave-active {
  transition: .3s;
  opacity: 1;
  transform: scaleX(1);
  transform-origin: center left;
}

.submenu-transition-enter, .submenu-transition-leave-to{
  opacity: 0;
  transform: scaleX(0);
  transform-origin: center left;
}

@media (max-width: 600px) {
  .sideNav:not(.narrow) {
    .submenu {
      left:50px;
      max-width: 100%;
    }
    .subopen {
      padding:0;
      [class^="icon-"], [class*=" icon-"] {
        width: 50%;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 5px;
        left: 15px;
        background-color: $color_subbar_bg;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'SideNav',
  data () {
    return {
      settingsSub: false
    }
  },
  methods: {
    toggleNav () {
      this.$store.commit('setSideOpen', !this.navToggled)
    },
    showSettingsSubmenu () {
      this.settingsSub = !this.settingsSub
    }
  },
  computed: {
    jsondata () {
      return this.$store.state.jsondata
    },
    userid () {
      return this.$store.state.userid
    },
    navToggled () {
      return this.$store.state.sideOpen
    }
  }
}
</script>
