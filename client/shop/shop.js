/* default crap.. use session */
Template.homeContent.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.shopContent.onCreated(function() {
	this.category = Template.currentData().category
	this.subcategory = (Template.currentData().subcategory && Template.currentData().subcategory.name) || ''
	this.subscribe('allItems')
	//this.subscribe('items', this.category, this.subcategory)
})



Template.shopContent.helpers({
	name: function() {
		return Template.currentData().category.name
	},
	subcategoryName: function() {
		return (Template.currentData().subcategory && ('- ' + Template.currentData().subcategory.name)) || ''
	},
	coverItem: function() {
		/* http://dweldon.silvrback.com/guards */
		var one;
		if (Template.currentData().subcategory) {
			one = Items.findOne({category: Template.currentData().category.name, subcategories: Template.currentData().subcategory.query }, { sort: { createdAt: -1 }})
		} else {
			one =  Items.findOne({category: Template.currentData().category.name }, { sort: { createdAt: -1 }})
		}
		//var one = Items.findOne({category: Template.currentData().category.name}, { sort: { createdAt: -1 }})
		return one && one.photos[0]
	},
	items: function() {

		if (Template.currentData().subcategory) {
			return Items.find({category: Template.currentData().category.name, subcategories: Template.currentData().subcategory.query }, { sort: { createdAt: -1 }})
		} else {
			return Items.find({category: Template.currentData().category.name }, { sort: { createdAt: -1 }})
		}
	}

})

