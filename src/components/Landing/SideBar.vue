<template>
  <div class="p-16">
    <div
      class="relative border-2 border-black w-36 md:w-52 lg:w-64 h-auto bg-[#EFEFEF] flex flex-col"
    >
      <div
        class="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-lime-300 px-4 py-2 border border-black font-extrabold"
      >
        NAVIGATION
      </div>

      <div class="flex flex-col p-6 mt-10 space-y-6">
        <div
          v-for="(tag, index) in tags"
          :key="index"
          @mouseover="hoveredTagIndex = index"
          @mouseleave="hoveredTagIndex = null"
          @click="goToTag(tag)"
          class="inline-flex items-center justify-center px-6 py-2 text-black font-extrabold border-2 border-black bg-white shadow-[4px_4px_0px_black] hover:shadow-none transition-all duration-200 cursor-pointer"
          :style="{ backgroundColor: hoveredTagIndex === index ? randomColors[index] : 'white' }"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTags } from '@/Services/unloadServices'

export default {
  name: 'SideBar',
  setup() {
    const router = useRouter()
    const tags = ref([])
    const randomColors = ref([])
    const hoveredTagIndex = ref(null)

    const getRandomLightColor = () => {
      const r = Math.floor(Math.random() * 100) + 155
      const g = Math.floor(Math.random() * 100) + 155
      const b = Math.floor(Math.random() * 100) + 155
      return `rgb(${r}, ${g}, ${b})`
    }

    const goToTag = (tag) => {
      console.log('Tag clicked:', tag)
      router.push({ path: '/tags/' + tag })
    }

    onMounted(async () => {
      try {
        const fetchedTags = await getTags()
        tags.value = fetchedTags
        randomColors.value = fetchedTags.map(() => getRandomLightColor())
      } catch (error) {
        console.error('Error fetching tags:', error)
      }
    })

    return {
      tags,
      randomColors,
      hoveredTagIndex,
      goToTag,
    }
  },
}
</script>
