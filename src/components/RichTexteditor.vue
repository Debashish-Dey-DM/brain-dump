<template>
  <div class="markdown-container">
    <!-- File Upload -->
    <div>
      <label for="file-upload" class="file-upload-label">Choose a Markdown File</label>
      <input id="file-upload" type="file" @change="handleFileUpload" accept=".md" />
      <p v-if="selectedFileName" class="file-name">{{ selectedFileName }}</p>
    </div>

    <div class="mt-5">
      <!-- Markdown Text Input -->
      <textarea v-model="markdownContent" placeholder="Paste your Markdown here..."></textarea>
      <div class="mt-4">
        <input v-model="journalTitle" placeholder="Enter journal title" class="input" type="text" />

        <input
          v-model="journalDescription"
          placeholder="Enter journal description"
          class="input"
          type="text"
        />

        <input
          v-model="journalTags"
          placeholder="Enter tags (comma-separated)"
          class="input mt-2"
          type="text"
        />
      </div>

      <!-- Preview Button -->
      <button @click="showPreview">Preview</button>
      <button @click="uploadJournalEntry" class="ml-2">Upload Journal</button>

      <!-- Rendered Markdown Output (Only shown after clicking preview) -->
      <div v-if="isPreviewVisible" class="preview" v-html="markdownToHtml"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import { uploadJournal } from '@/Services/unloadServices'

// Configure marked for GitHub-style Markdown
marked.setOptions({
  breaks: true, // Enables line breaks with a single Enter
  gfm: true, // Enables GitHub Flavored Markdown
  headerIds: false, // Disable auto-generated header IDs
  mangle: false, // Prevent unnecessary encoding
})

export default {
  setup() {
    const markdownContent = ref('') // Stores Markdown input
    const isPreviewVisible = ref(false) // Controls when preview is shown
    const selectedFileName = ref('') // Stores uploaded file name
    const journalTitle = ref('')
    const journalTags = ref('')
    const journalDescription = ref('')
    // Handle File Upload
    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (!file) return

      selectedFileName.value = file.name // Show selected file name
      const reader = new FileReader()
      reader.onload = (e) => {
        markdownContent.value = e.target.result
      }
      reader.readAsText(file)
    }

    // Convert Markdown to HTML
    const markdownToHtml = computed(() => marked(markdownContent.value))

    // Show Preview
    const showPreview = () => {
      isPreviewVisible.value = true
    }
    const uploadJournalEntry = async () => {
      try {
        const tagsArray = journalTags.value
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag !== '')

        await uploadJournal({
          title: journalTitle.value,
          content: markdownContent.value,
          tags: tagsArray,
          description: journalDescription.value,
        })

        alert('Journal uploaded successfully!')
      } catch (error) {
        console.error('Upload failed:', error)
        alert('Failed to upload journal.')
      }
    }

    return {
      markdownContent,
      handleFileUpload,
      markdownToHtml,
      isPreviewVisible,
      showPreview,
      selectedFileName,
      uploadJournalEntry,
      journalTitle,
      journalTags,
      journalDescription,
    }
  },
}
</script>

<style>
/* Hide default file input */
input[type='file'] {
  display: none;
}
.input {
  display: block;
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 10px;
}
.file-upload-label {
  display: inline-block;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
}

.file-upload-label:hover {
  background-color: #0056b3;
}

/* Show selected file name */
.file-name {
  margin-top: 5px;
  font-size: 14px;
  color: #333;
}

.markdown-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  font-family: monospace;
}

button {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.preview {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 5px;
  min-height: 200px;
  font-family: Arial, sans-serif;
}

/* GitHub-style Markdown Styling */
.preview h1,
.preview h2,
.preview h3 {
  font-weight: bold;
  margin-top: 20px;
}

/* Fix for Markdown Code Blocks */
.preview pre {
  background: #f4f4f4;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}

.preview code {
  background: #e0e0e0;
  color: #222;
  padding: 4px 6px;
  border-radius: 4px;
  font-family: monospace;
}

/* Blockquote Styling */
.preview blockquote {
  border-left: 4px solid #ccc;
  padding-left: 10px;
  color: #666;
  font-style: italic;
}

/* List Styling */
.preview ul {
  padding-left: 20px;
}

.preview li {
  margin-bottom: 5px;
}
</style>
