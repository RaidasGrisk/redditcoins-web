<template>
  <section class="hero">
    <div class="hero-body has-text-left">
      <div class="section container">

        <!-- <p class="title is-size-5 has-text-warning">
          In the past 24 hours <br>
        </p>
        <p class="title is-size-4 has-text-primary">
          Total reddit comments scanned: <label class="has-text-danger">10k</label> <br>
          UTC time of last hourly data: <label class="has-text-danger">2021-04-01 10:00:00</label>
        </p> <br> -->

        <!-- {{this.$store.state.raw_data}} -->
        <!-- {{this.$store.state.data}} -->
        <!-- {{this.$store.state.vol_order}} -->

        <div class="columns" v-if="this.$store.state.data_ready_flag">
          <div class="column">
            <statsCard
              :data="this.$store.state.data.cryptocurrency[this.$store.state.vol_order[0]]"
              title="Top volume 1st (1h)"
              :coin="this.$store.state.vol_order[0]"
              :pct_change="this.$store.state.vol_pct_change[this.$store.state.vol_order[0]].slice(-1)[0]"
              :last_value="this.$store.state.data.cryptocurrency[this.$store.state.vol_order[0]].slice(-1)[0]"
              :color="this.$store.state.colors[this.$store.state.vol_order[0]]"
            />
          </div>
          <div class="column">
            <statsCard
              :data="this.$store.state.data.cryptocurrency[this.$store.state.vol_order[1]]"
              title="Top volume 2nd (1h)"
              :coin="this.$store.state.vol_order[1]"
              :pct_change="this.$store.state.vol_pct_change[this.$store.state.vol_order[1]].slice(-1)[0]"
              :last_value="this.$store.state.data.cryptocurrency[this.$store.state.vol_order[1]].slice(-1)[0]"
              :color="this.$store.state.colors[this.$store.state.vol_order[1]]"
            />
          </div>
          <div class="column">
            <statsCard
              :data="this.$store.state.data.cryptocurrency[this.$store.state.pct_order_[0]]"
              title="Top % growth (1h)"
              :coin="this.$store.state.pct_order_[0]"
              :pct_change="this.$store.state.vol_pct_change[this.$store.state.pct_order_[0]].slice(-1)[0]"
              :last_value="this.$store.state.data.cryptocurrency[this.$store.state.pct_order_[0]].slice(-1)[0]"
              :color="this.$store.state.colors[this.$store.state.pct_order_[0]]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import statsCard from '@/components/statsCard'

export default {
  name: 'hero',
  components: {
    statsCard
  },
  data() {
    return {
      data_ready_flag: false
    }
  },
  methods: {
  },

  mounted () {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
