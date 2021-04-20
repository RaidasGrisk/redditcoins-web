<template>
  <section>
    <div class="section container">
        <table class="table has-text-centered is-fullwidth" v-if="this.table_data_is_ready">
            <thead>
                <tr>
                    <th>Coin</th>
                    <th>Mentions</th>
                    <th class="is-hidden-mobile">Change</th>
                    <th>Mention chart</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in data" :key="item.id">
                    <td>
                      <div class="columns is-vcentered is-mobile">
                        <div class="column has-text-right" style="min-width: 64px">
                          <img :src="`/assets/crypto_icons/${item.coin.toLowerCase()}.png`">
                        </div>
                        <div class="column has-text-left">
                          {{ item.coin }}
                        </div>
                      </div>
                    </td>
                    <td>{{ item.mentions }}</td>
                    <td class="is-hidden-mobile" :class="item.change > 0 ? 'has-text-primary': 'has-text-danger'">
                      {{ item.change }}%
                    </td>
                    <td>
                      <trend
                          :data=item.data
                          gradientDirection="left"
                          :gradient="item.change > 0 ? ['#8338EC', '#8338EC', '#8338EC']: ['#FF1279', '#FF1279', '#FF1279']"
                          :padding="8"
                          :radius="8"
                          :stroke-width="5"
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
    {{this.$api_data.data_ready_flag}}
    {{this.is_data_available}}
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
        if (this.$api_data.api_resp_['cryptocurrency'][coin][0] > 0) {
          this.data.push({
            'coin': coin,
            'mentions': this.$api_data.api_resp_['cryptocurrency'][coin][0],
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
