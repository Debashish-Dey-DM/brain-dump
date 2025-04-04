import { createRouter, createWebHistory } from 'vue-router'
import JournalList from '@/components/Landing/JournalList.vue'

const routes = [
  { path: '/', component: JournalList, meta: { title: 'BrainUnload' } },

  // Journal Page with Dynamic ID
  {
    path: '/journal/:journalid',
    component: () => import('../views/JournalView.vue'),
    meta: { title: 'Journal' },
    props: true,
  },
  {
    path: '/upload',
    component: () => import('../views/UploadJournal.vue'),
    meta: { title: 'Upload' },
  },
  // Fallback route for unknown paths (Redirects to home)
  { path: '/:pathMatch(.*)*', redirect: '/', meta: { title: 'Not Found' } },
  {
    path: '/tags/:tag',
    name: 'Tag',
    component: () => import('../views/TagView.vue'),
    props: true,
    meta: { title: 'Tag' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Set the page title dynamically based on the route meta
router.afterEach((to) => {
  document.title = to.meta.title || 'Default Title'
})

export default router
