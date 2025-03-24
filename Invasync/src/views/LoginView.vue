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
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'
import { createClient } from '@supabase/supabase-js'
import { ref, computed } from 'vue'
import type { Database } from '@/types/database.types'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY,
)

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const goToSignUp = () => {
  router.push('/register')
}

const signInUser = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    errorMessage.value = 'Invalid email or password.'
    console.log(error.message)
  } else {
    console.log('User is logged in')
    router.push('/dashboard')
  }
}

const loginWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes: 'email profile',
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    console.error('Google login failed: ', error.message)
  } else if (data.url) {
    window.location.href = data.url
  }
}
</script>

<template>
  <div class="flex justify-center h-full items-center">
    <Card class="w-1/4 h-max shadow-xl">
      <CardHeader>
        <CardTitle class="text-center text-lg">Login or create an account</CardTitle>
        <CardDescription class="text-center">Enter your e-mail and password</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-3">
          <div>
            <Label for="email">Email</Label>
            <Input v-model="email" id="email" placeholder="name@example.com" />
          </div>
          <div>
            <Label for="password">Password</Label>
            <Input v-model="password" id="password" type="password" placeholder="Password" />
          </div>
          <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
            {{ errorMessage }}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div class="flex flex-col w-full gap-3">
          <Button @click="signInUser">Login</Button>
          <Button @click="goToSignUp">Create an account</Button>

          <div class="relative flex items-center w-full">
            <div class="flex-1 border-t border-gray-300"></div>
            <span class="mx-4 text-gray-500 text-sm uppercase whitespace-nowrap"
              >Or continue with</span
            >
            <div class="flex-1 border-t border-gray-300"></div>
          </div>
          <div>
            <Button
              @click="loginWithGoogle"
              variant="outline"
              class="w-full flex items-center justify-center gap-2"
            >
              <!-- Google logo -->
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                style="display: block"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              Sign in with Google
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>

<style></style>
