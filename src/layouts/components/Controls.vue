<template>
  <div class="card-header">
    <form class="form-group">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Search:</span>
        </div>
        <input v-model="city" placeholder="Please enter city name" type="text" class="form-control" id="city">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary"
                  type="button"
                  v-bind:disabled="!complete || error || (!city || 0 === city.length)"
                  v-on:click="add"
          >+</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import {EventBus} from "../../main";

  export default {
    name: "Controls",
    props: {
      complete: Boolean,
      error: String
    },
    data: function () {
      return {
        city: '',
      }
    },
    watch: {
      city: function () {
        if (this.city.length === 0) {
          EventBus.$emit('reset', null);
        } else {
          this.$emit('search', `&q=${this.city}`);
        }
      }
    },
    methods: {
      add: function() {
        this.$emit('add', this.city);
      }
    }
  }
</script>

<style scoped>
  .btn-info {
    font-weight: bold;
  }
</style>
