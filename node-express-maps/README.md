# Model

```
// Schema
{
  name: {
    type: String,
    required: true
  },
  location: {
    // [ longitude, latitude ]
    coordinates: [{
      type: Number,
      min: -180,
      max: 180
    }],
    type: {
      type: String,
      default: 'Point'
    }
  }
}

// Sample restaurant document
{
  name: 'O Bastardo',
  location: {
    coordinates: [-9.15,38.75],
    type: 'Point'
  }
}
```

# Views

Home - Displays list of restaurants, each restaurant has a pin in the map
Restaurant Single - Displays single restaurant
Restaurant Creation - Includes creation form
Restaurant Search - Search for Restaurants

# Route Handlers

- GET - '/' - Displays home view
- GET - '/restaurant/:id' - Displays single restaurant view
- GET - '/restaurant/create' - Displays restaurant creation view
- POST - '/restaurant/create' - Handles restaurant creation form submission
- GET - '/restaurant/search' - Displays search results view

<!-- /restaurant/search?latitude=12&longitude=15 -->
