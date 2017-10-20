<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <div class="title" v-html="title"></div>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <Scroll :data="songs"
            :probeType="probeType"
            :listenScroll="listenScroll"
            @scroll="scroll"
            class="list" ref="list">
      <div class="song-list-container">
        <SongList :songs="songs"></SongList>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll'
import SongList from '@/base/song-list'

const HEAD_HEIGHT = 40

export default {
  name: 'music-list',
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  data () {
    return {
      scrollY: 0
    }
  },
  computed: {
    bgStyle () {
      return `background-image: url(${this.bgImage})`
    }
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + HEAD_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    back () {
      this.$router.back()
    },
    scroll (e) {
      this.scrollY = e.y
    }
  },
  watch: {
    scrollY (newY) {
      let zIndex = 0
      let scale = 1
      let blur = 0
      const percent = Math.abs(newY / this.imageHeight)
      let translateY = Math.max(this.minTranslateY, newY)
      this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`
      this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`

      if (newY > 0) {
        zIndex = 10
        scale = scale + percent
      } else {
        blur = Math.min(20, 20 * percent)
      }
      this.$refs.filter.style['filter'] = `blur(${blur}px) saturate(${percent})`
      if (newY < this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = HEAD_HEIGHT + 'px'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
      }

      this.$refs.bgImage.style.zIndex = zIndex
      this.$refs.bgImage.style['transform'] = `scale(${scale})`
      this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})`
    }
  },
  components: {
    Scroll,
    SongList
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
@import "~assets/stylus/mixin"

.music-list
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index 100
  background $color-background
  .back
    position absolute
    top 0
    left 6px
    z-index 50
    .icon-back
      display block
      padding 10px
      font-size $font-size-large-x
      color $color-theme
  .title
    position absolute
    top 0
    left 10%
    z-index 40
    width 80%
    no-wrap()
    text-align center
    line-height 40px
    font-size $font-size-large
    color $color-text
  .bg-image
    position relative
    width 100%
    height 0
    padding-top 70%
    background-size cover
    transform-origin top
  .filter
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(7, 17, 27, 0.4)
  .bg-layer
    position: relative
    height: 100%
    background: $color-background
  .list
    position fixed
    top 0
    bottom 0
    width 100%
    background $color-background
    /*overflow hidden*/
    .song-list-container
      padding 20px 30px

</style>
