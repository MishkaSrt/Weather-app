<script setup>
import { ref } from "vue";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import BorderLine from "./BorderLine.vue";

defineProps({
  currentWeather: Object,
});

const isLoaded = ref(false);

// const timeInSeconds = currentWeather.dt + currentWeather.timezone;
</script>

<template>
  <div class="text-black rounded-lg flex flex-col justify-start pb-10">
    <!-- Icon -->

    <!-- Icon -->
    <!-- <div v-if="place.current.condition.text.toLowerCase().includes('sun')">
      <img src="../assets/images/Sunny.png" alt="" />
    </div> -->
    <!-- Temp -->
    <div class="text-7xl mb-2 -mr-4 p-4 flex">
      <img
        class="center"
        :src="`https://www.accuweather.com/assets/images/weather-icons/v2a/${currentWeather.WeatherIcon}.svg`"
        alt=""
      />
      <h1 class="">
        {{ Math.round(currentWeather.Temperature.Metric.Value) }}&deg;
      </h1>
    </div>
    <!-- Date&Time -->
    <div class="pl-4">
      <h1 class="text-3xl">
        {{
          new Date(currentWeather.LocalObservationDateTime).toLocaleDateString(
            "en-US",
            {
              weekday: "long",
            },
          )
        }},
        {{ new Date(currentWeather.LocalObservationDateTime).getUTCHours() }}
        :
        {{ new Date(currentWeather.LocalObservationDateTime).getUTCMinutes() }}
      </h1>
    </div>
  </div>

  <BorderLine />
  <div class="p-4">
    <!-- <i class="fa-solid fa-sun"></i> -->
    <img
      class="inline"
      :src="`https://www.accuweather.com/assets/images/weather-icons/v2a/${currentWeather.WeatherIcon}.svg`"
      alt=""
    />
    {{ currentWeather.WeatherText }}

    <!-- <div class="">{{ place.location.name }}, {{ place.location.country }}</div> -->
  </div>
  <div class="p-4">
    <!-- <img
      alt=""
      width="80px"
      class="inline"
      :src="`https://openweathermap.org/payload/api/media/file/${currentWeather.weather[0].icon}.png`"
    /> -->
    <!-- {{ currentWeather.weather[0].main }} -->
    <div class="">
      <img
        :src="currentWeather.Photos[0].LandscapeLink"
        class="rounded-2xl max-w-70"
        alt=""
      />
    </div>
  </div>
</template>
