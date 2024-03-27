var displayItem;

window.addEventListener("load", () => {
    const getProductName = sessionStorage.getItem("CURRENTPRODUCT");

    const productItems = JSON.parse(localStorage.getItem("productItems"));

    productItems.forEach(item => {
        if (getProductName === item.name) {
            document.getElementById("productName").innerHTML = item.name;
            document.getElementById("productLongDesc").innerHTML = item.longDescription;
            document.getElementById("productPrice").innerHTML = item.price;
            document.getElementsByClassName("product-img")[0].src = item.imgSource;

            displayItem = {
                name: item.name,
                qty: item.qty,
                price: item.price,
                imgSource: item.imgSource
            }

        }
    });
});

function returnHome() {
    sessionStorage.removeItem("CURRENTPRODUCT");
    location.replace("./index.html");
}

function addToCart() {
    const currentUser = JSON.parse(sessionStorage.getItem("CURRENTUSER"));
    const userAccount = JSON.parse(sessionStorage.getItem(currentUser.username));

    // If it doesn't find the index, it returns -1
    const productCartIndex = userAccount.cart.findIndex(cartItem => cartItem.name === displayItem.name);

    if (productCartIndex !== -1) {
        const cartItem = userAccount.cart[productCartIndex];
        const productItems = JSON.parse(localStorage.getItem("productItems"));

        cartItem.qty += 1;

        const fetchProductItemIndex = productItems.findIndex(productItem => productItem.name === displayItem.name);
        const productItemPrice = productItems[fetchProductItemIndex].price;

        cartItem.price = cartItem.qty * productItemPrice;

        // Updating the cart of the user
        sessionStorage.setItem(userAccount.username, JSON.stringify(userAccount));
        updateCartDisplay();
    } else {
        userAccount.cart.push(
            {
                name: displayItem.name,
                qty: 1,
                price: displayItem.price,
                imgSource: displayItem.imgSource
            }
        );
        console.log(userAccount.cart);


        // Updating the cart of the user
        sessionStorage.setItem(userAccount.username, JSON.stringify(userAccount));
        updateCartDisplay();
    }
}


// Cart Functionalities
// function addToCart(event) {
//     // Access the parent element of the button (which is the <div class="menu">)
//     const menuElement = event.parentElement;

//     // Traverse up the DOM tree to find the <h2> element containing the product name
//     const productName = menuElement.querySelector('h2').textContent;

//     const productItems = JSON.parse(localStorage.getItem("productItems"));
//     productItems.forEach(item => {
//         if (productName === item.name) {
//             const currentUser = JSON.parse(sessionStorage.getItem("CURRENTUSER"));
//             const userAccount = JSON.parse(sessionStorage.getItem(currentUser.username));

//             // If it doesn't find the index, it returns -1
//             const productCartIndex = userAccount.cart.findIndex(cartItem => cartItem.name === productName);

//             // If item is already in the user's cart
//             if (productCartIndex !== -1) {
//                 const cartItem = userAccount.cart[productCartIndex];
//                 const productItems = JSON.parse(localStorage.getItem("productItems"));

//                 cartItem.qty += 1;

//                 const fetchProductItemIndex = productItems.findIndex(productItem => productItem.name === productName);
//                 const productItemPrice = productItems[fetchProductItemIndex].price;

//                 cartItem.price = cartItem.qty * productItemPrice;

//                 // Updating the cart of the user
//                 sessionStorage.setItem(userAccount.username, JSON.stringify(userAccount));
//                 updateCartDisplay();
//             } else {
//                 userAccount.cart.push(
//                     {
//                         name: productName,
//                         qty: 1,
//                         price: item.price,
//                         imgSource: item.imgSource
//                     }
//                 );
//                 console.log(userAccount.cart);


//                 // Updating the cart of the user
//                 sessionStorage.setItem(userAccount.username, JSON.stringify(userAccount));
//                 updateCartDisplay();
//             }
//         }
//     });
// }

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
                <img src="${item.imgSource}" alt="OODIFY THIS" class="cart-item-img float-left">
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