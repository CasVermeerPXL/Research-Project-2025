<script setup lang="ts">
import { cn } from '../utils'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
} from '@/components/ui/combobox'
import { Check, Search } from 'lucide-vue-next'

const frameworks = [
  { value: 'water hyacinth coverage', label: 'Water hyacinth coverage' },
  { value: 'growth rate', label: 'Growth rate' },
  { value: 'temperature in celsius', label: 'Temperature in celsius' },
  { value: 'active control agents', label: 'Active control agents' },
  { value: 'last updated', label: 'Last updated' },
  { value: 'hyacinth coverage graph', label: 'Hyacinth coverage graph' },
  { value: 'hyacinth vs water', label: 'Hyacinth vs water' },
  { value: 'example graph 1', label: 'Example graph 1' },
  { value: 'example graph 2', label: 'Example graph 2' },
]

//If i don't add this part, typescript gives me an error because i don't give 'val' a type
type Framework = { value: string; label: string }
</script>

<template>
  <Combobox by="label">
    <ComboboxAnchor>
      <div class="relative w-full max-w-sm items-center">
        <ComboboxInput
          class="pl-9"
          :display-value="(val: Framework) => val?.label ?? ''"
          placeholder="Search..."
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>
    </ComboboxAnchor>

    <ComboboxList>
      <ComboboxEmpty> No data found. </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem v-for="framework in frameworks" :key="framework.value" :value="framework">
          {{ framework.label }}

          <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
