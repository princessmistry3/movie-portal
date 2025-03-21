<template>
  <div>
    <!-- Not sure about the hero -->
    <div v-if="featuredMovie" class="relative rounded-xl overflow-hidden mb-8 h-[500px]">
      <NuxtImg
        v-if="featuredMovie.Poster && featuredMovie.Poster !== 'N/A'"
        :src="featuredMovie.Poster"
        :alt="featuredMovie.Title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
        <h2 class="text-4xl font-bold text-white mb-2">{{ featuredMovie.Title }}</h2>
        <div class="flex items-center mb-4">
          <Icon name="heroicons:star" class="text-yellow-500 h-5 w-5 mr-1" />
          <span class="text-white">{{6 }}</span>
          <span class="mx-2 text-white">•</span>
          <span class="text-white">{{ featuredMovie.Year }}</span>
        </div>
      </div>
    </div>

    <!-- Loader --->
    <div v-if="pending" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>

    <!-- catering for erors -->
    <div v-else-if="error" class="text-center py-12 text-red-600">
      <p class="text-xl">{{ error.message || 'Failed to load content' }}</p>
      <button @click="refresh" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Try Again
      </button>
    </div>

    <template v-else>
      <!-- Featured Movies -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Featured Movies</h2>
          <NuxtLink to="/movies" class="text-blue-600 hover:underline">View All</NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="movie in popularMovies" :key="movie.imdbID" class="bg-white rounded-lg shadow-md overflow-hidden">
            <NuxtImg
              v-if="movie.Poster && movie.Poster !== 'N/A'"
              :src="movie.Poster"
              :alt="movie.Title"
              class="w-full h-64 object-cover"
            />
            <div v-else class="w-full h-64 bg-gray-200 flex items-center justify-center">
              <span class="text-gray-400">No image available</span>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-1">{{ movie.Title }}</h3>
              <div class="flex items-center">
                <Icon name="heroicons:calendar" class="text-gray-500 h-4 w-4 mr-1" />
                <span class="text-sm">{{ movie.Year }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- featured TV Shows -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Featured TV Shows</h2>
          <NuxtLink to="/series" class="text-blue-600 hover:underline">View All</NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="series in popularSeries" :key="series.imdbID" class="bg-white rounded-lg shadow-md overflow-hidden">
            <NuxtImg
              v-if="series.Poster && series.Poster !== 'N/A'"
              :src="series.Poster"
              :alt="series.Title"
              class="w-full h-64 object-cover"
            />
            <div v-else class="w-full h-64 bg-gray-200 flex items-center justify-center">
              <span class="text-gray-400">No image available</span>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-1">{{ series.Title }}</h3>
              <div class="flex items-center">
                <Icon name="heroicons:calendar" class="text-gray-500 h-4 w-4 mr-1" />
                <span class="text-sm">{{ series.Year }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMoviesAPI } from '~/composables/movie-service';
import { useSeriesAPI } from '~/composables/series-service';

const moviesAPI = useMoviesAPI();
const seriesAPI = useSeriesAPI();

// Fetch data
const { data: moviesData, pending: moviesPending, error: moviesError, refresh: refreshMovies } = 
  useAsyncData('popularMovies', () => moviesAPI.fetchMovies());

const { data: seriesData, pending: seriesPending, error: seriesError, refresh: refreshSeries } = 
  useAsyncData('popularSeries', () => seriesAPI.fetchSeries());

const popularMovies = computed(() => moviesData.value?.Search?.slice(0, 4) || []);
const popularSeries = computed(() => seriesData.value?.Search?.slice(0, 4) || []);

const featuredMovie = computed(() => {
  const movies = moviesData.value?.Search || [];
  return movies.find(movie => movie.Poster && movie.Poster !== 'N/A') || movies[0] || null;
});

const pending = computed(() => moviesPending.value || seriesPending.value);
const error = computed(() => moviesError.value || seriesError.value);

// Refresh both endpoints
const refresh = () => {
  refreshMovies();
  refreshSeries();
};
</script>