<template>
  <div class="recommend">recommend</div>
</template>

<script>
import { getRecommend } from '@/api/recommend'
import { ERR_OK } from '@/constant'

export default {
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
