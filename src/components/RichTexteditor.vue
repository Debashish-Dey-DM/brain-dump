<template>
  <div class="markdown-container">
    <!-- File Upload -->
    <input type="file" @change="handleFileUpload" accept=".md" />

    <!-- Rendered Markdown Output -->
    <div class="preview" v-html="markdownToHtml"></div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { marked } from 'marked'

// Configure marked for GitHub-style Markdown
marked.setOptions({
  breaks: true,        // Enables line breaks with a single Enter
  gfm: true,          // Enables GitHub Flavored Markdown
  headerIds: false,   // Disable auto-generated header IDs
  mangle: false       // Prevent unnecessary encoding
})

export default {
  setup() {
    const markdownContent = ref('')

    // Handle File Upload
    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        markdownContent.value = e.target.result // Read file content
      }
      reader.readAsText(file)
    }

    // Convert Markdown to HTML
    const markdownToHtml = computed(() => marked(markdownContent.value))

    return { handleFileUpload, markdownToHtml }
  }
}
</script>

<style>
.markdown-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

input[type="file"] {
  margin-bottom: 20px;
}

.preview {
  border: 1px solid #ddd;
  padding: 15px;
  background: #fff;
  border-radius: 5px;
  min-height: 200px;
  font-family: Arial, sans-serif;
}

/* GitHub-style Markdown Styling */
.preview h1, .preview h2, .preview h3 {
  font-weight: bold;
  margin-top: 20px;
}

/* Fix for Markdown Code Blocks */
.preview pre {
  background: #f4f4f4 !important; /* Light gray background */
  color: #333 !important; /* Dark text */
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}

.preview code {
  background: #e0e0e0 !important; /* Slightly darker gray */
  color: #222 !important; /* Black text */
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
