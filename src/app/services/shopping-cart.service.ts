import { Injectable } from '@angular/core';
import { CollectionReference, doc, DocumentData, addDoc, getDocs, getDoc, updateDoc, setDoc, deleteDoc, where, query } from 'firebase/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';

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

  private async getOrCreateCartId(): Promise<string> {
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

  async getCart(): Promise<ShoppingCart> {
    let cartId = await this.getOrCreateCartId();
    const docSnap = await getDoc(doc(this.shoppingCartRef, cartId));
    const data = new ShoppingCart(docSnap.data()!['items']);

    return data;
  }

  async getCart2(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    const docSnap = await getDoc(doc(this.shoppingCartRef, cartId));
    const data = new ShoppingCart(docSnap.data()!['items']);

    return of(data);
  }

  async clearCart(): Promise<any> {

  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();


    let document = doc(this.shoppingCartRef, cartId);

    let items: any = await getDoc(document);
    items = items.get('items') || [];

    const index = items.findIndex((i: any) => i.key == product.key);

    if (index > -1) {
      items[index] = {
        ...items[index],
        quantity: items[index].quantity + 1,
      }
    } else {
      items = [
        ...items, {
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1
        }
      ]
    };

    await updateDoc(doc(this.shoppingCartRef, cartId), {
      items: items
    });
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();


    let document = doc(this.shoppingCartRef, cartId);

    let items: any = await getDoc(document);
    items = items.get('items') || [];

    const index = items.findIndex((i: any) => i.product.key == product.key);

    if (items[index].quantity > 1) {
      items[index] = {
        ...items[index],
        quantity: items[index].quantity - 1,
      }
    } else {
      items = items.filter((x: any, i: number) => i !== index);

    };

    await updateDoc(doc(this.shoppingCartRef, cartId), {
      items: items
    });
  }
}
