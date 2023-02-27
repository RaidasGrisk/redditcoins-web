<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { Chart, registerables } from "chart.js";
import { useIsMobile } from './utils'

import header_ from './components/header_.vue'
import footer_ from './components/footer_.vue'
import Intro from './components/Intro.vue'
import ChartTable from './components/ChartTable.vue'

Chart.register(...registerables);
Chart.defaults.font.size = 10
Chart.defaults.font.family = '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

const isMobile = useIsMobile()
const store = useStore()

const logoClick = async () => {
  console.log('hello')
}

</script>

<template>
  <n-config-provider :theme="store.getters['theme/getTheme']" :theme-overrides="store.getters['theme/getThemeOverrides']">
    <n-notification-provider>
      <n-loading-bar-provider>
        <n-layout>
          <header_ @logoClick="logoClick" />
          <n-layout-content :content-style="isMobile ? 'padding: 0.5em 1em 0.5em 1em;': 'padding: 5em 1em 5em 1em; max-width: 125vh; margin: 0 auto;'">
            <Intro />
            <br>
            <n-divider />
            <br>
            <ChartTable />
          </n-layout-content>
        </n-layout>
        <n-layout-footer bordered>
          <footer_ />
        </n-layout-footer>
      </n-loading-bar-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
