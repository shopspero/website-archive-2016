
Template.mainNav.onCreated(function() {
	this.subscribe('categories');

})


Template.mainNav.helpers({
  categories: Categories.find({})

});

Template.mainNav.events({
	'click .elem': function() {
		console.log("LOL???")
   		$(".dropdown-menu").visibility = "invisible" // not working
	},

})

Template.topNav.onCreated(function() {
	this.subscribe('allItems');


})

Template.topNav.onRendered(function() {
	$('.navbar-lower').affix({
  		offset: {top: 50}
	});
})


Template.topNav.helpers({
	  cart: Items.find({}, {limit: 2}),
  	cartCount: 2,
  	logo: "misc/Spero_Logo_White.png"
})

