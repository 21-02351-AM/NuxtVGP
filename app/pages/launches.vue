<template>
	<v-container>
		<h1 class="text-h3 mb-6">SpaceX Launches</h1>

		<!-- Filter Controls -->
		<v-card class="mb-6" elevation="2">
			<v-card-text>
				<v-row align="center">
					<v-col cols="12" md="4">
						<v-text-field
							v-model="searchQuery"
							label="Search launches..."
							prepend-inner-icon="mdi-magnify"
							variant="outlined"
							density="comfortable"
							clearable
							hide-details
						/>
					</v-col>
					<v-col cols="12" md="3">
						<v-select
							v-model="selectedYear"
							:items="availableYears"
							label="Filter by Year"
							variant="outlined"
							density="comfortable"
						>
							<template #item="{ item, props }">
								<v-list-item v-bind="props">
									{{ item.value === 'all' ? 'All Years' : item.value }}
								</v-list-item>
							</template>
							<template #selection="{ item }">
								{{ item.value === 'all' ? 'All Years' : item.value }}
							</template>
						</v-select>
					</v-col>
					<v-col cols="12" md="3">
						<v-select
							v-model="sortOrder"
							:items="sortOptions"
							label="Sort by Date"
							variant="outlined"
							density="comfortable"
						/>
					</v-col>
					<v-col cols="12" md="2">
						<v-chip class="mr-2" color="primary">
							Total: {{ filteredAndSortedLaunches.length }}
						</v-chip>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<!-- Launches Grid -->
		<v-row>
			<v-col v-for="launch in filteredAndSortedLaunches" :key="launch.id" cols="12" md="6" lg="4">
				<v-card elevation="2" class="h-100">
					<v-card-title class="text-h5">
						{{ launch.mission_name }}
					</v-card-title>

					<v-card-subtitle>
						{{ formatDate(launch.launch_date_utc) }}
					</v-card-subtitle>

					<v-card-text>
						<div class="mb-2">
							<strong>Launch Site:</strong>
							{{ launch.launch_site?.site_name_long || 'N/A' }}
						</div>
						<div class="mb-2">
							<strong>Rocket:</strong>
							{{ launch.rocket?.rocket_name || 'N/A' }}
						</div>
						<div v-if="launch.details" class="mt-3">
							<strong>Details:</strong>
							<p class="text-body-2 mt-1">{{ truncateText(launch.details, 150) }}</p>
						</div>
						<div v-else class="mt-3 text-grey">No details available</div>
					</v-card-text>

					<v-card-actions>
						<v-btn color="primary" variant="text" :to="`/rockets/${launch.rocket?.rocket?.id}`">
							View Rocket
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<v-alert v-if="filteredAndSortedLaunches.length === 0" type="info" class="mt-4">
			No launches found for the selected filters.
		</v-alert>
	</v-container>
</template>

<script setup lang="ts">
interface Launch {
	id: string
	mission_name: string
	launch_date_utc: string
	launch_site: {
		site_name_long: string
	}
	rocket: {
		rocket: {
			id: string
		}
		rocket_name: string
	}
	details: string | null
}

const query = gql`
	query LaunchesPast {
		launchesPast(limit: 50) {
			id
			mission_name
			launch_date_utc
			launch_site {
				site_name_long
			}
			rocket {
				rocket {
					id
				}
				rocket_name
			}
			details
		}
	}
`

const { data } = await useAsyncQuery<{ launchesPast: Launch[] }>(query)
const launches = computed(() => data.value?.launchesPast ?? [])

// Search functionality
const searchQuery = ref('')

// Use filter composable
const { selectedYear, filterLaunchesByYear, getAvailableYears } = useLaunchFilter()
const availableYears = computed(() => {
	if (!launches.value.length) return ['all']
	return getAvailableYears(launches.value)
})

// Use sort composable
const { sortOrder, sortLaunches } = useLaunchSort()
const sortOptions = [
	{ title: 'Newest First', value: 'desc' },
	{ title: 'Oldest First', value: 'asc' },
]

// Combined filtered, searched, and sorted launches
const filteredAndSortedLaunches = computed(() => {
	let filtered = filterLaunchesByYear(launches.value)

	// Apply search filter
	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase()
		filtered = filtered.filter(
			(launch) =>
				launch.mission_name.toLowerCase().includes(query) ||
				launch.rocket?.rocket_name?.toLowerCase().includes(query) ||
				launch.launch_site?.site_name_long?.toLowerCase().includes(query),
		)
	}

	return sortLaunches(filtered)
})

const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}

const truncateText = (text: string, length: number) => {
	if (text.length <= length) return text
	return text.substring(0, length) + '...'
}
</script>
