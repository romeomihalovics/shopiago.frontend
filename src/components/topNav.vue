<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light topNav">
      <button v-bind:class="'navbar-toggler ml-auto '+((navToggled) ? 'active' : '')" data-toggle="collapse" data-target="#topNav" aria-controls="topNav" aria-expanded="false" aria-label="Toggle navigation" @click="toggleNav">
        <span class="lt"></span>
        <span class="lm"></span>
        <span class="lb"></span>
      </button>
      <div class="collapse navbar-collapse" id="topNav">
        <ul class="navbar-nav navbar-search mr-auto" :class="(searchNotEmpty) ? 'not_empty' : ''" >
          <searchResults/>
          <li class="nav-item">
            <div class="topNav-search">
              <span class="ti-search"></span>
              <input type="text" placeholder="Search.." @focus="showOverlay" @blur="hideOverlay" @input="search($event.target.value)" @keydown.esc="forceHideOverlay" ref="searchInput">
              <div class="close-search" @click="forceHideOverlay">
                <span class="ti-close"></span>
              </div>
            </div>
          </li>
        </ul>
        <ul v-bind:class="'navbar-nav navbar-btns '+((showSearchSettings) ? 'searchSettings' : '')+' '+((settings) ? 'enabled' : '')" ref="navbtns">
          <div v-if="!showSearchSettings">
            <transition name="quick-transition">
              <li v-if="!hideNotQuick" class="nav-item user-drop" @click="showUserDrop">
                <div>
                  <span class="username text-uppercase">
                    {{ jsondata[userid]["accounts"][accountid]["name"] }}
                  </span>
                  <span class="ti-angle-down"></span>
                </div>
                <transition name="user-dropdown-transition">
                  <div v-if="showAcc" class="user-dropdown">
                    <ul class="list-unstyled">
                      <li class="text-left" v-for="(account, id) in jsondata[userid]['accounts']" v-bind:key="id" @click="changeAcc(id)">
                        <div class="dropdown-username">{{ account["name"] }}</div>
                        <span v-bind:class="'usercolor '+(account['color'])"></span>
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </transition>
          </div>
          <div v-if="!showSearchSettings">
            <transition name="quick-transition" v-on:after-leave="showQuickBtns">
              <li v-if="!hideNotQuick" class="nav-item" @click="showNotifications">
                <a href="#">
                  <span class="ti-bell">
                    <span class="notifications">
                      {{ jsondata[userid]["accounts"][accountid]["notifications"].length  }}
                    </span>
                  </span>
                  <transition name="notifications-transition">
                    <div v-if="showNotify" class="notifications-dropdown">
                      <ul class="list-unstyled">
                        <li class="text-left" v-for="(notify, id) in jsondata[userid]['accounts'][accountid]['notifications']" v-bind:key="id">
                          <span class="notify-msg">{{ notify["msg"] }}</span>
                          <span v-bind:class="'notify '+(notify['color'])">
                            {{ notify["date"] }}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </transition>
                </a>
              </li>
            </transition>
          </div>
          <div v-if="!showSearchSettings">
            <transition name="quick-transition" v-on:after-leave="showNotQuicks">
              <li v-if="showQuick" class="nav-item quick-link">
                <div class="d-inline-block">
                  <a href="#">Add new inventory item</a>
                </div>
                <div class="d-inline-block">
                  <a href="#">Create new listing</a>
                </div>
              </li>
            </transition>
          </div>
          <li v-if="!showSearchSettings" class="nav-item quick-create" @click="hideNotQuicks">
            <a href="#">
              <span class="ti-plus"></span>
            </a>
          </li>
          <li v-if="!showSearchSettings" class="nav-item">
            <a href="#">
              <span class="ti-shift-right"></span>
            </a>
          </li>
          <li v-if="showSearchSettings" class="nav-item">
            <div class="text-uppercase">
              Search Settings
              <span class="ti-panel"></span>
            </div>
            <searchSettings/>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
@import "../scss/_varibles.scss";

* {
  outline: none;
}

.topNav {
  border-bottom: 1px solid $color_topnav_border;
}

.navbar {
  padding:0;
  min-height: 50px;
  background-color:$color_text_light;
  & li {
    padding:10px 15px;
    position: relative;
    text-align: center;
  }
  & .ml-auto > li {
    padding:15px 20px;
  }
  & a, a:hover, a:focus {
    text-decoration: none;
    color:$color_text_dark;
    outline: none;
    font-size: 18px;
  }
}

