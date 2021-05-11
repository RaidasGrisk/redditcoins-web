import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import mixin from '../mixin'

Vue.use(Vuex);
Vue.use(VueAxios, axios);

// Vue.axios.defaults.baseURL = "http://34.72.38.207/volume/market_summary";
Vue.prototype.baseURL = "https://redditcoins.app/api/volume/market_summary"

export default new Vuex.Store({
  state: {
    // flag to indicate that the data is ready
    page_loaded: false,
    // flag to indicate that the data is ready
    data_ready_flag: false,
    // raw api output
    raw_data: null,
    // refactored api outpu
    data: null,
    // array with coins orderd by last vol
    vol_order: [],
    // array with coins orderd by last vol (read below)
    vol_order_: [],
    // keys are coins values are [pct_change_over_whole_period]
    vol_pct_change: {},
    // same but excluding coins with vol lower than 1
    vol_pct_change_: {},
    // array with time
    time: [],
    // last date
    last_date: null,
    // colors
    colors: {
      '1INCH': "#4a4a4a",
      AAVE: "#38b0c4",
      ADA: "#2f6fcf",
      ALGO: "#7f7f7f",
      ANKR: "#5494ec",
      ATOM: "#5d6ea1",
      BAL: "#7f7f7f",
      BAND: "#546cfc",
      BAT: "#fc5404",
      BCH: "#8cc454",
      BNB: "#f4bc2c",
      BNT: "#1545e9",
      BTC: "#f4941c",
      BTG: "#ecac10",
      CEL: "#4343bb",
      CGLD: "#4a4a4a",
      COMP: "#04d494",
      CRV: "#4a4a4a",
      CVC: "#3cb43c",
      DAI: "#f4b434",
      DASH: "#048ce4",
      DNT: "#3c4c9c",
      DOGE: "#c4a434",
      DOT: "#e4047c",
      ENJ: "#644cbc",
      EOS: "#7f7f7f",
      ETC: "#348434",
      ETH: "#647cec",
      FIL: "#44c4cc",
      GNT: "#2c4474",
      GRT: "#6444ec",
      KNC: "#1c8c94",
      LINK: "#2c5cdc",
      LOOM: "#5cc4fc",
      LRC: "#2cb4f4",
      LTC: "#807e7e",
      MANA: "#fc3458",
      MATIC: "#2c6cec",
      MKR: "#1cac9c",
      NANO: "#4c94e4",
      NEM: "#4a4a4a",
      NEO: "#5cbc04",
      NKN: "#4a4a4a",
      NMR: "#3f3fbf",
      NU: "#4a4a4a",
      OGN: "#4a4a4a",
      OMG: "#7f7f7f",
      OXT: "#5c44bc",
      REN: "#4c4cb2",
      REP: "#b04e95",
      SKL: "#4a4a4a",
      SNX: "#4a4a4a",
      STORJ: "#2484fc",
      SUSHI: "#4a4a4a",
      TRON: "#7f7f7f",
      UMA: "#fc4c4c",
      UNI: "#fc047c",
      USDC: "#3484cc",
      USDT: "#24a47c",
      VET: "#14bcfc",
      WBTC: "#797985",
      XLM: "#7f7f7f",
      XMR: "#fc6404",
      XRP: "#7d8181",
      XTZ: "#a4e404",
      YFI: "#046ce4",
      ZEC: "#ecb444",
      ZRX: "#7f7f7f",
      SHIB: "#feb801",
    }
  },
  actions: {
    loadData({commit}, gran) {
      this.state.data_ready_flag = false
      Vue.axios.get(
        Vue.prototype.baseURL,
        {params: gran}
      ).then(result => {
        commit('SAVE_DATA', result)
        this.state.data_ready_flag = true
        this.state.page_loaded = true
      }).catch(error => {
        throw new Error(`API ${error}`)
      })
    },
  },
  mutations: {
    SAVE_DATA(state, api_data) {

      // save raw data
      let raw_data = api_data.data
      state.raw_data = raw_data
      // console.log('raw_data', raw_data)

      // create time array
      let time = mixin.methods.get_api_data_time_array(raw_data)
      state.time = time
      // console.log('time_array', time)

      // refactor raw_data
      let data = mixin.methods.refactor_api_response(raw_data)
      state.data = data
      // console.log('refactored_data', data)

      // get pct change arrays
      let [vol_pct_change, vol_pct_change_] = mixin.methods.get_volume_pct_changes(data.cryptocurrency)
      state.vol_pct_change = vol_pct_change
      state.vol_pct_change_ = vol_pct_change_
      // console.log(vol_pct_change, vol_pct_change_)

      // get volume order array
      let vol_order = mixin.methods.order_dict_by_val(data.cryptocurrency)
      state.vol_order = vol_order
      // console.log('vol_order', vol_order)

      // get pct change order arrays
      let pct_order = mixin.methods.order_dict_by_val(vol_pct_change)
      let pct_order_ = mixin.methods.order_dict_by_val(vol_pct_change_)
      state.pct_order = pct_order
      state.pct_order_ = pct_order_
      // console.log('vol_order', vol_pct_change_, pct_order_)

      // set date
      state.last_date = time[time.length -1] + ' UTC'

      // let colors = state.colors
      // colors = mixin.methods.get_dominant_color_from_logos(data.cryptocurrency)
      // console.log(colors)
      // state.colors = colors
    },
  },

  getters: {
    isLoading: state => {
      return !state.data_ready_flag
    }
  },
})
