import { darkTheme, lightTheme } from 'naive-ui'
import { merge } from '../../utils'
import { useLoadingBar } from 'naive-ui'

const state = () => ({
  data: null,
})

const getters = {
  getData(state) {
    return state.data
  }
}

const actions = {
  async updateData({ commit }) {
    // API request
    const url = 'https://redditcoins.app/api/volume/market_summary?gran=daily'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    let data = await response.json()
    commit('updateData', data)
  }
}

const mutations = {
  updateData(state, data) {
    state.data = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
