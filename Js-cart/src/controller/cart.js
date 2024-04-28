import condition from "../model/condition.js";
import render from "../view/render.js";

const appEl = document.querySelector("#app");

const handleClick = (e) => {
    const handleViewCartClick = function() {
        condition.viewCart = !condition.viewCart;
    };
    
    const handleProductClick = function() {
        const index = e.target.dataset.index;
        condition.products[index].added = !condition.products[index].added;
    };
    
    const handleAddToCartClick = function() {
        const index = e.target.dataset.index;
        condition.products[index].count = Math.max(1, condition.products[index].count + 1);
    };
    
    const handleAddClick = function() {
        const index = e.target.dataset.index;
        condition.products[index].count += 1;
    };
    
    const handleMinusClick = function() {
        const index = e.target.dataset.index;
        condition.products[index].count = Math.max(0, condition.products[index].count - 1);
    };
    
    const handleCheckoutClick = function() {
        condition.products.forEach(function(product) {
            product.count = 0;
        });
    };

    if (e.target.classList.contains("view-cart")) {
        handleViewCartClick();
    } else if (e.target.classList.contains("product")) {
        handleProductClick();
    } else if (e.target.classList.contains("add-to-cart")) {
        handleAddToCartClick();
    } else if (e.target.classList.contains("add")) {
        handleAddClick();
    } else if (e.target.classList.contains("minus")) {
        handleMinusClick();
    } else if (e.target.classList.contains("checkout")) {
        handleCheckoutClick();
    }

    render();
};

appEl.addEventListener("click", handleClick);
render();