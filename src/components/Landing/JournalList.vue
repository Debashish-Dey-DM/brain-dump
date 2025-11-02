<template>
  <div class="max-w-2xl mx-auto mt-10 flex flex-col space-y-6">
    <AboutMe />
    <div
      v-for="post in journals"
      :key="post.id"
      @click="goToJournal(post.id)"
      class="group cursor-pointer border border-transparent hover:border-gray-300 hover:shadow-md transition-all duration-200 rounded-xl p-5 bg-white h-44 w-full flex flex-col justify-between"
    >
      <!-- Date -->
      <p class="text-sm text-gray-500 mb-1">
        {{ formatDate(post.createdAt) }}
      </p>

      <!-- Title -->
      <h2
        class="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-150 line-clamp-1"
      >
        {{ post.title }}
      </h2>

      <!-- Description -->
      <p class="text-gray-700 text-sm mt-2 line-clamp-2">
        {{ post.description }}
      </p>

      <!-- Tags -->
      <div class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded border border-blue-300"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getJournalsFirebase } from '@/Services/unloadServices'
import AboutMe from './AboutMe.vue'
export default {
  name: 'JournalList',
  components: {
    AboutMe,
  },
  setup() {
    const journals = ref([])
    const router = useRouter()

    const goToJournal = (id) => {
      router.push(`/journal/${id}`)
    }

    onMounted(async () => {
      try {
        journals.value = await getJournalsFirebase()
      } catch (error) {
        console.error('Error fetching journals:', error)
      }
    })

    const formatDate = (isoString) => {
      if (!isoString) return 'Draft (no date)'
      const date = new Date(isoString)
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(date)
    }

    return { journals, formatDate, goToJournal }
  },
}
</script>

<style scoped>
.group {
  transition: all 0.25s ease;
}
.group:hover {
  transform: translateY(-2px);
}
.line-clamp-1,
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-1 {
  -webkit-line-clamp: 1;
}
.line-clamp-2 {
  -webkit-line-clamp: 2;
}
</style>
