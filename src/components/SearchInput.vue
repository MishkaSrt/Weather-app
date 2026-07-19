<script setup>
import { computed, reactive } from "vue";

const emit = defineEmits(["final-data"]);
const searchTerm = reactive({
  query: "",
  timeout: null,
  results: null,
});
const apiKey = import.meta.env.VITE_API_KEY;

// const getWeather = async (id) => {
//   const res = await fetch(
//     `https://api.weatherapi.com/v1/forecast.json?key=2c8ded4ec07745b7a95134552253006&q=id:${id}&days=7&aqi=no&alerts=no`,
//   );

//   const data = await res.json();
//   console.log(data);
//   for (const value of res.headers.values()) {
//     console.log(value);
//   }

//   emit("place-data", data);

//   searchTerm.query = "";
//   searchTerm.results = null;
// };

// const getForecast = async (lat, lon) => {
//   const res = await fetch(
//     `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=10&appid=f48e7603ae95492e727aeb529dcc2dab`,
//   );

//   let data = await res.json();
//   const { list } = data;
//   const filteredData = [];
//   filteredData.push(list);

//   // const newData = computed(() => {
//   // filteredData[0][0].filter((_, item) => item % 3 === 0);
//   // });
//   // data = filteredData[0].filter((_, item) => item % 3 === 0);
//   // data = computed(() => filteredData[0].filter((_, item) => item % 3 === 0));
//   data = filteredData;
//   // console.log(data);

//   // console.log(data);
//   // console.log("this is forecast");
//   // emit("forecast-data", data);

//   searchTerm.query = "";
//   searchTerm.results = null;
//   return data;
// };

// const currentWeather = async (locationKey) => {
//   const res = await fetch(
//     `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?details=true&getPhotos=true`,
//     {
//       headers: {
//         authorization: apiKey,
//       },
//     },
//   );

//   const data = await res.json();
//   // console.log(data);

//   return data;
// };

// const getForecast = async (locationKey) => {
//   const res = await fetch(
//     `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?&metric=true`,
//     {
//       headers: {
//         authorization: apiKey,
//       },
//     },
//   );
//   const data = await res.json();

//   searchTerm.query = "";
//   searchTerm.results = null;

//   return data;
// };

const handleSearch = () => {
  clearTimeout(searchTerm.timeout);

  searchTerm.timeout = setTimeout(async () => {
    if (searchTerm.query !== "") {
      const res = await fetch(
        `/locations/v1/cities/autocomplete?q=${searchTerm.query}`,
        {
          method: "GET",
          headers: {
            apiKey: apiKey,
            // authorization: apiKey,
            "Content-Type": "application/json",
          },
        },
      );
      let data = await res.json();
      data = data.splice(0, 5);

      searchTerm.results = data;
      // console.log(searchTerm.results);
    } else {
      searchTerm.results = null;
    }
  }, 500);
};

const weatherData = async (locationKey) => {
  try {
    const [currentWeatherData, forecastData] = await Promise.all([
      currentWeather(locationKey),
      getForecast(locationKey),
    ]);
    const final = { currentWeatherData, forecastData };

    emit("final-data", final);
  } catch (error) {
    console.log("One of the API calls failed", error);
  }
};
</script>

<template>
  <div class="m-5">
    <!-- Search field -->

    <form action="" class="">
      <div class="flex items-center">
        <i class="fa-solid fa-magnifying-glass mr-2"></i>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search for a place.."
          class="p-2 outline-0 min-w-full rounded-2xl transition duration-300 ease-in-out hover:bg-[#C0C1C4]"
          v-model="searchTerm.query"
          @input="handleSearch"
        />
      </div>
    </form>
    <!-- Search suggestions -->
    <div class="my-2 rounded-lg bg-[#C0C1C4]">
      <div v-if="searchTerm.results">
        <div v-for="place in searchTerm.results" :key="place.id">
          <!-- <button
            @click="
              (getForecast(place.lat, place.lon),
              currentWeather(place.lat, place.lon))
            "
            class="px-3 my-2 hover:font-bold w-fit text-left"
          >
            {{ place.name }}, {{ place.country }}
          </button> -->

          <!-- <button
            @click="weatherData(place.Key)"
            class="px-3 my-2 hover:font-bold w-fit text-left"
          >
            {{ place.name }}, {{ place.country }}
          </button> -->
          <button
            @click="(weatherData(place.Key), (test = place.LocalizedName))"
            class="px-3 my-2 hover:font-bold w-fit text-left"
          >
            {{ place.LocalizedName }}, {{ place.Country.LocalizedName }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
