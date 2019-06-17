import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  weather: {
    id: "",
    status: {
      loading: false,
      complete: false,
      error: null,
    },
    params: {
      city: '',
      temperature: 0,
      min: 0,
      max: 0,
      sunrise: '',
      sunset: '',
      pressure: 0,
      humidity: '',
      wind: '',
      overcast: '',
      icon: ''
    }
  },
  list: [],
  doubles: false,
  cities: []
};

export default {
  state,
  getters,
  actions,
  mutations
};
