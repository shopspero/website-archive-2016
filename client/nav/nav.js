var categories = [
        { categoryName: 'New Arrivals', categoryUrl: '/newArrivals' },
        { categoryName: 'Women', categoryUrl: '/women' },
        { categoryName: 'Men', categoryUrl: '/men' },
        { categoryName: 'Accessories', categoryUrl: '/accessories' },
        { categoryName: 'Artwork', categoryUrl: '/artwork' },
        { categoryName: 'All', categoryUrl: '/all' },

      ]

Template.mainNav.helpers({
  categories: categories
});