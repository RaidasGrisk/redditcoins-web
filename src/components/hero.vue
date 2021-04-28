<template>
  <section class="hero is-medium is-gray">
    <div class="hero-body">
      <div class="section container">
        <div class="columns">
          <div class="column is-one-third">

            <div class="title is-size-1 is-size-2-mobile has-text-info">
              Hi, 👋
            </div>
            <div class="subtitle is-size-3 is-size-4-mobile has-text-info">
              I track coin mentions on
              <a href="https://www.reddit.com/r/CryptoCurrency/" target="blank" class="has-text-danger">
                <div class="columns is-gapless is-vcentered is-mobile">
                  <div class="column is-1" style="min-width: 46px">
                    <img src="/assets/other_icons/reddit_cryptocurrency.png" style="width:36px;height:36px;">
                  </div>
                  <div class="column has-text-left is-size-3 is-size-4-mobile">
                    r/CryptoCurrency
                  </div>
                </div>
              </a>
            </div>
            <br>
            <!-- <div class="title is-size-6 is-size-7-mobile has-text-warning">
              I manage a database with all subreddit entries
              and count the number of times a coin is mentioned.
            </div> -->

            <div class="card">
              <div class="card-content has-background-white">
                <!-- <p class="title">
                  “There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”
                </p> -->
                <div class="subtitle">
                  <div class="buttons are-small is-left">
                    <button
                      class="button is-info is-outlined"
                      :class="[{'is-loading is-disabled': this.$store.getters.isLoading}, {'is-focused': this.highlight_hourly}]"
                      v-on:click="this.getHourlyData">
                      Hourly
                    </button>
                    <button
                      class="button is-info is-outlined"
                      :class="[{'is-loading is-disabled': this.$store.getters.isLoading}, {'is-focused': this.highlight_daily}]"
                      v-on:click="this.getDailyData">
                      Daily
                    </button>
                  </div>
                  <div class="has-text-left is-size-6 is-size-7-mobile">
                    Last data-point on display
                    <div class="has-text-weight-bold">
                      {{ this.$store.state.last_date }}
                    </div>
                  </div>
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


export default {
  name: 'hero',
  components: {

  },
  data() {
    return {
      table_data_created: false,
      highlight_hourly: true,
      highlight_daily: false,
    }
  },
  methods: {

    getHourlyData() {
      this.$store.dispatch('loadData', {gran: 'hourly'})
      this.highlight_daily = false
      this.highlight_hourly = true
    },

    getDailyData() {
      this.$store.dispatch('loadData', {gran: 'daily'})
      this.highlight_hourly = false
      this.highlight_daily = true
    },
  },

  mounted () {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
