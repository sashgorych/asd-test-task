let errorMessages = {
    "emptyArray": "Товарів немає",
    "loadError": 'Не вдалося завантажити дані'
}
let config = {
    "emptyJsonSrc": 'https://raw.githubusercontent.com/sashgorych/asd-test-task/master/products-test-empty.json',
    "jsonSrc": "https://raw.githubusercontent.com/sashgorych/asd-test-task/master/products-test.json"
};
var Products = (function () {
    let containerList = document.querySelector('#product-list');
    let products;
    let errors = null;

    function initialize() {
        products = getJson();
    }

    function getJson() {
        let xhr = new XMLHttpRequest();
        let errorGetJson = null;
        try {
            xhr.open('GET', config.jsonSrc, false);
            xhr.send();
            return JSON.parse(xhr.responseText);

        }
        catch (e) {
            errorGetJson = errorMessages.loadError;
        }
        errors = errorGetJson;
        return []

    }

    function printAllProducts() {
        if (!isError()) {
            for (let i = 0; i < products.length; i++) {
                printOneProduct(products[i]);
            }
        }else{
            showError();
        }
    }

    function isError() {
        if (!errors) {
            if (products.length == 0) {
                errors = errorMessages.emptyArray;
                return true;
            }
            return false;
        } else {

            return true;
        }
    }

    function showError() {
        let errorHtml = createHtmlErrorMessage(errors);
        insertIntoContainer(errorHtml)
    }

    function createHtmlErrorMessage(msg) {
        return `<div class="error-msg">
        <h1>${msg}</h1>
          </div>
        `
    }

    function printOneProduct(product) {
        let productHtml = createProductHtml(product);
        insertIntoContainer(productHtml);
    }

    function insertIntoContainer(el) {
        containerList.insertAdjacentHTML('beforeend', el);
    }

    function createProductHtml(product) {
        return `
            <div class="item">
        <img src="${product.image}" alt="${product.name}">
        <div class="item-content">
            <div class="title">
                <p>
                   ${product.name}
                </p>
            </div>
            <div class="bottom">
                <div class="price">
                    <span>${product.price}$</span>
                </div>
            <a class="add-to-cart-btn">
                <i class="fas fa-shopping-cart"></i>
            </a>
            </div>
        </div>
    </div>
`
    }

    return {
        "init": initialize,
        "print": printAllProducts
    }
})();
document.querySelector('.top-line').addEventListener('click',function (e) {
    let btn = e.target;
    let productListContainer = document.querySelector('.container');
    if(btn.classList.contains('row-btn')){
        productListContainer.classList.add('rows')
    }
    if(btn.classList.contains('column-btn')){
        productListContainer.classList.remove('rows')
    }
});

(function () {
    Products.init();
    Products.print();
})()
