<template>
  <div>Loading...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY,
)
const router = useRouter()

onMounted(async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    console.log('No user found, redirecting to /login')
    router.push('/login')
    return
  }

  // Check if profile exists and has a username
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('username, first_name, last_name')
    .eq('user_id', user.id)
    .single()
  if (profileError || !profile || !profile.username || !profile.first_name || !profile.last_name) {
    // No profile exists yet (trigger might still be running), redirect to complete-profile
    router.push('/complete-profile')
  } else {
    // Profile is complete
    router.push('/dashboard')
  }
})
</script>
