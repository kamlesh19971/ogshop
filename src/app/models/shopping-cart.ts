import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [key: number]: ShoppingCartItem }) {
        for (let productId in itemsMap) {
            let item = itemsMap[productId]
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }

        // this.itemsMap = itemsMap || {};

        // for (let productId in itemsMap) {
        //     let item = itemsMap[productId];
        //     this.items.push(new ShoppingCartItem({ ...item, key: productId }));
        // }
    }

    // getQuantity(product: Product) {
    //     let item = this.itemsMap[product.key];
    //     return item ? item.quantity : 0;
    // }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }

    get productIds() {
        return [...this.items.map(x => x.product.key)];
    }

    get totalItemsCount() {
        let count = 0;
        for (let item of this.items)
            count += item.quantity;
        return count;
    }
}


