Template.addInventory.onCreated(function() {
	this.subscribe("categories")
	this.subscribe("inventoryCategories")
})

Template.addInventory.helpers({
	categories: InventoryCategories.find({}),
	selectedCategory: function() {
		return Session.get('selectedCategory') || InventoryCategories.findOne({ name: "Clothes"})
	},
	selectedMen: function() {
		return Session.get('selectedMen') || false
	},
	selectedWomen: function() {
		return Session.get('selectedWomen') || false
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
        Session.set('selectedCategory', InventoryCategories.findOne(categoryId))
        if (InventoryCategories.findOne(categoryId).options) {
        	console.log('yasss')
        } else {
        	console.log('noo')
        }
        
     },

     "change #sexMen": function(event){
     	Session.set('selectedMen', event.target.checked)
     	console.log('status.. women, men')
     	console.log(Session.get('selectedWomen'))
     	console.log(Session.get('selectedMen'))
     }
     ,
     "change #sexWomen": function(event) {
     	Session.set('selectedWomen', event.target.checked)
     	console.log('status.. women, men')
     	console.log(Session.get('selectedWomen'))
     	console.log(Session.get('selectedMen'))
     }
     

});