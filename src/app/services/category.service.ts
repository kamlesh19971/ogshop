import { Injectable } from '@angular/core';
import { CollectionReference, doc, DocumentData, addDoc, getDocs, setDoc, updateDoc, orderBy, query } from 'firebase/firestore';
import { Firestore, collection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  categoriesRef!: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.categoriesRef = collection(this.firestore, 'categories');

  }

  async getCategories(): Promise<any[]> {
    const q = query(this.categoriesRef, orderBy("name"));
    const data = await getDocs(q);
    let cats: any[] = [];
    data.forEach(doc => {
      cats.push({ key: doc.id, ...doc.data() })
    })
    return cats
  }
}
