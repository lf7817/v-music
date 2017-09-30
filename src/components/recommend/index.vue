<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <div class="slide-content">
            <Slider>
              <div v-for="(item, index) in recommends" :key="index" >
                <a :href="item.linkUrl">
                  <img @load="loadImage" :src="item.picUrl">
                </a>
              </div>
            </Slider>
          </div>       
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in discList" class="item" :key="index">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
        <div v-show="!discList.length">
          <Loading class="loading-container"/>
        </div>
      </div>   
    </scroll>
  </div>  
</template>

<script>
  import { getRecommend, getDiscList } from '@/api/recommend'
  import { ERR_OK } from '@/api/config'
  import Slider from '@/base/slider'
  import Scroll from '@/base/scroll'
  import Loading from '@/base/loading'

  export default {
    name: 'recommend',
    components: {
      Slider,
      Scroll,
      Loading
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
        } catch (e) {}
      },
      async _getDiscList () {
        try {
          const res = await getDiscList()
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        } catch (e) {
          console.log(e)
        }
      },
      loadImage () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = !this.checkLoaded
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  .recommend
    position fixed
    width 100%
    top 88px
    bottom 0
    .recommend-content
      height: 100%;
      overflow hidden
      .slider-wrapper
        position relative
        width: 100%
        overflow hidden
      .recommend-list
        .list-title
          height 65px
          line-height 65px
          text-align center
          font-size $font-size-medium
          color $color-theme
        .item
          display flex
          box-sizing border-box
          align-items center
          padding 0 20px 20px 20px
          .icon
            flex 0 0 60px
            padding-right 20px
          .text
            display flex
            flex: 1
            flex-direction column
            justify-content center            
            line-height 20px
            overflow hidden
            font-size $font-size-medium
            .name
              margin-bottom 10px
              color $color-text
            .desc
              color $color-text-d
</style>
