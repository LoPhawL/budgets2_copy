import { Directive, Input, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[appCardHost]'
})
export class CardHostDirective {

  @Input()
  appCardHost: number = 0;

  constructor(public viewContainerRef: ViewContainerRef) {

  }
}
