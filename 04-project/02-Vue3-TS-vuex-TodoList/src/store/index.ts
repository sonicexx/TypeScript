import { createStore } from 'vuex';

// ----将 Vuex 的属性用单独的文件控制
import actions from './actions';
import mutations from './mutations';
import state from './state';

export default createStore({
  state,
  mutations,
  actions,
});
