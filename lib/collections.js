
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

// tryna to refactor
navCategories = [

    { name: 'NEW ARRIVALS', categoryUrl: '/newArrivals', subcategories: []},
    { name: 'WOMEN', categoryUrl: '/women', subcategories: 
    	[ { name: 'New Arrivals', query: 'newArrivals' }].concat(inventoryCategories[0].options[0].subcategories).concat([{ name: 'Sale', query: 'sale' }]) 
    },
    { name: 'MEN', categoryUrl: '/men', subcategories: 
    	[ { name: 'New Arrivals', query: 'newArrivals' }].concat(inventoryCategories[0].options[1].subcategories).concat([{ name: 'Sale', query: 'sale' }]) 
    },
    { name: 'MISC', categoryUrl: '/misc', query: 'misc', subcategories:
		[ { name: 'Accessories', query: 'accessories' }, { name: 'Artwork', query: 'artwork'}]
	},
    { name: 'BLOG', categoryUrl: '/', subcategories: []},
    { name: 'VISION', categoryUrl: '/about#vision', subcategories: [] },

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
	    email : "shopspero@gmail.com",
	    password : "spero",
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
			photos: ['products/product-imNqx32rN8aiCz3k7/tzn8bbtaho7hgqbsrd3e', 'products/product-imNqx32rN8aiCz3k7/dytseimmvuz0eey3hcan'],
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
	var falseDate = new Date();
	falseDate.setMonth(falseDate.getMonth() - 2);
	Items.insert({
			name: "Blessed to Bless",
			description: "Best to be blessed tho",
			price: 25.00,
			category: "clothes",
			sex: ['women', 'men'],
			subcategories: {
				'sweaters': false,
				'bottoms' : false,
				'denim' : false,
				'dresses' : false,
				'outerwear' : true,
				'tops' : false
			},
			shippingNotes: 'Flat rate $5',
			sale: false,
			preorder: false,
			photos: ['products/product-5MmtDwD9sEPpGqPBZ/vobqiv8ihsi52xohhimd', 'products/product-5MmtDwD9sEPpGqPBZ/afysgzrj0h9ugwgyi48r'],
			sizes: {
				'XL': 0,
				'XS': 0,
				'S': 30,
				'M': 40,
				'L': 20,
				'general': 0
			},
			createdAt: falseDate
	});

	Items.insert({
			name: "Star-Spangled Graphic Sweater",
			description: "whao",
			price: 25.00,
			category: "clothes",
			sex: ['women'],
			subcategories: {
				'sweaters': true,
				'bottoms' : false,
				'denim' : false,
				'dresses' : false,
				'outerwear' : false,
				'tops' : false
			},
			shippingNotes: 'Flat rate $5',
			sale: true,
			preorder: false,
			photos: ['products/product-ERcpRMJ4JvzbiYuxt/av5ja9pwfc5wgdsfaizg'],
			sizes: {
				'XL': 0,
				'XS': 0,
				'S': 1,
				'M': 0,
				'L': 0,
				'general': 0
			},
			createdAt: new Date()
	});

		Items.insert({
			name: "Star-Spangled Accessory",
			description: "whao",
			price: 25.00,
			category: "misc",
			sex: [],
			subcategories: {
				'accessories': true,
				'artwork' : false
			},
			shippingNotes: 'Flat rate $5',
			sale: true,
			preorder: false,
			photos: ['products/product-ERcpRMJ4JvzbiYuxt/av5ja9pwfc5wgdsfaizg'],
			sizes: {
				'XL': 0,
				'XS': 0,
				'S': 0,
				'M': 0,
				'L': 0,
				'general': 2
			},
			createdAt: new Date()
	});

	// Publishing..


	Meteor.publish('allItems', function() {
		return Items.find({});

	})
	//tryna get rid of this..
	Meteor.publish('navCategories', function() {
		return NavCategories.find({})
	})


	Meteor.publish('inventoryCategories', function() {
		return InventoryCategories.find({})
	})
	
	//idk wtf this is
	Meteor.publish('category', function(categoryName) {
		return NavCategories.find({name: categoryName})
	})

}

