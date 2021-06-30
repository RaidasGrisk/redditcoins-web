<template>
  <div v-if="this.$store.state.page_loaded" class="section container">

    <div class="buttons are-small is-left">
     <button
       class="button is-info is-outlined"
       @click="openChartModal = true">
       Open charts
     </button>
    </div>

    <modal v-if="openChartModal" @close="openChartModal = false; selectedCoins = []">
      <div class="card">
        <div class="card-content">
          <div class="content is-size-7-mobile">
            <br>
            <div class="columns">
              <div class="column">
                <apexcharts
                  :width="this.isMobile ? 300: 470"
                  type="area"
                  :options="this.getOptions" :series="this.getSeries">
                </apexcharts>
              </div>

              <div class="column">
                <div class="select is-multiple is-size-7">
                  <!-- need to add mobile class to show dropdown
                  also think of how to position this on mobile -->
                  <select multiple size="10" v-model="selectedCoins">
                    <option v-for="(coin) in this.$store.state.vol_order" :key="coin">
                      <option :value="coin">{{coin}}</option>
                    </option>
                  </select>
                </div>

                <div class="buttons are-small is-left">
                 <button
                   class="button is-info is-outlined"
                   @click="this.changeBarType">
                   bar type
                 </button>
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

    // adding this here breaks the app
    // is it because mixin is not proper mixin?
    // mixin,
  },

  props: {

  },

  data() {
    return {

      // other data
      openChartModal: false,
      isMobile: mixin.methods.isMobile(),
      selectedCoins: [],
      seriesData: {},
      callingAPI: false,

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
          lines: {
            show: true
          },
          categories: []
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

    changeBarType() {
      this.options = {... this.options, ...{
          chart: {
            stacked: !this.options.chart.stacked
          }
        }
      }
    },

    getCoinData(coin) {
      this.callingAPI = true
      let baseUrl = 'https://redditcoins.app/api/volume/cryptocurrency/'
      axios
        .get(baseUrl + coin, {
          params: {
            start: '2021-04-15',
            end: '2021-06-29',
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
          this.options = {... this.options, ...{
              xaxis: {
                categories: time.reverse()
              }
            }
          }
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
      let lastSelectedCoin = this.selectedCoins.slice(-1)[0]
      let finishedCoins = Object.keys(this.seriesData)

      if (!finishedCoins.includes(lastSelectedCoin)) {
        this.getCoinData(lastSelectedCoin)
      } else {
        this.updateChartSeries()
      }

    },

  },

  computed: {
    getOptions() {
      return this.options
    },
    getSeries() {
      return this.series
    }
  }
}
</script>

<style>
</style>
