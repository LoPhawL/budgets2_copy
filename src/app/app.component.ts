import { Component } from '@angular/core';
import { collection, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { FirestoreService } from './_common/_services/Firestore.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { doc, onSnapshot } from "firebase/firestore";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budgets';

  icons = {
    faXmark
  }

  public masterExpenditureProgressHeight = 0;
  public masterExpenditureProgressHeightNoEffectAfterUpdate = false;

  constructor(private _fsService: FirestoreService) {}

  async ngOnInit() {

    // read and set masterProgressHeight

    onSnapshot(doc(this._fsService.db, 'settings', 'display', 'masterExpenditureProgressBar', 'height'), (doc) => {
      const data = doc.data() || {};
      if (this.masterExpenditureProgressHeightNoEffectAfterUpdate) {
        this.masterExpenditureProgressHeightNoEffectAfterUpdate = false;
      } else {
        this.masterExpenditureProgressHeight = data['value'];
      }
    });

    // onSnapshot(doc(this._fsService.db, 'settings', 'display', 'mepb'), (doc) => {
    //   console.log(doc.data())
    // });

    // const categoriesCol = collection(this._fsService.db, 'categories');

    // const categorySnapshot = await getDocs(categoriesCol);
    // console.log(categorySnapshot?.docs?.map(doc => doc.data()));

    // const settingsCol = collection(this._fsService.db, 'settings');
    // const settingsSnapshot = (await getDocs(settingsCol)).docChanges();
    // console.log(settingsSnapshot);
    // console.log(settingsSnapshot?.docs?.map(doc => doc.data()));
  }

  async modifyHeight(value: number) {
    const newValue = this.masterExpenditureProgressHeight + value;

    if( newValue >= 0.5 && newValue <= 2.5) {
      this.masterExpenditureProgressHeight = newValue;
      this.masterExpenditureProgressHeightNoEffectAfterUpdate = true;
      setDoc(doc(this._fsService.db, 'settings', 'display', 'masterExpenditureProgressBar', 'height'), {
        value: newValue
      }).then();
    }

  }
}
