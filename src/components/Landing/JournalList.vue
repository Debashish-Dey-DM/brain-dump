<template>
  <div class="max-w-2xl mx-auto mt-10 space-y-6">
    <!-- Display only paginated blog posts -->
    <div
      v-for="post in paginatedPosts"
      :key="post.id"
      class="border-b border-gray-200 pb-4"
    >
      <!-- Date -->
      <p class="text-sm text-gray-500 mb-1">
        {{ post.date }}
      </p>

      <!-- Title -->
      <h2 class="text-xl font-mono subpixel-antialiased text-gray-700 hover:underline cursor-pointer">
        {{ post.title }}
      </h2>

      <!-- Description -->
      <p class="text-gray-700 mt-2">
        {{ post.description }}
      </p>

      <!-- Tag Indicator -->
      <p class="text-gray-600 text-sm mt-2">
        <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
          {{ post.tag }}
        </span>
      </p>
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-center items-center mt-6 space-x-2">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "JournalList",
  data() {
    return {
      blogPosts: [
        { id: 1, title: "iOS Mail Is Shite", date: "27 Feb 2025", tag: "blog", description: "A quick rant about why the iOS Mail app doesn't meet my expectations." },
        { id: 2, title: "Thanks For The Emails", date: "21 Feb 2025", tag: "blog", description: "I appreciate the thoughtful emails I've been receiving from readers." },
        { id: 3, title: "Work to Live, Don’t Live to Work", date: "15 Feb 2025", tag: "blog", description: "A reflection on maintaining a healthy work-life balance in a demanding career." },
        { id: 4, title: "Worst Day Ever", date: "29 Jan 2025", tag: "blog", description: "Things didn't go as planned today. Here's what happened and how I coped." },
        { id: 5, title: "The Wild Robot", date: "26 Jan 2025", tag: "book", description: "My thoughts on this imaginative children's book and why adults might love it too." },
        { id: 6, title: "RSS Feed Changes", date: "24 Jan 2025", tag: "blog", description: "I'm making some updates to my RSS feed—here's what to expect." },
        { id: 7, title: "How I Do Security Questions", date: "20 Jan 2025", tag: "blog", description: "A simple strategy for creating secure answers that don't reveal personal info." },
        { id: 8, title: "Fellas, it's gay to like pop music?", date: "17 Jan 2025", tag: "link", description: "A linked post discussing the ridiculousness of labeling music tastes by gender norms." },
        { id: 9, title: "Automatically Pulling Multiple Repos From GitHub on Mac", date: "12 Jan 2025", tag: "blog", description: "A quick guide to automating the cloning/pulling of multiple repositories." },
        { id: 10, title: "Aligning Automattic’s Sponsored Contributions to WordPress", date: "10 Jan 2025", tag: "link", description: "A linked article exploring how Automattic is managing sponsored contributions." },
        { id: 11, title: "Blog Questions Challenge", date: "05 Jan 2025", tag: "blog", description: "A fun challenge to answer reader questions in one post." },
        { id: 12, title: "On Virtue Signalling", date: "03 Jan 2025", tag: "blog", description: "My take on the concept of virtue signalling and its effects on social discourse." },
        { id: 13, title: "SQLite Facts", date: "03 Jan 2025", tag: "link", description: "Interesting tidbits about SQLite and why it's so widely used." },
      ],
      currentPage: 1,
      itemsPerPage: 10, // Limit to 10 items per page
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.blogPosts.length / this.itemsPerPage);
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.blogPosts.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>