.navbar-nav {
  z-index:2;
  &.navbar-search {
    position: relative;
    width: 100%;
    background-color: $color_text_light;
    & li {
      width: 100%;
    }
    &:focus-within {
      z-index: 999999;
      & .close-search {
        cursor: pointer;
        opacity: 1;
      }
    }
    &.not_empty {
      z-index: 999999;
      & .close-search {
        cursor: pointer;
        opacity: 1;
      }
    }
  }
  &.navbar-btns {
    line-height: 1.9rem;
  }
}

.navbar-toggler {
  display: block;
  width: 30px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  border:none;
  outline: none !important;
  padding:0;
  margin:10px;
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
    background: $color_text_dark;
    content: '';
  }
  & .lt {
    top: 10px;
  }
  & .lm {
    top: 20px;
  }
  & .lb {
    top: 30px;
  }
  &.active .lt {
    top: 20px;
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
    top: 20px;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}

.topNav-search {
  & input {
    background:transparent;
    border:none;
    padding:5px;
    margin-left:10px;
    outline: none;
    color:$color_text_dark;
    width: calc(100% - 40px);
  }
  & span {
    font-size: 20px;
    vertical-align: middle;
    color:$color_text_lighter;
  }
  & .close-search {
    -o-transition: .3s;
    -ms-transition: .3s;
    -moz-transition: .3s;
    -webkit-transition: .3s;
    transition: .3s;
    opacity: 0;
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    border:1px solid $color_text_dark;
    margin: auto;
    text-align: center;
    & .ti-close {
      color:$color_text_dark;
      font-size: 12px;
      position: absolute;
      left: 0;
      top: 3px;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
}

.quick-create {
  background-color:$color_green;
  & a:before {
    content: '';
    border-radius: 50%;
    border:1px solid $color_text_light;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:30px;
    height: 30px;
    margin: 10px auto;
  }
  & a, & a:hover, & a:focus {
    color:$color_text_light;
  }
}

.topNav {
  & a > span {
    position: relative;
  }
  & span {
    vertical-align: middle;
  }
}

.notifications {
  position: absolute;
  border-radius: 50%;
  background-color:$color_blue;
  color:$color_text_light;
  width: 15px;
  height: 15px;
  font-size: 12px;
  padding-top:1px;
  bottom:-8px;
  right:-9px;
}

.user-drop {
  z-index: 2;
  border-right: 1px solid $color_topnav_border;
  border-left:1px solid $color_topnav_border;
  cursor: pointer;
  & .username {
    padding-top:8px;
  }
  & .ti-angle-down {
    margin-left:10px;
  }
  & > div {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space:nowrap;
  }
}

.user-dropdown {
  font-size: 14px;
  transform-origin: center top;
  position: absolute;
  width: calc(100% + 2px);
  left: -1px;
  top: 54px;
  background-color: $color_text_light;
  & li {
    border-top:1px solid $color_topnav_border;
    border-right:1px solid $color_topnav_border;
    border-left:1px solid $color_topnav_border;
  }
  & li:last-child {
    border-bottom:1px solid $color_topnav_border;
  }
}

.user-dropdown-transition-enter-active, .user-dropdown-transition-leave-active {
  transition: .3s;
  transform: scaleY(1);
  opacity: 1;
}

.user-dropdown-transition-enter, .user-dropdown-transition-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

.notifications-dropdown {
  font-size: 14px;
  transform-origin: center top;
  position: absolute;
  width: 400px;
  right: -1px;
  top: 54px;
  background-color: $color_text_light;
  & li {
    border-top:1px solid $color_topnav_border;
    border-right:1px solid $color_topnav_border;
    border-left:1px solid $color_topnav_border;
  }
  & li:last-child {
    border-bottom:1px solid $color_topnav_border;
  }
}

.notifications-transition-enter-active, .notifications-transition-leave-active {
  transition: .3s;
  transform: scaleY(1);
  opacity: 1;
}

.notifications-transition-enter, .notifications-transition-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

.usercolor {
  content:'';
  position: absolute;
  right: 10px;
  top:20px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  &.orange {
    background-color:$color_orange;
  }
  &.blue {
    background-color:$color_blue;
  }
  &.green {
    background-color:$color_green;
  }
  &.gray {
    background-color:$color_gray;
  }
}

.notify {
  content:'';
  position: absolute;
  right: 10px;
  top:10px;
  &.orange {
    color:$color_orange;
  }
  &.blue {
    color:$color_blue;
  }
  &.green {
    color:$color_green;
  }
  &.gray {
    color:$color_text_lighter;
  }
}

.quick-transition-enter-active, .quick-transition-leave-active {
  transition: .3s;
  opacity: 1;
}

.quick-transition-enter, .quick-transition-leave-to {
  opacity: 0;
}

.quick-link {
  padding-right:50px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  & div {
    padding-top:3px;
  }
  & a, a:hover, a:focus {
    font-size: 14px;
    color:$color_blue;
  }
  & div:last-child {
    margin-left:20px;
  }
}

.dropdown-username {
  max-width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
}

.notify-msg {
  display: inline-block;
  max-width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.searchSettings {
  z-index: 999999;
  & li {
    line-height: 2.1;
    z-index: 999999;
    background-color: $color_text_light;
    border-left: 1px solid $color_topnav_border;
    & div {
      white-space: nowrap;
      min-width: 400px;
      text-align: left;
      position: relative;
      & span {
        position: absolute;
        right: 15px;
        top:5px;
      }
    }
  }
}

@media (max-width: 992px) {
  #topNav .user-dropdown, #topNav .notifications-dropdown {
    position: static;
    width: 100%;
    & li {
      border: none;
    }
  }
  .quick-link {
    padding-right: 20px !important;
    & div {
      display: block !important;
      padding:10px;
    }
  }
  .user-drop {
    & > div {
      max-width: 90%;
      margin: auto;
    }
  }
  .searchSettings {
    display: none;
  }
  .searchSettings.enabled {
    display: block;
  }
}

@media (max-width: 768px) {
  .searchSettings {
    & li {
      & div {
        min-width: 100%;
      }
    }
  }
}
</style>

<script>
import searchResults from '@/components/searchResults.vue'
import searchSettings from '@/components/searchSettings.vue'

export default {
  name: 'topNav',
  mounted () {
    this.$root.$on('searchSettings', () => {
      this.showSearchSettings = window.showSearchSettings
    })
    this.$root.$on('showSettings', () => {
      this.settings = !this.settings
    })
  },
  data () {
    return {
      navToggled: false,
      jsondata: window.jsondata,
      userid: window.userid,
      accountid: window.accountid,
      showAcc: false,
      showNotify: false,
      hideNotQuick: false,
      showQuick: false,
      searchNotEmpty: false,
      showSearchSettings: false,
      settings: false
    }
  },
  methods: {
    toggleNav () {
      this.navToggled = !this.navToggled
    },
    showUserDrop () {
      this.showAcc = !this.showAcc
    },
    showNotifications () {
      this.showNotify = !this.showNotify
    },
    hideNotQuicks () {
      if (!this.hideNotQuick) {
        this.hideNotQuick = !this.hideNotQuick
      } else {
        this.showQuick = !this.showQuick
      }
    },
    showQuickBtns () {
      this.showQuick = !this.showQuick
    },
    showNotQuicks () {
      this.hideNotQuick = !this.hideNotQuick
    },
    changeAcc (id) {
      window.accountid = id
      this.accountid = window.accountid
      this.$root.$emit('changeAcc')
    },
    showOverlay () {
      if (!window.showSearchOverlay) {
        window.showSearchOverlay = true
        this.$root.$emit('toggleOverlay')
      }
    },
    hideOverlay () {
      if (!this.$refs.searchInput.value && window.showSearchOverlay) {
        window.showSearchOverlay = false
        window.showSearchResults = false
        window.showSearchSettings = false
        this.searchNotEmpty = false
        this.$root.$emit('toggleOverlay')
        this.$root.$emit('searchResults')
        this.$root.$emit('searchSettings')
      }
    },
    forceHideOverlay () {
      this.$refs.searchInput.value = ''
      window.showSearchOverlay = false
      window.showSearchResults = false
      window.showSearchSettings = false
      this.searchNotEmpty = false
      this.$root.$emit('toggleOverlay')
      this.$root.$emit('searchResults')
      this.$root.$emit('searchSettings')
      this.$refs.searchInput.blur()
    },
    search (text) {
      if (text) {
        // request search here ..
        this.searchNotEmpty = true
        window.searchDataLocal = this.jsondata[this.userid].localSearch
        window.searchDataGlobal = this.jsondata[this.userid].globalSearch
        window.showSearchResults = true
        this.$root.$emit('searchResults')
        if (window.searchGlobal) {
          window.showSearchSettings = true
          this.$root.$emit('searchSettings')
        }
      } else {
        this.searchNotEmpty = false
        window.showSearchResults = false
        window.showSearchSettings = false
        this.$root.$emit('searchResults')
        this.$root.$emit('searchSettings')
      }
    }
  },
  components: {
    searchResults,
    searchSettings
  }
}
</script>
