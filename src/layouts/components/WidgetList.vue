<template>
  <section class="row">
    <div v-for="weather in list" v-bind:key="weather.id" class="col-xl-6 col-lg-7 col-md-9 col-sm-12 col-xs-12 card">
      <Widget :weather=weather></Widget>
    </div>
  </section>
</template>

<script>
import Widget from './Widget';

  export default {
    name: "WidgetList",
    props: ["list", "cities"],
    components: {
      Widget
    }
  }
</script>

<style scoped lang="scss">
  .card {
    background-color: #e4e4e4;
    background-image: radial-gradient(ellipse farthest-corner at right bottom, #adc0ce 0%, #fff 50%, #e4e4e4 100%);
  }
</style>