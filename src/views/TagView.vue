<template>
  <div class="max-w-2xl mx-auto mt-10 flex flex-col space-y-6">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">Posts tagged with: "{{ tag }}"</h1>

    <!-- Journal Cards -->
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
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getJournalByTagFirebase } from '@/Services/unloadServices'

export default {
  name: 'TagView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const tag = ref(route.params.tag)
    const journals = ref([])

    const fetchJournals = async (tagValue) => {
      try {
        journals.value = await getJournalByTagFirebase(tagValue)
      } catch (error) {
        console.error('Error fetching journals by tag:', error)
      }
    }

    const goToJournal = (id) => {
      router.push(`/journal/${id}`)
    }

    onMounted(() => {
      fetchJournals(tag.value)
    })

    watch(
      () => route.params.tag,
      (newTag) => {
        tag.value = newTag
        fetchJournals(newTag)
      },
    )

    const formatDate = (isoString) => {
      const date = new Date(isoString)
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(date)
    }

    return {
      tag,
      journals,
      formatDate,
      goToJournal,
    }
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

/* Clamp text lines for uniform cards */
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
