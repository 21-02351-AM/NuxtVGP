<template>
	<v-container>
		<v-row align="center" justify="center" class="my-12">
			<v-col cols="12" md="8" class="text-center">
				<v-icon size="120" color="primary" class="mb-4">mdi-rocket-launch</v-icon>
				<h1 class="text-h2 font-weight-bold mb-4">SpaceX Explorer</h1>
				<p class="text-h5 text-grey mb-8">
					Explore SpaceX launches, rockets, and missions powered by GraphQL
				</p>
				<v-btn size="x-large" color="primary" to="/launches" prepend-icon="mdi-rocket">
					Explore Launches
				</v-btn>
			</v-col>
		</v-row>

		<v-row class="my-12">
			<v-col cols="12" md="4">
				<v-card elevation="4" class="h-100">
					<v-card-text class="text-center pa-6">
						<v-icon size="64" color="blue" class="mb-4">mdi-rocket-launch-outline</v-icon>
						<h3 class="text-h5 mb-3">Browse Launches</h3>
						<p class="text-body-1">
							Explore all SpaceX launches with detailed mission information, dates, and launch
							sites.
						</p>
					</v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" md="4">
				<v-card elevation="4" class="h-100">
					<v-card-text class="text-center pa-6">
						<v-icon size="64" color="green" class="mb-4">mdi-filter-variant</v-icon>
						<h3 class="text-h5 mb-3">Filter & Sort</h3>
						<p class="text-body-1">
							Filter launches by year and sort by date to find exactly what you're looking for.
						</p>
					</v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" md="4">
				<v-card elevation="4" class="h-100">
					<v-card-text class="text-center pa-6">
						<v-icon size="64" color="red" class="mb-4">mdi-heart</v-icon>
						<h3 class="text-h5 mb-3">Save Favorites</h3>
						<p class="text-body-1">
							Mark your favorite rockets and access them anytime from your personalized
							favorites list.
						</p>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<v-row class="my-12">
			<v-col cols="12">
				<v-card color="primary" dark elevation="8">
					<v-card-text class="pa-8">
						<v-row align="center">
							<v-col cols="12" md="8">
								<h2 class="text-h4 mb-3">Technologies Used</h2>
								<v-chip-group>
									<v-chip color="white" text-color="primary">Nuxt 3</v-chip>
									<v-chip color="white" text-color="primary">Vue 3</v-chip>
									<v-chip color="white" text-color="primary">Vuetify</v-chip>
									<v-chip color="white" text-color="primary">GraphQL</v-chip>
									<v-chip color="white" text-color="primary">Pinia</v-chip>
									<v-chip color="white" text-color="primary">TypeScript</v-chip>
								</v-chip-group>
							</v-col>
							<v-col cols="12" md="4" class="text-center">
								<v-btn
									size="large"
									color="white"
									href="https://github.com/stephenjason89/nuxt-vuetify-graphql-pinia-starter"
									target="_blank"
									prepend-icon="mdi-github"
								>
									View on GitHub
								</v-btn>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- Stats Section -->
		<v-row class="my-12">
			<v-col cols="12" class="text-center mb-6">
				<h2 class="text-h3 font-weight-bold">Quick Stats</h2>
			</v-col>
			<v-col cols="12" md="4">
				<v-card elevation="4">
					<v-card-text class="text-center pa-6">
						<v-icon size="48" color="primary" class="mb-3">mdi-rocket</v-icon>
						<div class="text-h3 font-weight-bold">{{ ships?.length || 0 }}</div>
						<div class="text-h6 text-grey">Ships Available</div>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="4">
				<v-card elevation="4">
					<v-card-text class="text-center pa-6">
						<v-icon size="48" color="success" class="mb-3">mdi-check-circle</v-icon>
						<div class="text-h3 font-weight-bold">{{ activeShips }}</div>
						<div class="text-h6 text-grey">Active Ships</div>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="4">
				<v-card elevation="4">
					<v-card-text class="text-center pa-6">
						<v-icon size="48" color="red" class="mb-3">mdi-heart</v-icon>
						<div class="text-h3 font-weight-bold">{{ favoritesCount }}</div>
						<div class="text-h6 text-grey">Your Favorites</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts" setup>
const favoritesStore = useFavoritesStore()
const favoritesCount = computed(() => favoritesStore.favorites.length)

const query = gql`
	query getShips {
		ships {
			id
			name
			active
		}
	}
`
const { data } = useAsyncQuery<{
	ships: {
		id: string
		name: string
		active: boolean
	}[]
}>(query)
const ships = computed(() => data.value?.ships ?? [])
const activeShips = computed(() => ships.value.filter((s) => s.active).length)
</script>
