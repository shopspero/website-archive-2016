Template.addInventory.onCreated(function() {
	Session.set('selectedMen', false)
	Session.set('selectedWomen', false)
	Session.set('photos', [])
	this.subscribe("categories")
	this.subscribe("inventoryCategories")

})

Template.addInventory.helpers({
	categories: InventoryCategories.find({}),
	selectedCategory: function() {
		if (! Session.get('selectedCategory')) {
			// have to add latter because of subscription
			Session.set('selectedCategory', InventoryCategories.findOne({ name: "Clothes"}))
		}

		return Session.get('selectedCategory') 
	},
	selectedMen: function() {
		return Session.get('selectedMen')
	},
	selectedWomen: function() {
		return Session.get('selectedWomen')
	},
	subcategories: function() {
		if (Session.get('selectedMen') && Session.get('selectedCategory').options) {
			return InventoryCategories.findOne({name: "Clothes"}).options[1].subcategories
		} else if (Session.get('selectedWomen') && Session.get('selectedCategory').options) {
			return InventoryCategories.findOne({name: "Clothes"}).options[0].subcategories 
		} else {
			return []
		}
	},
	sizes: function() {
		return ['XS', 'S', 'M', 'L', 'XL']
	},
	photos: function() {
		return Session.get('photos')
	}
})
Template.addInventory.events({
	"submit .new-inventory": function (event, template) {
		// Prevent default browser form submit
		event.preventDefault();

		var newInventory = {}

		// Get value from form element
		newInventory.name = event.target.name.value;

		newInventory.name = event.target.description.value;


		var regex  = /^\d+(?:\.\d{0,2})$/;
		if (regex.test(event.target.price.value)) {
			newInventory.price = parseFloat(event.target.price.value)
			alert('good')
		} else {
			alert('bad')
		}

		newInventory.category = event.target.category.value

		newInventory.sex = []
		if (Session.get('selectedMen')) {
			newInventory.sex.push('Men');
		}
		if (Session.get('selectedWomen')) {
			newInventory.sex.push('Women');
		}

		// additional options
		newInventory.sale = event.target.sale.checked
		newInventory.preorder = event.target.preorder.checked

		InventoryCategories.findOne({name: "Clothes"}).options[0].subcategories.forEach(function(subcategory, index){
			newInventory[subcategory.name] = (event.target[subcategory.name] && event.target[subcategory.name].checked) || false
		});

		var sizes = template.view.template.__helpers.get('sizes').call()
		newInventory.sizes = {}
		sizes.forEach(function(size, index) {
			newInventory.sizes[size] = (event.target[size] && parseInt(event.target[size].value)) || 0
		})
		newInventory.sizes['general'] = (event.target.general && parseInt(event.target.general.value)) || 0


		console.log(newInventory)

		// Clear form
		event.target.name.value = "done";

		newInventory.photos = []


		newInventory.createdAt = new Date();




		// Insert item into the collection
		/*
		Items.insert(newInventory); */
		
	},
	"change #category-select": function(event){
        var categoryName = event.target.value
        Session.set('selectedCategory', InventoryCategories.findOne({name: categoryName}))
        if (InventoryCategories.findOne({name: categoryName}).options) {
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
    },
	"change #sexWomen": function(event) {
		Session.set('selectedWomen', event.target.checked)
		console.log('status.. swomen, men')
		console.log(Session.get('selectedWomen'))
		console.log(Session.get('selectedMen'))
	},

	"change input[type='file']": function(event) {
		var files = event.target.files
		Cloudinary.upload(files, { folder: "new-item" }, function(err, res) {
          console.log("Upload Error: " + err);
          console.log("Upload Result: " + res);
          var photos = Session.get('photos')
          photos.push(res.public_id)
          Session.set('photos', photos)
        });


    }       
     

});