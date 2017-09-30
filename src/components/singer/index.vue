<template>
  <div class="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import Singer from '@/common/singer'
import ListView from '@/base/listview'

const HOT_NAME = '热门'
const HOT_SEARCH_NUM = 10

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
          this.singers = res.data.list
          this.singers = this._normalizeSinger(this.singers)
        }
      } catch (e) {}
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        },
        nav: {}
      }
      list.forEach((item, index) => {
        if (index < HOT_SEARCH_NUM) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        if (!map.nav[key]) {
          map.nav[key] = {
            title: key,
            items: []
          }
        }
        map.nav[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      const order = Object.keys(map.nav).filter((k) => k.match(/[a-zA-Z]/)).sort((prev, next) => {
        return prev.charCodeAt(0) - next.charCodeAt(0)
      })
      const ret = order.map(key => map.nav[key])
      return [
        ...[map.hot],
        ...ret
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>
