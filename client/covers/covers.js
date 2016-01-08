
Template.categoryCover.helpers({
});

// TODO: need to re render the template on page change 
Template.categoryCover.onRendered(function () {
  console.log('template rendering...')
  console.log(Router.current().route._path)
  //$('div#categoryName').text(Router.current().route._path)
})

