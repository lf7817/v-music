<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .m-header
    position relative
    height 44px
    line-height 44px
    text-align center
    color $color-theme    
    font-size 0
    .icon
      display inline-block
      margin-top 4px
      width 28px
      height 30px
      bg-image('logo')
      vertical-align top
      background-size 28px 30px
    .text
      display inline-block
      vertical-align top
      line-height 44px
      text-indent 8px
      font-size $font-size-large      
    .mine
      position absolute
      top 0
      right 0
      .icon-mine
        display block
        padding 12px
        font-size 20px
        color $color-theme
</style>
