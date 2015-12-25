Router.configure({
  // the default layout
  layoutTemplate: 'layout'  // this sets the default this.layout
});


Router.route('/', function () {
  //this.layout('mainNav');
   // shop all button
  this.render('homeCover', {to: 'cover'})
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

// set up categories
var categories = [
        { categoryName: 'New Arrivals', categoryUrl: '/newArrivals' },
        { categoryName: 'Women', categoryUrl: '/women' },
        { categoryName: 'Men', categoryUrl: '/men' },
        { categoryName: 'Accessories', categoryUrl: '/accessories' },
        { categoryName: 'Artwork', categoryUrl: '/artwork' },
        { categoryName: 'All', categoryUrl: '/all' },

      ]

categories.forEach(function(category, index) {
  Router.route(category.categoryUrl, function() {
    this.layout('layout')
    //this.render(category.categoryName)
    this.render('categoryCover', {to: 'cover'})
    this.render(category.categoryUrl.substring(1,), {to: 'content'})
  })
})
