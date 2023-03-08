<script setup>
import { ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useThemeVars, useLoadingBar } from 'naive-ui'

const chartOptions = {
  // colors: ['#647cec', '#f4941c'],
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

const data = ref([])
const isloading = ref(false)
const themeVars = useThemeVars()
const loadingBar = useLoadingBar()
const store = useStore()

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const getData = async (coin) => {

  // exit if data is already fetched
  if (data.value.filter(item => item.name == coin).length) {
    return
  }

  isloading.value = true
  loadingBar.start()
  console.log('getting', coin)
  //
  // let url = 'https://redditcoins.app/api/volume/cryptocurrency/'
  // let endDate = new Date().toISOString().slice(0, 10)
  // let startDate = new Date()
  // startDate.setDate(startDate.getDate() - 10)
  // startDate = startDate.toISOString().slice(0, 10)
  //
  // const urlParams = `${coin}?start=${startDate}&end=${endDate}&ups=-999&submissions=true&comments=true&granularity=D`
  // const response = await fetch(url + urlParams, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json',
  //   }
  // })
  // let series = await response.json()
  // series = series.data

  await sleep(500)
  const series = [
    {
      "time": "2023-03-08",
      "volume": 10
    },
    {
      "time": "2023-03-07",
      "volume": 9
    },
    {
      "time": "2023-03-06",
      "volume": 29
    },
    {
      "time": "2023-03-05",
      "volume": 7
    },
    {
      "time": "2023-03-04",
      "volume": 18
    },
    {
      "time": "2023-03-03",
      "volume": 19
    },
    {
      "time": "2023-03-02",
      "volume": 24
    },
    {
      "time": "2023-03-01",
      "volume": 25
    },
    {
      "time": "2023-02-28",
      "volume": 15
    },
    {
      "time": "2023-02-27",
      "volume": 14
    },
    {
      "time": "2023-02-26",
      "volume": 17
    }
  ]

  const time = series.map(item => item.time)
  const volume = series.map(item => item.volume)

  // by default xaxis ticks are null
  // set this after the data fetch
  if (!chartOptions.xaxis.categories) {
    console.log('setting x axis', time.reverse())
    chartOptions.xaxis.categories = time.reverse()
  }

  data.value.push({
    'name': coin,
    'data': volume,
  })

  loadingBar.finish()
  isloading.value = false
}

onMounted( async() => {

})

const props = defineProps({
  showModal: {type: Boolean, default: false},
  coin: {type: String, default: null},
})

// watch the showModal and fetch data if
// the modal is opened, not closed.
watch(() => props.showModal, async (current, previous) => {
  if (current && !previous) {
    console.log('triggering wathcer')
    await getData(props.coin)
  }
})

</script>

<template>
  <n-modal :show="props.showModal" @update:show="$emit('update:showModal')">
    <n-card style="width: 45em; min-height: 33em;" title="Chart data" :bordered="true" size="huge">
      <template #header-extra>
        <n-spin size="small" :stroke="themeVars.infoColor" v-if="isloading" />
      </template>
      <apexchart
        v-if="data.length > 0"
        type="area"
        :options="chartOptions"
        :series="data"
      />
    </n-card>
  </n-modal>
</template>

<style scoped>
</style>
