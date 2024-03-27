window.addEventListener("load", () => {
    const getProductName = sessionStorage.getItem("CURRENTPRODUCT");

    const productItems = JSON.parse(localStorage.getItem("productItems"));

    productItems.forEach(item => {
        if(getProductName === item.name) {
            document.getElementById("productName").innerHTML = item.name;
            document.getElementById("productLongDesc").innerHTML = item.longDescription;
            document.getElementById("productPrice").innerHTML = item.price;
            document.getElementsByClassName("product-img")[0].src = item.imgSource;
            

        }
    });
});

function returnHome() {
    sessionStorage.removeItem("CURRENTPRODUCT");
    location.replace("./index.html");
}