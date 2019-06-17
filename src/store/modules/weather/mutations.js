import * as types from '../../types';

export default {
  [types.REQUEST_IS_LOADING]: (state, payload) => {
    state.weather.status.loading = payload;
  },
  [types.FETCH_WEATHER_SUCCESS]: (state, payload) => {
    state.weather = {
      id: payload.sys.id,
      status: {
        loading: false,
        complete: true,
        error: null,
      },
      params: {
        city: payload.name,
        temperature: payload.main.temp.toFixed(1),
        min: payload.main.temp_min.toFixed(1),
        max: payload.main.temp_max.toFixed(1),
        sunrise: new Date(payload.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,5),
        sunset: new Date(payload.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,5),
        pressure: payload.main.temp_max.toFixed(1),
        humidity: `${payload.main.humidity}%`,
        wind: `${payload.wind.speed} m/s`,
        overcast: payload.weather[0].description,
        icon: `http://openweathermap.org/img/w/${payload.weather[0].icon}.png`
      }
    };
  },
  [types.FETCH_WEATHER_FAILURE]: (state, payload) => {
    state.weather.status.error = payload;
  },
  [types.FETCH_WEATHER_COMPLETE]: (state, payload) => {
    state.weather.status.complete = payload;
  },
  [types.REQUEST_IS_LOADING]: (state, payload) => {
    state.weather.status.loading = payload;
  },
  [types.ADD_WEATHER]: (state) => {
    state.list.push(state.weather);
  },
  [types.ADD_CITY]: (state, payload) => {
    state.cities.push(payload); //= Array.from(new Set([...state.cities, payload]));
  }
}
