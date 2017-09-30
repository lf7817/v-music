<template>
  <scroll class="list-view" 
          :data="data" 
          ref="scroll" 
          :listenScroll="listenScroll"
          :probeType="probeType"
           @scroll="scroll">
    <ul>
      <li v-for="(item, index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="title">{{item.title}}</h2>
        <ul>
          <li v-for="(list, i) in item.items" :key="i" class="list-group-item">
            <img v-lazy="list.avatar" class="avatar">
            <span class="name">{{list.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortCutStart" 
      @touchmove.stop.prevent="onShortCutMove"
      @touchend="onShortCutStop">
      <ul>
        <li v-for="(item, index) in shortCutList" class="item" 
            :key="index" 
            :data-index="index" 
            :class="{current: currentIndex === index}">
          {{item}}
        </li>
      </ul>
    </div>
    <transition name="fade">
      <div v-show="isTouchEnd" class="list-shortcut-show">
        <span>{{shortCutList[currentIndex]}}</span>
      </div>
    </transition>
    <div v-show="!data.length">
      <Loading class="loading-container"/>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/base/scroll'
import Loading from '@/base/loading'
import { getData } from '@/common/dom'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  name: 'listview',
  components: {
    Scroll,
    Loading
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      isTouchEnd: false,
      diff: -1
    }
  },
  computed: {
    shortCutList () {
      return this.data.map(item => item.title.substr(0, 1))
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  created () {
    this.touch = {}
    this.listenScroll = true
    this.probeType = 3
    this.listHeight = []
  },
  methods: {
    onShortCutStart (e) {
      const anchorIndex = getData(e.target, 'index')
      if (!anchorIndex) return
      const firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
      this.isTouchEnd = true
    },
    onShortCutMove (e) {
      const firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      const delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 // 或0向下取整
      const anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
      this.isTouchEnd = true
    },
    onShortCutStop () {
      this.isTouchEnd = false
    },
    _scrollTo (anchorIndex) {
      if (!anchorIndex && anchorIndex !== 0) {
        return
      }
      if (anchorIndex <= 0) {
        anchorIndex = 0
      } else if (anchorIndex > this.listHeight.length - 2) {
        anchorIndex = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[anchorIndex]
      this.$refs.scroll.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _calcualteHeight () {
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight = Array.from(list).reduce((arr, item) => {
        height += item.clientHeight
        arr.push(height)
        return arr
      }, [0])
    }
  },
  watch: {
    data () {
      this.$nextTick(() => this._calcualteHeight())
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      // 滚动到顶部
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        const h1 = listHeight[i]
        const h2 = listHeight[i + 1]
        if ((-newY) >= h1 && (-newY) < h2) {
          this.currentIndex = i
          this.diff = h2 + newY
          return
        }
      }
      // 滚动到底部
      this.currentIndex = listHeight.length - 2
    },
    diff (newVal) {
      let topDiff = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.topDiff === topDiff) return
      this.topDiff = topDiff
      this.$refs.fixed.style.transform = `translate3d(0, ${topDiff}px, 0)`
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"

  .loading-container
    margin-top 40px
  .fade-enter-active, .fade-leave-active
    transition opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0
  .list-view
    position relative
    width 100%
    height 100%
    overflow hidden
    .list-group
      padding-bottom 20px
      .title
        height: 30px
        line-height 30px
        padding-left 20px
        background-color $color-highlight-background
        font-size $font-size-small
        color $color-text-l
      .list-group-item
        display flex
        align-items center
        padding 20px 0 0 30px
        .avatar
          width 50px
          height 50px
          border-radius 50%
        .name
          margin-left 20px
          color $color-text-l
          font-size $font-size-medium
    .list-shortcut
      position fixed
      z-index 30
      right 0
      top calc(50% + 44px)
      transform translateY(-50%)
      width 20px
      padding 20px 0
      border-radius 10px
      text-align center
      background $color-background-d
      font-family Helvetica
      .item
        padding 3px
        color $color-text-l
        font-size $font-size-small
        line-height 1
        &.current
          color $color-theme
    .list-shortcut-show
      position fixed
      top calc(50% - 9px)
      left calc(50% - 40px)
      width 80px
      height 80px
      line-height 80px
      text-align center
      background $color-background-d
      color $color-text-ll
      font-size 48px
      border-radius 6px
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
</style>
