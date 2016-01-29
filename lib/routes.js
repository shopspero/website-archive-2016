Router.configure({
  // the default layout
  layoutTemplate: 'layout'  // this sets the default this.layout
});


Router.route('/', function () {
	//this.layout('mainNav');
   	// shop all button
  	//this.render('homeCover', {to: 'cover'})
  	this.render('homeContent', {to: 'content'})
  
});



Router.route('/about', function() {
	this.render(null, {to:'cover'})
	this.render('about', {to: 'content'})
})

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
	//this.layout('shopLayout')
	this.render('shopAll') // goes into {{ > yield }} of home layout
})
Router.route('/newArrivals', function() {
	//this.layout('shopLayout')
	this.render('shopAll') // goes into {{ > yield }} of home layout
})
Router.route('/sale', function() {
	//this.layout('shopLayout')
	this.render('shopAll') // goes into {{ > yield }} of home layout
})



