<template>
  <main id="app">
    <div class="container">
      <div class="row">
        <div class="col-xl-6 col-lg-7 col-md-9 col-sm-12 col-xs-12 card">
          <Controls
              v-on:search="debouncedSearch"
              v-on:add="onAdd"
              :complete="weather.status.complete"
              :error="weather.status.error">
          </Controls>
          <Widget
              v-on:init="onInit"
              :weather="weather"></Widget>
        </div>
      </div>
      <div>
        <WidgetList :list="list"></WidgetList>
      </div>
    </div>
  </main>
</template>

<script>
import debounce from 'lodash/debounce';
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapGetters } = createNamespacedHelpers('weather');

import Controls from './components/Controls';
import WidgetList from './components/WidgetList';
import Widget from './components/Widget';

export default {
  name: 'app',
  components: {
    Controls,
    WidgetList,
    Widget
  },
  data: function () {
    return {
      city: '',
      location: '&lat=0&lon=0'
    }
  },
  computed: {
    ...mapGetters(['list', 'weather', 'cities'])
  },
  methods: {
    ...mapActions(['search', 'add']),
    debouncedSearch: debounce(function (value) {
      this.search(value);
    }, 500),
    onInit(payload) {
      this.search(payload);
    },
    onAdd(payload) {
      this.add(payload);
    }
  }
}
</script>

<style scoped lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
  }
  .card {
    background: url('../assets/images/background.svg') no-repeat;
    background-size: cover;
    background-color: #e3e3e3;
  }
</style>