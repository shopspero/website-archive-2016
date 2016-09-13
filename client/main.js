
// font set up
Meteor.startup(function() {

  WebFontConfig = {
    google: { families: [ 'Prata'] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
    console.log("async fonts loaded", WebFontConfig);
  })();

})


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

