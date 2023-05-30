import { ViewContainerRef } from "@angular/core";
import { Card, ICard, TCardType } from "./Card";
import { TransactionMetaReferenceCardComponent } from "../transaction-meta-reference-card/transaction-meta-reference-card.component";

export interface ITransactionMetaReferenceCard extends ICard {

  order: number;
  type: TCardType
}

export class TransactionMetaReferenceCard extends Card{

  constructor( arg: ITransactionMetaReferenceCard) {
    super(arg.id, arg.order, arg.type, arg.hidden);
  }

  public createComponent(viewContainerRef: ViewContainerRef) {
    if (viewContainerRef) {
      viewContainerRef.clear();
      viewContainerRef.createComponent(TransactionMetaReferenceCardComponent);
    }
  }
}
