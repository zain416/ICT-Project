let productsContainer = document.getElementById("products");
let cartIcon = document.getElementById("cart-icon");
let cart = document.getElementById("cart");
let cartItemsContainer = document.querySelector(".cart-item-container");
let clearCartBtn = document.getElementById("clear-cart-btn");
let placeOrderModal = document.querySelector(".place-order-modal");
let placeOrderBtn = document.getElementById("place-order-btn");
let closeModalBtn = document.getElementById("close-modal-btn");
let orderItems = document.querySelector('.place-order-items');
let orderAmount = document.getElementById("order-amount");
let confirmOrder = document.getElementById("confirm-order-btn");

closeModalBtn.addEventListener("click", () => {
    placeOrderModal.classList.remove("active");
})
placeOrderBtn.addEventListener("click", () => {
    placeOrder();
    placeOrderModal.classList.add("active");
})

clearCartBtn.addEventListener("click", () => {
    cartItems.forEach(item => {
        item.qty = 0;
    })
    loadCartItems(cartItems);
})

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("active");
})

function loadCartItems(cartItems) {
    cartItemsContainer.innerHTML = "";
    cartItems.forEach(item => {
        if (item.qty > 0) {
            let itemContainer = document.createElement("div");
            let itemName = document.createElement("p");
            let closeBtn = document.createElement("a");
            let right = document.createElement("div");
            let quantity = document.createElement("p");
            quantity.innerText = item.qty;
            right.classList.add("right");
            closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>';
            closeBtn.classList.add("remove-cart-item");
            closeBtn.href = "#";
            closeBtn.id = item.id;
            itemName.innerText = item.name;
            itemContainer.classList.add("cart-item");
            itemContainer.append(itemName);
            right.append(quantity);
            right.append(closeBtn);
            itemContainer.append(right);
            cartItemsContainer.append(itemContainer);
            closeBtn.addEventListener("click", () => {
                cartItems.forEach(item => {
                    if (item.id == closeBtn.id) {
                        item.qty = 0;
                    }
                })
                loadCartItems(cartItems);
            })
        }
    })
}


let products = [
    {
        name: 'koke',
        id: 1,
        img: 'media/Firefly 20241206214520(1)(1)(1).png',
        price: 2,
        qty: 0,
    },
    {
        name: 'koke diet',
        id: 2,
        img: 'media/Firefly 20241206214520(1)(1)(1).png',
        price: 5,
        qty: 0,
    },
    {
        name: 'koke energy',
        id: 3,
        img: 'media/Firefly 20241206214520(1)(1)(1).png',
        price: 5,
        qty: 0,
    },
    {
        name: 'koke fuze',
        id: 4,
        img: 'media/Firefly 20241206214520(1)(1)(1).png',
        price: 2,
        qty: 0,
    }
];

let cartItems = products;

loadCartItems(cartItems);

function displayProducts(products) {
    products.forEach(product => {
        let productDiv = document.createElement("div");
        let image = document.createElement("img");
        let name = document.createElement("p");
        let addToCart = document.createElement("a");
        addToCart.classList.add("add-to-card");
        addToCart.innerText = "Add to cart";
        productDiv.classList.add("product-card");
        image.src = "media/Firefly 20241206214520(1)(1)(1).png";
        name.innerText = product.name;
        addToCart.id = product.id;
        productDiv.append(image);
        productDiv.append(name);
        productDiv.append(addToCart);

        productsContainer.appendChild(productDiv);

        addToCart.addEventListener("click", () => {
            cartItems.forEach(item => {
                if (product.id === item.id) {
                    item.qty++;
                }
            })
            loadCartItems(cartItems);
        })
    })
}


function placeOrder() {
    let amount = 0;
    orderItems.innerHTML = "<tr><th>item</th><th>price</th><th>quantity</th></tr>";
    cartItems.forEach(item => {
        if (item.qty > 0) {
            amount += item.qty * item.price;
            let row = document.createElement("tr");
            let iName = document.createElement("td");
            let iPrice = document.createElement("td");
            let iQty = document.createElement("td");

            iName.innerText = item.name;
            iPrice.innerText = item.price;
            iQty.innerText = item.qty;

            row.append(iName);
            row.append(iPrice);
            row.append(iQty);

            orderItems.append(row);
        }
    })
    orderAmount.innerText = "$" + amount;

    confirmOrder.addEventListener("click", () => {
        cartItems.forEach(item => {
            item.qty = 0;
        })
        loadCartItems(cartItems);
        placeOrderModal.classList.remove("active");
        
        alert("Order confirmed for $" + amount);
    })

}

displayProducts(products);