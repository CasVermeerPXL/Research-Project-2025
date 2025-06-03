<script setup lang="ts">
import { AreaChart } from '@/components/ui/chart-area'
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'


const supabase = createClient<Database>(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY,
)

// type WeatherRow = {
//   created_at: string;
//   temperature: number | null;
// }



// const weatherData = ref<{ name: string; total: number }[]>([])

// const fetchWeatherData = async () => {
//   const { data: result, error } = await supabase
//     .from('weather')
//     .select('*')

//   if (error) {
//     console.error(error)
//   } else {
//     console.log(import.meta.env.VITE_SUPA_URL)
//     console.log(result)
//     const groupedData: Record<string, { name: string; total: number; count: number }> = {}
//     result.forEach((row: WeatherRow) => {
//       if (row.temperature !== null) {
//       const month = new Date(row.created_at).toLocaleString('default', { month: 'short' })
//       if (!groupedData[month]) groupedData[month] = { name: month, total: 0, count: 0 }
//       groupedData[month].total += row.temperature
//       groupedData[month].count++
//       }
//     })


//     weatherData.value = Object.values(groupedData).map((d) => ({
//       name: d.name,
//       total: d.total / d.count,
//     }))
//   }
//   console.log('Weather Data:', weatherData.value)

// }

// onMounted(() => {
//   fetchWeatherData()
// })

type HyacinthRow = {
  created_at: string;
  hyacinth_area: number | null;
}

const hyacinthData = ref<{ name: string; total: number }[]>([])

const fetchHyacinthData = async () => {
  const { data: result, error } = await supabase
    .from('hyacinth')
    .select('*')

  if (error) {
    console.error('Error fetching hyacinth data:', error)
    return
  }

  const groupedData: Record<string, { name: string; total: number; count: number }> = {}

  result.forEach((row: HyacinthRow) => {
    if (row.hyacinth_area !== null) {
      const month = new Date(row.created_at).toLocaleString('en-US', { month: 'short' })
      if (!groupedData[month]) {
        groupedData[month] = { name: month, total: 0, count: 0 }
      }
      groupedData[month].total += row.hyacinth_area
      groupedData[month].count++
    }
  })

  const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

hyacinthData.value = Object.values(groupedData)
  .map(d => ({
    name: d.name,
    total: d.total / d.count,
  }))
  .sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name))


  console.log('Hyacinth Data:', hyacinthData.value)
}

onMounted(() => {
  fetchHyacinthData()
})
</script>

<template>
  <AreaChart :data="hyacinthData" index="name" :categories="['total']" :colors="['#3DA35D', '#5FCB89']"/>
</template>
