const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//1. Переделайте makeGETRequest() так, чтобы она использовала промисы.

let getRequest = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status !== 200) {
          reject();
        }
        const bag = JSON.parse(xhr.responseText);
        resolve(bag);
      }
    }
    xhr.send();
  });
};


// класс списка товаров
class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    // this._fetchProducts();
    this._getProducts()
      .then(data => {
        this.goods = [...data];
        this.render();
      });
  }


  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}

// класс элемента списка товаров
class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

// класс корзины (наследуется от списка товаров)
class Cart extends ProductList {
  add(cartItem) {                             //добавляем новый товар в корзину
    if (findIndex(cartItem.getId()) < 0) {    //если его там нет
      this.goods.push(cartItem);
    }
  }
  update() {                                   //получаем данные с json
    makeGETRequest(`${API}/getBasket.json`)
        .then(
            response => {
              let obj = JSON.parse(response);
              for (let variable of obj.contents) {
                let cartItem = new CartItem(variable.id_product, variable.product_name, variable.price, variable.quantity);
                this.goods.push(cartItem);
              }
              console.log(this.goods);
            },
            error => alert(`Ошибка: ${error}`)
        );
  }
  remove(id_product) {                            //удаляем товар по id
    let index = findIndex(id_product);
    if (index > -1) {
      this.goods.splice(index, 1);
    }
  }
  findIndex(id_product) {                       // ищем индекс товара по id
    let index = this.goods.findIndex( item => item.id_product == id_product );
  }
  updateCount(id_product, count) {              //обновляем кол-во товара по id
    let index = findIndex(id_product);
    if (index > -1) {
      this.goods[index].setCount(count);
    }
  }
}

const cart = new Cart();   //создали объект
cart.update();            // для обновления корзины

// класс элемента корзины (наследуется от элемента списка товаров)
class CartItem extends ProductItem {
  constructor( id_product = 0, img='https://placehold.it/200x150', product_name = "Без имени", price = "", count = 1) {
    super(id_product, img, product_name, price);
    this.count = count;
  }
  getCount() {
    return this.count;
  }
  setCount(newCount) {
    this.count = newCount;
  }
}

const list = new ProductList();

