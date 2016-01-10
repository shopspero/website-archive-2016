Template.addInventory.onCreated(function() {
	this.subscribe("categories")
})

Template.addInventory.helpers({
	categories: Categories.find({}),
	selectedCategory: function() {
		return Session.get('selectedCategory')
	}
})
Template.addInventory.events({
	"submit .new-inventory": function (event) {
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		var text = event.target.name.value;
		console.log(text)

		var regex  = /^\d+(?:\.\d{0,2})$/;
		if (regex.test(event.target.price.value)) {
			alert('good')
		} else {
			alert('bad')
		}
		// Insert a task into the collection
		/*
		Tasks.insert({
			text: text,
			createdAt: new Date() // current time
		}); */

		// Clear form
		event.target.name.value = "done";
	},
	"change #category-select": function(event){
        var categoryId = event.target.value
        Session.set('selectedCategory', Categories.findOne(categoryId))
        if (Categories.findOne(categoryId).subcategories.length > 0) {
        	console.log('yasss')
        } else {
        	console.log('noo')
        }
        
     }
});