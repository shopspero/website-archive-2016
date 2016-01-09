
Template.homeContent.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

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
	/* fetch clothes less than 15 days old */

	items: Items.find({ category: 'Women'})
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


