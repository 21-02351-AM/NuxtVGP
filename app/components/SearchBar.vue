<template>
	<v-text-field
		v-model="searchQuery"
		label="Search launches..."
		prepend-inner-icon="mdi-magnify"
		variant="outlined"
		density="comfortable"
		clearable
		hide-details
		@update:model-value="$emit('update:modelValue', searchQuery)"
	>
		<template #append-inner>
			<v-fade-transition>
				<v-icon v-if="searchQuery" color="success">mdi-check</v-icon>
			</v-fade-transition>
		</template>
	</v-text-field>
</template>

<script setup lang="ts">
const searchQuery = defineModel<string>({ default: '' })

defineEmits<{
	'update:modelValue': [value: string]
}>()
</script>
