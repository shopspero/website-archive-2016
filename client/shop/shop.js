
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

	items: Items.find({ category: 'Women'})
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


