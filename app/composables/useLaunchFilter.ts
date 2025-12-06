export const useLaunchFilter = () => {
	const selectedYear = ref<string>('all')

	const filterLaunchesByYear = <T extends { launch_date_utc: string }>(launches: T[]): T[] => {
		if (selectedYear.value === 'all') {
			return launches
		}

		return launches.filter((launch) => {
			const launchYear = new Date(launch.launch_date_utc).getFullYear().toString()
			return launchYear === selectedYear.value
		})
	}

	const getAvailableYears = <T extends { launch_date_utc: string }>(launches: T[]): string[] => {
		const years = launches.map((launch) => new Date(launch.launch_date_utc).getFullYear().toString())
		return ['all', ...Array.from(new Set(years)).sort((a, b) => b.localeCompare(a))]
	}

	return {
		selectedYear,
		filterLaunchesByYear,
		getAvailableYears,
	}
}
