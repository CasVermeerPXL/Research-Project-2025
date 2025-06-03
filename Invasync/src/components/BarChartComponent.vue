<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY
)

const chartData = ref<{ name: string; flights: number }[]>([])

const fetchDroneFlightCounts = async () => {
  const { data, error } = await supabase
    .from('drone_flights')
    .select(`
      drone_id,
      drones (model)
    `)

  if (error) {
    console.error('Error fetching data:', error)
    return
  }

  const counts: Record<string, number> = {}

  data?.forEach(flight => {
    const model = flight.drones?.model || 'Unknown'
    counts[model] = (counts[model] || 0) + 1
  })

  chartData.value = Object.entries(counts).map(([model, flights]) => ({
    name: model,
    flights,
  }))
}

onMounted(() => {
  fetchDroneFlightCounts()
})
</script>

<template>
  <BarChart
    :data="chartData"
    index="name"
    :categories="['flights']"
    :colors="['#2E8540']"
    :y-formatter="tick =>
      typeof tick === 'number' ? `${tick} flights` : ''
    "
  />
</template>
