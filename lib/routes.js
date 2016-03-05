Router.configure({
  // the default layout
  layoutTemplate: 'layout'  // this sets the default this.layout
});


Router.route('/', function () {
	this.layout('homeLayout')
  	this.render('homeContent', {to: 'content'})
});


Router.route('/about', function() {
	this.render(null, {to:'cover'})
	this.render('about', {to: 'content'})
})

/* set up route to deal with inventory, only permission for admin */
Router.route('/inventory', {
	layoutTemplate: 'layout',
	onBeforeAction: function () {
		var loggedInUser = Meteor.user();

  		if (! Roles.userIsInRole(loggedInUser, 'admin', 'default-group')) {
			// render the login template but keep the url in the browser the same
		  	this.render('homeContent', {to: 'content'})
		} else {
			this.next()
		}
	},
	action: function() {
		this.render('inventoryContent', {to: 'content'})
	}
})

/* set up routes for each category */
inventoryCategories.forEach(function(category, index) {
	if (category.name == "Clothes") {
		category.options.forEach(function(sexOption, index) {
			Router.route(sexOption.categoryUrl, function() {
				this.layout('layout');
				this.render('shopContent', {to: 'content', data: function() {
					var subcategoryUrl = this.params.query.subcategory
				  	var subcategory = sexOption.subcategories.filter(function (subcategory) { 
						return subcategory.query === subcategoryUrl
				  	})[0];
				 	return { category: category, subcategory: subcategory, sex: sexOption.sex};
				}})
  			})
		})
		
	} else {
		Router.route(category.categoryUrl, function() {
			this.layout('layout');
			this.render('shopContent', {to: 'content', data: function() {
				
			 	return { category: category};
			}})
  		})
	}
})

Router.route('/all', function() {
	this.layout('layout');
	this.render('shopContent', {to: 'content', data: function() {
 		return { category: { name: 'All', query: 'all'} };
	}})
	
})

Router.route('/newArrivals', function() {
	this.layout('layout');
	this.render('shopContent', {to: 'content', data: function() {
 		return { category: { name: 'New Arrivals', query: 'newArrivals'} };
	}})
})

miscCategory = navCategories[3]
miscSubcategories = miscCategory.subcategories

Router.route('/misc', function() {
	this.layout('layout');
	this.render('shopContent', {to: 'content', data: function() {
		var subcategoryUrl = this.params.query.subcategory
		var subcategory = miscSubcategories.filter(function (subcategory) { 
			return subcategory.query === subcategoryUrl
		})[0];
		return { category: miscCategory, subcategory: subcategory }
	}})
})

Router.route('/product/:_id', function() {
	this.layout('layout');
	this.render('product', { to: 'content', data: function() {
		console.log(this.params._id);
		var currentProductId = this.params._id;
		return Items.findOne(currentProductId);
	}})
})

Router.route('/cart', function() {
	this.layout('layout');
	this.render('cartContent', {to: 'content'})
})



