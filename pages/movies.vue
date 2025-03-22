<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Movies</h1>

    <!-- Search Input -->
    <div class="mb-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search for movies..."
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="movie in filteredMovies" :key="movie.imdbID" class="bg-white rounded-lg shadow-md overflow-hidden">
        <NuxtLink :to="`/${movie.imdbID}`">
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
            <h2 class="text-xl font-semibold mb-2">{{ movie.Title }}</h2>
            <p class="text-gray-600 text-sm">{{ movie.Year }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMoviesAPI } from '~/composables/movie-service';

const { fetchMovies } = useMoviesAPI();
const movies = ref([]);
const searchTerm = ref('');

const filteredMovies = computed(() => {
  return movies.value.filter(movie =>
    movie.Title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

onMounted(async () => {
  try {
    const response = await fetchMovies('movie'); // Initial load with a default search term
    movies.value = response.Search || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
});
</script>