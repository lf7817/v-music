<template>
  <div class="recommend">
    <div class="slider-wrapper" v-if="recommends.length">
      <Slider>
        <div v-for="item in recommends" :key="item.id">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" alt="">
          </a>
        </div>
      </Slider>
    </div>
  </div>
</template>

<script>
import { getRecommend } from '@/api/recommend'
import { ERR_OK } from '@/constant'
import Slider from '@/base/slider'

export default {
  components: {
    Slider
  },
  data () {
    return {
      recommends: []
    }
  },
  created () {
    this._getRecommend()
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
    .slider-wrapper
      width 100%
      overflow hidden
</style>
