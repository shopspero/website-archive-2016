
// Cart Builder
addToCart = function(newProductId, size, newQuantity) {
    	var cart = Session.get('cart');
    	var itemFound = false;
    	
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
