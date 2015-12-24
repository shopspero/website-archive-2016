
Template.homeContent.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

console.log('Number of items' + Items.find().count())
Template.newArrivals.helpers({
	/* fetch clothes less than 15 days old */
	items: Items.find({category: 'Women'},  { sort: { createdAt: -1 }, limit: 10 })
})

Template.women.helpers({
	/* fetch clothes less than 15 days old */

	items: Items.find({ category: 'Women'}).fetch()
})

Template.men.helpers({
	/* fetch clothes less than 15 days old */
	items: Items.find({ category: 'Men'}).fetch()
})

Template.accessories.helpers({
	/* fetch clothes less than 15 days old */
	items: Items.find({ category: 'Accessories'}).fetch()
})

Template.artwork.helpers({
	/* fetch clothes less than 15 days old */
	items: Items.find({}).fetch()
})

Template.all.helpers({
	/* fetch clothes less than 15 days old */
	items: Items.find({}).fetch()
})


