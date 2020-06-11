<template>
  <div class="section section-light row">
    <div class="col-md-5">
      <div class="section-title text-center text-uppercase">
        Inventory Levels
      </div>
      <div class="section-content text-center inventory-levels">
        asd
      </div>
    </div>
    <div class="col-md-7">
      <div class="section-title text-left text-uppercase">
        Inventory Statistics
      </div>
      <div class="section-content text-left">
        asd
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
  height: 250px;
  margin-bottom:30px;
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
  }
}
</script>
