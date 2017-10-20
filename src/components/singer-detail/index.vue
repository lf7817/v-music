<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"/>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { ERR_OK } from '@/api/config'
import { getSingerDetail } from '@/api/singer'
import { createSong } from '@/common/song'
import MusicList from '@/components/music-list'

export default {
  name: 'singer-list',
  components: {
    MusicList
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  data () {
    return {
      songs: []
    }
  },
  created () {
    this._getDetail()
  },
  methods: {
    async _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
      const res = await getSingerDetail(this.singer.id)
      if (res.code === ERR_OK) {
        this.songs = this._normalizeSongs(res.data.list)
      }
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
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
  @import "~assets/stylus/variable"

  .slide-enter, .slide-leave-to
    transform translateX(100%)
  .slide-enter-active, .slide-leave-active
    transition: all .3s
  
  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    bottom 0
    right 0
    background $color-background
</style>
