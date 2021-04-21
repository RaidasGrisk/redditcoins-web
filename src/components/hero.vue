<template>
  <section class="hero is-white">
    <div class="hero-body has-text-left">
      <div class="section container">

        <!-- <p class="title is-size-5 has-text-warning">
          In the past 24 hours <br>
        </p>
        <p class="title is-size-4 has-text-primary">
          Total reddit comments scanned: <label class="has-text-danger">10k</label> <br>
          UTC time of last hourly data: <label class="has-text-danger">2021-04-01 10:00:00</label>
        </p> <br> -->

        <div class="columns" v-if="this.data_ready_flag">

          <!-- {{this.$api_data.api_resp_}} -->
          <!-- {{this.$api_data.api_resp_}} -->
          <!-- {{this.$api_data.vol_order}} -->
          <!-- {{this.$api_data.pct_order}} -->

          <div class="column">
            <statsCard
              :data="this.$api_data.api_resp_.cryptocurrency[this.$api_data.vol_order[0]]"
              title="Top volume 1st (24h)"
              :coin="this.$api_data.vol_order[0]"
              :pct_change="this.$api_data.vol_pct_change[this.$api_data.vol_order[0]].slice(-1)[0]"
              :last_value="this.$api_data.api_resp_.cryptocurrency[this.$api_data.vol_order[0]].slice(-1)[0]"
            />
          </div>

          <div class="column">
            <statsCard
              :data="this.$api_data.api_resp_.cryptocurrency[this.$api_data.vol_order[1]]"
              title="Top volume 2nd (24h)"
              :coin="this.$api_data.vol_order[1]"
              :pct_change="this.$api_data.vol_pct_change[this.$api_data.vol_order[1]].slice(-1)[0]"
              :last_value="this.$api_data.api_resp_.cryptocurrency[this.$api_data.vol_order[1]].slice(-1)[0]"
            />
          </div>


            <div class="column">
              <statsCard
                :data="this.$api_data.api_resp_.cryptocurrency[this.$api_data.pct_order_[0]]"
                title="Top % growth (24h)"
                :coin="this.$api_data.pct_order_[0]"
                :pct_change="this.$api_data.vol_pct_change[this.$api_data.pct_order_[0]].slice(-1)[0]"
                :last_value="this.$api_data.api_resp_.cryptocurrency[this.$api_data.pct_order_[0]].slice(-1)[0]"
              />
            </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>

import statsCard from '@/components/statsCard'
import axios from 'axios'

export default {
  name: 'hero',
  components: {
    statsCard
  },
  data() {
    return {
      data_ready_flag: false,
    }
  },
  methods: {

    refactor_api_response() {

      let api_resp = this.$api_data.api_resp.data

      // get things that are same across all subs and coins
      // that is subreddits, coins and time
      let subreddits = Object.keys(api_resp)
      let coins = Object.keys(api_resp[subreddits[0]])

      api_resp[subreddits[0]][coins[0]]['data'].forEach(obj => {
        this.$api_data.time.push(obj['time'])
      })

      // reverse time
      // new then old -> old then new
      this.$api_data.time.reverse()

      // populate new refactor api response
      let data = new Object()
      subreddits.forEach((subreddit) => {
        data[subreddit] = {}
        coins.forEach((coin) => {
          data[subreddit][coin] = []
          api_resp[subreddit][coin]['data'].forEach((time_obj) => {
            data[subreddit][coin].push(time_obj['volume'])
          });

          // reverse volume
          // new then old -> old then new
          data[subreddit][coin].reverse()
        });
      });

      this.$api_data.api_resp_ = data
    },

    order_dict_by_val(obj) {
      // make an object with keys as coins and vals as last vol
      let vol_last = new Object()
      for (const [key, value] of Object.entries(obj)) {
        vol_last[key] = value.slice(-1)[0]
      }
      // sort by last vol
      let ordered = Object.keys(vol_last).sort(function(a, b) {
        return vol_last[b] - vol_last[a];
      })
      return ordered
    },

    get_volume_pct_changes() {
      for (const coin in this.$api_data.api_resp_.cryptocurrency) {
        let vals = this.$api_data.api_resp_.cryptocurrency[coin]
        let first = vals[0]
        let last = vals[vals.length - 1]
        let pct_change = Math.round((last / first - 1) * 100)
        this.$api_data.vol_pct_change[coin] = [pct_change]
        if (first > 1 && last > 1) {
          this.$api_data.vol_pct_change_[coin] = [pct_change]
        }
      }
    }

  },

  mounted () {
    axios
      .get('http://34.72.38.207/volume/market_summary')
      .then(response => {
        this.$api_data.api_resp = response
        this.refactor_api_response()
        this.get_volume_pct_changes()
        this.$api_data.vol_order = this.order_dict_by_val(this.$api_data.api_resp_.cryptocurrency)
        // vol_pct_change is for pct change in all coins
        // vol_pct_change_ is for pct change for coins with > x mentions
        this.$api_data.pct_order = this.order_dict_by_val(this.$api_data.vol_pct_change)
        this.$api_data.pct_order_ = this.order_dict_by_val(this.$api_data.vol_pct_change_)
        this.$api_data.data_ready_flag = true
        this.data_ready_flag = true
      })


  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
