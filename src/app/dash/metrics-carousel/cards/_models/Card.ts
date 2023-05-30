export type TCardType = 'transactionMetaReference' | 'accountsBalance';

export interface ICard {

  id: string;
  order: number;
  type: TCardType;
  hidden: boolean;
}

export class Card {
  private _order: number;
  private _type: TCardType;
  private _id: string
  private _hidden: boolean;

  public get id() {
    return this._id;
  }

  public get order() {
    return this._order
  }

  public set order(ord: number) {
    // update order in db
    this.order = ord;
  }

  public get type() {
    return this._type;
  }

  public get hidden() {
    return this._hidden
  }

  public set hidden(hidden: boolean) {
    this._hidden = hidden;
  }

  constructor(id: string, order: number, type: TCardType, hidden: boolean) {

    this._id = id;
    this._order = order;
    this._type = type;
    this._hidden = hidden;
  }
}
