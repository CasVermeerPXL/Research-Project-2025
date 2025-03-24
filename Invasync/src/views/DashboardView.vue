<script setup lang="ts">
import SearchbarComponent from '@/components/SearchbarComponent.vue'
import TabsComponent from '@/components/TabsComponent.vue'
import MapComponent from '@/components/MapComponent.vue'
</script>

<template>
  <div class="flex flex-col gap-20">
    <div class="flex justify-center items-center w-400">
      <SearchbarComponent class="mt-16"></SearchbarComponent>
    </div>
    <div class="flex justify-center items-center w-400">
      <MapComponent></MapComponent>
    </div>
    <div class="flex flex-col items-center">
      <TabsComponent></TabsComponent>
    </div>
  </div>
</template>

<style></style>
