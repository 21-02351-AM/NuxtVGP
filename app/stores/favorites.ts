import { defineStore } from 'pinia'

export interface FavoriteRocket {
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

interface FavoritesState {
	favorites: FavoriteRocket[]
}

export const useFavoritesStore = defineStore('favorites', {
	state: (): FavoritesState => ({
		favorites: [],
	}),

	getters: {
		favoriteCount: (state): number => state.favorites.length,

		isFavorite: (state) => {
			return (rocketId: string): boolean => {
				return state.favorites.some((rocket) => rocket.id === rocketId)
			}
		},

		getFavoriteById: (state) => {
			return (rocketId: string): FavoriteRocket | undefined => {
				return state.favorites.find((rocket) => rocket.id === rocketId)
			}
		},
	},

	actions: {
		addFavorite(rocket: FavoriteRocket): void {
			if (!this.isFavorite(rocket.id)) {
				this.favorites.push(rocket)
				this.saveToPersistence()
			}
		},

		removeFavorite(rocketId: string): void {
			const index = this.favorites.findIndex((rocket) => rocket.id === rocketId)
			if (index !== -1) {
				this.favorites.splice(index, 1)
				this.saveToPersistence()
			}
		},

		clearFavorites(): void {
			this.favorites = []
			this.saveToPersistence()
		},

		toggleFavorite(rocket: FavoriteRocket): void {
			if (this.isFavorite(rocket.id)) {
				this.removeFavorite(rocket.id)
			} else {
				this.addFavorite(rocket)
			}
		},

		// Manual persistence using localStorage
		saveToPersistence(): void {
			if (process.client) {
				try {
					localStorage.setItem('spacex-favorites', JSON.stringify(this.favorites))
				} catch (error) {
					console.error('Failed to save favorites:', error)
				}
			}
		},

		loadFromPersistence(): void {
			if (process.client) {
				try {
					const saved = localStorage.getItem('spacex-favorites')
					if (saved) {
						this.favorites = JSON.parse(saved)
					}
				} catch (error) {
					console.error('Failed to load favorites:', error)
				}
			}
		},

		// Initialize store with persisted data
		init(): void {
			this.loadFromPersistence()
		},
	},
})
