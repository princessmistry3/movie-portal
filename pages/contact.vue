<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Contact Us</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <form @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            id="name"
            v-model="formData.name" 
            type="text" 
            required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            id="email"
            v-model="formData.email" 
            type="email" 
            required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input 
            id="subject"
            v-model="formData.subject" 
            type="text" 
            required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea 
            id="message"
            v-model="formData.message" 
            rows="6" 
            required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div v-if="formSubmitted" class="p-4 bg-green-100 text-green-700 rounded-lg">
          Thank you for your message! We will get back to you soon.
        </div>
        
        <div>
          <button 
            type="submit" 
            class="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            :disabled="formSubmitting"
          >
            <span v-if="formSubmitting">
              <span class="inline-block animate-spin mr-2">↻</span> Sending...
            </span>
            <span v-else>Send Message</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const formSubmitting = ref(false);
const formSubmitted = ref(false);

const submitForm = async () => {
  formSubmitting.value = true;
  
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real application, you would send the form data to your API
  // const { data, error } = await useFetch('/api/contact', {
  //   method: 'POST',
  //   body: formData.value
  // });
  
  formSubmitting.value = false;
  formSubmitted.value = true;
  
  // Reset the form
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  // Reset the success message after a delay
  setTimeout(() => {
    formSubmitted.value = false;
  }, 5000);
};
</script>