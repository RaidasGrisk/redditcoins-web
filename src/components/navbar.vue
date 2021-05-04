<template>
  <div>
    <nav class="navbar has-background-black is-spaced">
      <div class="container">
        <div class="navbar-brand">
          <!-- <a class="navbar-item" href="/">
              <img src="../assets/logo-no-bg.png" style="max-width:150px; max-height:80px;">
          </a> -->
          <div class="navbar-burger"
          @click="showNav = !showNav"
          :class="{ 'is-active': showNav }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': showNav }">
          <div class="navbar-start" style="padding-left: 18px">
            <a class="navbar-item has-text-info is-size-5" href="https://redditcoins.app/api/docs">
              API docs
            </a>
            <a class="navbar-item has-text-info is-size-5" @click="showDonateModal = true">
              Donate
            </a>
          </div>
        </div>
      </div>
    </nav>
    <!-- Navbar modals-->
    <modal v-if="showDonateModal" @close="showDonateModal = false">
      <div class="card">
        <div class="card-content">
          <div class="content is-size-7-mobile">
            <b>ETH address:</b><br> 0xd2dC502eE91a5A167C91dB1571923D3AA168C5CE <br><br>
            <b>BTC address:</b><br> 1NLZU3UfYbC4hT4ayJc9n78e679khxFybJ
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>

import modal from '@/components/modal'

export default {
  name: 'navbar',
  components: {
    modal
  },

  data() {
    return {
      showNav: false,
      showDonateModal: false
    }
  },

  methods: {
    close() {
      this.showNav = false
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
