import { createStore } from 'vuex'
import theme from './modules/theme'
import data from './modules/data'

const store = createStore({
  modules:{
    theme: theme,
    data: data,
  }
});

export default store;
