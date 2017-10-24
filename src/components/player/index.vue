<template>
  <div class="player">
    <div class="normal-player" v-show="fullScreen">
      播放器
    </div>
    <div class="mini-player" v-show="!fullScreen">123112</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'fullScreen',
        'playlist'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .player
    .normal-player
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      z-index 150
      background $color-background


</style>
