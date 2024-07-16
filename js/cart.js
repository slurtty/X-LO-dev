let cart_list = document.querySelector(".cart-items .cart-row")
let db_url = "https://script.google.com/macros/s/AKfycbx_tSQLOHnLTMZ2chfbjJ-YBc0rsB3cxs3YT9DjepLWe2MUMo8etz4q1OMRQTDJQg6SaQ/exec"
let sheet = "products_db"

function getCartHTML(item) {
    return `

        <div class="col-lg-4">
        <img src="img/${item.image}" alt="">
        <p class="title cart-card-text">Title: ${item.title}</p>
        <p class="cart-description cart-card-text">Description: ${item.description}</p>
        <p class="cart-total-price cart-card-text">Price: ${item.price}</p>
        <p class="total-quantity cart-card-text">quantity: ${item.quantity}</p>
    </div> 

`

}


async function getProducts() {
    const response = await fetch(db_url, {
        method: "POST",
        body: JSON.stringify({
            sheet,
            method: "GET",
        })
    });

    const data = await response.json();

    return data.data;
};



getProducts().then(function (products) {
    console.log(products)

    products.forEach(function (product) {
        card_list.innerHTML += getCartHTML(product)
    })
})