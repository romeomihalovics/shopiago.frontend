<template>
  <div class="search-settings">
    <div class="row mx-2 py-2 settings-item">
      <div class="col-md-3 text-left d-flex align-items-center">
        Source
      </div>
      <div class="col-md-6 text-right ml-auto d-flex align-items-center">
        <div
          class="dropdown d-flex align-items-center"
          @click="(!showSource) ? dropdownSource() : ''"
        >
          <div class="current">
            <span v-text="source" class="position-static">
              Marketplaces (eBay, Amazon)
            </span>
            <span class="icon-angle-down"></span>
          </div>
          <transition name="dropdown-transition">
            <ul
              class="list-unstyled"
              v-if="showSource"
              @click="setSource($event.target)"
            >
              <li data-source="Please select a source">
                Please select a source
              </li>
              <li data-source="Marketplaces (eBay, Amazon)">
                Marketplaces (eBay, Amazon)
              </li>
              <li data-source="Something else">
                Something else
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>
    <div class="row row-cols-md-2 mx-2 py-2 settings-item">
      <div class="col text-left">
        Completed listings only
      </div>
      <div class="col text-right">
        <label class="switch">
          <input type="checkbox" checked>
          <div></div>
        </label>
      </div>
    </div>
    <div class="row row-cols-md-2 mx-2 py-2 settings-item">
      <div class="col text-left">
        Sold items only
      </div>
      <div class="col text-right">
        <label class="switch">
          <input type="checkbox">
          <div></div>
        </label>
      </div>
    </div>
    <div class="row mx-2 py-2 settings-item">
      <div class="col-md-3 text-left d-flex align-items-center">
        Condition
      </div>
      <div class="col-md-6 text-right ml-auto d-flex align-items-center">
        <div
          class="dropdown d-flex align-items-center"
          @click="(!showCondition) ? dropdownCondition() : ''"
        >
          <div class="current">
            <span v-text="condition" class="position-static">
              Please select a condition
            </span>
            <span class="icon-angle-down"></span>
          </div>
          <transition name="dropdown-transition">
            <ul
              class="list-unstyled"
              v-if="showCondition"
              @click="setCondition($event.target)"
            >
              <li data-condition="Please select a condition">
                Please select a condition
              </li>
              <li data-condition="New">
                New
              </li>
              <li data-condition="Used">
                Used
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>
    <div class="row mx-2 py-2 settings-item">
      <div class="col-md-3 text-left d-flex align-items-center">
        Buying format
      </div>
      <div class="col-md-6 text-right ml-auto">
        <div
          class="dropdown d-flex align-items-center"
          @click="(!showFormat) ? dropdownFormat() : ''"
        >
          <div class="current">
            <span v-text="format" class="position-static">
              Buy it now
            </span>
            <span class="icon-angle-down"></span>
          </div>
          <transition name="dropdown-transition">
            <ul
              class="list-unstyled"
              v-if="showFormat"
              @click="setFormat($event.target)"
            >
              <li data-format="Please select a buying format">
                Please select a buying format
              </li>
              <li data-format="Buy it now">
                Buy it now
              </li>
              <li data-format="Pre Order">
                Pre Order
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>
    <div class="row row-cols-md-2 mx-2 py-2 settings-item">
      <div class="col-md-3 text-left">
        EAN
      </div>
      <div class="col-md-6 text-right ml-auto">
        <input class="settings-input" placeholder="Enter EAN to search for">
      </div>
    </div>
    <div class="row row-cols-md-2 mx-2 py-2 settings-item">
      <div class="col-md-3 text-left">
        ISBN
      </div>
      <div class="col-md-6 text-right ml-auto">
        <input class="settings-input" placeholder="Enter ISBN to search for">
      </div>
    </div>
    <div class="text-center my-3">
      <button class="searchBtn" @click="showSettings">
        Search
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.search-settings {
  width: calc(100% + 2px);
  min-height: 100vh;
  background-color:$color_text_light;
  padding: 0;
  margin: 0;
  left: -1px;
  right: 0;
  top:54px;
  position: absolute !important;
  border-left: 1px solid $color_topnav_border;
  border-top: 1px solid $color_topnav_border;
  border-bottom: 1px solid $color_topnav_border;
  div {
    min-width: unset !important;
  }
  .settings-item {
    border-bottom:1px solid $color_topnav_border;
  }
  .dropdown {
    width: 100%;
    cursor: pointer;
    display: inline-block;
    position: relative;
    color:$color_text_dark;
    div {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;
      width: 100%;
      background-color: $color_text_light;
      border-radius: 3px;
      padding-right: 20px;
      span:not(.by) {
        top:8px !important;
        right: 0 !important;
      }
    }
    ul {
      z-index: 3;
      position: absolute;
      background-color: $color_text_light;
      border: 1px solid $color_topnav_border;
      white-space:nowrap;
      right: 0;
      top:42px;
      width: 100%;
      li {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left !important;
      }
    }
  }
  .settings-input {
    border: none;
    background:transparent;
    width: 100%;
    margin-right: 10px;
    color:$color_text_dark;
    outline: none;
  }
  .searchBtn {
    border:none;
    padding:5px 40px;
    background-color: $color_green;
    color:$color_text_light;
    border-radius: 3px;
  }

  .switch {
    cursor: pointer;
    display: inline-block;
    font-size: 15px;
    height: 5px;
    width: 30px;
    background: $color_grayish_blue;
    border-radius: 3px;
    margin-bottom: 2px;
    input {
      position: absolute;
      opacity: 0;
    }
    div {
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background: $color_dark_gray;
      transition: .3s;
      position: absolute;
      bottom:5px;
    }
    input:checked + div {
      transform: translate3d(100%, 0, 0);
      background-color: $color_blue;
    }
  }
}

.dropdown-transition-enter-active, .dropdown-transition-leave-active {
  transition: .3s;
  opacity: 1;
  transform: scaleY(1);
  transform-origin: top center;
}

.dropdown-transition-enter, .dropdown-transition-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top center;
}
</style>

<script>
export default {
  name: 'searchSettings',
  data () {
    return {
      showSource: false,
      showCondition: false,
      showFormat: false,
      source: 'Marketplaces (eBay, Amazon)',
      condition: 'Please select a condition',
      format: 'Buy it now'
    }
  },
  methods: {
    dropdownSource () {
      this.showSource = !this.showSource
      this.dropDownWatcher(this.showSource, this.dropdownSource)
    },
    dropdownCondition () {
      this.showCondition = !this.showCondition
      this.dropDownWatcher(this.showCondition, this.dropdownCondition)
    },
    dropdownFormat () {
      this.showFormat = !this.showFormat
      this.dropDownWatcher(this.showFormat, this.dropdownFormat)
    },
    setSource (target) {
      this.source = target.getAttribute('data-source')
    },
    setCondition (target) {
      this.condition = target.getAttribute('data-condition')
    },
    setFormat (target) {
      this.format = target.getAttribute('data-format')
    },
    showSettings () {
      this.settings = !this.settings
      this.$root.$emit('showSettings')
    },
    dropDownWatcher (condition, action) {
      setTimeout(() => {
        if (condition) {
          document.addEventListener('click', action)
        } else {
          document.removeEventListener('click', action)
        }
      }, 300)
    }
  }
}
</script>
