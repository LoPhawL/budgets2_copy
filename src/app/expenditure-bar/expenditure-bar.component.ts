import { Component } from '@angular/core';
import { setDoc } from "firebase/firestore";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { doc, onSnapshot } from "firebase/firestore";
import { FirestoreService } from '../_common/_services/Firestore.service';

@Component({
  selector: 'app-expenditure-bar',
  templateUrl: './expenditure-bar.component.html',
  styleUrls: ['./expenditure-bar.component.scss']
})
export class ExpenditureBarComponent {

  public icons = {
    faXmark
  }

  public masterExpenditureProgressHeight = 0;
  public masterExpenditureProgressHeightNoEffectAfterUpdate = false;

  private _progBarHeightrefDoc = 'settings/display/masterExpenditureProgressBar/height';
  private _unsubscribe: any = [];

  constructor(private _fsService: FirestoreService) {}

  async ngOnInit() {

    const unsub = onSnapshot(doc(this._fsService.db, this._progBarHeightrefDoc), (doc) => {
      const data = doc.data() || {};
      if (this.masterExpenditureProgressHeightNoEffectAfterUpdate) {
        this.masterExpenditureProgressHeightNoEffectAfterUpdate = false;
      } else {
        this.masterExpenditureProgressHeight = data['value'];
      }
    });
    this._unsubscribe.push(unsub);
  }


  async modifyHeight(value: number) {
    const newValue = this.masterExpenditureProgressHeight + value;

    if ( newValue >= 0.5 && newValue <= 2.5) {
      this.masterExpenditureProgressHeight = newValue;
      this.masterExpenditureProgressHeightNoEffectAfterUpdate = true;
      setDoc(doc(this._fsService.db, this._progBarHeightrefDoc), {
        value: newValue
      }).then();
    }
  }

  onDestroy() {
    for (let unsubscribable of this._unsubscribe) {
      unsubscribable.unsubscribe();
    }
  }
}
