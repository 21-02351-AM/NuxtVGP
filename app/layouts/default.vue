<template>
	<v-app>
		<!-- Navigation Bar -->
		<v-app-bar color="primary" prominent>
			<v-app-bar-nav-icon @click="drawer = !drawer" />

			<v-toolbar-title class="text-h5 font-weight-bold">
				<v-icon size="large" class="mr-2">mdi-rocket-launch</v-icon>
				SpaceX Explorer
			</v-toolbar-title>

			<v-spacer />

			<v-btn icon to="/favorites">
				<v-badge :content="favoritesCount" :model-value="favoritesCount > 0" color="red">
					<v-icon>mdi-heart</v-icon>
				</v-badge>
			</v-btn>
		</v-app-bar>

		<!-- Navigation Drawer -->
		<v-navigation-drawer v-model="drawer" temporary>
			<v-list>
				<v-list-item prepend-icon="mdi-home" title="Home" to="/" />
				<v-list-item prepend-icon="mdi-rocket-launch" title="Launches" to="/launches" />
				<v-list-item prepend-icon="mdi-heart" title="Favorites" to="/favorites">
					<template #append>
						<v-chip v-if="favoritesCount > 0" color="red" size="small">
							{{ favoritesCount }}
						</v-chip>
					</template>
				</v-list-item>
			</v-list>

			<template #append>
				<div class="pa-4">
					<v-btn
						block
						color="primary"
						href="https://github.com/stephenjason89/nuxt-vuetify-graphql-pinia-starter"
						target="_blank"
						prepend-icon="mdi-github"
					>
						View Starter
					</v-btn>
				</div>
			</template>
		</v-navigation-drawer>

		<!-- Main Content -->
		<v-main>
			<slot />
		</v-main>

		<!-- Footer -->
		<v-footer color="primary" app>
			<v-container>
				<v-row align="center" justify="center">
					<v-col cols="12" class="text-center">
						<span class="text-white">
							© {{ currentYear }} SpaceX Explorer | Built with
							<v-icon size="small" color="red" class="mx-1">mdi-heart</v-icon>
							using Nuxt 3, Vuetify, GraphQL & Pinia
						</span>
					</v-col>
					<v-col cols="12" class="text-center">
						<v-btn
							variant="text"
							size="small"
							color="white"
							href="https://github.com/stephenjason89"
							target="_blank"
						>
							<v-icon start>mdi-github</v-icon>
							Stephen Jason Wang
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-footer>
	</v-app>
</template>

<script setup lang="ts">
const drawer = ref(false)
const favoritesStore = useFavoritesStore()
const favoritesCount = computed(() => favoritesStore.favorites.length)
const currentYear = new Date().getFullYear()
</script>
