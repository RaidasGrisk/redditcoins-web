<script setup>
import { ref, onMounted } from 'vue'
import { useThemeVars } from 'naive-ui'
import { LineChart } from 'vue-chart-3'

import chartOptions from './chartOptions.json'

const props = defineProps({
  data: {type: Array, default: []},
  loading: {type: Boolean, default: false},
})

const emits = defineEmits(['cardClick'])

</script>

<template>
  <n-space justify="center">
    <div v-for="item in props.data" >
      <n-card :title="item.coin" @click="$emit('cardClick', item.coin)">
        <img :src="item.imageUrl" style="position: relative; top: 3px"/>
        mentions
        {{ item.mentions }}
        change
        {{ item.change }}
        <LineChart :chartData="item.chart" :width="64" :height="42" :options="chartOptions" />
      </n-card>
    </div>
  </n-space>
  {{ props.data }}
  {{ props.loading }}
</template>

<style scoped>
</style>
