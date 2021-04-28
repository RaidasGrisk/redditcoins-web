<template>
  <footer class="footer has-background-grey-darker is-size-7-mobile">
    <!-- style="border-top: 2px solid #F0F0F0;" -->
    <div class="container">
      <div class="content has-text-centered">
        <div class="section">
          <div class="content has-text-black">
            <b>Reddit coins</b><br>
          </div>
          <div class="content">
          </div>

          <div class="buttons is-centered">

              <a href="https://github.com/RaidasGrisk/reddit-coin-app" class="button is-black is-link" target="_blank">
                <span class="icon">
                  <img src="/assets/other_icons/GitHub-Mark-Light-64px.png" />
                </span>
              </a>

          </div>

          <!-- <div class="content has-text-info">
            Made with<br>
            <img src="/assets/other_icons/vue.png" alt="Logo" style="width:20px;"> &nbsp;
            <img src="/assets/other_icons/python.png" alt="Logo" style="width:24px;"> &nbsp;
            <img src="/assets/other_icons/postgre.png" alt="Logo" style="width:24px;"> &nbsp;
            <img src="/assets/other_icons/docker.png" alt="Logo" style="width:24px;"> <br>
            <img src="/assets/other_icons/gcp.png" alt="Logo" style="width:24px;"> &nbsp;
            <img src="/assets/other_icons/nginx.png" alt="Logo" style="width:20px;">
          </div> -->

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
