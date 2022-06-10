import { Injectable } from '@angular/core';
import { CollectionReference, doc, DocumentData, addDoc, getDocs, getDoc, updateDoc, orderBy, query, onSnapshot, DocumentSnapshot, deleteDoc } from 'firebase/firestore';
import { Firestore, collection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsRef!: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.productsRef = collection(this.firestore, 'products');
  }

  async create(product: any) {
    const ref = await addDoc(this.productsRef, product);
  }

  async getAll(): Promise<any[]> {
    const data = await getDocs(this.productsRef);
    let products: any[] = [];
    data.forEach(doc => {
      products.push({ key: doc.id, ...doc.data() })
    })
    return products
  }

  async get(productId: string): Promise<any> {
    const docRef = doc(this.productsRef, productId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  async update(productId: string, product: any) {
    await updateDoc(doc(this.productsRef, productId), product);
  }

  async delete(productId: string) {
    await deleteDoc(doc(this.productsRef, productId));
  }
}
