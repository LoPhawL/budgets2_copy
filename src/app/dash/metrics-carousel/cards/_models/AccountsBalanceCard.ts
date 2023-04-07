import { ViewContainerRef } from "@angular/core";
import { Card, TCardType } from "./Card";
import { AccountsBalanceCardComponent } from "../accounts-balance-card/accounts-balance-card.component";

export class AccountsBlanceCard extends Card{

  private _cardTitle: string;
  private _primaryDisplayedAccount: string;
  private _hiddenAccounts: string[];

  public get cardTitle() {
    return this._cardTitle;
  }

  public get primaryDisplayedAccount() {
    return this._primaryDisplayedAccount;
  }

  public get hiddenAccounts() {
    return this._hiddenAccounts;
  }


  public set cardTitle(cardTitle: string) {
    // update db, view
    this._cardTitle = cardTitle;
  }

  public set primaryDisplayedAccount(primaryDisplayedAccount: string) {
    // update db, view
    this._primaryDisplayedAccount = primaryDisplayedAccount;
  }

  public set hiddenAccounts(hiddenAccounts: string[]) {
    //update db, view
    this._hiddenAccounts = hiddenAccounts;
  }

  constructor(arg: {id: string, order: number, type: TCardType, cardTitle: string, primaryDisplayedAccount: string, hiddenAccounts: string[]}) {
    super(arg.id, arg.order, arg.type);

    this._cardTitle = arg.cardTitle;
    this._primaryDisplayedAccount = arg.primaryDisplayedAccount;
    this._hiddenAccounts = arg.hiddenAccounts;

  }

  public createComponent(viewContainerRef: ViewContainerRef) {

    if (viewContainerRef) {
      viewContainerRef.clear();
      viewContainerRef.createComponent(AccountsBalanceCardComponent);
    }
  }
}
