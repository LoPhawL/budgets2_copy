import { Component } from '@angular/core';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { FirestoreService } from './_common/_services/Firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budgets';

  constructor(private _fsService: FirestoreService) {}

  async ngOnInit() {

    const categoriesCol = collection(this._fsService.db, 'categories');
    
    const categorySnapshot = await getDocs(categoriesCol);
    console.log(categorySnapshot?.docs?.map(doc => doc.data()));

    const settingsCol = collection(this._fsService.db, 'settings');
    const settingsSnapshot = (await getDocs(settingsCol)).docChanges();
    console.log(settingsSnapshot);
    // console.log(settingsSnapshot?.docs?.map(doc => doc.data()));
  }
}
