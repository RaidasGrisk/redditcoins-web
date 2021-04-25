<template>
  <section>
    <div class="section container">

      <!-- This to reduce size on desktop / tablet -->
      <div class="columns is-centered" v-if="this.data_ready_flag">
        <div class="column is-full is-full-tablet is-two-thirds-desktop">

          <!-- <div class="column has-text-right">
            <a class="button is-link is-light" target="_blank">
              Hourly
            </a>
            <a class="button is-link is-light" target="_blank">
              Daily
            </a>
          </div> -->

          <!-- headers -->
          <!-- make sure col classes of headers correspond with classes
          of rows, so that all cols align properly -->
          <div class="box has-text-weight-medium">
            <div class="columns is-vcentered is-mobile">
              <div class="column is-narrow has-text-left">
                Coin
              </div>
              <div class="column has-text-left">
              </div>
              <div class="column is-narrow has-text-right">
                Mentions
              </div>
              <div class="column is-narrow has-text-right" style="width: 100px;">
                Change
              </div>
              <div class="column has-text-right is-3-mobile is-2-tablet is-2-desktop is-2-widescreen is-2-fullhd">
                Trend
              </div>
            </div>
          </div>

          <div class="box is-clickable disable-select">

            <!-- rows -->
            <div v-for="(item) in this.get_table_data" :key="item.id">

              <div class="columns is-vcentered is-mobile">
                <div class="column is-narrow has-text-left">
                  <img :src="`/assets/crypto_icons/${item.coin.toLowerCase()}.png`">
                </div>
                <div class="column has-text-left">
                  {{ item.coin }}
                </div>
                <div class="column is-narrow has-text-right">
                  {{ item.mentions }}
                </div>
                <div class="column is-narrow has-text-right" :class="item.change > 0 ? 'has-text-primary': 'has-text-danger'" style="width: 100px;">
                  {{ item.change }}%
                </div>
                <div class="column has-text-right is-3-mobile is-2-tablet is-2-desktop is-2-widescreen is-2-fullhd">

                    <trend
                        :data=item.data
                        gradientDirection="left"
                        :gradient="item.change > 0 ? ['#05b169', '#05b169', '#05b169']: ['#FF1279', '#FF1279', '#FF1279']"
                        :padding="8"
                        :radius="8"
                        :stroke-width="4"
                        stroke-linecap="butt"
                        :auto-draw="true"
                        :autoDrawDuration="1000"
                        smooth>
                    </trend>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>

import Trend from 'vuetrend';
import mixin from '../mixin.js'

export default {
  name: 'coinTable',
    mixins: [mixin],
  components: {
    Trend
  },
  data() {
    return {
    }
  },
  methods: {

		// imageUrl(coin) {
    //   let path = `@/assets/crypto_icons/${coin.toLowerCase()}.png`
    //   let default_path = `@/assets/crypto_icons/btc.png`
		// 	return path ? default_path : path
		// }

  },

  computed: {
    get_table_data() {
      let data = []
      this.vol_order.forEach((coin) => {
        let last_val = this.api_resp_['cryptocurrency'][coin].slice(-1)[0]
        if (last_val > 1) {
          data.push({
            'coin': coin,
            'mentions': last_val,
            'change': this.vol_pct_change[coin][0],
            'data': this.api_resp_['cryptocurrency'][coin],
            // 'color': this.colors[coin]
          })
        // console.log(this.colors)
        // console.log(this.vol_pct_change)
        }
      })
      return data
    }
  },

  mounted() {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
