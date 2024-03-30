// Gumagawa ng variable arrays of objects na naglalaman ng mga product names, descriptions, prices, at image sources
const productItems = [
    {
        name: "Espresso",
        shortDescription: "A strong and intense shot of coffee with a rich flavor and aroma.",
        longDescription: "Espresso is a concentrated coffee brewed by forcing a small amount of nearly boiling water through finely-ground coffee beans. It has a strong and intense flavor, with a rich aroma. Espresso serves as the base for many other popular coffee drinks, such as cappuccinos, lattes, and macchiatos. Its bold taste and quick preparation make it a favorite among coffee enthusiasts worldwide.",
        price: 80.00,
        imgSource: "./img/espresso.png"
    },
    {
        name: "Cappuccino",
        shortDescription: "A classic coffee drink made with equal parts espresso, steamed milk, and milk foam.",
        longDescription: "Cappuccino is a classic coffee drink beloved for its harmonious blend of espresso, steamed milk, and frothy milk foam. Originating in Italy, cappuccinos have become a staple in cafes around the globe. The balanced ratio of espresso to milk creates a creamy texture, while the foamy top adds a touch of indulgence. Whether enjoyed as a morning ritual or an afternoon treat, cappuccinos offer a delightful combination of bold coffee flavor and velvety smoothness.",
        price: 120.00,
        imgSource: "./img/cappuccino.png"
    },
    {
        name: "Latte",
        shortDescription: "Smooth espresso with a generous amount of steamed milk, topped with a layer of milk foam.",
        longDescription: "Latte, short for caffè latte, is a coffee beverage made with espresso and steamed milk. Its name, which means 'milk coffee' in Italian, reflects its key ingredients. Lattes are renowned for their smooth and creamy texture, achieved by combining the rich intensity of espresso with the silky sweetness of steamed milk. Topped with a delicate layer of frothed milk foam, lattes offer a luxurious coffee experience that is both comforting and satisfying. Whether enjoyed as a morning indulgence or an afternoon pick-me-up, lattes are a beloved choice among coffee ",
        price: 130.00,
        imgSource: "./img/latte.png"
    },
    {
        name: "Mocha",
        shortDescription: "Indulgent espresso mixed with chocolate syrup and topped with steamed milk and whipped cream.",
        longDescription: "Indulgent espresso mixed with rich chocolate syrup, creating a delightful harmony of flavors. Topped with velvety steamed milk and a generous dollop of whipped cream, this mocha is a decadent treat for chocolate and coffee lovers alike.",
        price: 140.00,
        imgSource: "./img/mocha.png"
    },
    {
        name: "Macchiato",
        shortDescription: 'A "stained" with a small amount of steamed milk, offering a bold and intense flavor.',
        longDescription: "Experience the bold essence of espresso subtly 'stained' with a touch of velvety steamed milk. The Macchiato offers a harmonious balance between the intense flavor of espresso and the creamy texture of milk, creating a truly satisfying coffee experience.",
        price: 90.00,
        imgSource: "./img/macchiato.png"
    },
    {
        name: "Affogato",
        shortDescription: "A delightful dessert coffee made by pouring a shot of hot espresso over a scoop of vanilla ice cream.",
        longDescription: "Immerse yourself in the blissful indulgence of our Affogato - a heavenly dessert coffee that combines the richness of hot espresso with the cool creaminess of vanilla ice cream. With each spoonful, savor the delightful contrast of hot and cold, bitter and sweet, for a truly decadent treat.",
        price: 120.00,
        imgSource: "./img/affogato.png"
    },
    {
        name: "Cold Brew",
        shortDescription: "Smooth and refreshing coffee brewed with cold water over an extended period.",
        longDescription: "Refresh and rejuvenate with our Cold Brew, meticulously crafted with cold water over an extended brewing period to extract a smooth and naturally sweet flavor profile. Sip on this invigorating beverage and experience the pure essence of coffee, served chilled for the perfect pick-me-up.",
        price: 140.00,
        imgSource: "./img/cold-brew.png"
    },
    {
        name: "Flat White",
        shortDescription: "Similar to a latte but with a higher coffee-to-milk ratio, resulting in a stronger coffee flavor.",
        longDescription: "Dive into the robust intensity of our Flat White, a coffee aficionado's favorite. With a higher coffee-to-milk ratio than a latte, this beverage delivers a bold espresso flavor enveloped in velvety steamed milk, creating a luxurious texture and a rich, indulgent taste.",
        price: 150.00,
        imgSource: "./img/flat-white.png"
    },
    {
        name: "Americano",
        shortDescription: "A simple yet bold coffee made by diluting espresso with hot water, resulting rich and smooth flavor.",
        longDescription: "Experience the timeless simplicity of our Americano, a classic coffee crafted by diluting rich espresso with hot water. Bold yet smooth, this beverage offers a pure and unadulterated coffee flavor, perfect for those who appreciate the essence of a perfectly brewed cup.",
        price: 100.00,
        imgSource: "./img/americano.png"
    },


]

