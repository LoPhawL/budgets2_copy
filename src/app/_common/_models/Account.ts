import { INamedDocumentsMap, NamedDocument } from "./INamedDocument";
import { ITransactionRule } from "./TransactionType";

export class Account extends NamedDocument {

  public currency: string;
  public balance: number;

  constructor(id: string, currency: string, name: string, balance: number) {

    super(id, name);

    this.currency = currency;
    this.balance = balance;
  }

  applyTransaction(rule: ITransactionRule, amount: number) {
    if (rule.operation === 'INCREMENT') {
      this.balance += amount;
    } else {
      this.balance -= amount;
    }
  }
}

export class AccountsMap implements INamedDocumentsMap<Account> {
  [key: string]: Partial<Account>;
}
