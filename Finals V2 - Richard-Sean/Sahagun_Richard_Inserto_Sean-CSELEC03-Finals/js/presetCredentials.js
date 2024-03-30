// Initial Credentials upon
// Session storage 
sessionStorage.setItem("CSELEC03", JSON.stringify(
    {
        username: "CSELEC03",
        password: "webprog",
        cart: [
            // {
            //     name: "Cappuccino",
            //     qty: 0,
            //     price: 0,
            // }
        ]
    }
));


function login() {
    const emailInput = document.getElementById("inputEmail").value;
    const passwordInput = document.getElementById("inputPassword").value;

    // Retrieve user data from sessionStorage based on emailInput
    const userData = JSON.parse(sessionStorage.getItem(emailInput));

    // Check if userData is not null (if user exists) and matches the input credentials
    if (userData && userData.username === emailInput && userData.password === passwordInput) {

        // Sets the current logged in user in the session storage
        sessionStorage.setItem("CURRENTUSER", JSON.stringify(
            JSON.parse(sessionStorage.getItem(userData.username))
        ));


        location.replace("./index.html");
    } else {
        alert("Incorrect email or password.");
    }
}

function signUp() {
    location.replace("./signup.html");
}