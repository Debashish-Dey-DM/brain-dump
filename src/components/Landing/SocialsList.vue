<script setup>
import linkedin from '@/assets/linkedin.png'
import github from '@/assets/github.png'
import gmail from '@/assets/Gmail.png'

const socials = [
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/debashish-dey-03621b159/',
    image: linkedin,
  },
  { name: 'Github', link: 'https://github.com/Debashish-Dey-DM', image: github },
  { name: 'Mail', link: 'mailto:deydebashish71@gmail.com', image: gmail },
]
</script>

<template>
  <div class="flex justify-center items-center h-auto">
    <div class="relative border-2 border-black w-64 bg-gray-100 p-6 text-center">
      <div
        class="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-200 px-4 py-1 border border-black font-extrabold"
      >
        SOCIALS
      </div>

      <div class="flex justify-center space-x-4 mt-6">
        <a
          v-for="social in socials"
          :key="social.name"
          :href="social.link"
          class="flex flex-col items-center text-black text-2xl hover:text-blue-600 transition-all"
        >
          <img :src="social.image" :alt="social.name" class="w-8 h-8 hover:scale-140" />
        </a>
      </div>
    </div>
  </div>
</template>
