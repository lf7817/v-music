<template>
  <div class="tab" ref="wrapper">
    <router-link 
      tag="div" 
      class="tab-item"
      v-for="(nav, index) in navs"
      :key="index"
      :to="nav.path"
      :data-index="index">
      <span class="tab-link">{{nav.title}}</span>
    </router-link>
    <div class="tab-under-line" :style="{transform: `translate3d(${offsetX}px, 0, 0)`}"></div>   
  </div>
</template>

<script>
import { getData, hasClass } from '@/common/dom'

const UNDER_LINE_WIDTH = 28

export default {
  data () {
    return {
      navs: [
        {
          path: '/recommend',
          title: '推荐'
        },
        {
          path: '/singer',
          title: '歌手'
        },
        {
          path: '/rank',
          title: '排行'
        },
        {
          path: '/search',
          title: '搜索'
        },
      ],
      anchorIndex: 0,
      anchors: []
    }
  },
  computed: {
    offsetX () {
      return this.anchors[this.anchorIndex]
    }
  },
  watch: {
    '$route' (to, from) {
      this.setPosition(to.path)
    }
  },
  mounted () {
    this.calculateAnchorPosition()
    this.initPosition()
  },
  methods: {
    calculateAnchorPosition () {
      this.children = this.$refs.wrapper.children
      this.len = this.children.length - 1
      const itemWidth = this.$refs.wrapper.clientWidth / this.len

      for (let i = 0; i < this.len; i++) {
        this.anchors.push((itemWidth - UNDER_LINE_WIDTH) / 2 + itemWidth * i)
      }
    },
    setPosition (path) {
      for (let i = 0; i < this.navs.length; i++) {
        if (path.indexOf(this.navs[i].path) >= 0) {
          this.anchorIndex = i
          return
        }
      }
    },
    initPosition () {
      for (let i = 0; i < this.len; i++) {
        if (hasClass(this.children[i], 'router-link-active')) {
          this.anchorIndex = i
          return
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/variable.styl"

  .tab
    position relative
    display flex
    height 44px
    line-height 44px
    font-size $font-size-medium
    .tab-item
      flex 1
      text-align center
      .tab-link
        padding-bottom 5px
        color $color-text-l
      &.router-link-active 
        .tab-link
          color $color-theme
          // border-bottom: 2px solid $color-theme
    .tab-under-line
      position absolute
      bottom 7px
      width 28px
      border-radius 14px
      border 1px solid $color-theme
      transition transform .3s cubic-bezier(.645,.045,.355,1)
</style>

