import { Injectable } from '@angular/core';
import { CollectionReference, doc, DocumentData, addDoc, getDocs, setDoc, updateDoc, orderBy, query } from 'firebase/firestore';
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

}
