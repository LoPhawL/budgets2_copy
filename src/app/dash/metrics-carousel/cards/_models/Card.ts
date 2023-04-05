export type TCardType = 'transactionMetaReference' | 'accountsBalance';

export class Card {
  private _order: number;
  private _type: TCardType;
  private _id: string

  public get order() {
    return this._order
  }

  public get type() {
    return this._type;
  }

  public get id() {
    return this._id;
  }

  public set order(ord: number) {
    // update order in db
    this.order = ord;
  }

  constructor(id: string, order: number, type: TCardType) {

    this._id = id;
    this._order = order;
    this._type = type;
  }
}
