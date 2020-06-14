<template>
  <div class="section section-light row">
    <div v-bind:class="'col-lg-4 px-0 ' + ((sideOpen) ? 'sideOpen' : '')">
      <div class="section-title text-center text-uppercase">
        Inventory Levels
      </div>
      <div class="section-content text-center inventory-levels">
        <div class="il-data row m-auto">
          <div class="col-1 il-vals-wrapper">
            <ul class="list-unstyled il-vals" :key="lineKey">
              <li v-for="i in 7" v-bind:key="i">
                {{ Math.floor((maxIL / 7) / 10) * (7 - i) }}
              </li>
            </ul>
          </div>
          <ul class="list-unstyled col-10 line-chart row" :key="lineKey">
            <li v-for="(day, id) in jsondata[userid].accounts[accountid].inventory" v-bind:key="id" class="col-2">
              <div class="line-chart-bg">
                <div class="line-chart-fill" v-bind:data-fill-height="((day.listed / maxIL) * 100)+'%'">
                  <div class="line-tooltip">
                    <span>
                      {{ (new Date(day.date).getDate()) + '' +  nth((new Date(day.date).getDate())) + ' ' + month((new Date(day.date).getMonth()))  }}
                    </span>
                    <span>
                      {{ day.listed }} listed item on eBay
                    </span>
                  </div>
                </div>
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
    <div v-bind:class="'col-lg-8 px-4 ' + ((sideOpen) ? 'sideOpen' : '')">
      <div class="section-title text-center text-uppercase">
        Inventory Statistics
      </div>
      <div class="section-content text-left row">
        <div class="col-lg-3 d-flex align-items-start text-center doughnut-chart">
            <svg :view-box.camel="'-80 -80 160 160'" :key="svgKey">
              <circle cx="0" cy="0" r="70" fill="transparent" id="radius"/>
              <g></g>
              <circle v-for="(data, i) in jsondata[userid].accounts[accountid].listing_stat.data" v-bind:key="i" cx="0" cy="0" r="70" stroke-linecap="round" fill="transparent" stroke-width="15" v-bind:data-fill="calcFill(i) || 0" v-bind:class="'progress '+getColor(i)+' '+((reversehoverId == i) ? 'hover' : '')" @mouseover="hoverId = i" @mouseleave="hoverId = -1"/>
              <circle cx="0" cy="0" r="70" fill="transparent" id="block"/>
            </svg>
        </div>
        <div class="col-md-7 px-2 pt-3 text-center-md">
          <div class="mb-4 data-title big green">
            {{ thousandSeparator(this.jsondata[this.userid].accounts[this.accountid].listing_stat.total) }}
            <span class="d-block">total listing</span>
          </div>
          <div class="row">
            <div v-for="(data, i) in jsondata[userid].accounts[accountid].listing_stat.data" v-bind:key="i" class="col-6 col-md-3 data-title mb-4" @mouseover="reversehoverId = i" @mouseleave="reversehoverId = -1">
              {{ thousandSeparator(data) }}
              <span v-bind:class="'circle '+(getColor(i))+' '+((hoverId == i) ? 'hover' : '')"></span>
              <span class="d-block">{{ getName(i) }}</span>
              <span class="d-block percentage">{{ getPercentage(i) }}</span>
            </div>
            <div class="col-12 text-center data-time-span mt-3 mb-2">
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
  margin-bottom:70px;
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
  left: 0;
  & li {
    margin-bottom:30%;
  }
}

