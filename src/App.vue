<script setup>
import { computed, ref } from "vue";
import SearchInput from "./components/SearchInput.vue";
import CurrentWeather from "./components/CurrentWeather.vue";
// import BorderLine from "./components/BorderLine.vue";
import WeatherForecastDay from "./components/WeatherForecastDay.vue";
import CurrentHighlights from "./components/CurrentHighlights.vue";

const places = ref([]);

// const sortedArray = computed(() => {
//   return places[0].forecastData[0].filter((_, item) => item % 3 === 0);
// });

const clearPlaces = () => {
  places.value.splice(0);
};
const addPlace = (data) => {
  // places.value.splice(0);
  // places.value.push(currentData, forecastData);
  places.value.push(data);
};
</script>

<template>
  <div class="grid place-items-center bg-[#d6d7da] min-h-screen">
    <div class="bg-[#f6f6f8] min-h-[80vh] w-[70vw] rounded-4xl flex">
      <div class="flex-1 bg-[#ffffff] rounded-4xl">
        <!-- Search -->
        <SearchInput
          v-on:final-data="clearPlaces"
          @final-data="addPlace"
        ></SearchInput>

        <!-- Weather info left column -->
        <Transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
        >
          <div class="grow" v-if="places.length !== 0">
            <!-- {{ console.log(places.length) }} -->
            <!-- {{ console.log(places[0].forecastData.DailyForecasts) }} -->
            {{ console.log(places) }}
            <CurrentWeather
              :current-weather="places[0].currentWeatherData[0]"
            ></CurrentWeather>
          </div>
        </Transition>
        <!-- <div v-for="place in places" :key="id"></div> -->
      </div>
      <!-- Forecast info right column -->

      <div class="flex-2 bg-[#f7f6f9] rounded-4xl">
        <!-- <h1 class="text-2xl mt-10 ml-10">Forecast</h1> -->

        <Transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
        >
          <div v-if="places.length !== 0" class="">
            <h1 class="text-2xl mt-10 ml-10">Forecast</h1>
            <div class="flex justify-evenly mt-10 mb-20">
              <div v-for="forecast in places[0].forecastData.DailyForecasts">
                <!-- {{ console.log(forecast) }} -->
                <!-- {{ console.log(sortedArray) }} -->
                <WeatherForecastDay :forecast="forecast" />
              </div>
            </div>
          </div>
        </Transition>

        <Transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
        >
          <div v-if="places.length !== 0" class="flex flex-col items-center">
            <!-- {{ console.log(places) }} -->
            <CurrentHighlights
              :current-weather="places[0].currentWeatherData[0]"
            />
            <!-- <div class=""><h1>Today's Highlights</h1></div>
           

          <div class="max-w-4/5 flex flex-wrap">
            <div class="bg-blue-500 rounded-xl w-50 h-45">test</div>
            <div class="bg-blue-500 rounded-xl w-50 h-45">test</div>
            <div class="bg-blue-500 rounded-xl w-50 h-45">test</div>
            <div class="bg-blue-500 rounded-xl w-50 h-45">test</div>
          </div> -->
          </div>
        </Transition>
        <!-- {{ console.log(places) }} -->
        <!-- {{ console.log(places[0]) }} -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
