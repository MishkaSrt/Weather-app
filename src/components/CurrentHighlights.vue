<script setup>
defineProps({
  currentWeather: Object,
});
</script>

<template>
  <div class="">
    <h1 class="text-2xl">Today's Highlights</h1>
  </div>

  <div class="max-w-3/4 flex flex-wrap justify-between m-2">
    <div class="bg-white rounded-xl w-70 h-45 mb-10">
      <p class="p-2 text-center text-xl">UV Index</p>
      <div class="flex gap-2 mt-8 mb-8">
        <p class="text-3xl pl-10">{{ currentWeather.UVIndex }}</p>
      </div>
      <div class="flex items-center">
        <p class="text-xl pl-10">{{ currentWeather.UVIndexText }}</p>
      </div>
    </div>
    <div class="bg-white rounded-xl w-70 h-45 mb-10">
      <p class="p-2 text-center text-xl">Wind Status</p>
      <div class="flex gap-2 mt-8 mb-8">
        <p class="text-3xl pl-10">
          {{ Math.round(currentWeather.Wind.Speed.Metric.Value) }}
        </p>
        <p class="text-3xl">
          {{ currentWeather.Wind.Speed.Metric.Unit }}
        </p>
      </div>
      <div class="flex items-center">
        <!-- <p>test</p> -->
        <i class="fa-solid fa-location-dot pl-10 pr-2 text-xl"></i>
        <p class="text-xl">{{ currentWeather.Wind.Direction.English }}</p>
        <!-- <p class="">test</p> -->
      </div>
    </div>
    <div class="bg-white rounded-xl w-70 h-45 mb-10">
      <p class="p-2 text-center text-xl">Humidity</p>
      <div class="flex gap-2 mt-8 mb-8">
        <p class="text-3xl pl-10">{{ currentWeather.RelativeHumidity }}%</p>
      </div>
    </div>
    <div class="bg-white rounded-xl w-70 h-45 mb-10">
      <p class="p-2 text-center text-xl">Visibility</p>
      <div class="flex gap-2 mt-8 mb-8">
        <p class="text-3xl pl-10">
          {{ Math.round(currentWeather.Visibility.Metric.Value) }}
        </p>
        <p class="text-3xl">
          {{ currentWeather.Visibility.Metric.Unit }}
        </p>
      </div>
    </div>
  </div>
  <button type="button" class="bg-indigo-500">
    <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
      <!-- ... -->
    </svg>
    Processing…
  </button>
</template>
