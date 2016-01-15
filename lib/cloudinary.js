if (Meteor.isServer) {

	Cloudinary.config({
		cloud_name: 'shop-spero',
	    api_key: '733553657929547',
	    api_secret: 'nSt_7fgeIjQhEM-ssInUBPv09KE'
	})
}

if (Meteor.isClient) {
	$.cloudinary.config({
		cloud_name: "shop-spero"
	});

}