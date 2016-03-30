// Template.product.onCreated(function() {
//     console.log("product page")
//     var initImg = Session.get('photos')[0];

//     Session.set({
//         'mainImg': initImg
//     })
// })
Template.product.helpers({
    sizes: function() {
        return ['XS', 'S', 'M', 'L', 'XL']
    }
})
Template.product.events({
    "click .alt-img": function(event) {
        var newSrc = c.url(this);
        window.alert(5 + 6);
        $('img[name=mainImage]').attr('src', newSrc);
    }
})