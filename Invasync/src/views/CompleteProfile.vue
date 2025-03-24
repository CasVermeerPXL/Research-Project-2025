<template>
  <div class="flex justify-center h-full items-center">
    <Card class="w-1/3 h-max shadow-xl">
      <CardHeader>
        <CardTitle class="text-center text-lg">Complete Your Profile</CardTitle>
        <CardDescription class="text-center">
          Please fill in the required fields to complete your profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-3">
          <div>
            <Label for="firstName">First Name</Label>
            <Input
              v-model="firstName"
              id="firstName"
              type="text"
              placeholder="First Name"
              :class="{ 'border-red-500': errors.firstName }"
            />
            <p v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</p>
          </div>
          <div>
            <Label for="lastName">Last Name</Label>
            <Input
              v-model="lastName"
              id="lastName"
              type="text"
              placeholder="Last Name"
              :class="{ 'border-red-500': errors.lastName }"
            />
            <p v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</p>
          </div>
          <div>
            <Label for="username">Username</Label>
            <Input
              v-model="username"
              id="username"
              type="text"
              placeholder="Username"
              :class="{ 'border-red-500': errors.username }"
            />
            <p v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</p>
          </div>
          <Button @click="completeProfile" class="mt-4">Save</Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY,
)

const router = useRouter()
const firstName = ref('')
const lastName = ref('')
const username = ref('')
const errors = ref({
  firstName: '',
  lastName: '',
  username: '',
})

onMounted(async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (!user || authError) {
    router.push('/login')
    return
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('first_name, last_name, username')
    .eq('user_id', user.id)
    .single()

  if (!profileError && profile) {
    firstName.value = profile.first_name || ''
    lastName.value = profile.last_name || ''
    username.value = profile.username || ''
  }
})

const validateForm = () => {
  errors.value = { firstName: '', lastName: '', username: '' }
  let isValid = true

  if (!firstName.value) {
    errors.value.firstName = 'First name is required'
    isValid = false
  }
  if (!lastName.value) {
    errors.value.lastName = 'Last name is required'
    isValid = false
  }
  if (!username.value) {
    errors.value.username = 'Username is required'
    isValid = false
  }

  return isValid
}

const completeProfile = async () => {
  if (!validateForm()) {
    return
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (!user || authError) {
    router.push('/login')
    return
  }

  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('user_id')
    .eq('user_id', user.id)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    // No row found
    console.error('Error fetching profile:', fetchError)
    return
  }

  if (profile) {
    // Update existing profile
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        first_name: firstName.value,
        last_name: lastName.value,
        username: username.value,
      })
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Error updating profile:', updateError)
    } else {
      router.push('/dashboard')
    }
  } else {
    // Insert new profile (fallback if trigger fails)
    const { error: insertError } = await supabase.from('profiles').insert({
      user_id: user.id,
      first_name: firstName.value,
      last_name: lastName.value,
      username: username.value,
    })

    if (insertError) {
      console.error('Error inserting profile:', insertError)
    } else {
      router.push('/dashboard')
    }
  }
}
</script>
