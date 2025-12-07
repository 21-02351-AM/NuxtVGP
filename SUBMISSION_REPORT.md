# Apollo Systems Front End Developer Exam - Submission Report

## Developer Information

- **Name**: Alfred Miguel B. Lopez
- **Email**: amb.lopez7@gmail.com
- **GitHub**: https://github.com/21-02351-AM
- **Date**: December 8, 2024

## Project Links

- **GitHub Repository**: https://github.com/21-02351-AM/NuxtVGP.git
- **Live Demo**: https://nuxt-vgp-tjb1.vercel.app/

---

## Tasks Completion Summary

### Main Tasks

**Task 1: Clone and Setup**

- Cloned and configured the starter repository
- Installed dependencies
- Starred the starter repository

**Task 2: Display Launches**

- Created `app/pages/launches.vue`
- GraphQL query using `launchesPast` to fetch SpaceX launches
- Displays mission name, launch date, launch site, rocket name, and details
- Card-based responsive grid layout

**Task 3: Filter by Year**

- Created `app/composables/useLaunchFilter.ts`
- Year-based filtering functionality
- Real-time filter updates

**Task 4: Sort Functionality**

- Created `app/composables/useLaunchSort.ts`
- Date-based sorting (ascending/descending)
- Works with filter functionality

**Task 5: Rocket Details Page**

- Created `app/pages/rockets/[id].vue`
- Dynamic routing for individual rockets
- Displays rocket name, description, first flight date, height, diameter, mass, and stages
- Add to favorites functionality

**Task 6: Layouts and Components**

- Created `app/layouts/default.vue` with navigation bar, drawer, and footer
- Created `app/components/LoadingSpinner.vue`

**Task 7: Pinia State Management**

- Created `app/stores/favorites.ts` with add, remove, clear, and toggle functions
- Created `app/pages/favorites.vue`
- localStorage persistence implementation
- Created `app/plugins/init-stores.client.ts`

**Task 8: Vercel Deployment**

- Deployed to Vercel
- Created `vercel.json` for npm configuration

---

### Bonus Tasks

**Bonus Task 1: 404 Middleware**

- Created `app/middleware/redirect-404.global.ts`
- Redirects invalid routes to launches page

**Bonus Task 2: Innovation Feature**

- Real-time search functionality on launches page
- Searches across mission names, rocket names, and launch sites
- Works with filter and sort

**Bonus Task 3: Repository Stars**

- Starred BunPulse repository
- Starred pinia-plugin-state-persistence repository
- Followed Stephen Jason Wang on GitHub
- Starred nuxt-vuetify-graphql-pinia-starter repository

**Bonus Task 4: State Persistence**

- localStorage-based persistence in favorites store
- saveToPersistence() and loadFromPersistence() methods

---

## Technical Approach

**Technology Stack:**

- Nuxt 3
- Vue 3 with Composition API
- TypeScript
- Vuetify 3
- GraphQL with Apollo Client
- Pinia
- Vercel

**Architecture:**

- File-based routing
- Composables for reusable logic
- Centralized state management with Pinia
- TypeScript interfaces for type safety

---

## Challenges and Solutions

**Challenge 1: GraphQL API Field Names**

- Problem: Initial queries used `launch_date_local` which returned 400 errors
- Solution: Changed to `launch_date_utc` and used `launchesPast` query

**Challenge 2: Pinia Store Persistence**

- Problem: TypeScript compatibility issues with pinia-plugin-state-persistence
- Solution: Implemented custom localStorage solution

**Challenge 3: Vercel Deployment**

- Problem: pnpm lockfile conflicts
- Solution: Created vercel.json to use npm, removed pnpm-lock.yaml

**Challenge 4: TypeScript Errors in Pinia Getters**

- Problem: Type inference issues with getters
- Solution: Added explicit return type annotations

---

## Exam Feedback

**Strengths:**

- Clear task structure
- Progressive difficulty
- Real-world application
- Modern technology stack

**Suggestions:**

- Provide direct link to SpaceX API schema
- Clarify API field names upfront

**Rating:** 9/10

---

## Conclusion

Successfully completed all 8 main tasks and 4 bonus tasks. The application demonstrates proficiency in Nuxt 3, Vue 3, TypeScript, Vuetify, GraphQL, and Pinia with proper state management and deployment.

---

**Submitted by:** Alfred Miguel B. Lopez  
**Date:** December 8, 2024  
**Email:** amb.lopez7@gmail.com
