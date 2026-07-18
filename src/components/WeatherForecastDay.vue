<script setup>
defineProps({
  forecast: Object,
});
</script>

<template>
  <div
    class="flex flex-col justify-start bg-white rounded-xl w-25 h-30 items-center"
  >
    <!-- <div class="text-xl">test</div> -->
    <div>
      <p class="ml-4">
        {{
          new Date(forecast.Date).toLocaleDateString("en-US", {
            weekday: "short",
          })
        }}
        <!-- {{ console.log(forecast) }} -->
      </p>
      <img
        class=""
        :src="`https://www.accuweather.com/assets/images/weather-icons/v2a/${forecast.Day.Icon}.svg`"
        alt="weather-icon"
      />
      <div class="ml-2">
        <p class="inline pr-2">
          {{ Math.round(forecast.Temperature.Maximum.Value) }}
        </p>
        <p class="inline">
          {{ Math.round(forecast.Temperature.Minimum.Value) }}
        </p>
      </div>
    </div>
  </div>
</template>
