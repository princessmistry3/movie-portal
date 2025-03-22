<template>
  <div>
    <button @click="goBack" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
      Back
    </button>

    <div v-if="item">
      <h1 class="text-3xl font-bold mb-4">{{ item.Title }}</h1>
      <div class="flex flex-col md:flex-row">
        <NuxtImg
          v-if="item.Poster && item.Poster !== 'N/A'"
          :src="item.Poster"
          :alt="item.Title"
          class="w-full md:w-1/3 object-cover rounded-lg shadow-md mb-4 md:mb-0 md:mr-4"
        />
        <div class="md:w-2/3">
          <p class="text-gray-700 mb-2">
            <strong>Year:</strong> {{ item.Year }}
          </p>
          <p class="text-gray-700 mb-2">
            <strong>Genre:</strong> {{ item.Genre }}
          </p>
          <p class="text-gray-700 mb-2">
            <strong>Director:</strong> {{ item.Director }}
          </p>
          <p class="text-gray-700 mb-2">
            <strong>Actors:</strong> {{ item.Actors }}
          </p>
          <p class="text-gray-700 mb-2">
            <strong>Plot:</strong> {{ item.Plot }}
          </p>
          <p class="text-gray-700 mb-2">
            <strong>IMDB Rating:</strong> {{ item.imdbRating }}
          </p>
        </div>
      </div>
    </div>
    <div v-else-if="pending" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
    <div v-else class="text-center py-12 text-red-600">
      <p class="text-xl">{{ notFoundMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useMoviesandSeriesDetailsAPI } from '~/composables/details-service';
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const item = ref(null);
const pending = ref(true);
const notFoundMessage = ref('');

const { fetchItemDetails } = useMoviesandSeriesDetailsAPI();

onMounted(async () => {
  try {
    const response = await fetchItemDetails(id);
    item.value = response;

    if (!item.value || item.value.Response === "False") {
      notFoundMessage.value = `Item not found`;
    } else {
      let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const index = recentlyViewed.findIndex(viewedItem => viewedItem.imdbID === item.value.imdbID);
      if (index === -1) {
        recentlyViewed.push(item.value);
        if (recentlyViewed.length > 10) {
          recentlyViewed.shift();
        }
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
      }
    }
  } catch (error) {
    console.error('Failed to load item details', error);
    notFoundMessage.value = 'Failed to load item details';
  } finally {
    pending.value = false;
  }
});

function goBack() {
  router.back();
}
</script>