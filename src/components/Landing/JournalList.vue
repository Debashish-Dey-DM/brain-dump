<template>
  <div class="max-w-2xl mx-auto mt-10 space-y-6">
    <!-- Display only paginated blog posts -->
    <div v-for="post in journals" :key="post.id" class="border-b border-gray-200 pb-4">
      <!-- Date -->
      <p class="text-sm text-gray-500 mb-1">
        {{ formatDate(post.createdAt) }}
      </p>

      <!-- Title -->
      <a
        class="text-xl font-mono subpixel-antialiased text-gray-700 hover:underline cursor-pointer"
        :href="`/journal/${post.id}`"
      >
        {{ post.title }}
      </a>

      <!-- Description -->
      <p class="text-gray-700 mt-2">
        {{ post.description }}
      </p>

      <!-- Tag Indicator -->

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

    <!-- Pagination Controls -->
    <!-- <div class="flex justify-center items-center mt-6 space-x-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 text-sm font-semibold border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span class="text-sm text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 text-sm font-semibold border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div> -->
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getJournals } from '@/Services/unloadServices'
export default {
  name: 'JournalList',
  setup() {
    const journals = ref([])

    onMounted(async () => {
      try {
        journals.value = await getJournals()
        console.log('Journals:', journals.value)
      } catch (error) {
        console.error('Error fetching journals:', error)
      }
    })

    return {
      journals,
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10, // Limit to 10 items per page
    }
  },
  computed: {
    // totalPages() {
    //   return Math.ceil(this.blogPosts.length / this.itemsPerPage)
    // },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.blogPosts.slice(start, end)
    },
  },
  methods: {
    // nextPage() {
    //   if (this.currentPage < this.totalPages) {
    //     this.currentPage++
    //   }
    // },
    // prevPage() {
    //   if (this.currentPage > 1) {
    //     this.currentPage--
    //   }
    // },
    // method for formatDate
    formatDate(isoString) {
      const date = new Date(isoString)
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(date)
    },
  },
}
</script>
