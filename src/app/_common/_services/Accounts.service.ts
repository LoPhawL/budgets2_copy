import { Injectable } from "@angular/core";
import { collection, onSnapshot, QuerySnapshot, Unsubscribe } from "firebase/firestore";
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

  public ACCOUNTS_CHANGED = new BehaviorSubject<IParsedDocument<Account>>({keys: [], values: {}, length: 0});
  public defaultAccount: Account | null = null;
  private accountsRef = 'accounts';
  private _ALL_ACCOUNTS: AccountsMap = {};

  private emittedAccounts: IParsedDocument<Account> = {keys: [], values: {}, length: 0};

  private _unsubscribe: Unsubscribe[] = [];

  constructor(
    private _fsService: FirestoreService,
    private _serializerService: SerializerService
  ) {

    const unsubscribeAccounts = onSnapshot<AccountsMap>(collection(this._fsService.db, this.accountsRef), (col: QuerySnapshot<AccountsMap>) => {
      this._serializerService.serializeNamedDocumentsInCollectionAndEmit<AccountsMap, Account>
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
    for (let rule of rules) {
      if (rule.account.toLowerCase() === 'any') {
        throw new Error('Provide the account id to apply the transaction to.');
      }
      let accToTransact = this.emittedAccounts.values[rule.account] as Account;
      accToTransact = new Account(rule.account, accToTransact.currency, accToTransact.name || '', accToTransact.balance);
      accToTransact.applyTransaction(rule, amount);
      modifiedAccounts.push(accToTransact);
    }
    return modifiedAccounts;
  }
}
