import { Injectable } from "@angular/core";
import { DocumentSnapshot, Unsubscribe, collection, doc, onSnapshot } from "firebase/firestore";
import { BehaviorSubject } from "rxjs";
import { CurrentBudgetService } from "src/app/_common/_services/CurrentBudget.service";
import { FirestoreService } from "src/app/_common/_services/Firestore.service";

@Injectable({
  providedIn: 'root'
})
export class CarouselsService {

  private _subscribed: boolean = false;
  private _allCarousels: any = {};

  private _unsubscribe: Unsubscribe[] = [];

  private _carouselsDisplayed = ['carousel1', 'carousel2', 'carousel3', 'carousel4']; //,

  constructor(private _fsService: FirestoreService, private _currentBudgetService: CurrentBudgetService) {

    for (let carouselId of this._carouselsDisplayed) {
      this._allCarousels[carouselId] = new BehaviorSubject<any>({});
    }
  }

  public get carousels() {
    this.subscribeCarouselsIfnot();
    return this._allCarousels;
  }

  public subscribeCarouselsIfnot() {
    if (!this._subscribed) {
      // { order: number, type: string }
      for (let carouselId of this._carouselsDisplayed) {
        const unsubscribeCarousels = onSnapshot(collection(this._fsService.db, 'settings', 'display', 'dashboard', 'metricsCarousels', carouselId), (docs) => {
          const cards = docs.docChanges();
          const changedCards: any = {};
          for (const cardDoc of cards) {
            const card = cardDoc.doc;
            changedCards[card.id] = card.data();
          }
          this._allCarousels[carouselId].next(changedCards);
        });
        this._unsubscribe.push(unsubscribeCarousels);
      }

      this._subscribed = true;
    }
  }



}
