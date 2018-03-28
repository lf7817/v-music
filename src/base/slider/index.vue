<template>
  <div class="slider">
    <div class="slider-group">
      <slot></slot>
    </div>
    <div class="dots"></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/variable"

  .slider
    min-height 1px
    .slider-group
      position relative
      overflow hidden
      white-space nowrap
      .slider-item 
        float left
        box-sizing border-box
        overflow hidden
        a
          display block 
          width 100%
          overflow hidden
          text-text-decoration none 
        img 
          display block 
          width 100%


</style>
