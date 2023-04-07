import { Timestamp } from "firebase/firestore";

export interface ILastUpdatedOn {
    transaction: string | null;
    value: Timestamp | null;
}

export interface ITodaysUpdatedToggle {
  transaction?: string | null;
  value?: Date  | null;
}

export interface ICurrentBudgetSettings {
  lastUpdatedOn: ILastUpdatedOn;
  todaysUpdatedToggle: ITodaysUpdatedToggle;
}

export class CurrentBudgetSettings implements ICurrentBudgetSettings{

  public lastUpdatedOn = { transaction: null, value: null };
  public todaysUpdatedToggle = { updatedOn: null, value: null };

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

    return Object.fromEntries(Object.entries(new CurrentBudgetSettings()));
  }

  public set(id: string, data: any) {

    const update = { ...this } as any;
    update[id] = data;
    Object.assign(this, update);
  }
}
