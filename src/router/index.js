import { createRouter, createWebHistory } from 'vue-router'
import JournalList from '@/components/Landing/JournalList.vue'

const routes = [
  { path: '/', component: JournalList, meta: { title: 'BrainUnload' } },

  // Journal Page with Dynamic ID
  {
    path: '/journal/:journalid',
    component: () => import('../views/JournalView.vue'),
    meta: { title: 'Journal' },
  },

  // Fallback route for unknown paths (Redirects to home)
  { path: '/:pathMatch(.*)*', redirect: '/', meta: { title: 'Not Found' } },
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
