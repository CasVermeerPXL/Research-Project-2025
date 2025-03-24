<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

import {
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  HelpCircleIcon,
  MenuIcon,
  XIcon,
  LogInIcon,
  LogOutIcon,
} from 'lucide-vue-next'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY,
)

// State for menu visibility
const isMenuOpen = ref(false)
const router = useRouter()
const user = ref<any>(null)

onMounted(async () => {
  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser()
  if (!error && authUser) {
    user.value = authUser
  }
})

// Toggle menu function
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navigateTo = (path: string) => {
  isMenuOpen.value = false
  router.push(path)
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    user.value = null // Clear user state
    isMenuOpen.value = false
    router.push('/')
  } else {
    console.error('Logout error:', error)
  }
}

type NavItem = {
  icon: any
  label: string
  path: string
  action?: () => void
}

const baseNavItems: NavItem[] = [
  { icon: HomeIcon, label: 'Home', path: '/' },
  { icon: LayoutDashboardIcon, label: 'Dashboard', path: '/dashboard' },
  { icon: SettingsIcon, label: 'Settings', path: '/settings' },
  { icon: HelpCircleIcon, label: 'Help', path: '/help' },
]

const navItems = computed(() => {
  const items = [...baseNavItems]
  if (user.value != null) {
    items.push({ icon: LogOutIcon, label: 'Log out', path: '/', action: logout })
  } else {
    items.push({ icon: LogInIcon, label: 'Log in', path: '/login' })
  }
  return items
})
</script>

<template>
  <div class="flex min-h-screen font-poppins text-secondary">
    <div
      class="fixed top-4 left-4 z-50 bg-background border border-border rounded-lg shadow-md transition-all duration-300 ease-in-out overflow-hidden"
      :class="isMenuOpen ? 'w-48' : 'w-12'"
    >
      <div class="flex flex-col">
        <button
          @click="toggleMenu"
          class="p-3 w-full flex items-center justify-between hover:bg-muted/50 transition-colors"
        >
          <div class="flex items-center">
            <MenuIcon v-if="!isMenuOpen" class="h-5 w-5" />
            <XIcon v-else class="h-5 w-5" />
            <span v-if="isMenuOpen" class="ml-3 text-sm font-medium">Menu</span>
          </div>
        </button>
        <div
          class="transition-all duration-300 ease-in-out origin-top"
          :class="isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'"
        >
          <div
            v-for="(item, index) in navItems"
            :key="index"
            class="p-3 flex items-center hover:bg-muted/50 transition-colors cursor-pointer"
            @click="item.action ? item.action() : navigateTo(item.path)"
          >
            <component :is="item.icon" class="h-5 w-5 flex-shrink-0" />
            <span v-if="isMenuOpen" class="ml-3 text-sm font-medium">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>
    <main class="flex flex-col w-[1440px] mx-auto py-10">
      <RouterView />
    </main>
  </div>
</template>

<style>
.rotate-icon {
  transition: transform 0.3s ease;
}

.rotate-icon.open {
  transform: rotate(180deg);
}
</style>
