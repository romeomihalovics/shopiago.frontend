<template>
  <div class="section section-dark">
    <div class="section-title text-center text-uppercase">
    {{ getMsg }}
    </div>
    <div class="section-content text-center">
      <ul class="list-unstyled check-list">
        <li v-for="(check, id) in jsondata[userid].completion.checks" v-bind:key="id" class="text-center">
          <div v-bind:class="'check-circle '+((check.bool) ? 'complete' : 'ncomplete')">
            <span v-if="check.bool" class="ti-check"></span>
          </div>
          <div class="check-msg">
            {{ check.msg }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../scss/_varibles.scss';

.section {
  &.section-dark {
    background-color:$color_body_bg;
  }
  &.section-light {
    background-color:$color_text_light;
  }
}

.section-title {
  padding:40px 100px 0 100px;
  margin-bottom:50px;
  font-weight: bold;
  font-size: 20px;
  color:$color_text_darker;
}

.check-list {
  padding:0 30px;
  margin-bottom:50px;
  & li {
    display: inline-block;
    position: relative;
    width:190px;
    vertical-align: top;
    margin-bottom:10px;
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
  & span {
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
</style>

<script>
export default {
  name: 'accountCompletion',
  data () {
    return {
      jsondata: window.jsondata,
      userid: window.userid,
      accountid: window.accountid
    }
  },
  computed: {
    getMsg () {
      for (var check in this.jsondata[this.userid].completion.checks) {
        if (!check.bool) return this.jsondata[this.userid].completion.msg.ncompleted
      }
      return this.jsondata[this.userid].completion.msg.completed
    }
  }
}
</script>
