//set cart to nothing
Session.setDefaultPersistent('cart', [])


Template.homeContent.helpers({
  counter: function () {
    return Session.get('counter');
  },
  home_cover: 'misc/home_cover'
});

Template.homeCover.events({
  'click button': function () {
    // increment the counter when button is clicked
    //this.layout('shop-layout')
    Router.go('/newArrivals') // goes into {{ > yield }} of home layout
    // Session.set('counter', Session.get('counter') + 1);
  }
});