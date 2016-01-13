
Items = new Mongo.Collection('items')
Categories = new Mongo.Collection('categories') 
InventoryCategories = new Mongo.Collection('inventoryCategories') 
clientCategories = [

    { name: 'New Arrivals', categoryUrl: '/newArrivals', subcategories: []},
    { name: 'Women', categoryUrl: '/women', subcategories: [ 
    	{ name: 'New Arrivals', query: 'newArrivals' },
    	{ name: 'Sweaters', query: 'sweaters' }, 
    	{ name: 'Outerwear', query: 'outerwear'},
    	{ name: 'Denim', query: 'denim' },
    	{ name: 'Tops', query: 'tops' },
    	{ name: 'Bottoms', query: 'bottoms' },
    	{ name: 'Dresses', query: 'dresses' },
    	{ name: 'Sale', query: 'sale' }
    	]
    },
    { name: 'Men', categoryUrl: '/men', subcategories: [ 
    	{ name: 'New Arrivals', query: 'newArrivals' },
    	{ name: 'Sweaters', query: 'sweaters' }, 
    	{ name: 'Outerwear', query: 'outerwear'},
    	{ name: 'Denim', query: 'denim' },
    	{ name: 'Tops', query: 'tops' },
    	{ name: 'Bottoms', query: 'bottoms' },
    	{ name: 'Sale', query: 'sale' }
    	]
    },
    { name: 'Accessories', categoryUrl: '/accessories', subcategories: [] },
    { name: 'Artwork', categoryUrl: '/artwork', subcategories: []},
    { name: 'Sale', categoryUrl: '/sale', subcategories: []},
    { name: 'All', categoryUrl: '/all', subcategories: [] },

]

inventoryCategories =
[
	{ name: 'Clothes', options: [

		{ sex: 'Women', subcategories: [
	   
	    	{ name: 'Sweaters', query: 'sweaters' }, 
	    	{ name: 'Outerwear', query: 'outerwear'},
	    	{ name: 'Denim', query: 'denim' },
	    	{ name: 'Tops', query: 'tops' },
	    	{ name: 'Bottoms', query: 'bottoms' },
	    	{ name: 'Dresses', query: 'dresses' }
	    	]
    	},
    	{ sex: 'Men', subcategories: [
    		{ name: 'Sweaters', query: 'sweaters' }, 
	    	{ name: 'Outerwear', query: 'outerwear'},
	    	{ name: 'Denim', query: 'denim' },
	    	{ name: 'Tops', query: 'tops' },
	    	{ name: 'Bottoms', query: 'bottoms' }
	    	]
	    }
	    ]
    },
	{ name: 'Accessories', categoryUrl: '/accessories', subcategories: [] },
    { name: 'Artwork', categoryUrl: '/artwork', subcategories: []},


    ]




if (Meteor.isServer) {
	if (Items.find().count() != 0) {
		// CLEAR DB before work
		Items.remove({})
	}
	if (Categories.find().count() != 0) {
		Categories.remove({})
	}

	if (InventoryCategories.find().count() != 0) {
		InventoryCategories.remove({})
	}


	clientCategories.forEach(function(category, index) {
		category._id = Categories.insert(category)
	})

	inventoryCategories.forEach(function(category, index) {
		category._id = InventoryCategories.insert(category)
	})


	


	console.log('creating 15 items')
	for (i=0; i < 15; i++) {
		Items.insert({
			name: "Hood " + i,
			price: 40.00,
			category: ['Women', 'Men'],
			category1: 'Clothes',
			subcategories: ['sale', 'sweaters'],
			sale: false,
			sex: ['Women', 'Men'],
			photos: ['https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg'],
			sizes: {
				'S': 30,
				'M': 40,
				'L': 20
			},
			createdAt: new Date()
		});
	}
	/*
	Items.insert({
		name: "Hood Berkeley",
		price: 40.00,
		category: 'Women',
		photos: ['https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg'],
		sizes: {
			'S': 30,
			'M': 40,
			'L': 20
		},
		createdAt: new Date()
	});
	*/
	Items.insert({
		name: "Hood Irvine",
		price: 40.00,
		category: ['Men'],
		subcategories: ['sale', 'denim'],
		photos: ['https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg'],
		sizes: {
			'S': 30,
			'M': 40,
			'L': 20
		},
		createdAt: new Date()
	})
	Items.insert({
		name: "Hood LA",
		price: 40.00,
		category: ['Accessories'],
		type: 'Sweatshirt',
		photos: ['https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg'],
		sizes: {
			'S': 30,
			'M': 40,
			'L': 20
		},
		createdAt: new Date()
	})

	// Publishing..

	Meteor.publish('items', function(category, subcategory) {
		console.log('inside...')
		console.log(category)
		console.log(subcategory)
		if (category && subcategory) {
			console.log('wtf...')
			console.log(subcategory)
			return Items.find({category: category.name, subcategories : subcategory},  { sort: { createdAt: -1 }} )
		} else if (category) {
			return Items.find({category: category.name},  { sort: { createdAt: -1 }} )
		} else {
			return Items.find({subcategories : subcategory},  { sort: { createdAt: -1 }} )
		}		
	})
	Meteor.publish('allItems', function() {
		return Items.find({});

	})

	Meteor.publish('categories', function() {
		return Categories.find({})
	})


	Meteor.publish('inventoryCategories', function() {
		return InventoryCategories.find({})
	})

	Meteor.publish('category', function(categoryName) {
		return Categories.find({name: categoryName})
	})

}

