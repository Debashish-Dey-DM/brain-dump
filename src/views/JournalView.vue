<template>
  <div>
    <!-- Loader -->
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
      <p class="text-gray-500 mt-3">Loading your journal...</p>
    </div>

    <!-- Main Journal Content -->
    <div v-else class="journal-container">
      <div class="journal-header">
        <h1 class="journal-title">{{ journal.title }}</h1>
        <p class="journal-description">{{ journal.description }}</p>
        <div class="journal-meta">
          <span class="tag" v-for="tag in journal.tags" :key="tag">{{ tag }}</span>
          <p class="timestamps">Created: {{ new Date(journal.createdAt).toLocaleString() }}</p>
        </div>
      </div>

      <div class="journal-content preview" v-html="renderedMarkdown"></div>
    </div>

    <!-- Related or Recent Posts -->
    <div v-if="!loading && relatedJournals.length" class="related-posts-list">
      <h3>Related Posts</h3>
      <ul>
        <li v-for="journal in relatedJournals" :key="journal.id">
          <a :href="`/journal/${journal.id}`">
            {{ journal.title }}
          </a>
        </li>
      </ul>
    </div>

    <div v-else-if="!loading && recentJournals.length" class="related-posts-list">
      <h3>Recent Posts</h3>
      <ul>
        <li v-for="journal in recentJournals" :key="journal.id">
          <a :href="`/journal/${journal.id}`">
            {{ journal.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import {
  getJournalByIdFirebase,
  getRelatedJournalsFirebase,
  getRecentJournalsFirebase,
} from '@/Services/unloadServices'

marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
  mangle: false,
})

export default {
  name: 'JournalView',
  props: {
    journalid: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const loading = ref(true)
    const journal = ref({
      title: '',
      description: '',
      tags: [],
      content: '',
      createdAt: '',
      updatedAt: '',
    })
    const relatedJournals = ref([])
    const recentJournals = ref([])
    const renderedMarkdown = computed(() => marked(journal.value.content || ''))

    onMounted(async () => {
      try {
        const data = await getJournalByIdFirebase(props.journalid)
        journal.value = data

        relatedJournals.value = await getRelatedJournalsFirebase(props.journalid, data.tags)

        if (relatedJournals.value.length === 0) {
          recentJournals.value = await getRecentJournalsFirebase()
        }
      } catch (error) {
        console.error('Error loading journal:', error)
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      journal,
      renderedMarkdown,
      relatedJournals,
      recentJournals,
    }
  },
}
</script>

<style scoped>
/* Loader styles */
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Journal styling */
.journal-container {
  max-width: 800px;
  margin: 30px auto;
  padding: 25px;
  background: #fefefe;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
  transition: opacity 0.3s ease;
}

.journal-header {
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
}

.journal-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.journal-description {
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 12px;
}

.journal-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  font-size: 0.9rem;
  color: #777;
}

.tag {
  background: #e0f7fa;
  color: #00796b;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
}

.timestamps {
  margin-left: auto;
  font-style: italic;
}

.preview {
  background: #fff;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 10px;
}

/* Related posts styling */
.related-posts-list {
  margin-top: 40px;
}

.related-posts-list h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.related-posts-list ul {
  list-style-type: none;
  padding-left: 0;
}

.related-posts-list li {
  margin-bottom: 8px;
  transition: all 0.2s ease;
}

.related-posts-list a {
  color: #007bff;
  text-decoration: none;
  transition: all 0.2s ease;
}

.related-posts-list a:hover {
  color: #0056b3;
  text-decoration: underline;
  padding-left: 4px;
}
</style>
