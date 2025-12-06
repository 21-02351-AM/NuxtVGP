export const useLaunchSort = () => {
	const sortOrder = ref<'asc' | 'desc'>('desc')

	const sortLaunches = <T extends { launch_date_utc: string }>(launches: T[]): T[] => {
		return [...launches].sort((a, b) => {
			const dateA = new Date(a.launch_date_utc).getTime()
			const dateB = new Date(b.launch_date_utc).getTime()

			if (sortOrder.value === 'asc') {
				return dateA - dateB
			} else {
				return dateB - dateA
			}
		})
	}

	return {
		sortOrder,
		sortLaunches,
	}
}
