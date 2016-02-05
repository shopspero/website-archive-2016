Template.addInventory.onCreated(function() {


	console.log("CREATED")

	if (Session.get('garbagePhotos')) {
		Session.get('garbagePhotos').forEach(function(public_id, index) {
			console.log('deleting garbage..')
			Cloudinary.delete(public_id, function(err, res) {
				
			})
		})
	}

	if (Session.get('garbageItem')) {
		console.log(Items.find(Session.get('garbageItem')))
		Items.remove(Session.get('garbageItem'))
	}
	console.log(Items.find(Session.get('garbageItem')))
	console.log('w')
	Session.setPersistent('garbagePhotos', [])
	Session.setPersistent('garbageItem', '')

	Session.set({ 
		'selectedCategory': false,
		'selectedMen': false,
		'selectedWomen': false,
		'photos': [],
		'errors': []
	})
	this.subscribe("categories")
	this.subscribe("inventoryCategories")

})

Template.addInventory.onDestroyed(function(){
	console.log('DESTROYED')
	
	Session.get('photos').forEach(function(public_id, index) {
		console.log('deleting all..')
		Cloudinary.delete(public_id, function(err, res) {
			
		})
	})
	
})

Template.addInventory.onRendered(function() {
	$('#price-error').hide();
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
	},
	errors: function() {
		return Session.get('errors')
	}
})


Template.addInventory.events({
	"submit .new-inventory": function (event, template) {
		// Prevent default browser form submit
		event.preventDefault();

		var newInventory = {}

		// Get name
		newInventory.name = event.target.name.value;
		if (! newInventory.name) {
			Session.set('errors', Session.get('errors').push())
		}


		newInventory.description = event.target.description.value;


		var regex  = /^\d+(\.\d{0,2})?$/;
		if (regex.test(event.target.price.value)) {
			newInventory.price = parseFloat(event.target.price.value)
			console.log('good')
			Session.set('errors', [])
		} else {
			console.log('bad')
			Session.set('errors', ['price'])

			return
		}




		newInventory.category = event.target.category.value.toLowerCase();

		newInventory.sex = []
		if (Session.get('selectedMen')) {
			newInventory.sex.push('men');
		}
		if (Session.get('selectedWomen')) {
			newInventory.sex.push('women');
		}

		// additional options
		newInventory.sale = event.target.sale.checked
		newInventory.preorder = event.target.preorder.checked

		newInventory.subcategories = {}
		InventoryCategories.findOne({name: "Clothes"}).options[0].subcategories.forEach(function(subcategory, index){
			newInventory.subcategories[subcategory.query] = (event.target[subcategory.name] && event.target[subcategory.name].checked) || false
		});

		var sizes = template.view.template.__helpers.get('sizes').call()
		newInventory.sizes = {}
		sizes.forEach(function(size, index) {
			newInventory.sizes[size] = (event.target[size] && parseInt(event.target[size].value)) || 0
		})
		newInventory.sizes['general'] = (event.target.general && parseInt(event.target.general.value)) || 0


		newInventory.photos = Session.get('photos')


		newInventory.shippingNotes = event.target.shippingNotes.value;

		newInventory.createdAt = new Date();

		console.log(newInventory)

		Items.update(Session.get('garbageItem'), newInventory);


		// Clear form
		//event.target.name.value = "done";




		template.find(".new-inventory").reset();
		Session.set({ 
			'selectedCategory': false,
			'selectedMen': false,
			'selectedWomen': false,
			'photos': []
		})

		Session.setPersistent('garbagePhotos', [])
		Session.setPersistent('garbageItem', '')







		// Insert item into the collection
		/*
		Items.insert(newInventory); */
		
	},
	"change #category-select": function(event){
        var categoryName = event.target.value
        Session.set('selectedCategory', InventoryCategories.findOne({name: categoryName}))
        
    },

    "change #sexMen": function(event){
     	Session.set('selectedMen', event.target.checked)
    },
	"change #sexWomen": function(event) {
		Session.set('selectedWomen', event.target.checked)
	},

	"change input[type='file']": function(event) {


		if (Session.get('garbageItem') == '') {
			var garbage_id = Items.insert({})
			Session.setPersistent('garbageItem', garbage_id)
		}


		var files = event.target.files
		console.log(files)
		Cloudinary.upload(files, { folder: 'products/product-'+ Session.get('garbageItem') }, function(err, res) {
			if (err) {
				// do something
				console.log("Upload Error: " + err);
				return
			}
			
			if (res) {
				var photos = Session.get('photos')
				photos.push(res.public_id)
				Session.set('photos', photos)

				var garbagePhotos = Session.get('garbagePhotos')
				console.log(res.public_id)
				garbagePhotos.push(res.public_id)
				Session.setPersistent('garbagePhotos', garbagePhotos)

			}
			
        });


    },
    "click .btn.btn-danger": function(event) {
    	var public_id = this.toString()
    	var photos = Session.get('photos')
        photo_index = photos.indexOf(public_id);
        if (photo_index > -1) {
        	photos.splice(photo_index, 1)
        }
        Session.set('photos', photos)
    	Cloudinary.delete(public_id, function(err, res) {
    		console.log('success in deleting')
    	})
    	
    },

    "click .order-left": function(event) {
    	var public_id = this.toString();

    	if (public_id) {

	    	var photos = Session.get('photos')
	        photo_index = photos.indexOf(public_id);
	    	if (photo_index != 0) {
	    		var temp = photos[photo_index - 1]
	    		photos[photo_index-1] = public_id
	    		photos[photo_index] = temp
	    		Session.set('photos', photos)
	    	}


	    }
    },

    "click .order-right": function(event) {
    	var public_id = this.toString();

    	if (public_id) {

	    	var photos = Session.get('photos')
	        photo_index = photos.indexOf(public_id);
	    	if (photo_index != photos.length - 1) {
	    		var temp = photos[photo_index + 1]
	    		photos[photo_index+1] = public_id
	    		photos[photo_index] = temp
	    		Session.set('photos', photos)
    		}

    	}
    	
    }
     

});