
Template.homeContent.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.shopContent.onCreated(function() {
	this.category = Template.currentData().category
	this.subcategory = Template.currentData().subcategoryName

	this.subscribe('allItems')
	//this.subscribe('items', this.category, this.subcategory)

})



Template.shopContent.helpers({
	namae: function() {
		return Template.currentData().category.name
	},
	subcategoryNamed: function() {
		return Template.currentData().subcategoryName
	},
	yo: function() {

		if (Template.currentData().subcategoryName) {
			return Items.find({category: Template.currentData().category.name, subcategories: Template.currentData().subcategoryName }).count()
		} else {
			return Items.find({category: Template.currentData().category.name }).count()
		}
	}

})


Template.newArrivals.onCreated(function() {
	//this.subscribe('items', 'Women', null, 1);
	this.subscribe('items', 'Women', null);
	this.subscribe('allItems')
	//this.subscribe('allItems')
})

console.log('Number of items' + Items.find().count())
Template.newArrivals.helpers({
	/* fetch clothes less than 15 days old */
	name: 'New Arrivals',
	cov: Items.findOne({}),
	coverItem: function() {
		/* http://dweldon.silvrback.com/guards */
		var one = Items.findOne({category: 'Women'}, { sort: { createdAt: -1 }})
		return one && one.photos[0]
	},
	items: Items.find({category: 'Women'},  { sort: { createdAt: -1 }})
})

Template.women.onCreated(function() {
	this.subscribe('items', 'Women', null, 0);
})
Template.women.helpers({
	subcategory: function() {
		var router = Router.current();
		return router && router.params.query.subcategory
	},
	items: Items.find({ category: 'Women'})
})

Template.women.onRendered(function() {
	this.subcategory = Router.current().params
})

Template.men.onCreated(function() {
	this.subscribe('items', 'Men', null, 0);
})

Template.men.helpers({
	/* fetch clothes less than 15 days old */
	items: Items.find({ category: 'Men'})
})

Template.accessories.helpers({
	/* fetch clothes less than 15 days old */
	items: Items.find({ category: 'Accessories'})
})

Template.artwork.helpers({
	/* fetch clothes less than 15 days old */
	items: Items.find({})
})

Template.all.helpers({
	/* fetch clothes less than 15 days old */
	items: Items.find({})
})


