import { Injectable } from "@angular/core";
import { collection, DocumentData, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
import { CurrentBudgetService } from "src/app/_common/_services/CurrentBudget.service";
import { FirestoreService } from "src/app/_common/_services/Firestore.service";

@Injectable({
    providedIn: 'root'
})
export class DashboardDataService{
    constructor (
        private _fsService: FirestoreService,
        private _currentBudgetService: CurrentBudgetService
    ) {}

    // getTotalExpenseForCategories(categoryIds: string[]): Promise<QuerySnapshot<DocumentData>[]> {

    //     const queryFragments = [];
    //     const colRef = collection(this._fsService.db, this._currentBudgetService.currentBudgetRef, 'transactions');

    //     while (categoryIds.length) {
    //       const catsFragment = categoryIds.splice(0,10);
    //       queryFragments.push(getDocs(query(colRef, where('category', 'in', catsFragment))));
    //     }

    //     return Promise.all(queryFragments).then(categs => categs.flat());
    // }
}
