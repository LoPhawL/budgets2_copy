import { INamedDocumentsMap, NamedDocument } from "./INamedDocument";

export class Category extends NamedDocument {
  currency: string;
  description: string;
  maxMonthly: number;
  transactionType: string;

  constructor(id: string, name: string, currency: string, description: string, maxMonthly: number, transactionType: string) {

    super(id, name);

    this.currency = currency;
    this.description = description;
    this.maxMonthly = maxMonthly;
    this.transactionType = transactionType;
  }
}

export class CategoriesMap implements INamedDocumentsMap<Category> {
  [key: string]: Partial<Category>;
}
