<template>
  <div class="section section-light row">
    <div class="col-md-5">
      <div class="section-title text-center text-uppercase">
        Inventory Levels
      </div>
      <div class="section-content text-center inventory-levels">
        <div class="il-data row">
          <div class="col-1 il-vals-wrapper">
            <ul class="list-unstyled il-vals">
              <li v-for="i in 7" v-bind:key="i">
                {{ Math.floor((maxIL / 7) / 10) * (7 - i) }}
              </li>
            </ul>
          </div>
          <ul class="list-unstyled col-10 line-chart">
            <li v-for="(day, id) in jsondata[userid].accounts[accountid].inventory" v-bind:key="id">
              <div class="line-chart-bg">
                <div class="line-chart-fill" v-bind:style="'height: '+((day.listed / maxIL) * 100)+'%'"></div>
                <div class="line-chart-date">
                  <span>{{ ('0'+(new Date(day.date)).getDate()).slice(-2) }}</span>
                  <span>{{ ('0'+(new Date(day.date)).getMonth()).slice(-2) }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-7">
      <div class="section-title text-left text-uppercase">
        Inventory Statistics
      </div>
      <div class="section-content text-left row">
        <div class="col-md-3 d-flex align-items-center text-center">
            <svg :view-box.camel="'-80 -80 160 160'" class="m-auto">
              <circle cx="0" cy="0" r="70" fill="transparent" id="radius"/>
              <g></g>
                <circle v-for="i in 4" v-bind:key="i" cx="0" cy="0" r="70" stroke-linecap="round" fill="transparent" stroke-width="15" :class="getColor(i-1)" v-bind:data-fill="calcFill(i-1) || 0" class="progress"/>
            </svg>
        </div>
        <div class="col-md-9">
          <div class="data-title big green">
            {{ this.jsondata[this.userid].accounts[this.accountid].listing_stat.total }}
            <span class="d-block">total listing</span>
          </div>
          <div class="row">
            <div v-for="(data, i) in jsondata[userid].accounts[accountid].listing_stat.data" v-bind:key="i" class="col-6 col-md-3 data-title">
              {{ data }}
              <span v-bind:class="'circle '+(getColor(i))"></span>
              <span class="d-block">{{ getName(i) }}</span>
              <span class="d-block percentage">{{ getPercentage(i) }}</span>
            </div>
            <div class="col-12 text-center data-time-span">
              {{ this.jsondata[this.userid].accounts[this.accountid].listing_stat.timespan }}
            </div>
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
  padding:40px 100px 0 100px;
  margin-bottom:30px;
  font-weight: bold;
  font-size: 20px;
  color:$color_text_darker;
}

.inventory-levels {
  width: 100%;
  max-width: 360px;
  height: 250px;
  margin-bottom:60px;
  margin-left:auto;
  margin-right: auto;
  padding-left:30px;
  position: relative;
  & .il-data {
    width: 100%;
    height: 100%;
  }
}

.il-vals-wrapper {
  padding:0;
}

.il-vals {
  padding: 0 !important;
  text-align: right;
  position: absolute;
  bottom:0;
  right: 0;
  & li {
    margin-bottom:30%;
  }
}

.line-chart {
  height: 100%;
  & li {
    height: 100%;
    width: 5%;
    display: inline-block;
    margin:0 2%;
  }
  & .line-chart-bg {
    background-color: $color_body_bg;
    height: 100%;
    position: relative;
    border-radius: 3px;
    & .line-chart-fill {
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: $color_green;
      border-radius: 3px;
    }
    & .line-chart-date {
      position: absolute;
      bottom:-40px;
      font-size: 14px;
      & span {
        display: block;
        line-height: 1;
      }
    }
  }
}

.progress {
  &.gray {
    stroke:$color_body_bg;
  }
  &.green {
    stroke:$color_green;
  }
  &.blue {
    stroke:$color_blue;
  }
  &.orange {
    stroke:$color_orange;
  }
}
</style>

<script>
import jQuery from 'jquery'
export default {
  name: 'accountCompletion',
  beforeMount () {
    this.getMaxIL()
  },
  mounted () {
    this.$nextTick(function () {
      jQuery(document).ready(function () {
        jQuery('svg').find('.progress').sort(function (a, b) {
          return +b.dataset.fill - +a.dataset.fill
        }).appendTo('svg > g')
        var radius = parseInt(jQuery('#radius').attr('r'))
        var perimeter = 2 * 3.14 * radius
        jQuery('svg > g').children('.progress').each(function () {
          var index = jQuery(this, '.progress').index()
          var amount
          if (parseInt(index) === 0) {
            amount = 100
            jQuery(this).data('render-fill', '100')
          } else {
            amount = parseFloat(jQuery(this).prev().data('render-fill') - jQuery(this).prev().attr('data-fill'))
            jQuery(this).data('render-fill', amount)
          }
          var fillAmount = (perimeter - perimeter * amount / 100)
          jQuery(this).attr({
            'stroke-dasharray': perimeter
          })
          jQuery(this).animate({
            'stroke-dashoffset': fillAmount
          }, 1000)
        })
      })
    })
  },
  data () {
    return {
      jsondata: window.jsondata,
      userid: window.userid,
      accountid: window.accountid,
      maxIL: 0
    }
  },
  methods: {
    getMaxIL () {
      for (var day in this.jsondata[this.userid].accounts[this.accountid].inventory) {
        if (this.jsondata[this.userid].accounts[this.accountid].inventory[day].listed > this.maxIL) this.maxIL = this.jsondata[this.userid].accounts[this.accountid].inventory[day].listed
      }
    },
    calcFill (i) {
      return parseFloat((this.jsondata[this.userid].accounts[this.accountid].listing_stat.data[i] / this.jsondata[this.userid].accounts[this.accountid].listing_stat.total) * 100)
    },
    getColor (i) {
      return this.jsondata[this.userid].accounts[this.accountid].listing_stat.colors[i]
    },
    getName (i) {
      return this.jsondata[this.userid].accounts[this.accountid].listing_stat._comment_for_datacolors[i]
    },
    getPercentage (i) {
      return parseInt((this.jsondata[this.userid].accounts[this.accountid].listing_stat.data[i] / this.jsondata[this.userid].accounts[this.accountid].listing_stat.total) * 100) + '%'
    }
  }
}
</script>
