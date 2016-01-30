
Template.mainNav.onCreated(function() {
	this.subscribe('navCategories');

})


Template.mainNav.helpers({
  categories: NavCategories.find({})

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
	cart: function() {
		var cart = []
		Session.get('cart').forEach(function(item_id, index) {
			cart.push(Items.findOne(item_id))
		})
		return cart
	},
  	cartCount: function() {
  		return Session.get('cart').length
  	},
  	logo: "misc/Spero_Logo_White.png",
  	totalPrice: function() {
  		var total = 0
  		
		Session.get('cart').forEach(function(item_id, index) {
			total += Items.findOne(item_id).price
		})
		return total
  	}
})

Template.topNav.events({
	"click .remove": function(event) {
    	var item_id = event.target.id;
    	var index = Session.get('cart').indexOf(item_id)
    	var cart = Session.get('cart')
    	cart.splice(index, 1);
    	Session.setPersistent('cart', cart)
    	
    }
})

