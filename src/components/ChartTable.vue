<script setup>
import { ref, onMounted } from 'vue'
import CoinCards from './CoinCards.vue'
import ApexChart from './ApexChart.vue'
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
  let coin_path_default = '../assets/crypto_logos/default.png'
  return coin_path in imagesUrl ? imagesUrl[coin_path] : imagesUrl[coin_path_default]
}

// chart
Chart.register(...registerables);

const data = ref([])
const gran = ref('daily')
const isloading = ref(true)
const themeVars = useThemeVars()
const loadingBar = useLoadingBar()

// modal stuff
const modalChartOptions = JSON.parse(JSON.stringify(chartOptions))
const showModal = ref(false)
const selectedCoin = ref()

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const getData = async () => {
  isloading.value = true
  loadingBar.start()
  data.value = []
  data.value = refactorData(await getData_())
  await sleep(1)
  loadingBar.finish()
  isloading.value = false
}

const getData_ = async () => {

  const url = `https://api-y7sbigyecq-uc.a.run.app/volume_market_summary?gran=${gran.value}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const response_ = await response.json()
  return response_
}

const refactorData = (data) => {
  const data_ = []
  for (const coin in data) {
    let mentions = data[coin].map(item => item.volume)
    let time = data[coin].map(item => item.time)
    const color = coin in cryptoColors ? cryptoColors[coin] : themeVars.value.tagColor
    if (mentions.at(-1) > 0) {
      data_.push({
        'coin': coin,
        'mentions': mentions.at(-1),
        'change': Math.round((mentions.at(-1) / mentions.at(-2) - 1) * 100),
        'chart': getChartData(mentions, time, color),
        'imageUrl': getImageUrl(coin.toLowerCase())
      })
    }
    // sort by mentions
    data_.sort((a, b) => b.mentions - a.mentions)
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

onMounted( async() => {
  await getData()
})

</script>

<template>

  <n-space vertical class="center-vertical">
      <n-space>
        <n-button
          strong secondary
          :loading="gran == 'daily' ? isloading: false"
          :type="gran == 'daily' ? 'info' : 'tertiary'"
          @click="(gran == 'daily') ? '' : (gran = 'daily', getData())"
        >Daily</n-button>
        <n-button
          strong secondary
          :loading="gran == 'hourly' ? isloading: false"
          :type="gran == 'hourly' ? 'info' : 'tertiary'"
          @click="(gran == 'hourly') ? '' : (gran = 'hourly', getData())"
        >Hourly</n-button>
      </n-space>
      <div v-if="data.length">
        <n-text :depth="3">
          {{ data[0].chart.labels.at(-1) }} UTC
        </n-text>
      </div>
      <div v-else>
        <n-skeleton :width="96" :height="20" :sharp="false" size="small" />
      </div>
  </n-space>
  <br><br>

  <CoinCards
    :data="!isloading ? [
        data.at(0),
        data.at(1),
        data.filter(a => isFinite(a.change)).reduce((a, b) => (a.change > b.change) ? a : b)
      ] : [null, null, null]"
    @cardClick="(coin) => openModal(coin)"
  />

  <br><br><br>

  <n-card style="max-width: 28em; border-radius: 8px;" class="center">
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
     <div v-if="data.length">
      <div v-for="item in data">
        <n-grid cols="5" class="row center-vertical" @click="openModal(item.coin)">
          <n-grid-item>
            <img :src="item.imageUrl" style="position: relative; top: 3px"/>
          </n-grid-item>
           <n-grid-item>
             {{ item.coin }}
           </n-grid-item>
           <n-grid-item>
             <n-number-animation
                :from="0"
                :to="item.mentions"
                :active="true"
                :precision="0"
              />
           </n-grid-item>
           <n-grid-item>
             <div :style="item.change > 0 ? 'color: ' + themeVars.successColor: 'color:' + themeVars.errorColor">
               <n-number-animation
                  :from="0"
                  :to="item.change"
                  :active="true"
                  :precision="0"
                />%
            </div>
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

  <ApexChart
    :coinList="data.map(item => {return {label: item.coin, value: item.coin}})"
    :showModal="showModal"
    @update:showModal="showModal = !showModal"
    :coin="selectedCoin"
  />

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
