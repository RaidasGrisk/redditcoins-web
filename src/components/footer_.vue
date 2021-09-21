<template>
  <footer class="footer has-background-grey-darker is-size-7-mobile">
    <!-- style="border-top: 2px solid #F0F0F0;" -->
    <div class="container">
      <div class="content has-text-centered">
        <div class="section">
          <div class="content has-text-info">
            <b>Reddit coins<br> source code</b><br>
          </div>
          <div class="control">
            <div class="tags has-addons is-centered">
              <a class="tag is-black" href="https://github.com/RaidasGrisk/reddit-to-db" target="blank">reddit-to-db</a>
              <span class="tag is-black">
                <span class="icon">
                  <img src="@/assets/other_icons/GitHub-Mark-Light-64px.png" />
                </span>
              </span>
            </div>
          </div><br>
          <div class="control">
            <div class="tags has-addons is-centered">
              <a class="tag is-black" href="https://github.com/RaidasGrisk/reddit-coin-app" target="blank">backend-api</a>
              <span class="tag is-black">
                <span class="icon">
                  <img src="@/assets/other_icons/GitHub-Mark-Light-64px.png" />
                </span>
              </span>
            </div>
          </div><br>
            <div class="control is-centered">
              <div class="tags has-addons is-centered">
                <a class="tag is-black" href="https://github.com/RaidasGrisk/reddit-coin-web" target="blank">frontend</a>
                <span class="tag is-black">
                  <span class="icon">
                    <img src="@/assets/other_icons/GitHub-Mark-Light-64px.png" />
                  </span>
                </span>
              </div>
            </div>
        </div>
      </div>
      <div class="container">
        <div class="content has-text-centered">
          <div class="content has-text-info">
            <b>Contact if you want to chat</b><br>
            <a href="https://www.reddit.com/user/ioWxss6" target="blank" class="has-text-primary">
              u/ioWxss6
            </a><br>
            <a href="https://www.reddit.com/user/ioWxss6_bot" target="blank" class="has-text-primary">
              u/ioWxss6_bot
            </a>
          </div><br><br>
          <div class="content has-text-warning">
            <b>Donate if you want to <br>support the app </b><br>❤️
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-half">
            <donateCard/>
            <br><br>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

import donateCard from '@/components/donateCard'

export default {
  name: 'footer',
  components: {
    donateCard
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.footer {
  padding-bottom: 2rem;
}
</style>
