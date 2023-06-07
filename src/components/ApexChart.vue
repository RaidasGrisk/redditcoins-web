<script setup>
import { ref, watch } from 'vue'
import { useThemeVars, useLoadingBar } from 'naive-ui'
import { useStore } from 'vuex'

let chartOptions = {
  theme: {
    mode: 'light',
  },
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
    horizontalAlign: 'left',
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
  tooltip: {
    theme: 'dark',
  },
}


const selectedCoins = ref([]) // multi select
const dataStore = ref({}) // cache fetched data
const data = ref([]) // data fed into the chart
const stacked = ref(false)
const isloading = ref(false)
const themeVars = useThemeVars()
const loadingBar = useLoadingBar()
const store = useStore()

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const getData = async (coin) => {

  isloading.value = true
  loadingBar.start()

  let year, month, day, hours, minutes, seconds

  const url = 'https://api-y7sbigyecq-uc.a.run.app/volume/'
  let endDate = new Date()

  year = endDate.getUTCFullYear();
  month = String(endDate.getUTCMonth() + 1).padStart(2, '0');
  day = String(endDate.getUTCDate()).padStart(2, '0');
  hours = String(endDate.getUTCHours()).padStart(2, '0');
  minutes = String(endDate.getUTCMinutes()).padStart(2, '0');
  seconds = String(endDate.getUTCSeconds()).padStart(2, '0');
  endDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  let startDate = new Date()
  startDate.setDate(startDate.getDate() - 180)

  year = startDate.getUTCFullYear();
  month = String(startDate.getUTCMonth() + 1).padStart(2, '0');
  day = String(startDate.getUTCDate()).padStart(2, '0');
  hours = String(startDate.getUTCHours()).padStart(2, '0');
  minutes = String(startDate.getUTCMinutes()).padStart(2, '0');
  seconds = String(startDate.getUTCSeconds()).padStart(2, '0');
  startDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const urlParams = `${coin}?start=${startDate}&end=${endDate}&granularity=day`
  const response = await fetch(url + urlParams, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    }
  })
  let series = await response.json()
  series = series.data

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

<style>
/* https://github.com/apexcharts/apexcharts.js/issues/3387#issuecomment-1264530985 */
.apexcharts-canvas > svg {
  background-color: transparent !important;
}

/* https://stackoverflow.com/a/58364448/4233305 */
.apexcharts-tooltip {
  color: #000000;
}

</style>
