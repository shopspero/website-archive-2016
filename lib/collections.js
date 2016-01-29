
Items = new Mongo.Collection('items')
NavCategories = new Mongo.Collection('navCategories') 
InventoryCategories = new Mongo.Collection('inventoryCategories') 



inventoryCategories =
[
	{ name: 'Clothes', query: 'clothes', options: [

		{ sex: 'Women', categoryUrl: '/women', subcategories: [
	   
	    	{ name: 'Sweaters', query: 'sweaters' }, 
	    	{ name: 'Outerwear', query: 'outerwear'},
	    	{ name: 'Denim', query: 'denim' },
	    	{ name: 'Tops', query: 'tops' },
	    	{ name: 'Bottoms', query: 'bottoms' },
	    	{ name: 'Dresses', query: 'dresses' }
	    	]
    	},
    	{ sex: 'Men', categoryUrl: '/men', subcategories: [
    		{ name: 'Sweaters', query: 'sweaters' }, 
	    	{ name: 'Outerwear', query: 'outerwear'},
	    	{ name: 'Denim', query: 'denim' },
	    	{ name: 'Tops', query: 'tops' },
	    	{ name: 'Bottoms', query: 'bottoms' }
	    	]
	    }
	]},
	{ name: 'Accessories', categoryUrl: '/accessories', subcategories: [] },
    { name: 'Artwork', categoryUrl: '/artwork', subcategories: []},
]

navCategories = [

    { name: 'New Arrivals', categoryUrl: '/newArrivals', subcategories: []},
    { name: 'Women', categoryUrl: '/women', subcategories: 
    	[ { name: 'New Arrivals', query: 'newArrivals' }].concat(inventoryCategories[0].options[0].subcategories).concat([{ name: 'Sale', query: 'sale' }]) 
    },
    { name: 'Men', categoryUrl: '/men', subcategories: 
    	[ { name: 'New Arrivals', query: 'newArrivals' }].concat(inventoryCategories[0].options[1].subcategories).concat([{ name: 'Sale', query: 'sale' }]) 
    },
    { name: 'Accessories', categoryUrl: '/accessories', subcategories: [] },
    { name: 'Artwork', categoryUrl: '/artwork', subcategories: []},
    { name: 'Sale', categoryUrl: '/sale', subcategories: []},
    { name: 'All', categoryUrl: '/all', subcategories: [] },

]


if (Meteor.isServer) {


	Items.remove({})
	NavCategories.remove({})
	Meteor.users.remove({})
	InventoryCategories.remove({})


	navCategories.forEach(function(category, index) {
		category._id = NavCategories.insert(category)
	})

	inventoryCategories.forEach(function(category, index) {
		category._id = InventoryCategories.insert(category)
	})


	var admin_id = Accounts.createUser({
	    email : "phjaykwon93@gmail.com",
	    password : "gg",
	    profile  : {
	        name: "Admin Account"
	    }

    });

    Roles.addUsersToRoles(admin_id, ['admin'], 'default-group');
	
	

	console.log('creating 15 items')
	for (i=0; i < 15; i++) {
		Items.insert({
			name: "Hood " + i,
			description: "Best sweatshirts in the world",
			price: 40.00,
			category: "clothes",
			sex: ['women', 'men'],
			subcategories: {
				'sweaters': true,
				'bottoms' : false,
				'denim' : false,
				'dresses' : false,
				'outerwear' : false,
				'tops' : false
			},
			shippingNotes: 'Flat rate $5',
			sale: false,
			preorder: false,
			photos: ['product/j1s9zgl7rk5tiahb5xjl.jpg', 'product/uno0j7o7un2hon3xfqbb.jpg'],
			sizes: {
				'XL': 0,
				'XS': 0,
				'S': 30,
				'M': 40,
				'L': 20,
				'general': 0
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


	Meteor.publish('allItems', function() {
		return Items.find({});

	})

	Meteor.publish('navCategories', function() {
		return NavCategories.find({})
	})


	Meteor.publish('inventoryCategories', function() {
		return InventoryCategories.find({})
	})

	Meteor.publish('category', function(categoryName) {
		return NavCategories.find({name: categoryName})
	})

}

