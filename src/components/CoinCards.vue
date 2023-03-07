<script setup>
import { ref, onMounted } from 'vue'
import { useThemeVars } from 'naive-ui'
import { LineChart } from 'vue-chart-3'

import chartOptions from './chartOptions.json'

const themeVars = useThemeVars()
const props = defineProps({
  titles: {type: Array, default: [
    '1st by mentions',
    '2nd by mentions',
    'Top by % growth'
  ]},
  title_emojis: {type: Array, default: ['🥇', '🥈', '🏆']},
  data: {type: Array, default: []},
  loading: {type: Boolean, default: false},
})

const emits = defineEmits(['cardClick'])

const headerStyle = {
  'padding': '1em 1em 1em 1em',
  'font-size': '1.2em'
}

const contentStyle = {
  'padding': '1em 1em 0em 1em',
}

</script>

<template>
  <n-space justify="center">
    <n-grid :x-gap="12" :y-gap="12" cols="1 s:2 m:3 l:3 xl:3 2xl:3" responsive="screen">
      <n-grid-item v-for="(item, index) in props.data">
        <n-card
          v-if="item"
          class="card"
          style="min-width: 22em; border-radius: 8px;"
          @click="$emit('cardClick', item.coin)"
          size="large"
          :segmented="{content: true}"
          :header-style="headerStyle"
          :content-style="contentStyle"
          :hoverable="false"
        >
          <template #header>
            <n-tag round :bordered="false">
              {{ props.title_emojis[index] }}
            </n-tag>
            {{ props.titles[index] }}
          </template>
          <n-space justify="space-between">
            <img :src="item.imageUrl" style="position: relative; top: 15px; left: 6px"/>
            <n-space align="baseline" :size="[0, 0]" vertical style="position: relative; left: -15px">
              <n-h3 style="position: relative; top: 2px;">
                {{ item.coin }}
              </n-h3>
              <div style="position: relative; top: -15px;">
                <n-tag
                  :style="item.change > 0 ? 'color: ' + themeVars.successColor: 'color:' + themeVars.errorColor"
                  size="small"
                  :bordered="false"
                  round
                >
                  {{ item.change }}%
                </n-tag>
              </div>
            </n-space>
            <n-space vertical>
              <n-text :depth="3" style="position: relative; float: right; top: 3px;">
                {{ item.mentions }} mentions
              </n-text>
              <div style="position: relative; float: right;">
                <LineChart :chartData="item.chart" :width="128" :height="52" :options="chartOptions" />
              </div>
            </n-space>
          </n-space>
        </n-card>
        <n-card
          v-else
          class="card"
          style="min-width: 22em; border-radius: 8px;"
          size="large"
          :segmented="{content: true}"
          :header-style="headerStyle"
          :content-style="contentStyle"
          hoverable
        >
        <template #header>
          <n-tag round :bordered="false">
            {{ props.title_emojis[index] }}
          </n-tag>
          {{ props.titles[index] }}
        </template>
        <n-skeleton height="71px" width="100%" :sharp="false" style="margin-bottom: 12px;"/>
      </n-card>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<style scoped>
.card {
  cursor: pointer;
  transition: 0.2s;
}
.card:hover {
  padding: 0.5em 0em 0.5em 0em;
  background-color: v-bind(themeVars.closeColorHover)
}
</style>
