<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Series</h1>

    <!-- Search Input -->
    <div class="mb-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search for series..."
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="series in filteredSeries" :key="series.imdbID" class="bg-white rounded-lg shadow-md overflow-hidden">
        <NuxtLink :to="`/${series.imdbID}`">
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
            <h2 class="text-xl font-semibold mb-2">{{ series.Title }}</h2>
            <p class="text-gray-600 text-sm">{{ series.Year }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useSeriesAPI } from '~/composables/series-service';

const { fetchSeries } = useSeriesAPI();
const seriesList = ref([]);
const searchTerm = ref('');

const filteredSeries = computed(() => {
  return seriesList.value.filter(series =>
    series.Title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

onMounted(async () => {
  try {
    const response = await fetchSeries('series');
    seriesList.value = response.Search || [];
  } catch (error) {
    console.error('Error fetching series:', error);
  }
});
</script>