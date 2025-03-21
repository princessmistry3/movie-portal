<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Fixed Header -->
    <header class="fixed top-0 left-0 right-0 bg-gray-800 text-white shadow-md z-30">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Movie Portal</h1>
        <!-- Mobile menu button -->
        <button @click="toggleSidebar" class="md:hidden p-2">
          <Icon name="heroicons:bars-3" class="h-6 w-6" />
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex">
      <!-- Sidebar Navigation -->
      <aside :class="[
          'bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-16 transition-transform duration-300 ease-in-out z-20',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]">
        <nav class="p-4">
          <ul class="space-y-4">
            <li>
              <NuxtLink to="/" class="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200" 
                :class="{ 'bg-gray-700': currentRoute === '/' }">
                <span class="flex items-center">
                  <Icon name="heroicons:home" class="h-5 w-5 mr-2" />
                  Home
                </span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/movies" class="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
                :class="{ 'bg-gray-700': currentRoute === '/movies' }">
                <span class="flex items-center">
                  <Icon name="heroicons:film" class="h-5 w-5 mr-2" />
                  Movies
                </span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/series" class="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
                :class="{ 'bg-gray-700': currentRoute === '/series' }">
                <span class="flex items-center">
                  <Icon name="heroicons:tv" class="h-5 w-5 mr-2" />
                  Series
                </span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
                :class="{ 'bg-gray-700': currentRoute === '/contact' }">
                <span class="flex items-center">
                  <Icon name="heroicons:envelope" class="h-5 w-5 mr-2" />
                  Contact
                </span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Overlay for mobile sidebar -->
      <div 
        v-if="isSidebarOpen" 
        @click="toggleSidebar"
        class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10">
      </div>

      <!-- Main content area -->
      <main class="flex-grow p-6 md:ml-64 mt-16">
        <div class="container mx-auto">
          <NuxtPage />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isSidebarOpen = ref(false);

const currentRoute = computed(() => route.path);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>