// Nilalagay sa local storage yung ginawang variable (sa taas) sa local storage
function setProductItems() {
    localStorage.setItem("productItems", JSON.stringify(productItems));
}

// Kinukuha ung mga product items mula sa local storage
function getProductItems() {
    return JSON.parse(localStorage.getItem("productItems"));
}

// Dinidisplay ang mga product sa HTML front-end
function displayProducts(products) {
    // clears the display products before displaying products
    document.querySelector(".menu-section").innerHTML = "";

    const searchItems = JSON.parse(sessionStorage.getItem("SEARCH"));

    if (!searchItems) {
        actuallyDisplayProducts(products);
    } else {
        actuallyDisplayProducts(searchItems);
        sessionStorage.removeItem("SEARCH");
    }
}


function actuallyDisplayProducts(products) {
    for (let i = 0; i < products.length; i++) {
        // Since tatlong menu per row, gagamit tayo ng for loop
        if (i % 3 == 0) {
            // Create a new layer div for every group of 3 menu items
            var newLayer = document.createElement("div");
            newLayer.classList.add("bottom-menu");
            document.querySelector(".menu-section").appendChild(newLayer);
        }

        var menuContainer = document.createElement("div");
        menuContainer.classList.add("menu");

        menuContainer.innerHTML = `
            <div class="menu-img-container">
                <img src="${products[i].imgSource}" alt="${products[i].name}" onclick="setProductSessionFromImg(this)" class="menu-img">
            </div>
            <a class="product-link">
                <h2 onclick="setProductSession(this)">${products[i].name}</h2>
            </a>
            <p class="text-center mx-4 body-font">${products[i].shortDescription}</p>
            <h4 class="fs-2 body-font price-position">₱${products[i].price}</h4>
            <button type="submit" class="fw-bold mx-5 px-4 py-2 body-font button add-to-cart-btn-pos" onclick="addToCart(this)">Add TO CART</button>
        `;

        // Append the menu item to the current layer
        newLayer.appendChild(menuContainer);
    }
}


// Fetch and display products for index page
setProductItems();
const fetchproductItems = getProductItems();
displayProducts(fetchproductItems)


var addToCartBtns = document.querySelectorAll('button[onclick="addToCart(this)"]');
addToCartBtns.forEach(btn => {
    btn.addEventListener("click", addToCart);
});

function setProductSession(product) {
    sessionStorage.setItem("CURRENTPRODUCT", product.innerHTML);
    location.replace("./product.html");
}

function setProductSessionFromImg(product) {
    sessionStorage.setItem("CURRENTPRODUCT", product.alt);
    location.replace("./product.html");
}

