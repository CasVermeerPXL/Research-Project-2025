<script setup lang="ts">
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AreaChartComponent from '@/components/AreaChartComponent.vue';
  import BarChartComponent from '@/components/BarChartComponent.vue';
  import DonutChartComponent from '@/components/DonutChartComponent.vue';
</script>

<template>
  <Tabs default-value="Stats" class="w-[160px]">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="Stats">
        Stats
      </TabsTrigger>
      <TabsTrigger value="Charts">
        Charts
      </TabsTrigger>
    </TabsList>
    <TabsContent value="Stats">
      <div class="grid grid-cols-4 gap-2 w-[1020px]">
        <div class="w-[250px]">
      <Card class="h-[220px]  flex flex-col justify-center items-center">
    <CardHeader>
      <CardTitle>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 17a1 1 0 1 0 2 0a1 1 0 1 0-2 0M6 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 11L18 6"/></svg>
      </CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent class="text-lg">
      <p>55%</p>
    </CardContent>
    <CardFooter class="text-sm">
      <p>Water hyacinth coverage</p>
    </CardFooter>
  </Card>
</div>
<div class="w-[250px]">
      <Card class="h-[220px] flex flex-col justify-center items-center">
    <CardHeader>
      <CardTitle>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h4.5L9 6l4 12l2-9l1.5 3H21"/></svg>
      </CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent class="text-lg">
      <p>-22%</p>
    </CardContent>
    <CardFooter class="text-sm">
      <p>Growth rate</p>
    </CardFooter>
  </Card>
</div>
<div class="w-[250px]">
      <Card class="h-[220px]  flex flex-col justify-center items-center">
    <CardHeader>
      <CardTitle>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 1 0-5.656-5.656a4 4 0 0 0 5.656 5.656m-8.485 2.829l-1.414 1.414M6.343 6.343L4.929 4.929m12.728 1.414l1.414-1.414m-1.414 12.728l1.414 1.414M4 12H2m10-8V2m8 10h2m-10 8v2"/></svg>
      </CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent class="text-lg">
      <p>23°</p>
    </CardContent>
    <CardFooter class="text-sm">
      <p>Temperature in celsius</p>
    </CardFooter>
  </Card>
</div>
<div class="w-[250px]">
      <Card class="h-[220px] flex flex-col justify-center items-center">
    <CardHeader>
      <CardTitle>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 12v.01M10 12v.01M12 10v.01M12 14v.01M4.5 12.5l8-8a4.94 4.94 0 0 1 7 7l-8 8a4.94 4.94 0 0 1-7-7"/></svg>
      </CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent class="text-lg">
      <p>~137,000</p>
    </CardContent>
    <CardFooter class="text-sm">
      <p>Active control agents</p>
    </CardFooter>
  </Card>
</div>
<div class="w-[250px]">
      <Card class="h-[220px] flex flex-col justify-center items-center">
    <CardHeader>
      <CardTitle>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m9 0l3 2m-3-7v5"/></svg>
      </CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent class="text-lg">
      <p>1d</p>
    </CardContent>
    <CardFooter class="text-sm">
      <p>Last updated</p>
    </CardFooter>
  </Card>
</div>
</div>
    </TabsContent>
    <TabsContent value="Charts">
      <div class="flex flex-col justify-center gap-4">
        <div class="flex flex-row ml-52">
        <div class="flex justify-center items-center">
          <AreaChartComponent class=""></AreaChartComponent>
          </div>
          <div class="flex justify-center items-center">
          <BarChartComponent></BarChartComponent>
        </div>
      </div>
      <div class="flex flex-row ml-52">
        <div class="flex justify-center items-center">
          <AreaChartComponent></AreaChartComponent>
          </div>
          <div class="flex justify-center items-center">
          <DonutChartComponent></DonutChartComponent>
        </div>
      </div>
      </div>
    </TabsContent>
  </Tabs>
</template>
