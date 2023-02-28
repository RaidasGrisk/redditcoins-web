<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useThemeVars, useLoadingBar } from 'naive-ui'

import { Chart, registerables } from 'chart.js'
import { LineChart } from 'vue-chart-3'

import chartOptions from './chartOptions.json'
import cryptoColors from './cryptoColors.json'

import data_ from './data.json'

// get coin logos. All this is because need to render something
// if the logo does not exists in assets/crypto_logos/*.png
// https://vitejs.dev/guide/features.html#glob-import
const imagesUrl = import.meta.glob("../assets/crypto_logos/*.(png|PNG)", { as: 'url', eager: true })
const getImageUrl = (coin) => {
  let coin_path = `../assets/crypto_logos/${coin}.png`
  let coin_path_default = '/src/assets/crypto_logos/default.png'
  return coin_path in imagesUrl ? imagesUrl[coin_path] : coin_path_default
}

// chart
Chart.register(...registerables);

const data = ref()
const themeVars = useThemeVars()
const loadingBar = useLoadingBar()
const store = useStore()

// modal stuff
const modalChartOptions = JSON.parse(JSON.stringify(chartOptions))
const showModal = ref(false)
const selectedCoin = ref()

const getData = async () => {
  const url = 'https://redditcoins.app/api/volume/market_summary?gran=daily'
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}

const refactorData = (data) => {
  data = data.cryptocurrency
  const data_ = []
  for (const coin in data) {
    let mentions = data[coin].data.map(item => item.volume).reverse()
    let time = data[coin].data.map(item => item.time).reverse()
    const color = coin in cryptoColors ? cryptoColors[coin] : themeVars.value.tagColor
    if (mentions.at(-1) > 0) {
      data_.push({
        'coin': coin,
        'mentions': mentions.at(-1),
        'change': `${Math.round((mentions.at(-1) / mentions.at(-2) - 1) * 100)}%`,
        'chart': getChartData(mentions, time, color)
      })
    }
    // sort by mentions
    data_.sort((a, b) => b.mentions - a.mentions);
  }
  return data_
}

const getChartData = (mentions, time, color) => {
  return {
    labels: time,
    datasets: [
      {
        data: mentions,
        backgroundColor: [color],
        borderColor: [color],
        pointRadius: 0,
      },
    ],

  }
}

const openModal = (coin) => {
  selectedCoin.value = coin
  showModal.value = true
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

onMounted( async() => {
  loadingBar.start()
  await sleep(50)
  data.value = refactorData(data_) //refactorData(await getData())
  loadingBar.finish()
})

</script>

<template>
  <n-card style="max-width: 28em;" class="center">
    <n-text :depth="3">
      <n-grid cols="5">
        <n-grid-item>
        </n-grid-item>
         <n-grid-item>
           <b>COIN</b>
         </n-grid-item>
         <n-grid-item>
           <b>COUNT</b>
         </n-grid-item>
         <n-grid-item>
           <b>CHANGE</b>
         </n-grid-item>
         <n-grid-item>
           <b>TREND</b>
         </n-grid-item>
       </n-grid>
     </n-text>
     <br>
     <div v-if="data">
      <div v-for="item in data">
        <n-grid cols="5" class="row center-vertical" @click="openModal(item.coin)">
          <n-grid-item>
            <img :src="getImageUrl(item.coin.toLowerCase())" style="position: relative; top: 3px"/>
          </n-grid-item>
           <n-grid-item>
             {{ item.coin }}
           </n-grid-item>
           <n-grid-item>
             {{ item.mentions }}
           </n-grid-item>
           <n-grid-item>
             {{ item.change }}
           </n-grid-item>
           <n-grid-item style="position: relative; top: 6px">
             <LineChart :chartData="item.chart" :width="64" :height="42" :options="chartOptions" />
           </n-grid-item>
         </n-grid>
       </div>
    </div>
    <div v-else>
      <div v-for="_ in Array(20).fill(0)">
        <n-space justify="center" style="padding-bottom: 12px;">
          <n-skeleton circle :width="32" size="small" />
          <n-skeleton :width="46" :height="28" :sharp="false" size="small" />
          <n-skeleton :width="46" :height="28" :sharp="false" size="small" />
          <n-skeleton :width="46" :height="28" :sharp="false" size="small" />
          <n-skeleton :width="96" :height="28" :sharp="false" size="small" />
        </n-space>
      </div>
    </div>
  </n-card>

  <n-modal v-model:show="showModal">
    <n-card style="width: 35em" title="Modal" :bordered="true">
      <LineChart :chartData="data.find(i => i.coin == selectedCoin).chart" :width="512" :height="465" :options="modalChartOptions" />
    </n-card>
  </n-modal>

</template>

<style>

.center {
  margin: auto;
  width: 100%;
}

.center-vertical {
  display: flex;
  justify-content: center;
  align-items: center;
}

.row {
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s;
}

.row:hover {
  padding: 0.5em 0em 0.5em 0em;
  background-color: v-bind(themeVars.closeColorHover);
  transition: 0.2s;
}

</style>
