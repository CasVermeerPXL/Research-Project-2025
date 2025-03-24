import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY,
)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth/callback',
      name: 'AuthCallback',
      component: () => import('@/views/AuthCallback.vue'),
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/complete-profile',
      name: 'CompleteProfile',
      component: () => import('@/views/CompleteProfile.vue'),
      meta: { requiresInCompleteProfile: true },
    },
  ],
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (user && (to.name === 'Login' || to.name === 'Register')) {
    next({ name: 'Dashboard' })
    return
  }

  // If route requires an incomplete profile
  if (to.meta.requiresIncompleteProfile) {
    if (!user) {
      // Redirect unauthenticated users to login
      next({ name: 'Login' })
      return
    }

    // Check if the user's profile is incomplete (no username)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('username')
      .eq('user_id', user.id)
      .single()

    if (profileError || !profile) {
      // If profile doesn’t exist, allow access (they need to complete it)
      next()
    } else if (profile.username) {
      // If profile exists and has a username, redirect to dashboard
      next({ name: 'Dashboard' })
    } else {
      // If profile exists but no username, allow access
      next()
    }
  }
  // If route requires authentication (e.g., dashboard)
  else if (to.meta.requiresAuth) {
    if (!user) {
      next({ name: 'Login' })
    } else {
      next()
    }
  }
  // Allow access to public routes (e.g., home, login)
  else {
    next()
  }
})

export default router
