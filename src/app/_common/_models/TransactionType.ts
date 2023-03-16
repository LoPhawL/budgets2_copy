import { NamedDocument, INamedDocumentsMap } from "./INamedDocument";

export interface ITransactionRule {
  account: 'default' | 'ANY' | string; // ref_{n} => references the rule with order as n, n should be less than 'order'.
  operation: 'INCREMENT' | 'DECREMENT';
  order: number;
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
