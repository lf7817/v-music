<template>
  <transition name="slide">
    <div class="singer-detail">
        hello
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@/api/singer'
import { ERR_OK } from '@/constant'
import { createSong } from '@/common/song'

export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters(['singer'])
  },
  created () {
    this._getDetail()
  },
  methods: {
    async _getDetail () {
      const singerId = this.singer.id
      if (!singerId) {
        this.$router.push('/singer')
        return
      }

      try {
        const res = await getSingerDetail(singerId)
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      } catch (e) {
        throw new Error(e)
      }
    },
    _normalizeSongs (list) {
      const ret = []
      list.forEach(item => {
        const { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

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
