<template>
  <section class="light row">
    <div :class="['col-lg-4', 'px-0', ((sideOpen) ? 'sideOpen' : '')]">
      <h1 class="text-center text-uppercase">
        Inventory Levels
      </h1>
      <div class="section-content text-center inventory-levels">
        <div class="il-data row m-auto">
          <div class="col-1 il-vals-wrapper">
            <ul class="list-unstyled il-vals" :key="lineKey">
              <li v-for="i in 7" :key="i">
                {{ Math.floor((maxIL / 7) / 10) * (7 - i) }}
              </li>
            </ul>
          </div>
          <ul class="list-unstyled col-10 line-chart row" :key="lineKey">
            <li
              v-for="(day, id) in jsondata[userid].accounts[accountid].inventory"
              :key="id"
              class="col-2"
            >
              <div class="line-chart-bg">
                <div
                  class="line-chart-fill"
                  :style="'height: '+((day.listed / maxIL) * 100)+'%'"
                >
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
                  <span>
                    {{ ('0'+(new Date(day.date)).getDate()).slice(-2) }}
                  </span>
                  <span>
                    {{ ('0'+(new Date(day.date)).getMonth()).slice(-2) }}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="['col-lg-8', 'px-4', ((sideOpen) ? 'sideOpen' : '')]">
      <h1 class="text-center text-uppercase">
        Inventory Statistics
      </h1>
      <div class="section-content text-left row">
        <div class="col-lg-3 d-flex align-items-start text-center doughnut-chart">
            <svg :view-box.camel="'-80 -80 160 160'" :key="svgKey">
              <circle cx="0" cy="0" r="70" fill="transparent" id="radius"/>
              <g>
                <donutCircle
                  v-for="(data, i) in sortDonut()"
                  :key="i"
                  :data-index="i"
                  :ref="'circle'+i"
                  :data-count="sortDonut().length"
                  :data-fill="calcFill(i) || 0"
                  :class="['progress', getColor(i), ((reversehoverId == i) ? 'hover' : '')]"
                  :parent-refs="$refs"
                />
              </g>
              <circle cx="0" cy="0" r="70" fill="transparent" id="block"/>
            </svg>
        </div>
        <div class="col-md-7 px-2 pt-3 text-center-md">
          <div class="mb-4 data-title big green">
            {{ thousandSeparator(this.jsondata[this.userid].accounts[this.accountid].listing_stat.total) }}
            <span class="d-block">
              total listing
            </span>
          </div>
          <div class="row">
            <div
              v-for="(data, i) in sortDonut()"
              :key="i"
              class="col-6 col-md-3 data-title mb-4"
              @mouseover="reversehoverId = i"
              @mouseleave="reversehoverId = -1"
            >
              {{ thousandSeparator(data) }}
              <span :class="['circle', (getColor(i)), ((hoverId == i) ? 'hover' : '')]"></span>
              <span class="d-block">
                {{ getName(i) }}
              </span>
              <span class="d-block percentage">
                {{ getPercentage(i) }}
              </span>
            </div>
            <div class="col-12 text-center data-time-span mt-3 mb-2">
              {{ this.jsondata[this.userid].accounts[this.accountid].listing_stat.timespan }}
            </div>
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
    padding:40px 100px 0 100px;
    margin-bottom:30px;
    font-weight: bold;
    font-size: 20px;
    color:$color_text_darker;
  }
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
  .il-data {
    width: 100%;
    height: 100%;
    .il-vals-wrapper {
      padding:0;
      .il-vals {
        padding: 0 !important;
        text-align: right;
        position: absolute;
        bottom:0;
        left: 0;
        li {
          margin-bottom:30%;
        }
      }
    }
    .line-chart {
      height: 100%;
      position: relative;
      li {
        height: 100%;
        max-width: 9%;
        display: inline-block;
        padding:0 5px;
      }
      .line-chart-bg {
        background-color: $color_body_bg;
        height: 100%;
        position: relative;
        border-radius: 3px;
        .line-chart-fill {
          position: absolute;
          bottom: 0;
          width: 100%;
          background-color: $color_green;
          border-radius: 3px;
          transform-origin: bottom;
          animation: scaleUp 1s;
          .line-tooltip {
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
            span {
              display: block;
            }
          }
        }
        .line-chart-date {
          position: absolute;
          bottom:-40px;
          font-size: 14px;
          span {
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
  span {
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
  svg {
    width: 100%;
    max-width: 250px;
    margin:0 auto;
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
    circle:not(#block) {
      -o-transition: stroke-width .3s, stroke-dashoffset 1s;
      -ms-transition: stroke-width .3s, stroke-dashoffset 1s;
      -moz-transition: stroke-width .3s, stroke-dashoffset 1s;
      -webkit-transition: stroke-width .3s, stroke-dashoffset 1s;
      transition: stroke-width .3s, stroke-dashoffset 1s;
      cursor: pointer;
      stroke-dashoffset:0;
      &.hover {
        stroke-width: 20px;
      }
      &:hover {
        stroke-width: 20px;
      }
    }
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

@keyframes scaleUp {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}
</style>

<script>
import donutCircle from '@/components/donutCircle.vue'

export default {
  name: 'accountCompletion',
  beforeDestroy () {
    this.$root.$off('changeAcc', this.changeAccListener)
  },
  beforeMount () {
    this.getMaxIL()
  },
  mounted () {
    this.$root.$on('changeAcc', this.changeAccListener)
  },
  data () {
    return {
      maxIL: 0,
      svgKey: 0,
      lineKey: 0,
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
      return parseFloat((this.sortDonut()[i] / this.jsondata[this.userid].accounts[this.accountid].listing_stat.total) * 100)
    },
    getColor (i) {
      return this.jsondata[this.userid].accounts[this.accountid].listing_stat.colors[this.sortedDonutIndeces().sortIndices[i]]
    },
    getName (i) {
      return this.jsondata[this.userid].accounts[this.accountid].listing_stat._comment_for_datacolors[this.sortedDonutIndeces().sortIndices[i]]
    },
    getPercentage (i) {
      return parseInt((this.jsondata[this.userid].accounts[this.accountid].listing_stat.data[this.sortedDonutIndeces().sortIndices[i]] / this.jsondata[this.userid].accounts[this.accountid].listing_stat.total) * 100) + '%'
    },
    thousandSeparator (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
    },
    changeAccListener () {
      this.getMaxIL()
      this.svgKey++
      this.lineKey++
    },
    sortDonut () {
      var sorted = this.jsondata[this.userid].accounts[this.accountid].listing_stat.data.slice()
      return sorted.sort(function (a, b) {
        return b - a
      })
    },
    sortedDonutIndeces () {
      var sorted = this.jsondata[this.userid].accounts[this.accountid].listing_stat.data.slice()
      for (var i = 0; i < sorted.length; i++) {
        sorted[i] = [sorted[i], i]
      }
      sorted.sort(function (left, right) {
        return left[0] > right[0] ? -1 : 1
      })
      sorted.sortIndices = []
      for (var j = 0; j < sorted.length; j++) {
        sorted.sortIndices.push(sorted[j][1])
        sorted[j] = sorted[j][0]
      }
      return sorted
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
    },
    hoverId () {
      return this.$store.state.donutHoverId
    }
  },
  components: {
    donutCircle
  }
}
</script>
