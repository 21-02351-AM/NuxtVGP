<template>
	<v-container>
		<v-btn to="/launches" color="primary" variant="text" class="mb-4" prepend-icon="mdi-arrow-left">
			Back to Launches
		</v-btn>

		<v-card v-if="rocket" elevation="4">
			<v-card-title class="text-h3 pa-6">
				{{ rocket.name }}
				<v-btn :color="isFavorite ? 'red' : 'grey'" icon class="ml-4" @click="toggleFavorite">
					<v-icon>{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
				</v-btn>
			</v-card-title>

			<v-divider />

			<v-card-text class="pa-6">
				<v-row>
					<v-col cols="12">
						<h3 class="text-h5 mb-3">Description</h3>
						<p class="text-body-1">{{ rocket.description }}</p>
					</v-col>
				</v-row>

				<v-row class="mt-4">
					<v-col cols="12" md="6">
						<v-card variant="outlined">
							<v-card-title class="bg-primary">
								<v-icon start>mdi-calendar</v-icon>
								First Flight
							</v-card-title>
							<v-card-text class="text-h6 pa-4">
								{{ formatDate(rocket.first_flight) }}
							</v-card-text>
						</v-card>
					</v-col>

					<v-col cols="12" md="6">
						<v-card variant="outlined">
							<v-card-title class="bg-primary">
								<v-icon start>mdi-layers</v-icon>
								Number of Stages
							</v-card-title>
							<v-card-text class="text-h6 pa-4">{{ rocket.stages }} Stages</v-card-text>
						</v-card>
					</v-col>
				</v-row>

				<v-row class="mt-4">
					<v-col cols="12" md="4">
						<v-card variant="outlined" color="blue-lighten-5">
							<v-card-title>
								<v-icon start>mdi-arrow-expand-vertical</v-icon>
								Height
							</v-card-title>
							<v-card-text>
								<div class="text-h6">{{ rocket.height.meters }} m</div>
								<div class="text-caption">{{ rocket.height.feet }} ft</div>
							</v-card-text>
						</v-card>
					</v-col>

					<v-col cols="12" md="4">
						<v-card variant="outlined" color="green-lighten-5">
							<v-card-title>
								<v-icon start>mdi-diameter</v-icon>
								Diameter
							</v-card-title>
							<v-card-text>
								<div class="text-h6">{{ rocket.diameter.meters }} m</div>
								<div class="text-caption">{{ rocket.diameter.feet }} ft</div>
							</v-card-text>
						</v-card>
					</v-col>

					<v-col cols="12" md="4">
						<v-card variant="outlined" color="orange-lighten-5">
							<v-card-title>
								<v-icon start>mdi-weight</v-icon>
								Mass
							</v-card-title>
							<v-card-text>
								<div class="text-h6">{{ rocket.mass.kg.toLocaleString() }} kg</div>
								<div class="text-caption">{{ rocket.mass.lb.toLocaleString() }} lb</div>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>

				<v-row v-if="rocket.wikipedia" class="mt-4">
					<v-col cols="12">
						<v-btn
							:href="rocket.wikipedia"
							target="_blank"
							color="primary"
							size="large"
							prepend-icon="mdi-wikipedia"
						>
							View on Wikipedia
						</v-btn>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<v-alert v-else type="error" class="mt-4">Rocket not found</v-alert>
	</v-container>
</template>

<script setup lang="ts">
interface Rocket {
	id: string
	name: string
	description: string
	first_flight: string
	height: {
		meters: number
		feet: number
	}
	diameter: {
		meters: number
		feet: number
	}
	mass: {
		kg: number
		lb: number
	}
	stages: number
	wikipedia: string
}

const route = useRoute()
const rocketId = route.params.id as string

const query = gql`
	query GetRocket($id: ID!) {
		rocket(id: $id) {
			id
			name
			description
			first_flight
			height {
				meters
				feet
			}
			diameter {
				meters
				feet
			}
			mass {
				kg
				lb
			}
			stages
			wikipedia
		}
	}
`

const { data } = await useAsyncQuery<{ rocket: Rocket }>(query, { id: rocketId })
const rocket = computed(() => data.value?.rocket)

// Favorites functionality (will be connected to Pinia in Task 7)
const favoritesStore = useFavoritesStore()
const isFavorite = computed(() => (rocket.value ? favoritesStore.isFavorite(rocket.value.id) : false))

const toggleFavorite = () => {
	if (rocket.value) {
		if (isFavorite.value) {
			favoritesStore.removeFavorite(rocket.value.id)
		} else {
			favoritesStore.addFavorite(rocket.value)
		}
	}
}

const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}
</script>
