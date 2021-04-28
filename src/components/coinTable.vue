<template>
  <section>
    <div class="section container">
<!--
      <div class="columns is-centered is-size-7-mobile" v-if="this.$store.state.data_ready_flag">
        <div class="column is-full is-full-tablet is-two-fifths-desktop">

          <div class="column has-text-right">
            <a class="button is-success is-light" target="_blank" v-on:click="this.buttonclick">
              Hourly
            </a>
            <a class="button is-link is-light" target="_blank">
              Daily
            </a>
          </div>

          <div class="box is-clickable disable-select has-text-weight-medium">
            <div class="columns is-vcentered is-mobile">
              <div class="column is-narrow has-text-left">
                Coin
              </div>
              <div class="column has-text-left">
              </div>
              <div class="column is-narrow has-text-right">
                Mentions
              </div>
              <div class="column is-narrow has-text-right">
                Change
              </div>
              <div class="column has-text-right is-2-mobile is-2-tablet is-2-desktop is-2-widescreen is-2-fullhd">
                Trend
              </div>
            </div>
          </div>

          <div class="box is-clickable disable-select">

            <div v-for="(item) in this.get_table_data" :key="item.id">

              <div class="columns is-vcentered is-mobile">
                <div class="column is-narrow has-text-left">
                  <img :src="`/assets/crypto_icons/${item.coin.toLowerCase()}.png`">
                </div>
                <div class="column has-text-left" style="min-width: 45px">
                  {{ item.coin }}
                </div>
                <div class="column is-narrow has-text-right" style="min-width: 45px">
                  {{ item.mentions }}
                </div>
                <div class="column is-narrow has-text-right" :class="item.change > 0 ? 'has-text-primary': 'has-text-danger'" style="min-width: 65px">
                  {{ item.change }}%
                </div>
                <div class="column has-text-right is-3-mobile is-2-tablet is-2-desktop is-2-widescreen is-2-fullhd">

                    <trend
                        :data=item.data
                        gradientDirection="left"
                        :gradient="[item.color, item.color, item.color]"
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
      </div> -->

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
                  <th class="has-text-right">Trend</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item) in this.get_table_data" :key="item.id">
                  <td class="is-vcentered">
                    <img :src="`/assets/crypto_icons/${item.coin.toLowerCase()}.png`">
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
                        :autoDrawDuration="3000"
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

    isMobile() {
      if(/Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },

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
