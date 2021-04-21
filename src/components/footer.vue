<template>
  <footer class="footer has-background-primary">
    <!-- style="border-top: 2px solid #F0F0F0;" -->
    <div class="container">
      <div class="content has-text-centered has-text-white-ter is-size-7">
        <div class="section">
          <div class="content has-text-success">
            <b>Reddit coins</b><br>
          </div>
          <div class="content">
          </div>

          <div class="buttons is-centered">

              <a href="https://twitter.com/raidasg" class="button is-success is-link" target="_blank">
                <span class="icon">
                  <font-awesome-icon :icon="['fab', 'twitter']" />
                </span>
              </a>

              <a href="https://github.com/RaidasGrisk/namespy" class="button is-success is-link" target="_blank">
                <span class="icon">
                  <font-awesome-icon :icon="['fab', 'github']" />
                </span>
              </a>

          </div>

          <div class="content has-text-black-ter">
            Made with<br>
            <img src="/assets/other_icons/vue.png" alt="Logo" style="width:20px;"> &nbsp;
            <img src="/assets/other_icons/python.png" alt="Logo" style="width:24px;"> &nbsp;
            <img src="/assets/other_icons/postgre.png" alt="Logo" style="width:24px;"> &nbsp;
            <img src="/assets/other_icons/docker.png" alt="Logo" style="width:24px;"> <br>
            <img src="/assets/other_icons/gcp.png" alt="Logo" style="width:24px;"> &nbsp;
            <img src="/assets/other_icons/nginx.png" alt="Logo" style="width:20px;">
          </div>

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
