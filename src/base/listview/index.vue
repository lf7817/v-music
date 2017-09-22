<template>
  <scroll class="list-view" :data="data">
    <ul>
      <li v-for="(item, index) in data" :key="index" class="list-group">
        <h2 class="title">{{item.title}}</h2>
        <ul>
          <li v-for="(list, i) in item.items" :key="i" class="list-group-item">
            <img :src="list.avatar" class="avatar">
            <span class="name">{{list.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from '@/base/scroll'

export default {
  name: 'listview',
  components: {
    Scroll
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
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
</style>
