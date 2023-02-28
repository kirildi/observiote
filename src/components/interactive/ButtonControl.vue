<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = defineProps<{ id?: string; name: string }>();

const isOn = ref(false);
const buttonValue = ref("Off");

watchEffect(() => {
  if (!isOn.value) {
    buttonValue.value = "Off";
  } else {
    buttonValue.value = "On";
  }
});
</script>
<template>
  <div class="button-controller">
    <!-- Rounded switch -->
    <label class="switch">
      <input :id="props.id" :name="props.name" :value="buttonValue" class="w3-left" type="checkbox" @click="isOn = !isOn" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<style scoped>
.button-controller {
  width: 5em;
  height: 2.4em;
  border-radius: 0.6em;
  opacity: 1;
}

.switch {
  position: relative;
  display: inline-block;
  width: 5em;
  height: 2.4em;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #353839;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border: 2px solid #161616;
}

.slider:before {
  position: absolute;
  content: "";
  width: 26px;
  height: 26px;
  left: 6px;
  bottom: 3px;
  background-color: #f4efde;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border: 2px solid #161616;
}

input:checked + .slider {
  background-color: #6f6f6f;
}

input:focus + .slider {
  box-shadow: 0 0 2px #161616;
}

input:checked + .slider:before {
  -webkit-transform: translateX(34px);
  -ms-transform: translateX(34px);
  transform: translateX(34px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 1em;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
