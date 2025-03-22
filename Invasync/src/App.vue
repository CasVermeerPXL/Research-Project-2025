<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import {
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  HelpCircleIcon,
  MenuIcon,
  XIcon,
} from 'lucide-vue-next'

// State for menu visibility
const isMenuOpen = ref(false)

// Toggle menu function
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Navigation items
const navItems = [
  { icon: HomeIcon, label: 'Home', path: '/' },
  { icon: LayoutDashboardIcon, label: 'Dashboard', path: '/dashboard' },
  { icon: SettingsIcon, label: 'Settings', path: '/settings' },
  { icon: HelpCircleIcon, label: 'Help', path: '/help' },
]
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