.line-chart {
  height: 100%;
  position: relative;
  & li {
    height: 100%;
    max-width: 9%;
    display: inline-block;
    padding:0 5px;
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
      & .line-tooltip {
        font-size: 14px;
        -o-transition: .3s;
        -ms-transition: .3s;
        -moz-transition: .3s;
        -webkit-transition: .3s;
        transition: .3s;
        position: absolute;
        top:-65px;
        left:-120px;
        right: -120px;
        background-color: $color_navbar_bg;
        border-radius: 3px;
        padding:10px 30px;
        white-space: nowrap;
        line-height: 1;
        z-index: 999999;
        color:$color_text_light;
        visibility: hidden;
        opacity: 0;
        transform: scale(0);
        transform-origin: bottom;
        &:after {
          content:'';
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 15px solid $color_navbar_bg;
          position: absolute;
          bottom: -14px;
          left: 0;
          right: 0;
          margin: auto;
        }
        & span {
          display: block;
        }
      }
    }
    & .line-chart-date {
      position: absolute;
      bottom:-40px;
      font-size: 14px;
      & span {
        display: block;
        line-height: 1.1;
      }
    }
    &:hover .line-tooltip {
      visibility:visible;
      opacity: 1;
      transform: scale(1);
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

.data-title {
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
  cursor: pointer;
  &.big {
    font-size: 26px;
  }
  &.green {
    color:$color_green;
  }
  & span {
    font-size: 16px;
    font-weight: normal;
    line-height: 1.3;
    &.percentage {
      font-size: 20px;
    }
    &.circle {
      -o-transition: .3s;
      -ms-transition: .3s;
      -moz-transition: .3s;
      -webkit-transition: .3s;
      transition: .3s;
      width: 15px;
      height: 15px;
      content: '';
      border-radius: 50%;
      margin-left: 5px;
      display: inline-block;
      &.green {
        background-color: $color_green;
      }
      &.blue {
        background-color: $color_blue;
      }
      &.gray {
        background-color: $color_gray;
      }
      &.orange {
        background-color: $color_orange;
      }
      &.hover {
        transform: scale(1.5);
      }
    }
  }
  &:hover .circle {
    transform: scale(1.5);
  }
}

.doughnut-chart {
  & svg {
    width: 100%;
    max-width: 250px;
    margin:0 auto;
  }
}

circle:not(#block) {
  -o-transition: stroke-width .3s;
  -ms-transition: stroke-width .3s;
  -moz-transition: stroke-width .3s;
  -webkit-transition: stroke-width .3s;
  transition: stroke-width .3s;
  cursor: pointer;
  &.hover {
    stroke-width: 20px;
  }
  &:hover {
    stroke-width: 20px;
  }
}

@media (max-width: 1200px) {
  .sideOpen {
    display: block !important;
    flex: none !important;
    max-width: 100% !important;
  }
}

@media (max-width: 992px) {
  .text-center-md {
    text-align: center !important;
    margin-left: auto;
    margin-right: auto;
    display: block;
    flex: none !important;
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
    this.$root.$on('toggleSideNav', () => {
      this.sideOpen = !this.sideOpen
    })
    this.$root.$on('changeAcc', () => {
      this.jsondata = window.jsondata
      this.userid = window.userid
      this.accountid = window.accountid
      this.getMaxIL()
      this.svgKey++
      this.lineKey++
      this.animateDoughnut()
      this.animateLine()
    })
    this.animateDoughnut()
    this.animateLine()
  },
  data () {
    return {
      jsondata: window.jsondata,
      userid: window.userid,
      accountid: window.accountid,
      maxIL: 0,
      sideOpen: false,
      svgKey: 0,
      lineKey: 0,
      hoverId: -1,
      reversehoverId: -1
    }
  },
  methods: {
    getMaxIL () {
      this.maxIL = 0
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
    },
    thousandSeparator (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    animateDoughnut () {
      this.$nextTick(function () {
        jQuery(document).ready(function () {
          jQuery('.doughnut-chart').find('.progress').sort(function (a, b) {
            return +b.dataset.fill - +a.dataset.fill
          }).appendTo('.doughnut-chart > svg > g')
          var radius = parseInt(jQuery('#radius').attr('r'))
          var perimeter = 2 * 3.14 * radius
          var elems = jQuery('.doughnut-chart > svg > g').children('.progress').length
          jQuery('.doughnut-chart > svg > g').children('.progress').each(function () {
            var index = jQuery(this, '.progress').index()
            var amount
            if (parseInt(index) === 0) {
              amount = 100
            } else if (parseInt(index) === elems - 1) {
              amount = parseFloat(jQuery(this).attr('data-fill'))
            } else {
              amount = parseFloat(jQuery(this).prev().data('render-fill') - jQuery(this).prev().attr('data-fill'))
            }
            jQuery(this).data('render-fill', amount)
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
    animateLine () {
      this.$nextTick(function () {
        jQuery(document).ready(function () {
          jQuery('.il-data').find('.line-chart-fill').each(function () {
            var fillHeight = jQuery(this).data('fill-height')
            jQuery(this).animate({
              height: fillHeight
            }, 1000)
          })
        })
      })
    },
    nth (d) {
      if (d > 3 && d < 21) return 'th'
      switch (d % 10) {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
      }
    },
    month (m) {
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][m - 1]
    }
  }
}
</script>
