export interface ICategory {
  name: string;
  currency: string;
  description: string;
  maxMonthly: number;
  transactionType: string;
}

export interface ICategoriesMap {
  [key:string]: Partial<ICategory>;
}
