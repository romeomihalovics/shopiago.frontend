<template>
  <div>
    <transition name="results-transition">
      <div v-if="show" v-bind:class="'searchResults '+((global) ? 'global' : 'local')+' '+((settings) ? 'showSettings' : '')">
        <div v-if="local" :key="localKey">
          <div class="row">
            <div class="col-md-8" :class="(sideOpen) ? 'sideOpen' : ''">
              <div class="searchTitle text-uppercase">
                Inventory Items
                <span class="searchMore" @click="showGlobal">show all results</span>
              </div>
              <div class="searchWrapper">
                <div v-for="(item, id) in localResults.inventoryItems" v-bind:key="id">
                  {{ item.name }} - {{ item.location }} - {{ item.id }}
                </div>
              </div>
              <div class="searchTitle text-uppercase">
                Listings
                <span class="searchMore" @click="showGlobal">show all results</span>
              </div>
              <div class="searchWrapper">
                <div v-for="(item, id) in localResults.listings" v-bind:key="id">
                  {{ item.name }} - {{ item.price }} - {{ item.id }}
                  <span class="circle" :class="item.color"></span>
                </div>
              </div>
            </div>
            <div class="col-md-4" :class="(sideOpen) ? 'sideOpen' : ''">
              <span class="searchTitle text-uppercase">Recent Searches</span>
              <div class="searchWrapper">
                <div v-for="(item, id) in localResults.recentSearch" v-bind:key="id">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="global" :key="globalKey">
          <div class="backtolocal row">
            <div class="col-8" @click="showLocal">
              <span class="ti-arrow-left my-2"></span> show local results
            </div>
            <div class="col-4 showsettings text-right" @click="showSettings">
              settings <span class="ti-settings"></span>
            </div>
          </div>
          <div class="search-header row">
            <div class="header-left col-lg" :class="(sideOpen) ? 'sideOpen' : ''">
              <span>Global search ></span>{{ globalResults.location }}
            </div>
            <div class="header-right col-lg" :class="(sideOpen) ? 'sideOpen' : ''">
              <span class="mr-4">Sort by</span>
              <div class="sort-dropdown" @click="toggleSortDropdown">
                <div class="current">
                  <span class="by" ref="sortby">Price ASC</span>
                  <span class="ti-angle-down"></span>
                </div>
                <transition name="sort-transition">
                  <ul class="list-unstyled" v-if="sortDropdown" @click="setSorting($event.target)">
                    <li>
                      Price ASC
                    </li>
                    <li>
                      Price DESC
                    </li>
                    <li>
                      Name ASC
                    </li>
                    <li>
                      Name DESC
                    </li>
                    <li>
                      Date ASC
                    </li>
                    <li>
                      Date DESC
                    </li>
                  </ul>
                </transition>
              </div>
            </div>
          </div>
          <div class="search-items my-3">
            <div v-for="(item, id) in globalResults.items" v-bind:key="id" class="row py-2 mx-0">
              <div class="col-md-3 d-flex align-items-top" :class="(sideOpen) ? 'sideOpen' : ''">
                <div class="item-picture" :style="'background-image: url('+item.img+')'"></div>
              </div>
              <div class="col py-2" :class="(sideOpen) ? 'sideOpen' : ''">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-price">{{ item.price }}</div>
                <div class="item-keywords mt-2">{{ item.keywords }}</div>
                <div class="item-location">{{ item.location || '' }}</div>
                <div class="item-actions">
                  <button class="green my-2">Create listing</button>
                  <button class="blue">View details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
@import '../scss/_varibles.scss';

.searchResults {
  position: absolute;
  background-color: $color_text_light;
  opacity: 1;
  z-index: 999999;
  width: 100%;
  top:54px;
  border-top:1px solid $color_topnav_border;
  border-bottom:1px solid $color_topnav_border;
  padding:30px 10px 30px 50px;
  font-size: 14px;
  &.global {
    padding:15px;
    min-height: 100vh;
  }
  & .searchTitle {
    color:$color_blue;
    font-weight: bold;
    margin-bottom:10px;
    position: relative;
    width: 100%;
    & .searchMore {
      text-transform: none;
      font-weight: normal;
      font-size: 12px;
      position: absolute;
      right: 0;
      cursor: pointer;
    }
  }
  & .searchWrapper {
    width: 100%;
    margin-bottom:50px;
    & div {
      padding:5px 0;
      padding-right: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      &:not(:first-child) {
        border-top:1px solid $color_topnav_border;
      }
      & .circle {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        content: '';
        &.green {
          background-color: $color_green;
        }
        &.blue {
          background-color: $color_blue;
        }
        &.orange {
          background-color: $color_orange;
        }
      }
    }
  }
}

