// Template.product.onCreated(function() {
//     console.log("product page")
//     var initImg = Session.get('photos')[0];

//     Session.set({
//         'mainImg': initImg
//     })
// })

Template.product.onCreated(function() {

    Session.setPersistent('mainImage', "") //add check if photo even exists TODO
})

Template.product.helpers({
    sizes: function() {


        console.log(this.sizes) // { "S": 1, "XS": 2}
        return ['XS', 'S', 'M', 'L', 'XL']
    },
    mainImage: function() {
        if (Session.get('mainImage') == "") {
            Session.setPersistent('mainImage', this.photos[0]); //add check TODO
        } 
        return Session.get('mainImage')
    }
})
Template.product.events({
    "click .alt-img": function(event) {
        console.log("old")
        console.log(Session.get('mainImage'))
        console.log('new')
        console.log(this.toString())

        Session.setPersistent('mainImage', this.toString())
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
