import { Injectable } from '@angular/core';
import { CollectionReference, doc, DocumentData, addDoc, getDocs, getDoc, updateDoc, orderBy, query, onSnapshot, DocumentSnapshot } from 'firebase/firestore';
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

  async get(uid: string): Promise<any> {
    const docRef = doc(this.productsRef, uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data();

    // return onSnapshot(doc(this.productsRef, "SF"), (doc) => {
    //   // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    //   console.log(source, " data: ", doc.data());
    //   return doc;
    // });
  }
}
