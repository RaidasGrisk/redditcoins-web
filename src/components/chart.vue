<template>
  <div v-if="this.$store.state.page_loaded">

    <modal v-if="openChartModal" @close="openChartModal = false; selectedCoins = []">
      <div class="card">
        <div class="card-content">
          <div class="content is-size-7-mobile">

            <div class="columns">
              <div class="column">
                <apexcharts
                  :width="this.isMobile ? 300 : 470"
                  type="area"
                  :options="this.getOptions" :series="this.getSeries">
                </apexcharts>
                <div class="field">
                  <input id="switch1" type="checkbox" class="switch is-rounded is-small is-info" v-model="stackChart">
                  <label for="switch1">Stack data</label>
                </div>
              </div>

              <div class="column">
                <div class="select is-multiple is-size-7">
                  <!-- need to add mobile class to show dropdown
                  also think of how to position this on mobile -->
                  <select multiple :size="this.isMobile ? 5 : 10" v-model="selectedCoins">
                    <option v-for="(coin) in this.$store.state.vol_order" :key="coin">
                      <option :value="coin">{{coin}}</option>
                    </option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </modal>

    <div class="columns is-centered">
      <div class="column is-half">

      </div>
    </div>
  </div>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'
import modal from '@/components/modal'
import mixin from '@/mixin'
import axios from "axios";

export default {
  name: 'chart',

  components: {
    apexcharts: VueApexCharts,
    modal,
  },

  props: {

  },

  data() {
    return {

      // other data
      openChartModal: false,
      isMobile: mixin.methods.isMobile(),
      selectedCoins: [],
      selectedCoins_: [], // check selectedCoins watched for explanation
      seriesData: {},
      callingAPI: false,
      stackChart: false,

      // chart options
      options: {
        // colors: ['#647cec', '#f4941c'],
        chart: {
          stacked: false,
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: false,
              zoom: true,
              zoomin: true,
              zoomout: true,
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
      },
      series: [
        {
          name: '',
          data: []
        },
      ]
    }
  },

  methods: {

    getCoinData(coin) {
      this.callingAPI = true
      let baseUrl = 'https://redditcoins.app/api/volume/cryptocurrency/'
      axios
        .get(baseUrl + coin, {
          params: {
            start: '2021-04-15',
            end: this.date,
            ups: -999,
            submissions: true,
            comments: true,
            granularity: 'D'
          }
        })
        .then(response => {
          // refactor api response
          // and pusht the data to seriesData
          let mentionData = []
          let time = []
          response.data.data.forEach((time_obj) => {
            mentionData.push(time_obj['volume'])
            time.push(time_obj['time'])
          })
          this.seriesData[coin] = mentionData.reverse()

          // okay, so by default xaxis ticks are null
          // set this once when fetching first api call
          if (this.options.xaxis.categories == null) {
            this.options = {... this.options, ...{
                xaxis: {... this.options.xaxis,
                  categories: time.reverse()
                }
              }
            }
          }
          console.log('fetched', coin)
          this.updateChartSeries()
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => {this.callingAPI = false})
    },

    updateChartSeries() {
      // push selected coins to series array
      this.series = []
      this.selectedCoins.forEach(coin => {
        this.series.push({name: coin, data: this.seriesData[coin]})
      });
    }

  },

  watch: {
    selectedCoins: function () {

      // check if coin data has already been downloaded
      // if coin is not downloaded already then call the api
      if (this.selectedCoins === undefined || this.selectedCoins.length == 0) {
          return // early exit if array is empty
      }

      // find the new coin in selected array
      // new coin can be appended to any place in the array
      // hence we cannot just pop the last item or something...
      // so lets comare two arrays and find the difference.
      // the difference will be the newly added coin
      let lastSelectedCoin = this.selectedCoins.filter(x => !this.selectedCoins_.includes(x))[0]
      this.selectedCoins_ = this.selectedCoins

      let finishedCoins = Object.keys(this.seriesData)
      // check in coin has already been fetched or selected coin is undefined
      // if so, lets not call the api again
      if (!finishedCoins.includes(lastSelectedCoin) && !(lastSelectedCoin == undefined)) {
        this.getCoinData(lastSelectedCoin)
      } else {
        this.updateChartSeries()
      }

    },

    stackChart () {
      this.options = {... this.options, ...{
          chart: {
            stacked: this.stackChart
          }
        }
      }
    }

  },

  computed: {
    getOptions() {
      return this.options
    },
    getSeries() {
      return this.series
    },
  },

  mounted() {

    // events to catch
    // these can be braodcasted by other components:
    // like coin cards or coinTable rows.
    let vm = this
    vm.$root.$on('selectACoin', (coin) => {
      vm.selectedCoins = [coin]
    })

    vm.$root.$on('openChart', () => {
      vm.openChartModal = true
    })

    // set todays date to use it to fetch api response.
    let date = new Date()
    date.setDate(date.getDate()-1)
    this.date = date.toISOString().slice(0, 10)
  }

}
</script>

<style>
</style>
