const productItems = [
    {
        name: "Espresso",
        description: "A strong and intense shot of coffee with a rich flavor and aroma.",
        price: 80.00,
        imgSource: "./img/espresso.png"
    },
    {
        name: "Cappuccino",
        description: "A classic coffee drink made with equal parts espresso, steamed milk, and milk foam.",
        price: 120.00,
        imgSource: "./img/cappuccino.png"
    },
    {
        name: "Latte",
        description: "Smooth espresso with a generous amount of steamed milk, topped with a layer of milk foam.",
        price: 130.00,
        imgSource: "./img/latte.png"
    }, 
    {
        name: "Mocha",
        description: "Indulgent espresso mixed with chocolate syrup and topped with steamed milk and whipped cream.",
        price: 140.00,
        imgSource: "./img/mocha.png"
    },
    {
        name: "Macchiato",
        description: 'A "stained" with a small amount of steamed milk, offering a bold and intense flavor.',
        price: 90.00,
        imgSource: "./img/macchiato.png"
    },
    {
        name: "Affogato",
        description: "A delightful dessert coffee made by pouring a shot of hot espresso over a scoop of vanilla ice cream.",
        price: 120.00,
        imgSource: "./img/affogato.png"
    },
    {
        name: "Cold Brew",
        description: "Smooth and refreshing coffee brewed with cold water over an extended period.",
        price: 140.00,
        imgSource: "./img/cold-brew.png"
    },
    {
        name: "Flat White",
        description: "Similar to a latte but with a higher coffee-to-milk ratio, resulting in a stronger coffee flavor.",
        price: 150.00,
        imgSource: "./img/flat-white.png"
    },
    {
        name: "Americano",
        description: "A simple yet bold coffee made by diluting espresso with hot water, resulting rich and smooth flavor.",
        price: 100.00,
        imgSource: "./img/americano.png"
    },

]

function setProductItems() {
    localStorage.setItem("productItems", JSON.stringify(productItems));
}

function getProductItems() {
    return JSON.parse(localStorage.getItem("productItems"));
}

function displayProducts(products) {
    for (let i = 0; i < products.length; i++) {
        if (i % 3 === 0) {
            // Create a new layer div for every group of 3 menu items
            var newLayer = document.createElement("div");
            newLayer.classList.add("bottom-menu");
            document.querySelector(".menu-section").appendChild(newLayer);
        }

        var menuContainer = document.createElement("div");
        menuContainer.classList.add("menu");

        menuContainer.innerHTML = `
            <div class="menu-img-container">
                <img src="${products[i].imgSource}" alt="${products[i].name}" class="menu-img">
            </div>
            <a href="#" class="product-link">
                <h2>${products[i].name}</h2>
            </a>
            <p class="text-center mx-4 body-font">${products[i].description}</p>
            <h4 class="fs-2 body-font price-position">₱${products[i].price}</h4>
            <button type="submit" class="fw-bold mx-5 px-4 py-2 body-font button add-to-cart-btn-pos">Add TO CART</button>
        `;

        // Append the menu item to the current layer
        newLayer.appendChild(menuContainer);
    }
}


setProductItems();
const fetchproductItems = getProductItems();
displayProducts(fetchproductItems)
