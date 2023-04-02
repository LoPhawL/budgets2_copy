import { FirestoreService } from "../_services/Firestore.service";

export class CurrentBudgetSettings {

  public lastUpdatedOn: {
    transaction?: string | null;
    value?: Date  | null;
  } = { transaction: null, value: null };

  public todaysUpdatedToggle: {
    updatedOn?: Date | null;
    value?: boolean | null;
  } = { updatedOn: null, value: null };

  constructor() {
    this.lastUpdatedOn.transaction = null;
  }

  public toggle(value: boolean) {
    // set
    const toggledValue = {
      value,
      updatedOn: new Date()
    }
  }

  public getEmptySettings() {

    return Object.fromEntries( Object.entries(new CurrentBudgetSettings()));
  }

  public set(id: any, data: any) {
    console.log(id, data);
  }
}
