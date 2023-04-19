import Vue from 'vue';
import Vuex from 'vuex';
import APIHandler from '../APIHandler';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    data: [],
    isLoading: false,
    isCached: false,
  }),

  mutations: {
    setState(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },
  },

  actions: {
    async load({ commit }, params = {}) {
      const payments = localStorage.getItem('payments');
      if (payments !== null) {
        commit('setState', { isCached: true, data: JSON.parse(payments) });
        return;
      }

      commit('setState', { isLoading: true });

      try {
        const { data } = await APIHandler.getPayments(params);

        if (Array.isArray(data)) {
          commit('setState', { data });
          localStorage.setItem('payments', JSON.stringify(data));
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('setState', { isLoading: false });
      }
    },
    async clearCache({ commit }, params = {}) {
      const { data } = await APIHandler.getPayments(params);
      localStorage.clear();
      commit('setState', { isCached: false, data: Array.from(data) });
    },
  },
});
