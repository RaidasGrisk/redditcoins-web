<template>
  <nav class="navbar is-black is-spaced">
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
        <div class="navbar-start" style="padding-left: 1.4rem">
          <a class="navbar-item has-text-primary is-size-5">
            Page1
          </a>
          <a class="navbar-item has-text-primary is-size-5">
            Page2
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// import modal from './modal.vue'
// import people from './people.vue'
// import clients from './clients.vue'
export default {
  name: 'navbar',
  components: {

  },

  data() {
    return {
      showNav: false,
    }
  },

  methods: {
    close() {
      this.showNav = false
    }
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
