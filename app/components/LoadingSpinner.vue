<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center">
			<v-col cols="auto">
				<div class="text-center">
					<v-progress-circular :size="size" :width="width" color="primary" indeterminate />
					<p v-if="message" class="mt-4 text-h6">{{ message }}</p>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
interface Props {
	size?: number
	width?: number
	message?: string
}

withDefaults(defineProps<Props>(), {
	size: 70,
	width: 7,
	message: 'Loading...',
})
</script>
