<template>
  <section class="dark">
    <h1 class="text-center text-uppercase">
      {{ getMsg }}
    </h1>
    <div class="section-content text-center">
      <ul class="list-unstyled check-list">
        <li
          v-for="(check, id) in jsondata[userid].completion.checks"
          :key="id"
          class="text-center"
        >
          <div :class="['check-circle', (check.bool) ? 'complete' : 'ncomplete']">
            <span v-if="check.bool" class="icon-check"></span>
          </div>
          <div class="check-msg">
            {{ check.msg }}
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
section {
  &.dark {
    background-color:$color_body_bg;
  }
  h1 {
    padding:40px 100px 0 100px;
    margin-bottom:50px;
    font-weight: bold;
    font-size: 20px;
    color:$color_text_darker;
  }
}

.check-list {
  padding:0 30px;
  margin-bottom:50px;
  li {
    display: inline-block;
    position: relative;
    width:190px;
    vertical-align: top;
    margin-bottom:10px;
    .check-circle {
      margin:10px auto;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      position: relative;
      &.complete {
        background-color: $color_green;
      }
      &.ncomplete {
        background-color: $color_blue;
      }
      span {
        font-size: 28px;
        color:$color_text_light;
        position: absolute;
        left: 0;
        right: 0;
        top: 10px;
      }
    }
    .check-msg {
      margin: auto;
    }
    &:not(:last-child):after {
      content: '';
      position: absolute;
      background-color: #199ed9;
      width: calc(100% - 130px);
      left: 130px;
      height: 1px;
      top: 35px;
    }
    &:not(:first-child):before {
      content: '';
      position: absolute;
      background-color: #199ed9;
      width: calc(100% - 130px);
      right: 130px;
      height: 1px;
      top: 35px;
    }
  }
}
</style>

<script>
export default {
  name: 'accountCompletion',
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
    getMsg () {
      for (var check in this.jsondata[this.userid].completion.checks) {
        if (!check.bool) return this.jsondata[this.userid].completion.msg.ncompleted
      }
      return this.jsondata[this.userid].completion.msg.completed
    }
  }
}
</script>
