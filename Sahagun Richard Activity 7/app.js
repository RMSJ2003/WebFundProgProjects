// This holds the store items
const storeItems = [
    {
        name: "Kapusino",
        price: 20.00,
    },
    {
        name: "Latte",
        price: 150.00
    },
    {
        name: "Expresso",
        price: 40.50
    }
];


// This holds the cart items
var cartItems = [];


// Displaing storeItems
document.addEventListener("DOMContentLoaded", () => {
    // Looping through storeItems
    storeItems.forEach(item => {

        // Creating HTML elements and attaching storeItems
        const newStoreItemElement = document.createElement("tr");

        newStoreItemElement.innerHTML = `
            <td class="store-item">${item.name}</td>
            <td class="store-price">Php ${item.price}</td> 
            <td>
                <button class="add-to-cart">ADD TO CART</button>
            </td>
        `;

        // Displaying created elements
        document.querySelector("#storeTable").appendChild(newStoreItemElement);
    });

    // Adding event listeners to the Add-To-Cart Buttons
    var addToCartBtns = document.querySelectorAll(".add-to-cart");

    addToCartBtns.forEach(btn => {
        btn.addEventListener("click", addToCart);
    });
});


function addToCart(event) {
    // Gets the item name in the innerHTML
    const nameOfItemToAdd = event.target.closest("tr").querySelector(".store-item").innerHTML;

    var itemAlreadyExists = false;
    cartItems.forEach(cartItem => {
        //If item to add already exist in cart
        if (nameOfItemToAdd === cartItem.name) {
            cartItem.quantity += 1;
            cartItem.price += getItemPriceFromStore(nameOfItemToAdd);
            itemAlreadyExists = true;
        }
    });

    if (!itemAlreadyExists) {
        storeItems.forEach(storeItem => {
            if (storeItem.name === nameOfItemToAdd) {
                // Create a new object for the cart item
                const cartItem = {
                    name: storeItem.name,
                    price: storeItem.price,
                    quantity: 1 //1 IS TEMPORARY
                };

                cartItems.push(cartItem);
            }
        });
    }
    displayCartItems();
    console.log(cartItems);
}


function displayCartItems() {
    const cartHeadings = `
    <tr class="heading-row">
        <th class="item-heading">Item</th>
        <th class="price-heading">Price</th>
        <th class="action-heading">Qty</th>
    </tr>
    `;

    var cartTableHTML = ``;

    cartItems.forEach(cartItem => {
        cartTableHTML +=
            `
            <tr>
                <td class="cart-item-name">${cartItem.name}</td>
                <td class="cart-item-price">Php ${cartItem.price}</td>
                <td>
                    <input type="number" value="${cartItem.quantity}" class="cart-item-qty">
                </td>
            </tr>
            `;
    });
    document.querySelector("#cartTable").innerHTML = cartHeadings + cartTableHTML;

    // Getting the total Price and displaying it
    var totalPrice = 0;
    cartItems.forEach(cartItem => {
        totalPrice += cartItem.price;
    });
    document.querySelector("#total").innerHTML = "Php " + totalPrice;

    addEventListenerToQty();
}


// Adding event listeners to Quantity Inputs (Increment/Decrement)
function addEventListenerToQty() {
    var qtyInputs = document.querySelectorAll('#cartTable input[type="number"]');
    qtyInputs.forEach(qtyInput => {
        qtyInput.addEventListener("input", event => {
            const newQty = event.target.value;
            const itemNameOfQty = event.target.closest("td").closest("tr").querySelector(".cart-item-name").innerHTML;
            cartItems.forEach(cartItem => {
                if (itemNameOfQty === cartItem.name) {
                    cartItem.quantity = newQty;
                    cartItem.price = (newQty * getItemPriceFromStore(itemNameOfQty));
                }
            });

            // Display Cart Table 
            displayCartItems();
        });
    });
}

function addQtyAndPrice() {

}

function getItemPriceFromStore(itemName) {
    var price = 0;

    // Getting the price of itemNameofQty per unit
    storeItems.forEach(storeItem => {
        if (itemName === storeItem.name) {
            price = storeItem.price;
        }
    });

    return price;
}





// var addToCartBtn = document.querySelectorAll(".add-to-cart");

// for (var i = 0; i < addToCartBtn.length; i++) {
//     addToCartBtn[i].addEventListener("click", (event) => {
//         const btnClicked = event.target; //Get the caller of this event listener.
//         const parentTr = btnClicked.closest("tr"); //Get the parent <tr> element containing the button
//         const priceElement = parentTr.querySelector('.store-price'); //Find the price element within the same row
//         const formattedPrice = priceElement.innerHTML;
//         const itemNameElement = parentTr.querySelector('.store-item');
//         const item = itemNameElement.innerHTML;

//         //Removes the Php portion:
//         const unformattedPrice = unformatPrice(formattedPrice);

//         addItem(unformattedPrice, item);

