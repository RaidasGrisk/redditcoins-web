<script setup>
import { ref, watch } from 'vue'
import { useThemeVars, useLoadingBar } from 'naive-ui'

let chartOptions = {
  chart: {
    stacked: false,
    toolbar: {
      show: true,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
        customIcons: []
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left'
  },
  xaxis: {
    labels: {
      style: {
        fontSize: '0px'
      }
    },
    lines: {
      show: true
    },
    categories: null
  },
  grid: {
    show: true,
    borderColor: '#90A4AE',
    strokeDashArray: 0,
    position: 'back',
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: false
      }
    },
    row: {
      colors: undefined,
      opacity: 0.5
    },
    column: {
      colors: undefined,
      opacity: 0.5
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
  },
}


const selectedCoins = ref([]) // multi select
const dataStore = ref({}) // cache fetched data
const data = ref([]) // data fed into the chart
const stacked = ref(false)
const isloading = ref(false)
const themeVars = useThemeVars()
const loadingBar = useLoadingBar()

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const getData = async (coin) => {

  isloading.value = true
  loadingBar.start()

  const url = 'https://redditcoins.app/api/volume/cryptocurrency/'
  let endDate = new Date().toISOString().slice(0, 10)
  let startDate = new Date()
  startDate.setDate(startDate.getDate() - 180)
  startDate = startDate.toISOString().slice(0, 10)

  const urlParams = `${coin}?start=${startDate}&end=${endDate}&ups=-999&submissions=true&comments=true&granularity=D`
  const response = await fetch(url + urlParams, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    }
  })
  let series = await response.json()
  series = series.data
  //
  // await sleep(500)
  // const series = [
  //   {
  //     "time": "2023-03-08",
  //     "volume": 10
  //   },
  //   {
  //     "time": "2023-03-07",
  //     "volume": 9
  //   },
  //   {
  //     "time": "2023-03-06",
  //     "volume": 29
  //   },
  //   {
  //     "time": "2023-03-05",
  //     "volume": 7
  //   },
  //   {
  //     "time": "2023-03-04",
  //     "volume": 18
  //   },
  //   {
  //     "time": "2023-03-03",
  //     "volume": 19
  //   },
  //   {
  //     "time": "2023-03-02",
  //     "volume": 24
  //   },
  //   {
  //     "time": "2023-03-01",
  //     "volume": 25
  //   },
  //   {
  //     "time": "2023-02-28",
  //     "volume": 15
  //   },
  //   {
  //     "time": "2023-02-27",
  //     "volume": 14
  //   },
  //   {
  //     "time": "2023-02-26",
  //     "volume": 17
  //   }
  // ]

  const time = series.map(item => item.time).reverse()
  const volume = series.map(item => item.volume).reverse()

  loadingBar.finish()
  isloading.value = false

  return [time, volume]

}

const updateData = async () => {

  const dataStoreCoins = Object.keys(dataStore.value)
  const chartCoins = data.value.map(item => item.name)

  // loop over the selected coins
  for (let coinIdx in selectedCoins.value) {
    let coin = selectedCoins.value[coinIdx]

    // fetch data if coin data not in dataStore
    if (!dataStoreCoins.includes(coin)) {
      const [time, volume] = await getData(coin)
      dataStore.value[coin] = {
        'name': coin,
        'volume': volume
      }
      // by default xaxis ticks are null
      // set this after the data fetch
      // this is maddness, but the only way it works
      // https://stackoverflow.com/a/73162215
      if (time) {
        if (!chartOptions.xaxis.categories) {
          chartOptions = { ...chartOptions, ...{
              xaxis: {... chartOptions.xaxis,
                categories: time
              }
            }
          }
        }
      }
    }

    // if coin was selected just now and
    // is not in the data array, push it
    if (!chartCoins.includes(coin)) {
      data.value.push({
        'name': coin,
        'data': dataStore.value[coin].volume,
      })
    }
  }

  // make sure the data is filtered out of coins
  // that are no longer selected
  data.value = data.value.filter(
    item => selectedCoins.value.includes(item.name)
  )
}

const props = defineProps({
  showModal: {type: Boolean, default: false},
  coinList: {type: Array, default: []},
  coin: {type: String, default: null},
})

// watch the showModal and fetch data if
// the modal is opened, not closed.
watch(() => props.showModal, async (current, previous) => {
  if (current && !previous) {
    if (!selectedCoins.value.includes(props.coin)) {
      selectedCoins.value.push(props.coin)
    }
    await updateData()
  }
})

</script>

<template>
  <n-modal :show="props.showModal" @update:show="$emit('update:showModal')">
    <n-card style="width: 45em; min-height: 33em;" title="Chart data" :bordered="true" size="huge">
      <template #header-extra>
        <n-spin size="small" :stroke="themeVars.infoColor" v-if="isloading" />
      </template>
      <n-select
        v-model:value="selectedCoins"
        multiple
        :options="props.coinList"
        placement="bottom-start"
        filterable
        :loading="isloading"
        @update:value="updateData"
        :disabled="isloading"
      />
      <apexchart
        type="area"
        :options="chartOptions"
        :series="data"
      />
      <n-switch
        v-model:value="stacked"
        @update:value="() => {
          chartOptions = {
            ... chartOptions,
            ...{
              chart: {
                ... chartOptions.chart,
                stacked: stacked
              }
            }
          }
        }"
      >
        <template #checked>
          Stacked
        </template>
        <template #unchecked>
          Un-stacked
        </template>
      </n-switch>
    </n-card>
  </n-modal>
</template>

<style scoped>
</style>
