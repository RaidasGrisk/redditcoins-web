<template>
  <section>
    <div class="section container">

      <!-- This to reduce size on desktop / tablet -->
      <div class="columns is-centered">
        <div class="column is-full is-full-tablet is-two-thirds-desktop">

          <!-- <div class="column has-text-right">
            <a class="button is-link is-light" target="_blank">
              Hourly
            </a>
            <a class="button is-link is-light" target="_blank">
              Daily
            </a>
          </div> -->

          <div class="box is-clickable disable-select is-size-7-mobile">
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
                <div class="column has-text-right is-2">
                  Trend
                </div>
              </div>
            </div>

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
                <div class="column has-text-right is-2">
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

<!--
      <div class="box is-clickable disable-select">
        <table class="table is-hoverable has-text-right is-fullwidth">
          <thead>
            <tr>
              <th class="has-text-weight-light has-text-left">Coin</th>
              <th class="has-text-weight-light">Mentions</th>
              <th class="has-text-weight-light">Change</th>
              <th class="has-text-weight-light">Mention chart</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in this.get_table_data" :key="item.id">
              <td>
                <div class="columns is-vcentered is-mobile">
                  <div class="column is-narrow has-text-left">
                    <img :src="`/assets/crypto_icons/${item.coin.toLowerCase()}.png`">
                  </div>
                  <div class="column has-text-left">
                    {{ item.coin }}
                  </div>
                </div>
              </td>
              <td style="width: 100px;">
                <div class="columns has-text-right is-mobile">
                  <div class="column">
                    {{ item.mentions }}
                  </div>
                </div>
              </td>
              <td class="has-text-right" :class="item.change > 0 ? 'has-text-primary': 'has-text-danger'" style="width: 100px;">
                {{ item.change }}%
              </td>
              <td style="width: 200px;">
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
              </td>
            </tr>
          </tbody>
        </table>
      </div> -->

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
      table_data_created: false,
    }
  },
  methods: {

		imageUrl(coin) {
      let path = `@/assets/crypto_icons/${coin.toLowerCase()}.png`
      let default_path = `@/assets/crypto_icons/btc.png`
			return path ? default_path : path
		}

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
            'data': this.api_resp_['cryptocurrency'][coin]
          })
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
