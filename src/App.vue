<template>
  <div id="app">
    <m-header />
    <tab />
    <keep-alive>
      <router-view />
    </keep-alive>
    <player />
  </div>
</template>

<script>
import MHeader from '@/components/m-header'
import Tab from '@/components/tab'
import Player from '@/components/Player'

export default {
  name: 'app',
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style>

</style>
