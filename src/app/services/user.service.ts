import { Injectable } from '@angular/core';
import * as firebaseAuth from 'firebase/auth';
import { CollectionReference, doc, DocumentData, addDoc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersRef: CollectionReference<DocumentData>;
  //private db: AngularFireDatabase,
  constructor(private firestore: Firestore) {

    this.usersRef = collection(this.firestore, 'users');

  }

  save(user: firebaseAuth.User) {
    const dataToUpdate = doc(this.usersRef, user.uid);

    updateDoc(dataToUpdate, {
      name: user.displayName,
      email: user.email
    });

  }

  async get(uid: string): Promise<any> {
    const docRef = doc(this.firestore, "users", uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  }
}
