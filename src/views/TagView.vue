<template>
  <div class="max-w-2xl mx-auto mt-10 space-y-6">
    <h1 class="text-2xl font-bold mb-4">Posts tagged with: "{{ tag }}"</h1>

    <div v-for="post in journals" :key="post.id" class="border-b border-gray-200 pb-4">
      <p class="text-sm text-gray-500 mb-1">
        {{ formatDate(post.createdAt) }}
      </p>

      <a
        class="text-xl font-mono subpixel-antialiased text-gray-700 hover:underline cursor-pointer"
        :href="`/journal/${post.id}`"
      >
        {{ post.title }}
      </a>

      <p class="text-gray-700 mt-2">
        {{ post.description }}
      </p>

      <p class="text-gray-600 text-sm mt-2">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
        >
          {{ tag }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getJournalByTag } from '@/Services/unloadServices'

export default {
  name: 'TagView',
  setup() {
    const route = useRoute()
    const tag = ref(route.params.tag)
    const journals = ref([])

    const fetchJournals = async (tagValue) => {
      try {
        journals.value = await getJournalByTag(tagValue)
      } catch (error) {
        console.error('Error fetching journals by tag:', error)
      }
    }

    onMounted(() => {
      fetchJournals(tag.value)
    })

    // React to route changes (e.g., user clicks another tag from sidebar)
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
    }
  },
}
</script>
