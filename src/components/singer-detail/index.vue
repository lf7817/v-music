<template>
  <transition name="slide">
    <div class="singer-detail">
        hello
    </div>
  </transition>
</template>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/variable.styl"


  .slide-enter-active, .slide-leave-active
    transform translate3d(0, 0, 0)
    transition all .3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)

  .singer-detail
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 100
    background $color-background
</style>
