<template>
  <section class="hero is-medium is-gray">
    <div class="hero-body pb-0">
      <div class="section container pb-0">
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
                    <img src="@/assets/other_icons/reddit_cryptocurrency.png" style="width:36px;height:36px;">
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
