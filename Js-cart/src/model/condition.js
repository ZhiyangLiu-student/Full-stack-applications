const condition = {
	products: [
		{
			name: "Whitepeach",
			listImg: "http://placekitten.com/150/150?image=1",
			cartImg: "http://placekitten.com/50/50?image=1",
			price: 0.99,
			count: 0,
		},
		{
			name: "Tutou",
			listImg: "http://placekitten.com/150/150?image=2",
			cartImg: "http://placekitten.com/50/50?image=2",
			price: 2.73,
			count: 0,
		},
		{
			name: "Muffin",
			listImg: "http://placekitten.com/150/150?image=3",
			cartImg: "http://placekitten.com/50/50?image=3",
			price: 3.14,
			count: 0,
		},
		
	],

	viewCart: false,

	getCartCount: function () {
		let totalCount = 0;
		const products = condition.products;
		for (let i = 0; i < products.length; i++) {
			totalCount += products[i].count;
		}
		return totalCount;
	},

	getPerPrice(index) {
        const { count, price } = condition.products[index];
        return (count * price).toFixed(2);
    },

	getTotalPrice: function () {
		let totalPrice = 0;
		const products = condition.products;
		for (let i = 0; i < products.length; i++) {
			totalPrice += products[i].count * products[i].price;
		}
		return totalPrice.toFixed(2);
	},
};

export default condition;