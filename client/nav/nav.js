


Template.mainNav.helpers({
  categories: navCategories

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
	checkCart: function() {
		var cart = Session.get('cart');
		cart.forEach(function(item_id, index) {
			var item = Items.findOne(item_id)
			if  (! item) {
				delete_index = Session.get('cart').indexOf(item_id);
				cart.splice(delete_index, 1);
			}
		})
		Session.setPersistent('cart', cart)
	},
	cart: function() {
		var cart = []
		Session.get('cart').forEach(function(item_id, index) {
			var item = Items.findOne(item_id)
			if (item) {
				cart.push(Items.findOne(item_id))
			}
		})
		return cart
	},
  	cartCount: function() {
  		return Session.get('cart').length
  	},
  	logo: "misc/Spero_Logo_Black",
  	totalPrice: function() {
  		var total = 0
  		
		Session.get('cart').forEach(function(item_id, index) {
			console.log(item_id)
			var item = Items.findOne(item_id)
			if (item) {
				total += item.price
			}
		})
		return total
  	}
})

Template.topNav.events({
	"click .remove": function(event) {
    	var item_id = event.target.id;
        var cart = Session.get('cart')
    	var index = cart.indexOf(item_id)
    	cart.splice(index, 1);
    	Session.setPersistent('cart', cart)
    	
    },
    "mouseenter .navbar-default": function(event) {
    	$(".navbar-default").css('opacity', 1.0);
	},
	"mouseleave .navbar-default": function(event) {
		$(".navbar-default").css('opacity', 0.7);	
	}
})

Template.mainNav.events({
    "mouseenter .navbar-default": function(event) {
    	$(".navbar-default").css('opacity', 1.0);
	},
	"mouseleave .navbar-default": function(event) {
		$(".navbar-default").css('opacity', 0.7);	
	}
})



