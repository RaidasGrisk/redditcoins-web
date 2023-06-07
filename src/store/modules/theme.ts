import { darkTheme, lightTheme } from 'naive-ui'
import { merge } from '../../utils'

const state = () => ({
  themeIsLight: JSON.parse(localStorage.getItem('themeIsLight')),
  lightTheme: lightTheme,
  darkTheme: darkTheme,

  // overrides for both light and dark
  themeOverrides: {
    LoadingBar: {
      colorLoading: '#2081f0', // cant get ThemeVars to work here, so hardcoding
      height: '10px'
    },
    common: {
      infoColor: '#2080f0', // keep same for light and dark
      borderRadius: '7px',
    },
  },

  // separate overrides for dark / light only
  themeOverridesDarkOnly: {
    Layout: {
      headerColor: '#161b22',
      color: '#0d1117',
      footerColor: '#161b22'
    },
    Card: {
      color: '#161b22'
    },
    // here's a bug in naive-ui. This does not work.
    // instead use common.modalColor
    Modal: {
      color: '#161b22'
    },
    common: {
      modalColor: '#161b22'
    },
  },
  themeOverridesLightOnly: {
  }
})

const getters = {
  getTheme(state) {
    return state.themeIsLight ? state.lightTheme : state.darkTheme
  },
  getThemeOverrides(state) {
    // merge the both / light / dark overrides as needed
    // cant use {..obj, ..obj} for deep objects, to merge nested use custom fn
    if (state.themeIsLight) {
      return merge(state.themeOverrides, state.themeOverridesLightOnly)
    } else {
      return merge(state.themeOverrides, state.themeOverridesDarkOnly)
    }
  },
  themeIsLight(state) {
    return state.themeIsLight
  }
}

const actions = {
  async changeTheme({ commit }) {
    commit('changeTheme')
  }
}

const mutations = {
  changeTheme(state) {
    localStorage.setItem('themeIsLight', !state.themeIsLight)
    state.themeIsLight = !state.themeIsLight
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
