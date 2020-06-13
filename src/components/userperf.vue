<template>
  <div class="section section-light text-center pb-4">
    <div class="section-title text-center text-uppercase">
      User Performance
    </div>
    <div v-for="(data, id) in jsondata[userid].userperf" v-bind:key="id" class="userperf mx-5 my-2">
      <div v-if="data.profile_pic.type == 'text'" class="profile_pic mb-3 text">
        {{ data.profile_pic.text }}
      </div>
      <div v-if="data.profile_pic.type == 'img'" class="profile_pic mb-3 img" :style="'background-image: url('+data.profile_pic.url+')'">
      </div>
      <div class="name">
        {{ data.name }}
      </div>
      <div class="info">
        {{ data.items }} items listed
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
  padding:40px 40px 25px 40px;
  margin-bottom:0;
  font-weight: bold;
  font-size: 20px;
  color:$color_text_darker;
}

.userperf {
  display: inline-block;
  & .profile_pic {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: $color_body_bg;
    color:$color_blue;
    font-size: 24px;
    margin:auto;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    line-height:3.5;
    font-weight: bold;
  }
  & .info {
    color:$color_green;
  }
}
</style>

<script>
export default {
  name: 'userperf',
  data () {
    return {
      jsondata: window.jsondata,
      userid: window.userid
    }
  }
}
</script>
