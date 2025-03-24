<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div
    class="w-full h-[500px] bg-[url(/public/banner.jpeg)] bg-cover bg-center flex items-center text-primary-foreground"
  >
    <div class="flex flex-col ml-16 space-y-2">
      <h1 class="text-6xl font-semibold">Invasync</h1>
      <p class="opacity-50 text-4xl">
        Uniting global science to track <br />
        invasive plants.
      </p>
    </div>
  </div>
  <div class="w-full flex flex-col gap-10 items-center mt-12 text-secondary px-8">
    <div class="flex flex-col w-1/2 text-center gap-6">
      <h1 class="text-6xl font-semibold">Welcome to Invasync</h1>
      <p class="text-2xl opacity-80">
        Discover the platform that empowers scientists and <br />
        environmentalists worldwide to monitor and control <br />
        invasive plants. Using drone-powered mapping and <br />
        advanced analytics, Invasync provides real-time insights <br />
        and tools to tackle the invasive species effectively.
      </p>
    </div>
    <RouterLink to="/dashboard">
      <Button class="text-2xl p-8 rounded-lg"> Get started </Button>
    </RouterLink>
    <div class="flex bg-secondary text-secondary-foreground px-16 py-10 rounded-3xl gap-16">
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl">Global monitoring</h1>
        <p class="text-sm">
          Track invasive <br />
          species worldwide with drone-<br />
          powered precision.
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl">Visualize real-time data</h1>
        <p class="text-sm">
          See locations and <br />
          sizes on an <br />
          interactive map.
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl">Insights at your fingertips</h1>
        <p class="text-sm">
          Explore trends, <br />
          weather, and stats <br />
          instantly.
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl">Drone-driven</h1>
        <p class="text-sm">
          Release agents to <br />
          manage invasives <br />
          efficiently.
        </p>
      </div>
    </div>
    <div class="w-full h-[526px] bg-[url(/public/drone.png)] bg-cover bg-center rounded-3xl"></div>
    <div class="w-full h-[345px] flex gap-8">
      <div class="w-1/3 bg-[url(/public/graph.png)] bg-cover bg-center rounded-3xl"></div>
      <div class="w-1/3 bg-[url(/public/map.png)] bg-cover bg-center rounded-3xl"></div>
      <div class="w-1/3 bg-[url(/public/plant.png)] bg-cover bg-center rounded-3xl"></div>
    </div>
  </div>
</template>
