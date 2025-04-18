<script setup lang="ts">
import { AreaChart } from '@/components/ui/chart-area'
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'


const supabase = createClient<Database>(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY,
)

type WeatherRow = {
  created_at: string;
  temperature: number | null;
}



const weatherData = ref<{ name: string; total: number }[]>([])

const fetchWeatherData = async () => {
  const { data: result, error } = await supabase
    .from('weather')
    .select('*')

  if (error) {
    console.error(error)
  } else {
    console.log(import.meta.env.VITE_SUPA_URL)
    console.log(result)
    const groupedData: Record<string, { name: string; total: number; count: number }> = {}
    result.forEach((row: WeatherRow) => {
      if (row.temperature !== null) {
      const month = new Date(row.created_at).toLocaleString('default', { month: 'short' })
      if (!groupedData[month]) groupedData[month] = { name: month, total: 0, count: 0 }
      groupedData[month].total += row.temperature
      groupedData[month].count++
      }
    })


    weatherData.value = Object.values(groupedData).map((d) => ({
      name: d.name,
      total: d.total / d.count,
    }))
  }
  console.log('Weather Data:', weatherData.value)

}

onMounted(() => {
  fetchWeatherData()
})
</script>

<template>
  <AreaChart :data="weatherData" index="name" :categories="['total']" :colors="['#3DA35D', '#5FCB89']"/>
</template>
