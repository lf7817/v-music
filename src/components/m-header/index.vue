<template>
  <div class="m-header">
    <div class="icon"></div>
    <span class="text">炸鸡音乐</span>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/variable"
  @import "~@/assets/stylus/mixin"
  
  .m-header
    position relative
    height 44px
    text-align center 
    color $color-theme
    font-size 0
    .icon
      display inline-block
      width 30px
      height 32px
      vertical-align top
      margin-top 6px
      background-size 30px 32px
      bg-image('./logo')
      margin-right 9px
    .text
      display inline-block
      font-size $font-size-large
      line-height 44px
      vertical-align top
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme

</style>
