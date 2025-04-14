<script setup lang="ts">
import { AreaChart } from '@/components/ui/chart-area'
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

// const data = [
//   {
//     name: 'Jan',
//     total: Math.floor(Math.random() * 2000) + 500,
//     predicted: Math.floor(Math.random() * 2000) + 500,
//   },
//   {
//     name: 'Feb',
//     total: Math.floor(Math.random() * 2000) + 500,
//     predicted: Math.floor(Math.random() * 2000) + 500,
//   },
//   {
//     name: 'Mar',
//     total: Math.floor(Math.random() * 2000) + 500,
//     predicted: Math.floor(Math.random() * 2000) + 500,
//   },
//   {
//     name: 'Apr',
//     total: Math.floor(Math.random() * 2000) + 500,
//     predicted: Math.floor(Math.random() * 2000) + 500,
//   },
//   {
//     name: 'May',
//     total: Math.floor(Math.random() * 2000) + 500,
//     predicted: Math.floor(Math.random() * 2000) + 500,
//   },
//   {
//     name: 'Jun',
//     total: Math.floor(Math.random() * 2000) + 500,
//     predicted: Math.floor(Math.random() * 2000) + 500,
//   },
//   {
//     name: 'Jul',
//     total: Math.floor(Math.random() * 2000) + 500,
//     predicted: Math.floor(Math.random() * 2000) + 500,
//   },
// ]

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
    .select('created_at, temperature')

  if (error) {
    console.error(error)
  } else {
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
  <AreaChart :data="weatherData" index="name" :categories="['name', 'total']" :colors="['#3DA35D', '#5FCB89']"/>
</template>
