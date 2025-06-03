<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY
)

const weatherData = ref<{ name: string; Temperature: number; Humidity: number; Rainfall: number; WaterTemperature: number; Date: string }[]>([])

const fetchWeatherData = async () => {
  const { data: weather, error: weatherError } = await supabase
    .from('weather')
    .select('created_at, temperature, humidity, rainfall, water_temperature')
    .order('created_at', { ascending: true })
    .limit(20)

  if (weatherError) {
    console.error('Error fetching weather data:', weatherError)
    return
  }

  weatherData.value = weather.map((entry, index) => ({
  name: `Data Point ${index + 1}`,
  Temperature: entry.temperature ?? null,
  Humidity: entry.humidity ?? null,
  Rainfall: entry.rainfall ?? null,
  WaterTemperature: entry.water_temperature ?? null,
  Date: new Date(entry.created_at).toISOString().split('T')[0],
}))

}

onMounted(() => {
  fetchWeatherData()
})
</script>

<template>
  <LineChart
    :data="weatherData"
    index="Date"
    :categories="['Temperature', 'Humidity', 'Rainfall', 'WaterTemperature']"
    :colors="['#FF5733', '#33C4FF', '#33FF6F', '#9C33FF']"
    :x-axis="{
      labelRotation: 45,
      labelFormatter: (value: any) => new Date(value).toLocaleDateString(),
    }"
  />
</template>

<!-- <script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY,
)

const deploymentEffectivenessData = ref<{ name: string; Before: number; After: number }[]>([])

const fetchDeploymentEffectiveness = async () => {
  const { data: flights, error: flightsError } = await supabase
    .from('drone_flights')
    .select('flight_id')

  if (flightsError) {
    console.error('Error fetching flights data:', flightsError)
    return
  }

  const flightIds = flights.map(f => f.flight_id)

  const { data: deployments, error: deploymentsError } = await supabase
    .from('hopper_deployments')
    .select('deployment_id, flight_id, deployment_time')
    .in('flight_id', flightIds)

  if (deploymentsError) {
    console.error('Error fetching deployments data:', deploymentsError)
    return
  }

  const { data: hyacinthData, error: hyacinthError } = await supabase
    .from('hyacinth')
    .select('flight_id, hyacinth_area, created_at')
    .in('flight_id', flightIds)

  if (hyacinthError) {
    console.error('Error fetching hyacinth data:', hyacinthError)
    return
  }

  const groupedByFlight: Record<string, { before: number | null; after: number | null; deploymentTime: string }> = {}

  for (const flight of flights) {
    const flightId = flight.flight_id
    const deployment = deployments.find(d => d.flight_id === flightId)
    if (!deployment) continue

    const deploymentTime = new Date(deployment.deployment_time).getTime()

    const hyacinthForFlight = hyacinthData.filter(h => h.flight_id === flightId)

    const hyacinthBefore = hyacinthForFlight
      .filter(h => new Date(h.created_at).getTime() < deploymentTime)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]

    const hyacinthAfter = hyacinthForFlight
      .filter(h => new Date(h.created_at).getTime() >= deploymentTime)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())[0]

    console.log(`Flight ${flightId} → Deployment: ${deployment.deployment_time}`)
    console.log(`  Before: ${hyacinthBefore?.created_at} | Area: ${hyacinthBefore?.hyacinth_area}`)
    console.log(`  After: ${hyacinthAfter?.created_at} | Area: ${hyacinthAfter?.hyacinth_area}`)

    groupedByFlight[flightId] = {
      before: hyacinthBefore?.hyacinth_area ?? null,
      after: hyacinthAfter?.hyacinth_area ?? null,
      deploymentTime: deployment.deployment_time,
    }
  }


  deploymentEffectivenessData.value = Object.entries(groupedByFlight)
    .slice(0, 10)
    .map(([flightId, d], index) => ({
      name: `Flight ${index + 1}`,
      Before: d.before ?? 0,
      After: d.after ?? 0,
    }))
}
onMounted(() => {
  fetchDeploymentEffectiveness()
})
</script>

<template>
  <LineChart
    :data="deploymentEffectivenessData"
    index="name"
    :categories="['Before', 'After']"
    :colors="['#EF4444', '#3B82F6']"
  />
</template> -->
