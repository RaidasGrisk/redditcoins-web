<template>
  <section>
    <div class="section container">

      <p class="title has-text-primary">
        <!-- Coin table -->
      </p>

      <table class="table is-hoverable has-text-right is-fullwidth" v-if="this.table_data_is_ready">
          <thead>
              <tr>
                  <th class="has-text-weight-light has-text-left">Coin</th>
                  <th class="has-text-weight-light">Mentions</th>
                  <th class="has-text-weight-light">Change</th>
                  <th class="has-text-weight-light">Mention chart</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item) in data" :key="item.id">
                  <td>
                    <div class="columns is-vcentered is-mobile">
                      <div class="column is-1 has-text-left">
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
                  <!-- This or the cart will not allign properly -->
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
                  <!-- and so on -->
              </tr>
          </tbody>
      </table>
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
      data: [],
      table_data_is_ready: false,
      imgError: true
    }
  },
  methods: {
    create_table_data() {
      this.$api_data.vol_order.forEach((coin) => {
        let last_val = this.$api_data.api_resp_['cryptocurrency'][coin].slice(-1)[0]
        if (last_val > 1) {
          this.data.push({
            'coin': coin,
            'mentions': last_val,
            'change': this.$api_data.vol_pct_change[coin][0],
            'data': this.$api_data.api_resp_['cryptocurrency'][coin]
          })
        }
      })
    },

    onImgError() {
			this.imgError = true;
		},

		imageUrl(coin) {
      let path = `@/assets/crypto_icons/${coin.toLowerCase()}.png`
      let default_path = `@/assets/crypto_icons/btc.png`
			return path ? default_path : path
		}

  },

  computed: {
    is_data_available() {
      return this.$api_data.data_ready_flag
    }
  },

  // watch: {
  //   table_data_is_ready: function() {
  //     this.create_table_data()
  //   }
  // },

  // WTH? how to track golbal var?
  // I dont know, so just a delay
  // this is bad, must be fixed
  mounted() {
    const vm = this
    setTimeout(function () {
      vm.create_table_data()
      vm.table_data_is_ready = true
    }, 3000)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
