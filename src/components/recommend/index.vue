<template>
  <div class="recommend">
    <Scroll :data="discList" class="recommend-content" ref="scroll">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <Slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="imageLoad" :src="item.picUrl" alt="">
              </a>
            </div>
          </Slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul v-if="discList.length">
            <li v-for="item in discList" :key="item.dissid" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" alt="" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from '@/api/recommend'
import { ERR_OK } from '@/constant'
import Slider from '@/base/slider'
import Scroll from '@/base/scroll'

export default {
  components: {
    Slider,
    Scroll
  },
  data () {
    return {
      recommends: [],
      discList: []
    }
  },
  created () {
    this._getRecommend()
    setTimeout(() => {
      this._getDiscList()
    }, 500)
  },
  methods: {
    async _getRecommend () {
      try {
        const res = await getRecommend()
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      } catch (e) {
        throw new Error(e)
      }
    },

    async _getDiscList () {
      try {
        const res = await getDiscList()
        if (res.data.code === ERR_OK) {
          this.discList = res.data.data.list
        }
      } catch (e) {
        throw new Error(e)
      }
    },

    imageLoad () {
      if (!this.checkLoad) {
        this.checkLoad = true
        this.$refs.scroll.refresh()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/variable"

  .recommend
    position fixed
    width 100%
    top 88px
    bottom 0
    overflow hidden
    .recommend-content
      height 100%;
      overflow hidden
      .slider-wrapper
        width 100%
        overflow hidden
      .recommend-list
        .list-title
          height 65px
          line-height 65px
          text-align center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display flex
          box-sizing border-box
          align-items center
          padding 0 20px 20px 20px
          .icon
            flex 0 0 60px
            width 60px
            padding-right 20px
          .text
            display flex
            flex-direction: column
            justify-content: center
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
</style>
