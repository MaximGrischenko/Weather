import axios from 'axios';
import * as types from '../../types';
import {API, KEY} from "../../../constants";

export default {
  async search({commit}, payload) {
    commit(types.REQUEST_IS_LOADING, true);
    commit(types.FETCH_WEATHER_COMPLETE, false);
    try {
      const {data} = await axios.get(`${API}${payload}${KEY}`);
      commit(types.FETCH_WEATHER_SUCCESS, data);
      commit(types.FETCH_WEATHER_FAILURE, null);
    }
    catch (error) {
      commit(types.FETCH_WEATHER_FAILURE, error.message);
    }
    finally {
      commit(types.REQUEST_IS_LOADING, false);
      commit(types.FETCH_WEATHER_COMPLETE, true);
    }
  },
  add({commit, state}, payload) {
    const prev = state.cities;
    let next = state.cities;
    next = Array.from(new Set([...next, payload]));

    if(prev.length !== next.length) {
      commit(types.ADD_WEATHER, state.weather);
      commit(types.ADD_CITY, payload)
    }
  }
};