.results-transition-enter-active, .results-transition-leave-active, .sort-transition-enter-active, .sort-transition-leave-active  {
  transition: .3s;
  opacity: 1;
  transform: scaleY(1);
  transform-origin: top center;
}

.results-transition-enter, .results-transition-leave-to, .sort-transition-enter, .sort-transition-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top center;
}

.backtolocal {
  cursor: pointer;
  line-height: 2;
}

.search-header {
  margin:0;
  padding-bottom:5px;
  border-bottom:1px solid $color_topnav_border;
  color:$color_text_darkest;
  & .header-left {
    display: flex;
    align-items: center;
    & span {
      color:$color_text_dark;
      margin-right: 5px;
    }
  }
  & .header-right {
    text-align: right;
    & .sort-dropdown {
      z-index: 2;
      cursor: pointer;
      display: inline-block;
      position: relative;
      color:$color_text_light;
      & div {
        display: inline-block;
        background-color: $color_blue;
        border-radius: 3px;
        padding:10px 15px;
        & span:not(.by) {
          margin-left:20px;
        }
      }
      & ul {
        position: absolute;
        text-align: left;
        background-color: $color_blue;
        white-space:nowrap;
        right: 0;
        width: 100%;
      }
    }
  }
}

.search-items {
  color:$color_text_darkest;
  & > div:not(:last-child) {
    border-bottom:1px solid $color_topnav_border;
  }
  & .item-picture {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    content: '';
    width: 100%;
    min-height: 125px;
    border:1px solid $color_topnav_border;
  }
  & .item-price {
    font-weight: bold;
  }
  & .item-actions {
    margin:20px 0;
    & button {
      padding:10px 20px;
      border:none;
      color:$color_text_light;
      border-radius: 3px;
      &.green {
        background-color:$color_green;
      }
      &.blue {
        background-color:$color_blue;
      }
      &:first-child {
        margin-right: 20px;
      }
    }
  }
}

.showsettings {
  display: none;
}

@media (max-width: 768px) {
  .searchResults {
    padding:30px 10px 30px 10px;
  }
}

@media (max-width: 992px) {
  .showsettings {
    display: block;
  }
  .searchResults {
    &.showSettings {
      display: none;
    }
  }
  .search-header {
    & .header-right {
      text-align: left;
      margin:10px 0px;
    }
  }
}

@media (max-width: 1200px) {
  .searchResults {
    & .sideOpen {
      flex: none;
      max-width: 100%;
      text-align: left;
      & .searchMore {
        display:block;
        position: static;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'searchResults',
  mounted () {
    this.$root.$on('searchResults', () => {
      this.localResults = window.searchDataLocal
      this.globalResults = window.searchDataGlobal
      this.show = window.showSearchResults
      this.localKey++ // loading fresh data
      this.globalKey++ // loading fresh data
    })
    this.$root.$on('showSettings', () => {
      this.settings = !this.settings
    })
    this.$root.$on('toggleSideNav', () => {
      this.sideOpen = !this.sideOpen
    })
  },
  data () {
    return {
      show: window.showSearchResults,
      localResults: window.searchDataLocal,
      globalResults: window.searchDataGlobal,
      local: true,
      global: false,
      localKey: 0,
      globalKey: 0,
      sideOpen: false,
      sortDropdown: false,
      settings: false
    }
  },
  methods: {
    showGlobal () {
      this.local = false
      this.global = true
      window.searchLocal = false
      window.searchGlobal = true
      window.showSearchSettings = true
      this.$root.$emit('searchSettings')
    },
    showLocal () {
      this.global = false
      this.local = true
      window.searchLocal = true
      window.searchGlobal = false
      window.showSearchSettings = false
      this.$root.$emit('searchSettings')
    },
    toggleSortDropdown () {
      this.sortDropdown = !this.sortDropdown
    },
    setSorting (target) {
      this.$refs.sortby.innerText = target.innerText
    },
    showSettings () {
      this.$root.$emit('showSettings')
    }
  }
}
</script>
