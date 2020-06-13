<template>
  <div class="section section-light">
    <div class="section-title text-left text-uppercase">
      Sold Items in Last 24 Hrs
      <div class="section-title-right" :class="(sideOpen) ? 'sideOpen' : ''">see full list</div>
    </div>
    <div class="last24-items row row-cols-md-2 mx-2 pb-5">
      <div v-for="(data, id) in jsondata[userid].accounts[accountid].soldlast24" v-bind:key="id" class="col-md last24-item" :class="(sideOpen) ? 'sideOpen' : ''">
        <div class="row py-2 mx-2">
          <div class="col col-6">
            {{ data.name }}
          </div>
          <div class="col col-4 text-center">
            {{ data.id }}
          </div>
          <div class="col">
            {{ data.price }}
          </div>
        </div>
      </div>
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
}

.section-title {
  padding:40px 20px 40px 20px;
  margin-bottom:0;
  font-weight: bold;
  font-size: 20px;
  color:$color_text_darker;
  position: relative;
  & .section-title-right {
    position: absolute;
    right: 45px;
    color:$color_blue;
    cursor: pointer;
    text-transform: none;
    font-size: 14px;
    top:40px;
  }
}

.last24-item {
  & .row {
    & .col {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &:not(:first-child):not(:nth-child(2)) {
    & .row {
      border-top:1px solid $color_topnav_border;
    }
  }
}

@media (max-width: 768px) {
  .last24-item:nth-child(2) {
    & .row {
      border-top:1px solid $color_topnav_border;
    }
  }
}

@media (max-width: 495px) {
  .section-title .section-title-right {
    position: static;
  }
}

@media (max-width: 1200px) {
  .last24-item.sideOpen {
    flex:none;
    max-width: 100%;
    &:not(:first-child) .row {
      border-top:1px solid $color_topnav_border;
    }
    &:nth-child(2) .row {
      border-top:1px solid $color_topnav_border;
    }
  }
}

@media (max-width: 815px) {
  .section-title-right.sideOpen {
    position: static;
  }
}
</style>

<script>
export default {
  name: 'last24',
  mounted () {
    this.$root.$on('changeAcc', () => {
      this.jsondata = window.jsondata
      this.userid = window.userid
      this.accountid = window.accountid
    })
    this.$root.$on('toggleSideNav', () => {
      this.sideOpen = !this.sideOpen
    })
  },
  data () {
    return {
      jsondata: window.jsondata,
      userid: window.userid,
      accountid: window.accountid,
      showLimit: 10, // *2
      sideOpen: false
    }
  }
}
</script>
