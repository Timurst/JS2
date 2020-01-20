'use strict';


//Задание 1. Добавьте пустые классы для корзины товаров и элемента корзины товаров.
// Продумайте, какие методы понадобятся для работы с этими сущностями.

class Cart {
  constructor() {

  }
  // метод для очистки корзины
  clearAll() {

  }
  //метод подсчета суммы купленных товаров
  total(){

  }
  //метод оплаты товаров
  pay(){

  }
}

class CartItem {
  constructor() {

  }
  //удаляет один элемент из корзины
  deleteItem(){

  }
}




class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._fetchProducts();
    this.render();
    this.total();
  }

  _fetchProducts() {
    this.goods = [
      {id: 1, title: 'Notebook', price: 45000},
      {id: 2, title: 'Mouse', price: 3000},
      {id: 3, title: 'Keyboard', price: 2500},
      {id: 4, title: 'Gamepad', price: 1500},
    ]
  }

  //Задание 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.

  total() {
    let totalPrice = 0;
    this.goods.forEach(item => totalPrice += item.price);
    return totalPrice;
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

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

const list = new ProductList();

