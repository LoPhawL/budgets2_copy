import { ViewContainerRef } from "@angular/core";
import { Card, TCardType } from "./Card";
import { TransactionMetaReferenceCardComponent } from "../transaction-meta-reference-card/transaction-meta-reference-card.component";

export class TransactionMetaReferenceCard extends Card{

  constructor( arg: {id: string, order: number, type: TCardType}) {
    super(arg.id, arg.order, arg.type);
  }

  public createComponent(viewContainerRef: ViewContainerRef) {
    if (viewContainerRef) {
      viewContainerRef.clear();
      viewContainerRef.createComponent(TransactionMetaReferenceCardComponent);
    }
  }
}
