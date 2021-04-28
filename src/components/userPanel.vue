<template>
  <div class="section container pt-1 pb-6">
    <div class="columns">
      <div class="column is-one-third">
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
</template>

<script>

export default {
  name: 'userPanel',
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
