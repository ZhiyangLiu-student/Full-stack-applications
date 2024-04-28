import condition from "../model/condition.js";

const productsEl = document.querySelector(".products");
const cartEl = document.querySelector(".cartlist");

function render() {
	if (condition.viewCart) {
		renderCart(cartEl);
	} else {
		renderCartEmpty(cartEl);
	}
	renderProducts(productsEl);
}

function renderProducts(productsEl) {
    const listHtml = getListHtml()
    const viewCartBtn = getViewCartHtml()
	const productsHtml = `
        <h2>Furry List</h2>
        <ul class="lists">${listHtml}</ul>
        ${viewCartBtn}
        `;
	productsEl.innerHTML = productsHtml;
}

function renderCartEmpty(cartEl) {
	cartEl.innerHTML = "";
}

function renderCart(cartEl) {
    const totalCount = condition.getCartCount()
	let cartListHtml; 
    if(totalCount){
        cartListHtml = getCartHtml();
    }else{
       cartListHtml = `<p>Cart is empty. Select some items.</p>`
    }
	cartEl.innerHTML = `
    <h2>Shopping Cart</h2>
    ${cartListHtml}
    `;
}

function getListHtml() {
    const lists = [];
    const products = condition.products;

    for (let index = 0; index < products.length; index++) {
        const product = products[index];

        lists.push(`
        <li class="product">
            <h3 data-index="${index}">Name: ${product.name}</h3>
            <img src="${product.listImg}"/>
            <p>&#128176 Price: $${product.price}</p>
            <button 
              data-index="${index}" class="add-to-cart" type="button">
              &#128008 Add to cart
            </button>
        </li>
        `);
    }

    return lists.join("");
}

function getViewCartHtml() {
    const totalCount = condition.getCartCount()
    let viewCartText = `View Cart`;
    if(totalCount){
        viewCartText = `View Cart (${totalCount})` 
    }
    let btnText;
    if(condition.viewCart){
        btnText = "Hide Cart";
    }else{
        btnText = viewCartText;
    }
    return `
    <button type="button" class="view-cart">
        &#128071${btnText}
    </button>
    `
}

function getCartHtml() {
    let cartHtml = "";
    
    const productsInCart = condition.products.filter(function(product) {
        return product.count > 0;
    });

    for (let index = 0; index < productsInCart.length; index++) {
        const product = productsInCart[index];
        let cartState;
        if (product.count) {
            cartState = "in-cart";
        } else {
            cartState = "not-in-cart";
        }

        cartHtml += `
            <li class="cart ${cartState}">
                <h4 data-index="${index}">
                    ${product.name}
                </h4>
                <img src="${product.cartImg}">
                <div>
                    <button data-index="${index}" class="minus" type="button">-</button>
                    <span>${product.count}</span>
                    <button data-index="${index}" class="add" type="button">+</button>
                </div>
                <p>&#128176; Price: $${condition.getPerPrice(index)}</p>
            </li>
        `;
    }

    cartHtml = `<ul class="carts">${cartHtml}</ul>`;
    const totalPriceHtml = `<p>&#127975; Total Price: $${condition.getTotalPrice()}</p>`;
    const checkoutBtn = `<button type="button" class="checkout">Checkout</button>`;
    
    cartHtml += totalPriceHtml;
    cartHtml += checkoutBtn;

    return cartHtml;
}


export default render;