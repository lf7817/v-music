<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :key="index"
        :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
import { addClass } from '@/common/dom'
import BScroll from 'better-scroll'

export default {
  name: 'slider',
  props: {
    height: {
      type: Number
    },
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
    },
    showDot: {
      type: Boolean
    },
    click: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  activated () {
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated () {
    clearTimeout(this.timer)
  },
  methods: {
    _setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      Array.from(this.children).forEach(item => {
        addClass(item, 'slider-item')
        item.style.width = sliderWidth + 'px'
        width += sliderWidth
      })
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.height = 'auto'
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        momentum: true,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        click: this.click
      })
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
      this.slider.on('scrollEnd', this._onScrollEnd)
    },
    _play () {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    },
    _onScrollEnd () {
      let pageIndex = this.slider.getCurrentPage().pageX
      if (this.loop) {
        pageIndex -= 1
      }
      this.currentPageIndex = pageIndex

      if (this.autoPlay) {
        clearTimeout(this.timer)
        this._play()
      }
    }
  }
}

</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"

  .slider
    min-height 1px
    width 100%
    overflow hidden
    .slider-group
      position relative
      height 150px
      overflow hidden
      white-space nowrap
      .slider-item
        float left
        box-sizing border-box
        overflow hidden
        a
          display block
          width 100%
          text-decoration none
          img
            display block
            width 100%
    .dots
      position absolute
      right 0
      left 0
      bottom 12px
      text-align center
      font-size 0
      .dot
        display inline-block
        margin 0 4px
        width 8px
        height 8px
        border-radius 50%
        background-color $color-text-l
        &.active
          width 20px
          border-radius 5px
          background-color $color-text-ll
</style>
