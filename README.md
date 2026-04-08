# Recipe Explorer Application

A modern React application for exploring and discovering recipes using The Meal DB API. Built with React 19, Redux Toolkit, React Router, TypeScript, and Bootstrap, it provides category and cuisine browsing, recipe search, detailed recipe views, and ingredient planning tools.

## Developers

- Aguilar, Mark Lorenz (`mark-aguilar2304`)
- Apaya, Justin Ray (`Tatinn4`)
- Becerel, Kirstein Lawrence (`ALdNoah-0`)
- Reano, Carlos Jiro (`demuriffic`)
- Sanchez, Kyle Richard (`kujorichard`)

## Features

✨ **Core Features:**
- Explore all available categories and cuisines from The Meal DB
- Browse featured and curated recipes on the homepage
- Filter recipes by category and cuisine from the header dropdowns
- Search for recipes by name in real-time
- View full recipe details including ingredients, instructions, and YouTube links
- Plan ingredients with an interactive ingredient planner page
- Pagination support for large result sets
- Responsive design for mobile, tablet, and desktop
- Fast data fetching and caching with Redux Toolkit Query

📱 **Pages:**
- **Home Page**: Discover featured recipes and category highlights
- **Recipe Page**: Browse recipes with category/cuisine filtering, search, and pagination
- **Recipe Detail Page**: View complete meal information with ingredients and instructions
- **Ingredient Planner Page**: Build ingredient plans for meal preparation

🔍 **Advanced Features:**
- Real-time search functionality with instant results
- Category and cuisine route-based filtering
- Ingredient lists with precise measurements
- Recipe categorization and cuisine information
- Direct links to video tutorials on YouTube
- Smooth navigation and scroll-to-top behavior between pages
- Sticky responsive header with dropdown navigation
- Bootstrap-powered responsive UI components

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 8.0 (Fast bundler and dev server)
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router DOM v7
- **UI Framework**: Bootstrap 5.3
- **Icons**: Phosphor Icons React
- **Styling**: Bootstrap CSS + Custom CSS with modern design patterns
- **API**: The Meal DB (themealdb.com)

## Project Structure

```
src/
├── components/
│   ├── CategoryCard.tsx         # Recipe category display cards
│   ├── FeaturedRecipeCard.tsx   # Featured recipe card component
│   ├── Header.tsx               # Main navigation header
│   ├── Pagination.tsx           # Pagination controls
│   ├── PlayableVideo.tsx        # Embedded/linked video helper
│   ├── RecipeCard.tsx           # Individual recipe display card
│   ├── SearchBar.tsx            # Search input component
│   └── ...
├── pages/
│   ├── HomePage.tsx             # Landing page with featured recipes & categories
│   ├── RecipePage.tsx           # Recipe browsing and search page
│   ├── RecipeDetailPage.tsx     # Individual recipe details page
│   └── IngredientPlannerPage.tsx # Ingredient planning page
├── redux/
│   ├── store.ts                 # Redux store configuration
│   └── mealApi.ts               # RTK Query API endpoints
├── styles/
│   ├── global.css               # Global styles and color variables
│   ├── Header.css               # Header and dropdown styling
│   ├── MainPages.css            # Shared layout for main pages
│   ├── CategoryCard.css         # Category card styling
│   ├── FeaturedRecipeCard.css   # Featured recipe card styling
│   ├── Pagination.css           # Pagination styling
│   ├── PlayableVideo.css        # Video component styling
│   ├── RecipeCard.css           # Recipe card styling
│   └── RecipeDetailPage.css     # Recipe details page styling
├── types/
│   └── recipe.ts                # TypeScript type definitions
├── App.tsx                      # Main app component with routing
├── App.css                      # App-level styling
└── main.tsx                     # Application entry point
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd my_recipe
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

### Exploring the Home Page
1. Open the application to view featured recipes and category highlights
2. Use the header navigation to jump to recipe browsing
3. Click category-focused cards/sections to quickly explore matching meals

### Browsing and Searching Recipes
1. Navigate to the Recipe page to browse available meals
2. Open **Categories** or **Cuisines** from the header to filter results
3. Use the search bar to find meals by name in real-time
4. Use pagination controls to move between pages of results
5. Clear filters/search to return to broader results

### Viewing Recipe Details
1. Click **View Recipe** on any recipe card or open a recipe item
2. View complete recipe information including:
   - Full ingredient list with precise measurements
   - Step-by-step cooking instructions
   - Recipe category and cuisine type
   - Special tags and notes
   - Link to video tutorial if available
3. Navigate back to continue browsing recipes

### Using the Ingredient Planner
1. Navigate to the Ingredient Planner page
2. Plan and organize ingredients for your meal preparation
3. Keep track of what you need for your recipes

### Pagination
- Use the Previous/Next buttons to navigate between pages
- Click page numbers to jump to a specific page
- View current page and total pages at the bottom
- Pagination automatically adjusts based on search results

## API Endpoints Used

- **Cuisine List**: `GET https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  - Returns all available cuisine/area names

