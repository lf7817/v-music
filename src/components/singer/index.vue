<template>
  <div class="singer" ref="singer">
    <ListView :list="singers"/>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/constant'
import Singer from '@/common/singer'
import ListView from '@/base/listview'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  name: 'singer',
  components: {
    ListView
  },
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    async _getSingerList () {
      try {
        const res = await getSingerList()
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      } catch (e) {
        throw new Error(e)
      }
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }

      list.map((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }

        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }

        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })

      let ret = []
      let hot = []
      Object.keys(map).forEach(key => {
        const val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      })
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(ret)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .singer 
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
