<template>
  <div id="app">
    <m-header />
    <tab />
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from './components/m-header'
import Tab from './components/tab'

export default {
  name: 'app',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang="stylus">
  @import "~@/assets/stylus/variable.styl"
</style>
