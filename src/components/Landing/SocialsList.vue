<template>
  <div class="flex justify-center items-center h-auto">
    <!-- Socials Box -->
    <div class="relative border-2 border-black w-64 bg-gray-100 p-6 text-center">
      <!-- Overlapping Header -->
      <div class="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-200 px-4 py-1 border border-black font-extrabold">
        SOCIALS
      </div>

      <!-- Social Icons -->
      <div class="flex justify-center space-x-4 mt-6">
        <a 
          v-for="social in socials" 
          :key="social.name" 
          :href="social.link" 
          class="flex flex-col items-center text-black text-2xl hover:text-blue-600 transition-all"
        >
          <img :src="social.image" :alt="social.name" class="w-8 h-8 hover:scale-140 " />
        </a>

      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "SocialsBox",
data() {
  return {
    socials: [
      {
        name: "LinkedIn",
        link: "https://www.linkedin.com/",
        image: "src/assets/linkedin.png",
      },
      {
        name: "Twitter (X)",
        link: "https://twitter.com/",
        image: "src/assets/twitter.png",
      },
      {
        name: "Mail",
        link: "https://www.gmail.com/",
        image: "src/assets/Gmail.png",
      }
    ]
  };
}


};
</script>
