// Template.product.onCreated(function() {
//     console.log("product page")
//     var initImg = Session.get('photos')[0];

//     Session.set({
//         'mainImg': initImg
//     })
// })
Template.product.helpers({
    sizes: function() {
        return ['XS', 'S', 'M', 'L', 'XL']
    }
})
Template.product.events({
    "click .alt-img": function(event) {
        var newSrc = c.url(this);
        window.alert(5 + 6);
        $('img[name=mainImage]').attr('src', newSrc);
    }
})

Template.product.events({
    "submit .add-cart": function(event, template) {
    	event.preventDefault();
    	console.log(event.target)
		// Get name
		newSize = event.target.newSize.value;
		newQuantity = event.target.newQuantity.value;
		if (newQuantity != 0) {
			// this is in lib/builders
			addToCart(this._id, newSize, newQuantity);
		}

		// reset stuff
		//TODO: reset default size to non-selected ..?

		event.target.newQuantity.value = 1;


    }
})	
