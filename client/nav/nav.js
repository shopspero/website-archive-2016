
Template.mainNav.onCreated(function() {
	this.subscribe('categories')
})


Template.mainNav.helpers({
  categories: Categories.find({})
});
