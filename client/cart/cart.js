Template.cartContent.onCreated(function() {
	Meteor.subscribe('allItems');
})

Template.cartContent.helpers({

	cartItems: function() {
		var cart = []
		Session.get('cart').forEach(function(item_id, index) {
			var item = Items.findOne(item_id)
			if (item) {
				cart.push(item)
			}
		})
		return cart
	},
	totalPrice: function() {
  		var total = 0
		Session.get('cart').forEach(function(item_id, index) {
			var item = Items.findOne(item_id)
			if (item) {
				total += item.price
			}
		})
		return total
  	}

})