- **Category List**: `GET https://www.themealdb.com/api/json/v1/1/list.php?c=list`
  - Returns all available category names

- **Category Recipes**: `GET https://www.themealdb.com/api/json/v1/1/filter.php?c={categoryName}`
  - Returns meals in a specific category

- **Cuisine Recipes**: `GET https://www.themealdb.com/api/json/v1/1/filter.php?a={cuisineName}`
  - Returns meals in a specific cuisine/area

- **Ingredient List**: `GET https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  - Returns available ingredients

- **Ingredient Recipes**: `GET https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredientName}`
  - Returns meals that include a specific ingredient

- **Recipe Search**: `GET https://www.themealdb.com/api/json/v1/1/search.php?s={mealName}`
  - Searches meals by name

- **Meal Details**: `GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}`
  - Gets complete details for a specific meal

- **Random Meal**: `GET https://www.themealdb.com/api/json/v1/1/random.php`
  - Returns one random meal

## Key Components

### Header Component
Main navigation bar with links to Home, Categories, Cuisines, and Ingredient Planner. Handles dropdown filtering and responsive mobile behavior.

### CategoryCard Component
Displays recipe categories with images and titles. Allows users to explore recipes by category.

### FeaturedRecipeCard Component
Showcases featured recipes on the homepage with images and quick access to details.

### RecipeCard Component
Displays individual recipe previews with image, title, metadata, and a button to open the detail page.

### SearchBar Component
Provides real-time search with quick reset/clear behavior.

### Pagination Component
Smart pagination with:
- Previous/Next navigation buttons
- Direct page number links
- Ellipsis (...) for large page ranges
- Current page indicator
- Responsive design for small screens

### HomePage
Landing page that combines:
- Featured recipe showcase
- Category exploration cards
- Engaging hero/welcome section
- Fast navigation to recipe browsing

### RecipePage
Main browsing experience with:
- Recipe grid layout
- Search integration
- Category/cuisine query filtering
- Pagination support
- Loading and error states

### RecipeDetailPage
Dynamic page that:
- Fetches complete recipe data by meal ID
- Displays formatted ingredients list
- Shows cooking instructions
- Provides metadata (category, cuisine, tags)
- Links to YouTube tutorial videos

### IngredientPlannerPage
Interactive page for:
- Planning ingredients for recipes
- Organizing meal preparation
- Managing shopping lists

## State Management

The application uses Redux Toolkit with RTK Query for:
- Automatic API caching
- Request deduplication
- Loading and error states
- Automatic refetching and endpoint hooks

All API endpoints are defined in `src/redux/mealApi.ts` and automatically manage the request lifecycle.

## Styling Features

- **Bootstrap Framework**: Leveraging Bootstrap 5.3 for responsive layouts and components
- **Phosphor Icons**: Modern icon set for enhanced visual design
- **Color Variables**: Defined in `global.css` for consistent theming
- **Responsive Grid**: Recipe cards and layouts adapt from desktop to mobile
- **Smooth Transitions**: Hover effects and page transitions
- **Adaptive Header**: Sticky navbar with transparent/solid states and dropdown panels
- **Accessible Design**: Proper contrast ratios and readable fonts
- **Mobile Optimized**: Touch-friendly buttons and navigation
- **Scroll-to-Top**: Automatic scroll-to-top behavior on route changes

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading with pagination for efficient data rendering
- Image optimization via The Meal DB CDN
- Efficient Redux caching with RTK Query
- Code splitting with Vite for faster initial load
- Bootstrap CSS for optimized styling
- Automatic scroll-to-top on navigation for better UX
- Request deduplication to minimize API calls

## Future Enhancement Ideas

- Add advanced recipe filters (by category, cuisine, difficulty level, dietary restrictions)
- Implement favorite/bookmark feature with local storage persistence
- Add nutritional information display for health-conscious users
- Create shopping list generator from recipe ingredients
- Add recipe ratings and user reviews
- Implement dark mode toggle for better accessibility
- Add print recipe functionality for offline use
- Create meal planning calendar for weekly meal prep
- Add recipe sharing functionality via social media
- Implement user profiles and saved recipe collections
- Add cooking timer and step-by-step cooking mode
- Include ingredient substitution suggestions

## Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Port 5173 already in use
The dev server will automatically try the next available port.

### Recipes not loading
Ensure you have an active internet connection as the app fetches data from themealdb.com API.

### `npm run dev` fails from the wrong directory
Run commands from the project root (`my_recipe`), not inside `src`.

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

This is a demonstration project. Feel free to fork and modify it for your own use.

## Questions?

For issues or questions about The Meal DB API, visit: https://www.themealdb.com/api.php
