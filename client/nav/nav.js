
Template.mainNav.onCreated(function() {
	this.subscribe('categories')

})


Template.mainNav.helpers({
  categories: Categories.find({})

});

Template.mainNav.events({
	'click .elem': function() {
		console.log("LOL???")
   		$(".dropdown-menu").visibility = "invisible" // not working
	},

})