function addToCart(event) {
    // Access the parent element of the button (which is the <div class="menu">)
    const menuElement = event.parentElement;

    // Traverse up the DOM tree to find the <h2> element containing the product name
    const productName = menuElement.querySelector('h2').textContent;

    const productItems = JSON.parse(localStorage.getItem("productItems"));
    productItems.forEach(item => {
        if (productName === item.name) {
            const currentUser = JSON.parse(sessionStorage.getItem("CURRENTUSER"));
            const userAccount = JSON.parse(sessionStorage.getItem(currentUser.username));

            // If it doesn't find the index, it returns -1
            const productCartIndex = userAccount.cart.findIndex(cartItem => cartItem.name === productName);

            // If item is already in the user's cart
            if (productCartIndex !== -1) {
                const cartItem = userAccount.cart[productCartIndex];
                const productItems = JSON.parse(localStorage.getItem("productItems"));

                cartItem.qty += 1;

                const fetchProductItemIndex = productItems.findIndex(productItem => productItem.name === productName);
                const productItemPrice = productItems[fetchProductItemIndex].price;

                cartItem.price = cartItem.qty * productItemPrice;

                // Updating the cart of the user
                sessionStorage.setItem(userAccount.username, JSON.stringify(userAccount));
                updateCartDisplay();
            } else {
                userAccount.cart.push(
                    {
                        name: productName,
                        qty: 1,
                        price: item.price,
                        imgSource: item.imgSource
                    }
                );
                console.log(userAccount.cart);


                // Updating the cart of the user
                sessionStorage.setItem(userAccount.username, JSON.stringify(userAccount));
                updateCartDisplay();
            }
            // Display notification modal
           var cartNotificationModal = new bootstrap.Modal(document.getElementById('cartNotificationModal'));
           cartNotificationModal.show();
           // You can customize the notification message if needed
           document.getElementById('notificationMessage').textContent =  productName +' has been added to the cart.';

           // Hide the modal after 3 seconds (adjust as needed)
            setTimeout(function() {
                cartNotificationModal.hide();
            }, 1000);
        }
    });
}

function updateCartDisplay() {
    const currentUser = JSON.parse(sessionStorage.getItem("CURRENTUSER"));
    const userAccount = JSON.parse(sessionStorage.getItem(currentUser.username));
    const userCart = userAccount.cart;

    // Clears the innerHTML of modal-body before adding the updated cart
    document.getElementsByClassName("modal-body")[0].innerHTML = "";

    userCart.forEach(item => {
        var cartItemContainer = document.createElement("div");
        cartItemContainer.classList.add("cart-item-container");


        cartItemContainer.innerHTML = `
                <div class="checkbox-container float-left">
                    <input type="checkbox" class="float-left select-item">
                </div>
                <img src="${item.imgSource}" alt="${item.name}" class="cart-item-img float-left">
                <div class="item-name-container float-left">
                    <h5 class="fw-bold ms-5 cart-item-name body-font float-left fourth-font-color">${item.qty}x <span
                        class="header-font fourth-font-color">——— </span><span class="item-name">${item.name}</span> <span
                        class="header-font fourth-font-color">———</span> P${item.price} </h5>
                </div>
            `;

        // Append the menu item to the current layer
        document.getElementsByClassName("modal-body")[0].appendChild(cartItemContainer);
    });
}


function selectAll() {
    var selectAllBtn = document.getElementById('selectAllBtn');
    var checkboxesList = document.getElementsByClassName('select-item');

    if (selectAllBtn.innerHTML === "Select All") {
        for (var i = 0; i < checkboxesList.length; i++) {
            checkboxesList[i].checked = true;
        }
        selectAllBtn.innerHTML = "Deselect All";
    } else {
        for (var i = 0; i < checkboxesList.length; i++) {
            checkboxesList[i].checked = false;
        }
        selectAllBtn.innerHTML = "Select All";
    }
}

function deleteSelectedItems() {
    var isConfirmed = confirm("ARE YOU SURE?");

    if (isConfirmed) {
        const currentUser = JSON.parse(sessionStorage.getItem("CURRENTUSER"));
        const userAccount = JSON.parse(sessionStorage.getItem(currentUser.username));
        var checkboxesList = document.getElementsByClassName('select-item');
        for (var i = 0; i < checkboxesList.length; i++) {
            const checkbox = checkboxesList[i]
            if (checkbox.checked === true) {
                const deleteItemName = checkbox.parentElement.parentElement.querySelector(".item-name").innerHTML;

                userAccount.cart = userAccount.cart.filter(item => item.name !== deleteItemName);
            }
        }
        sessionStorage.setItem(userAccount.username, JSON.stringify(userAccount));
        updateCartDisplay();
    }
}

function search() {
    const searchItem = document.getElementById("search").value.trim().toLowerCase();

    var itemsToDisplay = [];

    JSON.parse(localStorage.getItem("productItems")).forEach(item => {
        if (item.name.toLowerCase().includes(searchItem)) {
            itemsToDisplay.push(item);
        }
    });

    displayProducts(itemsToDisplay);


}


function placeOrder() {
    location.replace("./orderForm.html");
}
