Router.configure({
  // the default layout
  layoutTemplate: 'layout'  // this sets the default this.layout
});


Router.route('/', function () {
  //this.layout('mainNav');
   // shop all button
  //this.render('homeCover', {to: 'cover'})
  this.render('homeContent', {to: 'content'})
  
});

Router.route('/shopAll', function() {
  //this.layout('shopLayout')
  this.render('shopAll') // goes into {{ > yield }} of home layout
})


Router.route('/about', function() {
  this.render(null, {to:'cover'})
  this.render('about', {to: 'content'})
})

Router.route('/inventory', {
  layoutTemplate: 'layout',
  onBeforeAction: function () {
    if (!Meteor.user()) {
            // render the login template but keep the url in the browser the same
      this.render('homeContent', {to: 'content'})
    } else {
      this.next()
    }
  },
  action: function() {
    this.render('inventoryContent', {to: 'content'})
  }
})


clientCategories.forEach(function(category, index) {
  Router.route(category.categoryUrl, function() {
    this.layout('layout');
    
    this.render('shopContent', {to: 'content', data: function() {
      var subcategoryUrl = this.params.query.subcategory
      var subcategory = clientCategories[index].subcategories.filter(function (subcategory) { 
        return subcategory.query === subcategoryUrl

      })[0];
      return { category: category, subcategory: subcategory };
    }})
    //this.render(category.categoryUrl.substring(1,), {to: 'content'})
    
  })
})
