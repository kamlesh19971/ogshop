import { Injectable } from '@angular/core';
import { CollectionReference, doc, DocumentData, addDoc, getDocs, getDoc, updateDoc, setDoc, deleteDoc, where, query } from 'firebase/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartRef!: CollectionReference<DocumentData>;
  shoppingCartItemRef!: CollectionReference<DocumentData>;


  constructor(private firestore: Firestore) {
    this.shoppingCartRef = collection(this.firestore, 'shopping-carts');
    this.shoppingCartItemRef = collection(this.firestore, 'shopping-cart-items');
  }

  private create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  private async getItems(cartId: string, productId: string) {

    let document = doc(this.shoppingCartRef, cartId);

    let cartItems: any = await getDoc(document);
    return cartItems.get('items') || [];
  }


  private async getOrCreateCartId(): Promise<any> {
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;

  }

  async create() {
    // const record = await addDoc(this.shoppingCartRef, {
    //   dateCreated: new Date().getTime(),
    //   cartId: this.create_UUID()
    // });
    let uid = this.create_UUID();
    const record = await setDoc(doc(this.shoppingCartRef, uid), {
      dateCreated: new Date().getTime(),
      cartId: uid,
      items: []
    });


    return { id: uid };
  }

  async getCart(cartId: string): Promise<any> {
    // let cartId = await this.getOrCreateCartId();

    const docSnap = await getDoc(doc(this.shoppingCartRef, cartId));
    const data = docSnap.data();
    // data.['map'](x => new ShoppingCart(x.items));

    return data;
  }

  async clearCart(): Promise<any> {

  }


  async addToCart(product: Product) {
    console.log(product)
    let cartId = await this.getOrCreateCartId();


    let document = doc(this.shoppingCartRef, cartId);

    let items: any = await getDoc(document);
    items = items.get('items') || [];

    const index = items.findIndex((i: any) => i.product.key == product.key);

    if (index > -1) {
      items[index] = {
        ...items[index],
        quantity: items[index].quantity + 1,
      }
    } else {
      items = [
        ...items, { product, quantity: 1 }
      ]
    };

    await updateDoc(doc(this.shoppingCartRef, cartId), {
      items: items
    });
  }

  async removeFromCart(product: Product) {

  }
}
