<template>
  <div>
    <navbar/>
    <transition name="fade" mode="out-in" appear>
      <hero/>
    </transition>
    <transition name="fade" mode="out-in" appear>
    <div style="transition-delay: 2s">
      <coinCards/>
      <coinTable/>
    </div>
    </transition>
    <footer_/>
  </div>
</template>

<script>
import navbar from './components/navbar.vue'
import hero from './components/hero.vue'
import coinTable from './components/coinTable.vue'
import coinCards from './components/coinCards.vue'
import footer_ from './components/footer_.vue'

export default {
  name: 'App',
  components: {
    navbar,
    hero,
    coinCards,
    coinTable,
    footer_,
  }
}
</script>

<style lang="scss">

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
// https://coolors.co/ffbe0b-fb5607-ff006e-8338ec-3a86ff
// https://coolors.co/
// https://colors.muz.li/
$primary: #05b169;
$success: #280756;
$info: #647cec;
$warning: #FFBE0B;
$danger: #fc6404;  // FB5607
$primary-invert: findColorInvert($primary);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert)
);

$size-7: 0.75rem;
$sizes: $size-1 $size-2 $size-3 $size-4 $size-5 $size-6 $size-7;


// Links
// $link: $primary;
// $link-invert: $primary-invert;
// $link-focus-border: $primary;
// Import Bulma
@import "~bulma";

::selection {
    color: #FFBE0B;
    background: black;
};

body {
  background-color: #f6f9fc;
}

 // fixing bug where spaced navbar extends screen
 // https://github.com/jgthms/bulma/issues/2845
 // fix is here because must import bulma scss
.hero {
  &.is-fullheight-with-spaced-navbar {
    @extend .is-fullheight-with-navbar;
    @include from($tablet) {
      min-height: calc(100vh - ( #{$navbar-height} + ( 2 * #{$navbar-padding-vertical} ) ) );
    }
  }
}

// transitions
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
