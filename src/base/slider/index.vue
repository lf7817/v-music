<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span 
        class="dot" 
        v-for="(dot, index) in dots" 
        :key="index"
        :class="{active: index === currentIndex}"></span>
    </div>
  </div>
</template>

<script>
import { addClass } from '@/common/dom'
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
  },
  data () {
    return {
      dots: [],
      currentIndex: 0
    }
  },
  activated () {
    if (!this.slider) {
      return
    }
    this.slider.enable()
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated () {
    clearTimeout(this.timer)
    this.slider.disable()
  },
  mounted () {
    this.update()
    window.addEventListener('resize', () => {
      if (!this.slider) return
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    this.slider.disable()
  },
  methods: {
    init () {
      clearTimeout(this.timer)
      this.currentIndex = 0
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 
    update () {
      if (this.slider) {
        this.slider.destory()
      }
      this.$nextTick(() => {
        this.init()
      })
    },
    _setSliderWidth (isResize) {
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      this.children = this.$refs.sliderGroup.children

      for (let i = 0; i < this.children.length; i ++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }

      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    _play () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        click: true,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })

      this.slider.on('scrollEnd', () => {
        this.currentIndex  = this.slider.getCurrentPage().pageX
        this._play()
      })

      this.slider.on('touchEnd', () => {
        if (this.autoPlay) {
          this._play()
        }
      })

      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/variable"

  .slider
    position relative
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
    .dots
      position absolute
      left 0
      right 0
      bottom 12px
      text-align center 
      .dot
        display inline-block
        margin 0 4px
        width 8px
        height 8px
        border-radius 50%
        background $color-text-l
        &.active
          width 20px
          border-radius 5px
          background $color-text-ll



</style>
