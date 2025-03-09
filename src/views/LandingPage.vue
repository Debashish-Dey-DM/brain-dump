<template>
<nav class="flex top-0 w-full bg-white h-16 items-center justify-center border-b border-gray-200 shadow-md z-50">
 <img src="@/assets/Logo.png" alt="Logo" class="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16">
</nav>
<div class="flex justify-center min-h-[calc(100vh-64px)] p-4" id="LandingPage">
  <div class="flex w-full max-w-6xl gap-0"> 
    <!-- Left Section (Journal) -->
    <div class="w-1/2 min-h-screen min-w-[350px] bg-white flex flex-col items-center" id="Journal">
      <p class="text-gray-600">
        <JournalList />
      </p>
    </div>

    <!-- Right Section (Something Else) -->
    <div class="w-1/2 min-h-screen min-w-[350px] bg-white  flex flex-col justify-center items-center" id="SomethingElse">
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

