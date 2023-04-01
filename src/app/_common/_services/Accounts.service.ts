import { Injectable } from "@angular/core";
import { collection, doc, onSnapshot, QuerySnapshot, Unsubscribe, WriteBatch } from "firebase/firestore";
import { BehaviorSubject } from "rxjs";
import { Account, AccountsMap } from "../_models/Account";
import { IParsedDocument } from "../_models/IParsedDocument";
import { ITransactionRule } from "../_models/TransactionType";
import { FirestoreService } from "./Firestore.service";
import { SerializerService } from "./Serializer.service";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  public ACCOUNTS_CHANGED = new BehaviorSubject<IParsedDocument<Account>>({ keys: [], values: {}, length: 0, raw: [], rawChangeSet: {} });
  public defaultAccount: Account | null = null;
  private accountsRef = 'accounts';
  private _ALL_ACCOUNTS: AccountsMap = {};

  private emittedAccounts: IParsedDocument<Account> = { keys: [], values: {}, length: 0, raw: [], rawChangeSet: {} };

  private _unsubscribe: Unsubscribe[] = [];

  constructor(
    private _fsService: FirestoreService,
    private _serializerService: SerializerService
  ) {

    const unsubscribeAccounts = onSnapshot<AccountsMap>(collection(this._fsService.db, this.accountsRef), (col: QuerySnapshot<AccountsMap>) => {
      this._serializerService.serializeDocumentsInCollectionAndEmit<AccountsMap, Account>
        (col, this._ALL_ACCOUNTS, 'account', this.ACCOUNTS_CHANGED);
    });
    this._unsubscribe.push(unsubscribeAccounts);

    this.ACCOUNTS_CHANGED.subscribe(accountsData => {
      if (accountsData.length) {
        const dfltAcc = this._ALL_ACCOUNTS['default'];
        this.defaultAccount = new Account('default', dfltAcc.currency!, '', dfltAcc.balance!) ;
        this.emittedAccounts = accountsData;
      }
    });
  }

  runTransaction(rules: ITransactionRule[], amount: number) {
    const modifiedAccounts: Account[] = [];
    rules.sort( (a,b) => a.order - b.order ); // check if sorted correctly
    for (let rule of rules) {
      if (rule.account.toLowerCase() === 'any') {
        throw new Error('Provide the account id to apply the transaction to.');
      }
      let accToTransact = this.emittedAccounts.values[rule.account] as Account;

      accToTransact = modifiedAccounts.find(acc => acc.id === rule.account) || new Account(rule.account, accToTransact.currency, accToTransact.name || '', accToTransact.balance);
      accToTransact.applyTransaction(rule, amount);
      modifiedAccounts.push(accToTransact);
    }
    return modifiedAccounts;
  }

  saveAccount(account: Account, batch: WriteBatch): void {
    batch.update(doc(this._fsService.db, 'accounts', account.id), { balance: account.balance });
  }
}
