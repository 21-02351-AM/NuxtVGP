<template>
	<v-container>
		<v-row align="center" class="mb-6">
			<v-col>
				<h1 class="text-h3">
					<v-icon size="large" class="mr-2">mdi-heart</v-icon>
					Favorite Rockets
				</h1>
			</v-col>
			<v-col cols="auto">
				<v-btn
					v-if="favoritesStore.favorites.length > 0"
					color="error"
					variant="outlined"
					prepend-icon="mdi-delete"
					@click="showClearDialog = true"
				>
					Clear All
				</v-btn>
			</v-col>
		</v-row>

		<v-alert v-if="favoritesStore.favorites.length === 0" type="info" variant="tonal" prominent>
			<v-alert-title class="text-h5">No Favorites Yet</v-alert-title>
			<div class="mt-2">Start exploring rockets and add them to your favorites!</div>
			<v-btn color="primary" class="mt-4" to="/launches">Browse Launches</v-btn>
		</v-alert>

		<v-row v-else>
			<v-col v-for="rocket in favoritesStore.favorites" :key="rocket.id" cols="12" md="6" lg="4">
				<v-card elevation="4" class="h-100">
					<v-card-title class="text-h5 d-flex align-center">
						{{ rocket.name }}
						<v-spacer />
						<v-btn
							icon
							size="small"
							color="red"
							@click="favoritesStore.removeFavorite(rocket.id)"
						>
							<v-icon>mdi-heart</v-icon>
						</v-btn>
					</v-card-title>

					<v-divider />

					<v-card-text>
						<p class="text-body-2 mb-4">
							{{ truncateText(rocket.description, 120) }}
						</p>

						<v-list density="compact">
							<v-list-item>
								<template #prepend>
									<v-icon>mdi-calendar</v-icon>
								</template>
								<v-list-item-title>First Flight</v-list-item-title>
								<v-list-item-subtitle>
									{{ formatDate(rocket.first_flight) }}
								</v-list-item-subtitle>
							</v-list-item>

							<v-list-item>
								<template #prepend>
									<v-icon>mdi-arrow-expand-vertical</v-icon>
								</template>
								<v-list-item-title>Height</v-list-item-title>
								<v-list-item-subtitle>
									{{ rocket.height.meters }} m / {{ rocket.height.feet }} ft
								</v-list-item-subtitle>
							</v-list-item>

							<v-list-item>
								<template #prepend>
									<v-icon>mdi-layers</v-icon>
								</template>
								<v-list-item-title>Stages</v-list-item-title>
								<v-list-item-subtitle>
									{{ rocket.stages }}
								</v-list-item-subtitle>
							</v-list-item>
						</v-list>
					</v-card-text>

					<v-card-actions>
						<v-btn color="primary" variant="text" :to="`/rockets/${rocket.id}`">
							View Details
						</v-btn>
						<v-btn
							v-if="rocket.wikipedia"
							color="secondary"
							variant="text"
							:href="rocket.wikipedia"
							target="_blank"
							icon
						>
							<v-icon>mdi-wikipedia</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<!-- Clear Confirmation Dialog -->
		<v-dialog v-model="showClearDialog" max-width="400">
			<v-card>
				<v-card-title class="text-h5">Clear All Favorites?</v-card-title>
				<v-card-text>
					This will remove all rockets from your favorites list. This action cannot be undone.
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn color="grey" variant="text" @click="showClearDialog = false">Cancel</v-btn>
					<v-btn color="error" variant="text" @click="clearAllFavorites">Clear All</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script setup lang="ts">
const favoritesStore = useFavoritesStore()
const showClearDialog = ref(false)

const clearAllFavorites = () => {
	favoritesStore.clearFavorites()
	showClearDialog.value = false
}

const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}

const truncateText = (text: string, length: number) => {
	if (text.length <= length) return text
	return text.substring(0, length) + '...'
}
</script>
