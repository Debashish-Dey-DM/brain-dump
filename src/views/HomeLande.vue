<template>
  <div class="flex justify-center items-center min-h-[calc(100vh-64px)] mt-16 bg-gray-100" id="LandingPage">
    <div class="flex w-full max-w-6xl gap-0 p-6"> 
      <!-- Left Section (Journal) -->
      <div class="w-1/2 min-h-[400px] min-w-[350px] bg-white  p-6  flex flex-col justify-center items-center" id="Journal">
        <h2 class="text-2xl font-bold mb-4">Journal</h2>
        <p class="text-gray-600">
          <JournalList />
        </p>
      </div>

      <!-- Right Section (Something Else) -->
      <div class="w-1/2 min-h-[400px] min-w-[350px] bg-white  p-6  flex flex-col justify-center items-center" id="SomethingElse">
        <h2 class="text-2xl font-bold mb-4">Something Else</h2>
        <p class="text-gray-600">Additional content goes here...</p>
      </div>
    </div>
  </div>
</template>

<script>
import JournalList from '../components/Landing/JournalList.vue';
export default {
  name: "LandingPage",
  components: {
    JournalList
  }

};
</script>
