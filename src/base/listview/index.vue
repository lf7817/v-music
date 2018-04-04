<template>
  <scroll 
    ref="scroll"
    class="list-view"
    listenScroll
    :probeType="3"
    @scroll="scrollHandler" 
    :data="data">
    <ul ref="group">
      <li v-for="group in data" class="list-group" :key="group.title" >
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item" :key="item.id">
            <img v-lazy="item.avatar" alt="" class="avatar"/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul 
      class="list-shortcut" 
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove">
      <li 
        v-for="(item, index) in shortcutList" 
        :key="item" 
        class="item"
        :data-index="index"
        :class="{'active': index === currentIndex}">
        {{item}}
      </li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from '../scroll'
import { getData } from '@/common/dom'

const ANCHOR_HEIGHT = 18

export default {
  name: 'list-view',
  components: {
    Scroll
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      currentIndex: 0,
      scrollY: -1
    }
  },
  computed: {
    shortcutList () {
      return this.data.map(group => {
        return group.title.charAt(0)
      })
    }
  },
  created (){
    this.touch = {},
    this.listHeight = []
  },
  methods: {
    onShortcutTouchStart (e) {
      const anchorIndex = getData(e.target, 'index')
      this.touch.y1 = e.touches[0].pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove (e) {
      this.touch.y2 = e.touches[0].pageY
      const delta = Math.round((this.touch.y2  - this.touch.y1) / ANCHOR_HEIGHT)
      const index = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(index)
    },
    scrollHandler (pos) {
      this.scrollY = pos.y
    },
    _scrollTo (anchorIndex) {
      if (!anchorIndex &&  anchorIndex !== 0) {
        return
      }
      if (anchorIndex < 0) {
        anchorIndex = 0
      } else if (anchorIndex > this.listHeight.length - 2) {
        anchorIndex = this.listHeight.length - 2
      }
      this.currentIndex = anchorIndex
      this.$refs.scroll.scrollToElement(this.$refs.group.children[anchorIndex], 0)
    },
    _calculateHeight () {
      let height = 0
      const children = this.$refs.group.children
      this.listHeight = [0]

      for (let i = 0; i < children.length; i++) {
        height += children[i].clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data () {
      this.$nextTick(() => {
        this._calculateHeight()
      })
    },
    scrollY (newY) {
      if (newY > 0) {
        this.currentIndex = 0
        return
      }

      for (let i = 0; i < this.listHeight.length - 1; i++) {
        const h1 = this.listHeight[i]
        const h2 = this.listHeight[i + 1]

        if (-newY >= h1 && -newY < h2) {
          this.currentIndex = i
          return
        }    
      }

      this.currentIndex = this.listHeight.length - 2
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/variable"
  
  .list-view
    position relative
    width 100%
    height 100%
    overflow hidden
    .list-group
      padding-bottom: 20px
      .list-group-title
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background $color-highlight-background
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
      right 0
      top 50%
      margin-top -50%
      z-index 20
      padding 20px 0
      background $color-background-d
      border-radius 10px
      text-align center
      font-family Helvetica
      .item
        padding 3px
        line-height 1
        font-size $font-size-small
        color: $color-text-l
        &.active
          color $color-theme

</style>
