<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ id?: string; name: string }>();
const isOn = ref(false);
const rangeMin = ref(0);
const rangeMax = ref(100);
const label = ref("");
</script>
<template>
  <div class="slider-wrapper">
    <div class="w3-center">{{ rangeMax }}</div>
    <div>
      <input :id="id" type="range" :name="name" :min="rangeMin" :max="rangeMax" step="1" class="slider-controll w3-center" />
    </div>
    <div class="w3-center">{{ rangeMin }}</div>
    <div class="w3-center">{{ name }}</div>
  </div>
</template>
<style scoped>
.slider-wrapper {
  width: 4em;
  height: 100%;
  background-color: #4e4e50;
  border-radius: 0.6em;
  padding: 1em;
  font-size: 1em;
}
.slider-controll {
  -webkit-appearance: none;
  width: 180px;
  height: 1em;
  background-color: transparent;
}
.slider-controll:focus {
  outline: none;
}
.slider-controll::-webkit-slider-runnable-track {
  background: #38322b;
  border: 2px solid #1b1a17;
  border-radius: 0.6em;
  width: 0.6em;
  height: 100%;
  cursor: pointer;
  outline: none;
}
.slider-controll:focus::-webkit-slider-runnable-track {
  background: transparent;
}
.slider-controll::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #f4fede;
  border: 2px solid #1b1a17;
  border-radius: 50%;
  cursor: pointer;
}
.slider-controll::-moz-range-track {
  background: #38322b;
  border: 2px solid #1b1a17;
  border-radius: 0.6em;
  width: 0.6em;
  height: 80%;
  cursor: pointer;
}
.slider-controll::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #f4fede;
  border: 2px solid #1b1a17;
  border-radius: 50%;
  cursor: pointer;
  transform: rotate(180deg);
  -moz-transform: rotate(180deg);
}
.slider-controll::-ms-track {
  background: transparent;
  border-color: transparent;
  border-width: 7px 0;
  color: transparent;
  width: 100%;
  height: 12px;
  cursor: pointer;
}
.slider-controll::-ms-fill-lower {
  background: #564c86;
  border: 2px solid #010101;
  border-radius: 24px;
}
.slider-controll::-ms-fill-upper {
  background: rgba(88, 78, 137, 0.78);
  border: 2px solid #010101;
  border-radius: 24px;
}
.slider-controll::-ms-thumb {
  width: 25px;
  height: 26px;
  background: #ff897a;
  border: 2px solid #00001e;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 0px;
  /*Needed to keep the Edge thumb centred*/
}
.slider-controll:focus::-ms-fill-lower {
  background: rgba(88, 78, 137, 0.78);
}
.slider-controll:focus::-ms-fill-upper {
  background: #5a508c;
}
/*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
@supports (-ms-ime-align: auto) {
  /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
  .slider-controll {
    margin: 0;
    /*Edge starts the margin from the thumb, not the track as other browsers do*/
  }
}
</style>
