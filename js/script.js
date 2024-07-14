let card_list = document.querySelector('.items .row')
let db_url = "https://script.google.com/macros/s/AKfycbx_tSQLOHnLTMZ2chfbjJ-YBc0rsB3cxs3YT9DjepLWe2MUMo8etz4q1OMRQTDJQg6SaQ/exec"
let sheet = "products_db"


function getCookieValue(cookieName) {
    // Розділяємо всі куки на окремі частини
    const cookies = document.cookie.split(';')
    // Шукаємо куки з вказаним ім'ям
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim() // Видаляємо зайві пробіли
        // Перевіряємо, чи починається поточне кукі з шуканого імені
        if (cookie.startsWith(cookieName + '=')) {
            // Якщо так, повертаємо значення кукі
            return cookie.substring(cookieName.length + 1) // +1 для пропуску символу
            "="
        }
    }

    return ''
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




function getCardHTML(item) {
    return `
             <div class="col-lg-4">
                <img src="img/${item.image}" alt=""> 
                <p class="text-card">${item.title}</p>
                <p class="card-description">${item.description}</p>
                <p class="price">${item.price}</p>
                <button class='cart-btn' data-item='${JSON.stringify(item)}'> To cart </button>
            </div>
`

}


class ShopingCart {
    constructor() {
        this.items = {}
        this.loadCartFromCookies()
    }
    add_item(item) {
        if (this.items[item]) {
            this.items[item].quantity += 1
        } else {
            this.items[item] = item
            this.items[item].quantity = 1
        }
        this.saveCartToCookies()
    }

    saveCartToCookies() {
        let cartJSON = JSON.stringify(this.items);
        document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
    }
    // Завантаження кошика з кукі
    loadCartFromCookies() {
        let cartCookie = getCookieValue('cart');
        if (cartCookie && cartCookie !== '') {
            this.items = JSON.parse(cartCookie);
        }
    }


}


let cart = new ShopingCart()



function addToCart(event) {
    const productData = event.target.getAttribute('data-item')
    const product = JSON.parse(productData)
    cart.add_item(product)
    console.log(cart)
}


getProducts().then(function (products) {
    console.log(products)

    products.forEach(function (product) {
        card_list.innerHTML += getCardHTML(product)
    })

    let buyButtons = document.querySelectorAll('.cart-btn');
    // Навішуємо обробник подій на кожну кнопку "Купити"
    if (buyButtons) {
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart)
        });
    }
})



