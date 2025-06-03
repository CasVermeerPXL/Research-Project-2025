<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY
)

const chartData = ref<{ name: string; total: number }[]>([])
const TOTAL_AREA = 1000

const fetchCoverageData = async () => {
  const { data, error } = await supabase
    .from('hyacinth')
    .select('hyacinth_area')
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) {
    console.error('Error fetching hyacinth data:', error)
    return
  }

  const latest = data?.[0]

  if (latest && latest.hyacinth_area !== null) {
    const waterCoverage = TOTAL_AREA - latest.hyacinth_area

    chartData.value = [
      { name: 'Hyacinth', total: latest.hyacinth_area },
      { name: 'Water', total: waterCoverage },
    ]
  }
}

function valueFormatter(tick: number) {
  return typeof tick === 'number'
    ? `${tick.toLocaleString()} m²`
    : ''
}

onMounted(() => {
  fetchCoverageData()
})
</script>

<template>
  <DonutChart
  index="name"
  :category="'total'"
  :data="chartData"
  :value-formatter="valueFormatter"
  :colors="['#10B981', '#3B82F6']"
/>
</template>
