import { Timestamp } from "firebase/firestore";

export interface IBudgetSettings {
  lastUpdatedOn?: { value: Timestamp },
  todaysUpdatedToggle?: { updatedOn: Timestamp, value: boolean }
}

export class BudgetSettings {

  settings: IBudgetSettings = {
    lastUpdatedOn: undefined,
    todaysUpdatedToggle: undefined
  }

  public updateLastUpdatedOn(date: Date = new Date()) {
    // do update db
    // update local - will be handled in CurrentBudgetService
    // emit local value - will be handled in CurrentBudgetService
  }

  public set(id: string, data: any) {
    // this.settings[id] = { ...data };
  }
}
