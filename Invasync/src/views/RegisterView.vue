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
    Button
  } from '@/components/ui/button'
  import {
    Label
  } from '@/components/ui/label'
  import { cn } from '@/utils'


import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const value = ref<DateValue>()
</script>

<template>
  <div class="flex justify-center h-full items-center">
    <Card class="w-1/3 h-max shadow-xl">
    <CardHeader>
      <CardTitle class="text-center text-lg">Create an account</CardTitle>
      <CardDescription class="text-center">Enter your details below to create your account</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-3">
        <div>
        <Label for="firstName">First name</Label>
      <Input id="firstName" placeholder="First name"/>
    </div>
        <div>
        <Label for="lastName">Last name</Label>
      <Input id="lastName" placeholder="Last name"/>
    </div>
        <div>
        <Label for="email">Email</Label>
      <Input id="email" placeholder="name@example.com"/>
    </div>
    <div class="flex flex-col gap-1.5">
      <Label for="date">Date of birth</Label>
    <Popover id="date">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-full justify-start text-left font-normal',
          !value && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</div>
<div>
  <Label for="password">Password</Label>
  <Input id="password" type="password" placeholder="Password"/>
</div>
<div>
  <Label for="conformPassword">Password</Label>
  <Input id="conformPassword" type="password" placeholder="Confirm Password"/>
</div>
      <Button class="mt-4">Sign in</Button>
    </div>
    </CardContent>
    <CardFooter>

    </CardFooter>
  </Card>
</div>
</template>

<style>
</style>
