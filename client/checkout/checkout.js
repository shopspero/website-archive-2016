Template.orderContent.onCreated(function() {
	Meteor.subscribe('allItems');
})

Template.orderContent.helpers({

	orderItems: function() {
		var order = []
		// use paypal api here



		return order
	},

	totalPrice: function() {
		var total = 0
		Session.get('cart').forEach(function(item_id, index){
			var item = Items.findOne(item_id)
			if (item) {
				total += item.price
			}
			var tax = 1.075 // need to implement tax based on state
			total *= tax
			return total
		})



	}









})