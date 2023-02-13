import { INamedDocument, INamedDocumentMap } from "./INamedDocument";

export interface ITransactionRule {
  account: 'DEFAULT' | string;
  operation: 'INCREMENT' | 'DECREMENT';
}

export interface ITransactionType extends INamedDocument {
  id: string;
  isUserSelectable: boolean;
  isUserEditable: boolean;
  rules: ITransactionRule[];
}

export interface ITransactionTypeMap extends INamedDocumentMap<ITransactionType> {
}
