import { INamedDocument, INamedDocumentMap } from "./INamedDocument";

export interface ICategory extends INamedDocument {
  currency: string;
  description: string;
  maxMonthly: number;
  transactionType: string;
}

export interface ICategoriesMap extends INamedDocumentMap<ICategory> {
}
