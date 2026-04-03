# Recipe Explorer Application

A modern React application for exploring seafood recipes using The Meal DB API. Built with Redux Toolkit, React Router, and TypeScript for state management, routing, and type safety.

## Features

✨ **Core Features:**
- Browse a collection of seafood recipes from The Meal DB API
- View detailed recipe information including ingredients, instructions, and YouTube tutorials
- Search for recipes by name in real-time
- Pagination support for browsing large recipe lists
- Responsive design that works on mobile, tablet, and desktop
- Fast and performant data fetching with Redux Toolkit Query

📱 **Pages:**
- **Home Page**: Browse and search seafood recipes with pagination
- **Recipe Details Page**: View complete recipe information with ingredients and cooking instructions

🔍 **Advanced Features:**
- Real-time search functionality
- Ingredient lists with measurements
- Recipe categorization and cuisine information
- Direct links to video tutorials on YouTube
- Smooth navigation between pages

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite (Fast bundler and dev server)
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router DOM v6
- **Styling**: Custom CSS with modern design patterns
- **API**: The Meal DB (themealdb.com)

## Project Structure

```
src/
├── components/
│   ├── RecipeCard.tsx       # Individual recipe display card
│   ├── SearchBar.tsx        # Search input component
│   └── Pagination.tsx       # Pagination controls
├── pages/
│   ├── HomePage.tsx         # Main recipes listing page
│   └── RecipeDetailPage.tsx # Individual recipe details page
├── redux/
│   ├── store.ts             # Redux store configuration
│   └── mealApi.ts           # RTK Query API endpoints
├── styles/
│   ├── global.css           # Global styles and color variables
│   ├── RecipeCard.css       # Recipe card styling
│   ├── SearchBar.css        # Search bar styling
│   ├── Pagination.css       # Pagination styling
│   ├── HomePage.css         # Home page layout
│   └── RecipeDetailPage.css # Recipe details page styling
├── types/
│   └── recipe.ts            # TypeScript type definitions
├── App.tsx                  # Main app component with routing
└── main.tsx                 # Application entry point
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd my_recipes
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

**Development Mode** (with hot reload):
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`

**Build for Production**:
```bash
npm run build
```

**Preview Production Build**:
```bash
npm run preview
```

## How to Use

### Browsing Recipes
1. Open the application to view the home page with seafood recipes
2. Recipes are displayed in a grid layout with 12 items per page
3. Use the pagination controls at the bottom to navigate between pages

### Searching Recipes
1. Use the search bar at the top of the page
2. Type a recipe name to filter results in real-time
3. The pagination resets to page 1 when you start a new search
4. Click the ✕ button to clear the search and return to the default seafood list

### Viewing Recipe Details
1. Click "View Details" on any recipe card or click the card itself
2. View complete recipe information including:
   - Full ingredient list with measurements
   - Step-by-step cooking instructions
   - Recipe category and cuisine type
   - Special tags and notes
   - Link to video tutorial if available
3. Click "Back to Recipes" to return to the recipe list

### Pagination
- Use the Previous/Next buttons to navigate between pages
- Click page numbers to jump to a specific page
- View current page and total pages at the bottom right
- Pagination automatically adjusts based on search results

## API Endpoints Used

- **Seafood Recipes**: `GET https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`
  - Returns a list of all seafood meals with thumbnails

- **Recipe Search**: `GET https://www.themealdb.com/api/json/v1/1/search.php?s={mealName}`
  - Search for recipes by meal name

- **Meal Details**: `GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}`
  - Get complete details for a specific meal including ingredients and instructions

## Key Components

### RecipeCard Component
Displays individual recipe preview with image, name, and button to view details. Navigates to the recipe detail page when clicked.

### SearchBar Component
Provides real-time search capability with instant filtering. Includes a clear button for easy reset.

### Pagination Component
Smart pagination with:
- Previous/Next navigation buttons
- Direct page number links
- Ellipsis (...) for large page ranges
- Current page indicator
- Responsive design for small screens

### HomePage
Combines all components to create the main browsing experience with:
- Recipe grid layout
- Search integration
- Pagination support
- Loading and error states

### RecipeDetailPage
Dynamic page that:
- Fetches complete recipe data by meal ID
- Displays formatted ingredients list
- Shows cooking instructions
- Provides metadata (category, cuisine, tags)
- Links to YouTube tutorial videos

## State Management

The application uses Redux Toolkit with RTK Query for:
- Automatic API caching
- Request deduplication
- Loading and error states
- Automatic refetching

All API endpoints are defined in `src/redux/mealApi.ts` and automatically manage the request lifecycle.

## Styling Features

- **Color Variables**: Defined in `global.css` for consistent theming
- **Responsive Grid**: Recipe cards adapt from desktop to mobile
- **Smooth Transitions**: Hover effects and page transitions
- **Accessible Design**: Proper contrast ratios and readable fonts
- **Mobile Optimized**: Touch-friendly buttons and navigation

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading with pagination
- Image optimization via CDN
- Efficient Redux caching
- Code splitting with Vite
- Minimal CSS with custom styling

## Future Enhancement Ideas

- Add recipe filters (by category, cuisine, difficulty)
- Implement favorite/bookmark feature with local storage
- Add nutritional information display
- Create shopping list generator
- Add recipe ratings and reviews
- Implement dark mode toggle
- Add print recipe functionality
- Create meal planning calendar

## Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Port 5173 already in use
The dev server will automatically try the next available port.

### Recipes not loading
Ensure you have an active internet connection as the app fetches data from themealdb.com API.

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

This is a demonstration project. Feel free to fork and modify it for your own use.

## Questions?

For issues or questions about The Meal DB API, visit: https://www.themealdb.com/api.php
