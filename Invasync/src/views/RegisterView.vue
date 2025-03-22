<script setup lang="ts">
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

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dwtvxirvtrytdidjatxo.supabase.co'
const anonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3dHZ4aXJ2dHJ5dGRpZGphdHhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3OTExMjAsImV4cCI6MjA1NzM2NzEyMH0.4ZBfJSwEQjdDGHpnlhjZMWLybnqUZyaZlsQC_s8J_bc'
const supabase = createClient(supabaseUrl, anonKey)

const router = useRouter()
const email = ref('')
const firstName = ref('')
const lastName = ref('')
const password = ref('')
const confirmPassword = ref('')

const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const passwordsMatch = computed(() => {
  return confirmPassword.value === '' || password.value === confirmPassword.value
})

const validateForm = () => {
  errors.value = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  let isValid = true

  if (!firstName.value) {
    errors.value.firstName = 'First name is required'
    isValid = false
  }
  if (!lastName.value) {
    errors.value.lastName = 'Last name is required'
    isValid = false
  }
  if (!email.value) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.value.email = 'Invalid email format'
    isValid = false
  }
  if (!password.value) {
    errors.value.password = 'Password is required'
    isValid = false
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters long'
    isValid = false
  }
  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Please confirm your password'
    isValid = false
  } else if (!passwordsMatch.value) {
    isValid = false
  }

  return isValid
}

const signUpUser = async () => {
  if (!validateForm()) {
    return
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        first_name: firstName.value,
        last_name: lastName.value,
      },
    },
  })

  if (error) {
    console.log(error.message)
  } else {
    console.log('User is registered')
    router.push('/login')
  }
}
</script>

<template>
  <div class="flex justify-center h-full items-center">
    <Card class="w-1/3 h-max shadow-xl">
      <CardHeader>
        <CardTitle class="text-center text-lg">Create an account</CardTitle>
        <CardDescription class="text-center"
          >Enter your details below to create your account</CardDescription
        >
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-3">
          <div>
            <Label for="firstName">First name</Label>
            <Input
              v-model="firstName"
              id="firstName"
              placeholder="First name"
              :class="{ 'border-red-500': errors.firstName }"
            />
            <p v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</p>
          </div>
          <div>
            <Label for="lastName">Last name</Label>
            <Input
              v-model="lastName"
              id="lastName"
              placeholder="Last name"
              :class="{ 'border-red-500': errors.lastName }"
            />
            <p v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</p>
          </div>
          <div>
            <Label for="email">Email</Label>
            <Input
              v-model="email"
              id="email"
              placeholder="name@example.com"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
          </div>
          <div>
            <Label for="password">Password</Label>
            <Input
              v-model="password"
              id="password"
              type="password"
              placeholder="Password"
              :class="{ 'border-red-500': errors.password }"
            />
            <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
          </div>
          <div>
            <Label for="confirmPassword">Password</Label>
            <Input
              v-model="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              :class="{ 'border-red-500': errors.confirmPassword }"
            />
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm">
              {{ errors.confirmPassword }}
            </p>
            <p v-if="!passwordsMatch && confirmPassword" class="text-red-500 text-sm">
              Passwords do not match
            </p>
          </div>
          <Button @click="signUpUser" class="mt-4">Sign in</Button>
        </div>
      </CardContent>
      <CardFooter> </CardFooter>
    </Card>
  </div>
</template>

<style></style>
