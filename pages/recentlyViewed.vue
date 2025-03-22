<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Recently Viewed</h1>

    <div v-if="validRecentlyViewed.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="item in validRecentlyViewed" :key="item.imdbID" class="bg-white rounded-lg shadow-md overflow-hidden">
        <NuxtLink :to="`/${item.imdbID}`">
          <NuxtImg
            v-if="item.Poster && item.Poster !== 'N/A'"
            :src="item.Poster"
            :alt="item.Title"
            class="w-full h-64 object-cover"
          />
          <div v-else class="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span class="text-gray-400">No image available</span>
          </div>
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ item.Title }}</h2>
            <p class="text-gray-600 text-sm">{{ item.Year }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <p class="text-xl">No recently viewed items.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const recentlyViewed = ref([]);

onMounted(() => {
  recentlyViewed.value = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
});

const validRecentlyViewed = computed(() => {
  return recentlyViewed.value.filter(item => item.Response === "True");
});
console.log(recentlyViewed.value);
</script>