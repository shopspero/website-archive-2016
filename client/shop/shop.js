Template.shopContent.onCreated(function() {
	this.category = Template.currentData().category
	this.subcategory = (Template.currentData().subcategory && Template.currentData().subcategory.name) || ''
	this.subscribe('allItems')
})



Template.shopContent.helpers({
	name: function() {
		return Template.currentData().sex || Template.currentData().category.name
	},
	subcategoryName: function() {
		return (Template.currentData().subcategory && ('/ ' + Template.currentData().subcategory.name)) || ''
	},
	coverItem: function() {
		/* http://dweldon.silvrback.com/guards */
		var one;
		var findQuery = {};
		findQuery.category = Template.currentData().category.query;

		if (Template.currentData().sex) {
			findQuery.sex = Template.currentData().sex.toLowerCase();
		}

		if (Template.currentData().category.name == 'New Arrivals') {
			var newArrivalDate = new Date();
			newArrivalDate.setMonth(newArrivalDate.getMonth() - 1)
			findQuery.createdAt = { $gte : newArrivalDate },
			delete findQuery.category; 		
		}

		if (Template.currentData().category.name == 'Misc') {
			findQuery.category = 'misc';
		}

		if (Template.currentData().category.name == 'All') {
			delete findQuery.category;
		}
		
		if  (Template.currentData().subcategory) {
			var subcategorySelect = 'subcategories.' + Template.currentData().subcategory.query
			findQuery[subcategorySelect] = true;
		}

		var one = Items.findOne(findQuery, { sort: { createdAt: -1 }})
		return one && (one.photos[1] || one.photos[0])
	},
	items: function() {
		var findQuery = {};
		findQuery.category = Template.currentData().category.query;

		if (Template.currentData().sex) {
			findQuery.sex = Template.currentData().sex.toLowerCase();
		}

		if (Template.currentData().category.name == 'New Arrivals') {
			var newArrivalDate = new Date();
			newArrivalDate.setMonth(newArrivalDate.getMonth() - 1)
			findQuery.createdAt = { $gte : newArrivalDate }
			delete findQuery.category; 	
		}

		if (Template.currentData().category.name == 'All') {
			delete findQuery.category;
		}

		if  (Template.currentData().subcategory) {
			var subcategorySelect = 'subcategories.' + Template.currentData().subcategory.query
			findQuery[subcategorySelect] = true;
		}
		return Items.find(findQuery, { sort: { createdAt: -1 }})
	}

})


Template.shopContent.events({
	"click .addMedium": function(event) {
		var addedProductId = this._id;
    	var cart = Session.get('cart');
    	var itemFound = false;
    	var size = "Medium"; // hardcoded for now...
    	cart.forEach(function(cartItem) {
    		if (cartItem.productId == addedProductId && cartItem.size == size) {
    			itemFound = true;
    			cartItem.quantity += 1;
    		}
    	})
    	if (!itemFound) {
    		cart.push({productId: addedProductId, size: size, quantity: 1 } )
    	}
    	console.log(cart)
    	Session.setPersistent('cart', cart)
    },
    "click .addLarge": function(event) {
		var addedProductId = this._id;
    	var cart = Session.get('cart');
    	var itemFound = false;
    	var size = "Large"; // hardcoded for now...
    	cart.forEach(function(cartItem) {
    		if (cartItem.productId == addedProductId && cartItem.size == size) {
    			itemFound = true;
    			cartItem.quantity += 1;
    		}
    	})
    	if (!itemFound) {
    		cart.push({productId: addedProductId, size: size, quantity: 1 } )
    	}
    	console.log(cart)
    	Session.setPersistent('cart', cart)
    }
})	

