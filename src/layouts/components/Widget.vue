<template>
  <div class="card-body">
    <div v-show="weather.status.loading" class="request-loading">
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
    </div>
    <div v-show="!weather.status.loading && !weather.status.error && weather.status.complete" class="request-success">
      <section class="info-main">
        <div class="info-main_weather">
          <img class="icon" :src=weather.params.icon>
          <div>
            <h2>{{weather.params.temperature}}°</h2>
            <p>{{weather.params.city}}</p>
          </div>
        </div>
        <div class="info-main_history">
          <img class="icon" src="../../../src/assets/images/temperature.svg">
          <span>Min: {{weather.params.min}}°C</span><br>
          <span>Max: {{weather.params.max}}°C</span>
        </div>
      </section>
      <ul class="info-additional">
        <li class="info-additional_details">
          <img class="icon" src="../../../src/assets/images/sunrise.svg">
          <p>{{weather.params.sunrise}}</p>
        </li>
        <li class="info-additional_details">
          <img class="icon" src="../../../src/assets/images/sunset.svg">
          <p>{{weather.params.sunset}}</p>
        </li>
        <li class="info-additional_details">
          <img class="icon" src="../../../src/assets/images/humidity.svg">
          <p>{{weather.params.humidity}}</p>
        </li>
        <li class="info-additional_details">
          <img class="icon" src="../../../src/assets/images/pressure.svg">
          <p>{{weather.params.pressure}}</p>
        </li>
        <li class="info-additional_details">
          <img class="icon" src="../../../src/assets/images/wind.svg">
          <p>{{weather.params.wind}}</p>
        </li>
      </ul>
    </div>
    <div v-show="weather.status.error && !weather.status.loading" class="request-failure">
      <div class="error-message">Oops! It was unexpected...</div>
      <p>{{weather.status.error}}</p>
      <div class="hidden">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="squiggly-0">
              <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="0"/>
              <feDisplacementMap id="displacement" in="SourceGraphic" in2="noise" scale="3"/>
            </filter>
            <filter id="squiggly-1">
              <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="1"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4"/>
            </filter>
            <filter id="squiggly-2">
              <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="2"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3"/>
            </filter>
            <filter id="squiggly-3">
              <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="3"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4"/>
            </filter>
            <filter id="squiggly-4">
              <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="4"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3"/>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  import {EventBus} from "../../main";

  export default {
    name: "Widget",
    props: {
      weather: {
        type: Object,
        default: function() {
          return {
            id: 0,
            status: {
              type: Object,
              default: function () {
                return {
                  loading: false,
                  error: null,
                  complete: true
                }
              }
            },
            params: {
              type: Object,
              default: function() {
                return {
                  city: '',
                  temperature: 0,
                  min: 0,
                  max: 0,
                  sunrise: '',
                  sunset: '',
                  pressure: 0,
                  humidity: 0,
                  wind: 0,
                  overcast: '',
                  icon: ''
                }
              }
            },
          }
        }
      }
    },
    data: function () {
      return {
        location: '&lat=0&lon=0',
      }
    },
    beforeMount() {
      if (!this.weather.params.city) {
        this.getLocation();
      } else {
        this.$emit('init', `&q=${this.weather.params.city}`);
      }
    },
    created() {
      console.log(this.weather.status.loading, this.weather.status.error, this.weather.status.complete);
      EventBus.$on('reset', () => {
        this.$emit('init', this.location);
      });
    },
    methods: {
      getLocation() {
        navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getLocationFailed);
      },
      getLocationSuccess(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.location = `&lat=${lat}&lon=${lon}`;
        this.$emit('init', this.location);
      },
      getLocationFailed() {
        this.$emit('init', this.location);
      }
    }
  }
</script>

<style scoped lang="scss">
  .card-body {
    min-height: 220px;
    .request {
      &-loading {
        margin: 0 auto;
        .ball {
          width: 10px;
          height: 10px;
          margin: 10px auto;
          border-radius: 50px;
          &:nth-child(1) {
            background: #2c3e50;
            animation: right 1s infinite ease-in-out;
          }
          &:nth-child(2) {
            background: #2c3e50;
            animation: left 1.1s infinite ease-in-out;
          }
          &:nth-child(3) {
            background: #2c3e50;
            animation: right 1.05s infinite ease-in-out;
          }
          &:nth-child(4) {
            background: #2c3e50;
            animation: left 1.15s infinite ease-in-out;
          }
          &:nth-child(5) {
            background: #2c3e50;
            animation: right 1.1s infinite ease-in-out;
          }
          &:nth-child(6) {
            background: #2c3e50;
            animation: left 1.05s infinite ease-in-out;
          }
          &:nth-child(7) {
            background: #2c3e50;
            animation: right 1s infinite ease-in-out;
          }
        }
      }
      &-success {
      .info {
        &-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          &_weather {
            display: flex;
            align-items: center;
            h2 {
              font-size: 4em;
              margin-bottom: 0;
            }
            p {
              margin-bottom: 0;
              font-weight: bold;
            }
          }
          &_history {
            span:last-child {
              margin-left: 36px;
            }
          }
        }
        &-additional {
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-top: 30px;
          padding-left: 0;
          flex-wrap: wrap;
          &_details {
            display: flex;
            align-items: center;
            margin-right: 10px;
            min-width: 82px;
            .icon {
              margin-right: 10px;
            }
            p {
              margin-bottom: 0;
            }
          }
        }
      }
      }
      &-failure {
        .error-message {
          font-size: 24px;
          font-weight: bold;
          margin: 0 auto;
          animation: squiggly 0.34s linear infinite;
        }
        .hidden {
          display: none;
        }
      }
    }
  }

  @keyframes right {
    0% {
      transform: translate(-15px);
    }
    50% {
      transform: translate(15px);
    }
    100% {
      transform: translate(-15px);
    }
  }
  @keyframes left {
    0% {
      transform: translate(15px);
    }
    50% {
      transform: translate(-15px);
    }
    100% {
      transform: translate(15px);
    }
  }
  @keyframes squiggly {
    0% {
      filter: url("#squiggly-0");
    }
    25% {
      filter: url("#squiggly-1");
    }
    50% {
      filter: url("#squiggly-2");
    }
    75% {
      filter: url("#squiggly-3");
    }
    100% {
      filter: url("#squiggly-4");
    }
  }
</style>