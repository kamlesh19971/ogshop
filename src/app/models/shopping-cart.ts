import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [key: number]: ShoppingCartItem }) {

        this.itemsMap = itemsMap || [];

        for (let productId in itemsMap) {
            let item = itemsMap[productId]
            this.items.push(new ShoppingCartItem(item));
            console.log(this.items)
        }
    }

    getQuantity(product: any) {
        console.log(product)
        const item = this.items.find((i: any) => i.key === product.key);
        console.log(item)
        return item ? item.quantity : 0;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }

    get productIds() {
        return [...this.items.map(x => x.key)];
    }

    get totalItemsCount() {
        let count = 0;
        for (let item of this.items)
            count += item.quantity;
        return count;
    }
}


