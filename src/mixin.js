import * as Vibrant from 'node-vibrant'

// global mixin
export default {
  name: 'mixins',
  components: [Vibrant],
  data() {
    return {
    }
  },

  methods: {

    get_api_data_time_array(data) {
      // get things that are same across all subs and coins
      // that is subreddits, coins and time
      let time = []
      let subreddits = Object.keys(data)
      let coins = Object.keys(data[subreddits[0]])
      data[subreddits[0]][coins[0]]['data'].forEach(obj => {
        time.push(obj['time'])
      })

      // reverse time
      // new then old -> old then new
      return time.reverse()
    },

    refactor_api_response(raw_data) {

      // get things that are same across all subs and coins
      // that is subreddits, coins and time
      let subreddits = Object.keys(raw_data)
      let coins = Object.keys(raw_data[subreddits[0]])

      // populate new refactor api response
      let new_data = new Object()
      subreddits.forEach((subreddit) => {
        new_data[subreddit] = {}
        coins.forEach((coin) => {
          new_data[subreddit][coin] = []
          raw_data[subreddit][coin]['data'].forEach((time_obj) => {
            new_data[subreddit][coin].push(time_obj['volume'])
          });
          // reverse volume
          // new then old -> old then new
          new_data[subreddit][coin].reverse()
        })
      })
      return new_data
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

    get_volume_pct_changes(data_subreddit, threshold = 1) {
      let pct_change = {}
      let pct_change_ = {}
      for (const coin in data_subreddit) {
        let vals = data_subreddit[coin]
        let last = vals[vals.length - 1]
        // let last = vals[vals.length - 1]
        let prev_to_last = vals[vals.length - 2]
        let change = Math.round((last / prev_to_last - 1) * 100)
        // console.log(data_subreddit[coin], last, prev_to_last, change)
        pct_change[coin] = [change]
        if (last > threshold && prev_to_last > threshold) {
          pct_change_[coin] = [change]
        }
      }
      return [pct_change, pct_change_]
    },

    get_dominant_color_from_logos(data_subreddit) {
      let colors = {}
      for (const coin in data_subreddit) {
        let path = `/assets/crypto_icons/${coin.toLowerCase()}.png`
        Vibrant.from(path).getPalette((err, palette) => {
          try {
            colors[coin] = palette.Vibrant.hex
          } catch (err) {
            colors[coin] = '#4a4a4a'
            // console.log(`${coin} failed to fetch dominant color. There's no logo.png`)
          }

        })
      }
      return colors
    }

  },

  mounted() {
  }
}
