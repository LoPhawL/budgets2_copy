import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore } from "firebase/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budgets';
  categoriesList: any = [];

  async ngOnInit() {
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
    const db = getFirestore(app);

    const categoriesCol = collection(db, 'categories');
    const categorySnapshot = await getDocs(categoriesCol);
    this.categoriesList = categorySnapshot?.docs?.map(doc => doc.data()) || [];
  }
}
