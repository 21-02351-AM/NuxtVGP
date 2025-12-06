export default defineNuxtRouteMiddleware((to) => {
	// List of valid routes
	const validRoutes = ['/', '/launches', '/favorites', '/rockets']

	// Check if route starts with /rockets/ (dynamic route)
	if (to.path.startsWith('/rockets/')) {
		return
	}

	// Check if the route is valid
	const isValidRoute = validRoutes.some((route) => to.path === route)

	// If route doesn't exist, redirect to launches
	if (!isValidRoute) {
		return navigateTo('/launches')
	}
})
