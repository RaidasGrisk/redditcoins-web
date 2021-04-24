import axios from 'axios'

// global mixin
export default {
  name: 'mixins',
  data() {
    return {
      // flag to indicate that the data is ready
      data_ready_flag: false,
      // raw api output
      api_resp: null,
      // refactored api outpu
      api_resp_: null,
      // array with coins orderd by last vol
      vol_order: [],
      // array with coins orderd by last vol (read below)
      vol_order_: [],
      // keys are coins values are [pct_change_over_whole_period]
      vol_pct_change: {},
      // same but excluding coins with vol lower than 1
      vol_pct_change_: {},
      // array with time
      time: []
    }
  },

  methods: {

    refactor_api_response() {

      let api_resp = this.api_resp.data

      // get things that are same across all subs and coins
      // that is subreddits, coins and time
      let subreddits = Object.keys(api_resp)
      let coins = Object.keys(api_resp[subreddits[0]])
      api_resp[subreddits[0]][coins[0]]['data'].forEach(obj => {
        this.time.push(obj['time'])
      })

      // reverse time
      // new then old -> old then new
      this.time.reverse()

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
      this.api_resp_ = data
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
      for (const coin in this.api_resp_.cryptocurrency) {
        let vals = this.api_resp_.cryptocurrency[coin]
        let first = vals[0]
        let last = vals[vals.length - 1]
        let pct_change = Math.round((last / first - 1) * 100)
        this.vol_pct_change[coin] = [pct_change]
        if (first >= 1 && last >= 1) {
          this.vol_pct_change_[coin] = [pct_change]
        }
      }
    }

  },

  mounted() {
    axios
      .get(this.$backendServer)
      .then(response => {
        this.api_resp = response
        this.refactor_api_response()
        this.get_volume_pct_changes()
        this.vol_order = this.order_dict_by_val(this.api_resp_.cryptocurrency)
        this.pct_order = this.order_dict_by_val(this.vol_pct_change)
        this.pct_order_ = this.order_dict_by_val(this.vol_pct_change_)
        this.data_ready_flag = true
      })
  }
}
