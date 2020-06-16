<template>
  <circle
    cx="0"
    cy="0"
    r="70"
    stroke-linecap="round"
    fill="transparent"
    stroke-width="15"
    :data-fill="dataFill"
    :style="{'stroke-dasharray': dashArray, 'stroke-dashoffset': renderOffset}"
    @mouseover="setHoverId"
    @mouseleave="unsetHoverId"
  />
</template>

<script>
export default {
  name: 'donutCircle',
  props: ['dataIndex', 'dataCount', 'dataFill', 'parentRefs'],
  mounted () {
    if (this.index === 0) {
      this.amount = 100
    } else if (this.index === this.count - 1) {
      this.amount = parseFloat(this.dataFill)
    } else {
      this.amount = parseFloat(this.prevCircleFill)
    }
    this.circle.setAttribute('render-fill', this.amount)
    this.fillAmount = (this.perimeter - this.perimeter * this.amount / 100)
    this.dashArray = this.perimeter
    this.dashOffset = this.fillAmount
    setTimeout(() => {
      this.setCircleStroke()
    }, 1)
  },
  data () {
    return {
      amount: 0,
      fillAmount: 0,
      index: parseInt(this.dataIndex),
      count: parseInt(this.dataCount),
      dashArray: 0,
      dashOffset: 0,
      renderOffset: 0
    }
  },
  methods: {
    setHoverId () {
      this.$store.commit('setDonutHoverId', this.index)
    },
    unsetHoverId () {
      this.$store.commit('setDonutHoverId', -1)
    },
    setCircleStroke () {
      this.renderOffset = this.dashOffset
    }
  },
  computed: {
    radius () {
      return this.circle.getAttribute('r')
    },
    perimeter () {
      return 2 * 3.14 * this.radius
    },
    circle () {
      return this.parentRefs['circle' + this.index][0].$el
    },
    prevCircleFill () {
      if (this.index - 1 >= 0) {
        return (this.parentRefs['circle' + (this.index - 1)][0].$el.getAttribute('render-fill')) - (this.parentRefs['circle' + (this.index - 1)][0].$el.getAttribute('data-fill'))
      } else {
        return 0
      }
    }
  }
}
</script>
