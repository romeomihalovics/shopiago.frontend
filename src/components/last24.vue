<template>
  <section class="light">
    <h1 class="text-left text-uppercase">
      Sold Items in Last 24 Hrs
      <span :class="['section-title-right', (sideOpen) ? 'sideOpen' : '']">
        see full list
      </span>
    </h1>
    <div class="last24-items row row-cols-md-2 mx-2 pb-5">
      <div
        v-for="(data, id) in jsondata[userid].accounts[accountid].soldlast24"
        :key="id"
        :class="['col-md', 'last24-item', (sideOpen) ? 'sideOpen' : '']"
      >
        <div class="row py-2 mx-2 item-row">
          <div class="col col-6 item-col">
            {{ data.name }}
          </div>
          <div class="col col-4 text-center item-col">
            {{ data.id }}
          </div>
          <div class="col item-col">
            {{ data.price }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
section {
  &.light {
    background-color:$color_text_light;
    border-top:1px solid $color_topnav_border;
  }
  h1 {
    padding:40px 20px 40px 20px;
    margin-bottom:0;
    font-weight: bold;
    font-size: 20px;
    color:$color_text_darker;
    position: relative;
    .section-title-right {
      position: absolute;
      right: 45px;
      color:$color_blue;
      cursor: pointer;
      text-transform: none;
      font-size: 14px;
      top:40px;
    }
  }
}

.last24-item {
  .item-row {
    .item-col {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &:not(:first-child):not(:nth-child(2)) {
    .item-row {
      border-top:1px solid $color_topnav_border;
    }
  }
}

@media (max-width: 768px) {
  .last24-item:nth-child(2) {
    .item-row {
      border-top:1px solid $color_topnav_border;
    }
  }
}

@media (max-width: 495px) {
  section {
    h1 {
      .section-title-right {
        position: static;
        display: block;
      }
    }
  }
}

@media (max-width: 1200px) {
  .last24-item.sideOpen {
    flex:none;
    max-width: 100%;
    &:not(:first-child) {
      .item-row {
        border-top:1px solid $color_topnav_border;
      }
    }
    &:nth-child(2) {
      .item-row {
        border-top:1px solid $color_topnav_border;
      }
    }
  }
}

@media (max-width: 815px) {
  .section-title-right {
    &.sideOpen {
      position: static;
      display: block;
    }
  }
}
</style>

<script>
export default {
  name: 'last24',
  data () {
    return {
      showLimit: 10 // *2
    }
  },
  computed: {
    jsondata () {
      return this.$store.state.jsondata
    },
    userid () {
      return this.$store.state.userid
    },
    accountid () {
      return this.$store.state.accountid
    },
    sideOpen () {
      return this.$store.state.sideOpen
    }
  }
}
</script>
