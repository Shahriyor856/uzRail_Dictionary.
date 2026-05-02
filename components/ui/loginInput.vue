<template>
  <div class="flex flex-col gap-2">
    <label
      v-if="label"
      class="text-xs font-medium text-slate-400 uppercase tracking-wider"
    >
      {{ label }}
    </label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :placeholder="placeholder"
      autocomplete="autocomplete"
      class="w-full bg-white/[0.06] border border-white/10 rounded-[10px] py-2 sm:py-3 px-3 sm:px-4 text-white text-sm placeholder:text-white/25 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-blue-900/10"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  type: { type: String, default: "text" },
  autocomplete: String,
  placeholder: String,
});

defineEmits(["update:modelValue"]);
</script>
