import { Injectable } from "@angular/core";
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

    getTotalExpenseForCategories(categoryIds: string[]) {
        // const docRef = collection(this._fsService.db, this._currentBudgetService.currentBudgetRef);
        // const docRef = doc(this._fsService.db, this._currentBudgetService.currentBudgetRef);
        // const qry = query(docRef, where("") )
    }
}