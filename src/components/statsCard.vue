<template>
  <div class="box is-clickable disable-select">
    <p class="has-text-weight-bold">
      <span v-html="title"></span>
      <!-- {{title}} -->
    </p>
    <div class="columns is-gapless is-vcentered is-mobile">
      <div class="column is-2 has-text-left mr-2">
        <img :src="this.coin_logo_url">
      </div>
      <div class="column has-text-left is-size-7-mobile">
        <!-- https://cryptoicons.org/ -->
          {{coin}} <br>
        <div :class="pct_change >= 0 ? 'has-text-primary': 'has-text-danger'" class="is-size-7-mobile">
          {{pct_change}} %
        </div>
      </div>
      <div class="column has-text-right is-size-7-mobile">
        {{last_value}} mentions <br>
        <trend
            :data="data"
            gradientDirection="left"
            :gradient="[color, color, color]"
            :padding="8"
            :radius="20"
            :stroke-width="5"
            stroke-linecap="butt"
            :auto-draw="true"
            :autoDrawDuration="3000"
            smooth>
        </trend>
      </div>
    </div>
  </div>
</template>

<script>

import Trend from 'vuetrend';

export default {
  name: 'statsCard',

  components: {
    Trend
  },

  props: {
    data: Array,
    title: String,
    coin: String,
    pct_change: Number,
    last_value: Number,
    color: String
  },

  data() {
    return {
      // https://cryptoicons.org/
      // coin_logo_url: `https://cryptoicons.org/api/color/${this.coin.toLowerCase()}/30`
      // coin_logo_url: `/assets/crypto_icons/${this.coin.toLowerCase()}.png`,
      // is_up: this.pct_change >= 0
    }
  },

  computed: {
    coin_logo_url() {
      return `/assets/crypto_icons/${this.coin.toLowerCase()}.png`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.box:hover{
  background-color:lightgray;
}

.disable-select {
    user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
}

</style>
