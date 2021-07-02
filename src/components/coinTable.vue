<template>
  <section>
    <div class="section container">

      <div class="columns is-centered is-size-7-mobile" v-if="this.$store.state.page_loaded">
        <div class="column is-full is-full-tablet is-two-fifths-desktop">

          <div class="box" style="padding: 0.75rem;">
            <table class="table is-hoverable is-fullwidth is-narrow">
              <thead>
                <tr>
                  <th>Coin</th>
                  <th></th>
                  <!-- <th class="has-text-weight-light light has-text-right"><abbr title="Mentions">Mentions</abbr></th> -->
                  <!-- <th class="has-text-right"><abbr title="Change">Ch</abbr></th> -->
                  <th class="has-text-right">Count</th>
                  <th class="has-text-right">Change</th>
                  <th class="has-text-right">
                    <div
                      class="has-tooltip-info has-tooltip-multiline has-tooltip-arrow"
                      :class="isMobile() ? `has-tooltip-left`: ``"
                      style="text-decoration-style: dashed; text-decoration-line: underline"
                      data-tooltip="Trend shows the data points of last 24 periods (24 hours / 24 days).">
                      Trend
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item) in this.get_table_data" :key="item.id" @click="rowClick(item.coin)">
                  <td class="is-vcentered">
                    <img :src="getImgUrl(item.coin.toLowerCase())">
                  </td>
                  <td class="is-vcentered">
                    {{ item.coin }}
                  </td>
                  <td class="is-vcentered has-text-right">
                    {{ item.mentions }}
                  </td>
                  <td class="is-vcentered has-text-right" :class="item.change > 0 ? 'has-text-primary': 'has-text-danger'" style="width: 100px;">
                    {{ item.change }}%
                  </td>
                  <td class="has-text-right">
                    <trend
                        style="max-width: 100px; min-width: 50px; max-height: 50px"
                        :data=item.data
                        gradientDirection="left"
                        :gradient="[item.color, item.color, item.color]"
                        :padding="8"
                        :radius="20"
                        :stroke-width="isMobile() ? 6: 5"
                        stroke-linecap="butt"
                        :auto-draw="true"
                        :autoDrawDuration="1200"
                        smooth>
                    </trend>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>

import Trend from 'vuetrend';

export default {
  name: 'coinTable',
  components: {
    Trend
  },
  data() {
    return {

    }
  },
  methods: {

    formatNumber(theNumber) {
      if (theNumber == Infinity) {
        return 'Inf'
      } else {
        return theNumber
      }
    },

    getImgUrl(coin) {
      var images = require.context('@/assets/crypto_icons', false, /\.png$/)
      try {
        return images('./' + coin + ".png")
      }
      catch (exception_var) {
        return require('@/assets/crypto_icons/default.png')
      }

    },

    isMobile() {
      if(/Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },

    // what happens when we click a row
    rowClick(coin) {
      this.$root.$emit('selectACoin', coin)
      this.$root.$emit('openChart')
    }

  },



  computed: {

    get_table_data() {
      let data = []
      this.$store.state.vol_order.forEach((coin) => {
        let subreddit = Object.keys(this.$store.state.data)[0]
        let last_val = this.$store.state.data[subreddit][coin].slice(-1)[0]
        if (last_val > 1) {
          data.push({
            'coin': coin,
            'mentions': last_val,
            'change': this.formatNumber(this.$store.state.vol_pct_change[coin][0]),
            'data': this.$store.state.data[subreddit][coin],
            'color': this.$store.state.colors[coin],
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

.table td {
  border: none
}
.table th {
  border: none
}

</style>