//         // Event listener for updating qtys
//         var qtyInputs = document.querySelectorAll('#cartTable input[type="number"]');
//         qtyInputs.forEach(qtyInput => {
//             qtyInput.addEventListener("input", (event) => {
//                 const inputChanged = event.target;
//                 const storeItemNameAndPriceList = getStoreItemNameAndPriceList();
//                 const cartItemNameAndPriceList = getCartItemNameAndPriceList();
//                 storeItemNameAndPriceList.forEach(item => {
//                     console.log(item.itemPrice);
//                 });
//             });
//         });
//     });

// }

// function unformatPrice(price) {
//     return price.slice(4, price.length);
// }

// function addItem(price, item) {
//     const cartFinalBoss = document.querySelector(".cart-boss-container");
//     const cartBiggerBoss = cartFinalBoss.querySelector("#cartTable");

//     if (itemExists(item)) {
//         const rowCount = cartBiggerBoss.rows.length;

//         for (var i = 0; i < rowCount; i++) {
//             const row = cartBiggerBoss.rows[i];
//             const cartItem = row.cells[0].textContent.trim();
//             if (item === cartItem) {
//                 const cartItemPrice = row.cells[1].textContent.trim();
//                 const unformattedItemPrice = parseFloat(unformatPrice(cartItemPrice));
//                 const qtyInput = row.querySelector('input[type="number"]');
//                 const qty = parseInt(qtyInput.value);
//                 qtyInput.value = qty + 1;
//                 const itemName = row.cells[0].textContent.trim();
//                 const itemPrice = getPriceOfItem(itemName);
//                 const formattedItemPrice = getformattedPrice(unformattedItemPrice + itemPrice);
//                 row.cells[1].textContent = formattedItemPrice;
//             }
//         }
//     } else {
//         // const cartBigBoss = cartBiggerBoss.querySelector("")
//         console.log(price);
//         const newRow = document.createElement("tr");
//         newRow.innerHTML =
//             `
//                 <td>${item}</td>
//                 <td>Php ${price}</td>
//                 <td>
//                     <input type="number" value="1">
//                 </td>
//             `;

//         cartBiggerBoss.appendChild(newRow);

//         //uPDATE PRICE
//         const displayPrice = document.querySelector("#total");
//         const unformattedDisplayPrice = unformatPrice(displayPrice.innerHTML);
//         console.log(unformattedDisplayPrice);
//         const newPrice = parseFloat(unformattedDisplayPrice) + parseFloat(price);

//         displayPrice.innerHTML = "Php " + newPrice.toFixed(2); // Ensure toFixed(2) to display the price with two decimal places

//     }
// }

// function itemExists(storeItem) {
//     const cartFinalBoss = document.querySelector(".cart-boss-container");
//     const cartBiggerBoss = cartFinalBoss.querySelector("#cartTable");
//     const rowCount = cartBiggerBoss.rows.length;

//     //Loop through the rows and retrieve their data.
//     //Checks if the item already exists in the cart.
//     for (var i = 0; i < rowCount; i++) {
//         const row = cartBiggerBoss.rows[i];
//         const cartItem = row.cells[0].textContent.trim();
//         if (storeItem === cartItem) return true;
//     }
//     return false;
// }

// function getPriceOfItem(item) {
//     const storeTable = document.querySelector("#storeTable");

//     for (var i = 1; i < storeTable.rows.length; i++) {
//         const row = storeTable.rows[i];
//         const storeItem = row.cells[0].textContent.trim();

//         if (item === storeItem) return parseFloat(unformatPrice(row.cells[1].textContent.trim()));
//     }
// }

// function getformattedPrice(price) {
//     return "Php " + price.toString();
// }

// function increaseQtyAndPrice() {

// }

// function getStoreItemNameAndPriceList() {
//     const storeTable = document.querySelector("#storeTable");
//     var nameAndPriceList = [];

//     for (var i = 1; i < storeTable.rows.length; i++) {
//         const row = storeTable.rows[i];
//         const storeItemName = row.cells[0].textContent.trim();
//         const storeItemPrice = parseFloat(unformatPrice(row.cells[1].textContent.trim()));
//         nameAndPriceList.push({
//             itemName: storeItemName,
//             itemPrice: storeItemPrice
//         });
//     }
//     return nameAndPriceList;
// }

// function getCartItemNameAndPriceList() {
//     const cartTable = document.querySelector("#cartTable");
//     var nameAndPriceList = [];

//     for (var i = 1; i < cartTable.rows.length; i++) {
//         const row = cartTable.rows[i];
//         const cartItemName = row.cells[0].textContent.trim();
//         const cartItemPrice = parseFloat(unformatPrice(row.cells[1].textContent.trim()));
//         nameAndPriceList.push({
//             itemName: cartItemName,
//             itemPrice: cartItemPrice
//         });
//     }
//     return nameAndPriceList;
// }