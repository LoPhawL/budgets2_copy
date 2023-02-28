import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore, writeBatch } from "firebase/firestore";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    public readonly db: Firestore;

    constructor() {
      const firebaseConfig = {
          apiKey: environment.apiKey,
          authDomain: environment.authDomain,
          projectId: environment.projectId,
          storageBucket: environment.storageBucket,
          messagingSenderId: environment.messagingSenderId,
          appId: environment.appId,
          measurementId: environment.measurementId
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
