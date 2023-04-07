import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { CarouselsService } from '../_services/Carousels.service';
import cardModels, { TSupportedCards } from '../cards/_models';
import { TCardType } from '../cards/_models/Card';
import { CardHostDirective } from '../_directives/CardHost';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-first-carousel',
  templateUrl: './first-carousel.component.html',
  styleUrls: ['./first-carousel.component.scss']
})
export class FirstCarouselComponent implements OnInit, OnDestroy, AfterContentInit {

  public carouselTime: number = environment.crsl_interval;
  public cardsToDisplay: TSupportedCards[] = [];
  private _unsubscribeNotifier = new Subject();

  @ViewChild('placeHolderForCards') placeHolderDiv?: ElementRef;

  @ViewChildren(CardHostDirective)
  private _cardHosts: CardHostDirective[] = [];

  constructor(private _carouselsService: CarouselsService) {

  }
  ngOnInit(): void {

    setTimeout(() => {
      this._carouselsService.carousels['carousel1'].subscribe( (cardsData: any) => {
        const cardIds = Object.keys(cardsData);
        if (cardIds.length) {
          for (const cardId of cardIds) {
            const cardType = cardsData[cardId].type as TCardType;
            const fnConstructor = cardModels[cardType];
            const card = new fnConstructor({id: cardId, ...cardsData[cardId]});
            this.cardsToDisplay[card.order-1] = card;
          }

          setTimeout(() => {
            for (const card of this.cardsToDisplay) {

              const viewContainerRef = this._cardHosts.find(cardHost => cardHost.appCardHost === card.order)?.viewContainerRef;
              card.createComponent(viewContainerRef!);
            }
          }, 1);
        }
      });
    }, 1);
  }

  ngAfterContentInit(): void {

  }

  ngOnDestroy(): void {
    this._unsubscribeNotifier.next(null);
  }
}
