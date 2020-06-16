<template>
  <section class="light text-center pb-4">
    <h1 class="text-center text-uppercase">
      User Performance
    </h1>
    <div
      v-for="(data, id) in jsondata[userid].userperf"
      :key="id"
      class="userperf mx-5 my-2"
    >
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
  </section>
</template>

<style lang="scss">
section {
  &.light {
    background-color:$color_text_light;
    border-top:1px solid $color_topnav_border;
  }
  h1 {
    padding:40px 40px 25px 40px;
    margin-bottom:0;
    font-weight: bold;
    font-size: 20px;
    color:$color_text_darker;
  }
}

.userperf {
  display: inline-block;
  .profile_pic {
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
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .info {
    color:$color_green;
  }
}
</style>

<script>
export default {
  name: 'userperf',
  computed: {
    jsondata () {
      return this.$store.state.jsondata
    },
    userid () {
      return this.$store.state.userid
    }
  }
}
</script>
