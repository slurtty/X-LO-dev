let card_list = document.querySelector('.items .row')
let db_url = "https://script.google.com/macros/s/AKfycbx_tSQLOHnLTMZ2chfbjJ-YBc0rsB3cxs3YT9DjepLWe2MUMo8etz4q1OMRQTDJQg6SaQ/exec"
let sheet = "products_db"


async function getProducts() {
    const response = await fetch(db_url, {
        method: "POST",
        body: JSON.stringify({
            sheet,
            method: "GET",
        })
    }); 
    
    const  data  = await response.json();

    // will return an array of objects with the _lineNumber
    return data.data    ;
};



        // async function getProducts() {
        //     const response = await fetch("https://api.zerosheets.com/v1/jay", {
        //         method: "GET",
        //         headers: {
        //             Authorization: "Bearer gOPPnOSTL5FF0InpCBV0Lenf71zIfJKM"
        //         }
        //     });
        //     const products = await response.json();

        //     return products;

        // }

function getCardHTML(item){
    return `
             <div class="col-lg-4">
                <img src="img/${item.image}" alt=""> 
                <p class="text-card">${item.title}</p>
                <p class="card-description">${item.description}</p>
                <p class="price">${item.price}</p>
                <button> to cart </button>
            </div>
`

}



getProducts().then(function (products) {
    console.log(products)
    
    products.forEach(function (product) {
        card_list.innerHTML += getCardHtml(product)
    })

    // Отримуємо всі кнопки "Додати в кошик" на сторінці
    let buyButtons = document.querySelectorAll('.add-to-cart');
    // Навішуємо обробник подій на кожну кнопку "Купити"
                                                                            // if (buyButtons) {
                                                                            //     buyButtons.forEach(function (button) {
                                                                            //         button.addEventListener('click', addToCart)
                                                                                    // });
                                                                                        // }
})
