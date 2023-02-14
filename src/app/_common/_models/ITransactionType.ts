import { NamedDocument, INamedDocumentsMap } from "./INamedDocument";

export interface ITransactionRule {
  account: 'DEFAULT' | string;
  operation: 'INCREMENT' | 'DECREMENT';
}

export class TransactionType extends NamedDocument {

  isUserSelectable: boolean;
  isUserEditable: boolean;
  rules: ITransactionRule[];

  constructor(id: string, name: string, isUserSelectable: boolean, isUserEditable: boolean, rules: ITransactionRule[]) {
    super(id, name);

    this.isUserSelectable = isUserSelectable;
    this.isUserEditable = isUserEditable;
    this.rules = rules;
  }

}

export class TransactionTypesMap implements INamedDocumentsMap<TransactionType> {
  [key: string]: Partial<TransactionType>;
}
