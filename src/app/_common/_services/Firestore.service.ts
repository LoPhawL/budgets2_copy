import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore, writeBatch } from "firebase/firestore";

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    public readonly db: Firestore;

    constructor() {
      const firebaseConfig = {
          apiKey: "AIzaSyD7amcWHOXMwWBlhWuCYua1f61zzZAGKfA",
          authDomain: "budgets2.firebaseapp.com",
          projectId: "budgets2",
          storageBucket: "budgets2.appspot.com",
          messagingSenderId: "831553231670",
          appId: "1:831553231670:web:24ddf858705232e24a3197",
          measurementId: "G-S9VJX2R51C"
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      this.db = getFirestore(app);
    }

    getBatch() {
        return writeBatch(this.db);
    }

}
