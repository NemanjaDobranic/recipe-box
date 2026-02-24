🍳 Recipe Box
=============

**Cook With Confidence**

A mobile-first personal recipe management application built with **React 19 + Vite**, focused on polished UX, thoughtful interactions, and visual consistency.

**Live Demo:** [https://nemanjadobranic.github.io/recipe-box/](https://nemanjadobranic.github.io/recipe-box/)

This project emphasizes:

*   Production-ready architecture
    
*   Clean, modern UI
    
*   Delightful cooking experience
    
*   Strong mobile usability

Key Features
==============

### 🏠 Homepage – Discovery & Filtering

*   Real-time fuzzy search with suggestions
    
*   Multi-filter system (cuisine, difficulty, tags, max time)
    
*   Smart sorting (recent, time, difficulty, favorites)
    
*   Quick favorite access
    
*   Clean card-based layout

  <img width="1895" height="1010" alt="image" src="https://github.com/user-attachments/assets/56b3ee38-2c0e-4533-b223-1ff18dba2523" />

### 📖 Cooking Mode – Optimized Reading Experience

*   Large typography for hands-free cooking
    
*   Adjustable servings with auto-calculated quantities
    
*   Checkable ingredients & steps
    
*   High contrast & spacing for kitchen environments

<img width="469" height="834" alt="image" src="https://github.com/user-attachments/assets/554688b8-4415-4c11-93f0-3f3c679ffd82" />

### ➕ Create & Edit Recipe

*   Name, description, cuisine, difficulty
    
*   Prep & cook time
    
*   Custom tags
    
*   Ingredient units & quantities
    
*   Step-by-step instructions
    
*   Image support
    
*   Well-designed dark mode

<img width="469" height="832" alt="image" src="https://github.com/user-attachments/assets/b797197b-d191-4e67-88c8-eed0cffdd12b" />
    

### 🛒 Shopping List Generator

*   Select multiple recipes
    
*   Aggregates ingredients (sums duplicates automatically)
    
*   Organized by category
    
*   Checkable items
    
*   Toast notifications for feedback

<img width="1309" height="1029" alt="image" src="https://github.com/user-attachments/assets/dd9424f3-827e-4872-904e-e5dc5be82331" />

Quick Start (Docker)
====================

### Build the image
`docker build -t recipe-box .`

### Run the container
`docker run -p 3000:3000 recipe-box`

Open:
`http://localhost:3000`

**Local Development**
```bash
npm install
npm run dev
```

Tech Stack
===================

### ⚛️ React 19

*   Modern concurrent rendering
    
*   Component-driven architecture
    
*   Clean separation of UI logic
    

### Vite 7

*   Lightning-fast dev environment
    
*   Optimized production builds
    
*   Native ESM
    

### Tailwind CSS 4 (Single UI system)

*   Utility-first design
    
*   Enforced design consistency
    
*   Easy dark mode implementation
    
*   No additional UI frameworks used
    

### Zustand

*   Minimal global state management
    
*   Perfect for shopping list & favorites
    
*   No boilerplate overhead
    

### match-sorter

*   Natural fuzzy search experience
    

### uuid

*   Stable identity for ingredients & recipes

Design System Constraints
================================================

*   Maximum 1 UI system (Tailwind only)
    
*   Maximum 3 primary colors
    *   Soft Warm Beige 
    *   Charcoal Dark Gray
    *   Muted Forest Green
    
*   Maximum 2 font families (Playfair & Inter)
    
*   Mobile-first layout
    
*   Strong spacing and typography hierarchy
    
*   Consistent rounded corners & shadows
    
*   Accessible contrast

The UI is intentionally calm and neutral to keep focus on content (food and instructions).

UX Decisions
===============

### Mobile-First Cooking Flow

Most users cook using their phone.The entire layout prioritizes:

*   Large touch targets
    
*   Clear spacing
    
*   Scroll-friendly sections
    
*   Minimal clutter
    

### Dedicated Cooking Experience

Instead of just showing recipe details, the page is optimized for:

*   Checking ingredients while cooking
    
*   Tracking step progress
    
*   Adjusting servings dynamically
    

This transforms it from a static recipe viewer into an **interactive cooking tool**.

### Aggregated Shopping List Logic

When selecting multiple recipes:

*   Ingredients are normalized
    
*   Duplicate ingredients are merged
    
*   Quantities are summed correctly
    

This mimics real-world grocery behavior and improves practicality.

### Smart Search & Filtering

Search is:

*   Real-time
    
*   Fuzzy
    
*   Combined with filters
    
*   Fully reactive
    

This avoids rigid keyword matching and improves discovery.

### SPA Routing UX Choice

Unknown routes redirect to home rather than showing 404.Improves flow and prevents dead ends, especially on mobile.

Challenges & Solutions
----------------------

**State Synchronization Across Pages**
**Challenge:** Favorites, shopping list, and filters needed global awareness.

**Solution:**

*   Centralized Zustand store
    
*   Immutable updates
    
*   Derived selectors
    

 **Ingredient Categorization in Shopping List**
 **Challenge:** No category for ingredients, making filtering difficult.

**Solution:**

*   Created a simple local mapping object (category → ingredient list)
    
*   Used mapping for client-side filtering
    
*   Kept structure lightweight and easy to extend
    

**GitHub Pages SPA Deployment**
**Challenge:** 404 error on page refresh.

**Solution:**

*   Custom 404 fallback
    
*   Correct homepage configuration
    
*   Build-time handling script

Future Improvements
===================

1.  Recipe suggestions based on available ingredients
    
2.  Personal cooking statistics (most cooked cuisine, favorites ratio)
    
3.  Skeleton loading states (if API introduced)
    
4.  Full PWA offline mode
    
5.  Recipe sharing via export/link
    
6.  Drag-and-drop ingredient reordering
    
7.  Unit conversion system (metric ↔ imperial)
    
8.  Backend API integration (Node/NestJS)
    
9.  User authentication
    
10.  AI-assisted recipe suggestions

Time Spent
============

*   TaskHoursProject setup & architecture: 3h
*   Homepage & filtering system: 4h
*   Recipe CRUD functionality: 5h
*   Cooking UX & scaling logic: 4h
*   Shopping list aggregation: 4h
*   Design & visual polish: 4h
*   Deployment + Docker: 2h
*   Testing & refinements: 3h

