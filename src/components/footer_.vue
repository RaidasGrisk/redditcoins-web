<template>
  <footer class="footer has-background-grey-darker is-size-7-mobile">
    <!-- style="border-top: 2px solid #F0F0F0;" -->
    <div class="container">
      <div class="content has-text-centered">
        <div class="section">
          <div class="content has-text-black">
            <b>Reddit coins</b><br>
          </div>
          <div class="control">
            <div class="tags has-addons is-centered">
              <a class="tag is-black" href="https://github.com/RaidasGrisk/reddit-to-db">reddit-to-db</a>
              <span class="tag is-black">
                <span class="icon">
                  <img src="@/assets/other_icons/GitHub-Mark-Light-64px.png" />
                </span>
              </span>
            </div>
          </div><br>
          <div class="control">
            <div class="tags has-addons is-centered">
              <a class="tag is-black" href="https://github.com/RaidasGrisk/reddit-coin-app">backend-api</a>
              <span class="tag is-black">
                <span class="icon">
                  <img src="@/assets/other_icons/GitHub-Mark-Light-64px.png" />
                </span>
              </span>
            </div>
          </div><br>
            <div class="control is-centered">
              <div class="tags has-addons is-centered">
                <a class="tag is-black" href="https://github.com/RaidasGrisk/reddit-coin-web">frontend</a>
                <span class="tag is-black">
                  <span class="icon">
                    <img src="@/assets/other_icons/GitHub-Mark-Light-64px.png" />
                  </span>
                </span>
              </div>
            </div><br>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer',
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
