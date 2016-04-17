
// Cart Builder
addToCart = function(newProductId, size, newQuantity) {
    	var cart = Session.get('cart');
    	var itemFound = false;
    	// should we change this? don't allow adding if already in cart. change quantity through cart module
    	if (!newQuantity) {
    		newQuantity = 1
    	}
    	cart.forEach(function(cartItem) {
    		if (cartItem.productId == newProductId && cartItem.size == size) {
    			itemFound = true;
    			cartItem.quantity = Number(cartItem.quantity) + Number(newQuantity); //+ makes this a num
    		}
    	})
    	if (!itemFound) {
    		cart.push({productId: newProductId, size: size, quantity: newQuantity } )
    	}
    	Session.setPersistent('cart', cart) 
};
