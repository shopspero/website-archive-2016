
Items = new Mongo.Collection('items')


if (Meteor.isServer) {
	if (Items.find().count() != 0){
		// CLEAR DB before work
		Items.remove({})
	}

	console.log('creating 15 items..')
	for (i=0; i < 15; i++) {
		Items.insert({
			name: "Hood " + i,
			price: 40.00,
			category: ['Women', 'Men'],
			type: 'Sweatshirt',
			photos: ['https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg'],
			sizes: {
				'S': 30,
				'M': 40,
				'L': 20
			},
			createdAt: new Date()
		});
	}
	/*
	Items.insert({
		name: "Hood Berkeley",
		price: 40.00,
		category: 'Women',
		photos: ['https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg'],
		sizes: {
			'S': 30,
			'M': 40,
			'L': 20
		},
		createdAt: new Date()
	});
	*/
	Items.insert({
		name: "Hood Irvine",
		price: 40.00,
		category: ['Men'],
		type: 'Sweatshirt',
		photos: ['https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg'],
		sizes: {
			'S': 30,
			'M': 40,
			'L': 20
		},
		createdAt: new Date()
	})
	Items.insert({
		name: "Hood LA",
		price: 40.00,
		category: ['Accessories'],
		type: 'Sweatshirt',
		photos: ['https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg'],
		sizes: {
			'S': 30,
			'M': 40,
			'L': 20
		},
		createdAt: new Date()
	})

}

