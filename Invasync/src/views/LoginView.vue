<script setup lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
  import {
    Input
  } from '@/components/ui/input'
  import {
    Label
  } from '@/components/ui/label'
  import {
    Button
  } from '@/components/ui/button'
    import { Globe } from 'lucide-vue-next'
  import {useRouter} from 'vue-router'

  const router = useRouter()

  const goToSignUp = () => {
    router.push('/register')
  }

  const loginWithGoogle = () => {
    //TODO: write code for functionality (collaboration with supabase)
  }
</script>

<template>
  <div class="flex justify-center h-full items-center">
      <Card class="w-1/4 h-max  shadow-xl">
    <CardHeader>
      <CardTitle class="text-center text-lg">Login or create an account</CardTitle>
      <CardDescription class="text-center">Enter your e-mail and password</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-3">
      <div>
        <Label for="email">Email</Label>
      <Input id="email" placeholder="name@example.com"/>
    </div>
    <div>
      <Label for="password">Password</Label>
      <Input id="password" type="password" placeholder="Password"/>
    </div>
  </div>
    </CardContent>
    <CardFooter>
      <div class="flex flex-col w-full gap-3">
      <Button>Login</Button>
      <Button @click="goToSignUp">Create an account</Button>

      <div class="relative flex items-center w-full">
    <div class="flex-1 border-t border-gray-300"></div>
    <span class="mx-4 text-gray-500 text-sm uppercase whitespace-nowrap">Or continue with</span>
    <div class="flex-1 border-t border-gray-300"></div>
  </div>
  <div>
  <Button @click="loginWithGoogle" variant="outline" class="w-full flex items-center justify-center gap-2">
    <Globe class="w-5 h-5" />
    Google
  </Button>
</div>
</div>

    </CardFooter>
  </Card>
</div>
</template>

<style>
</style>
