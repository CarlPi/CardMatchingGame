import { Component, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate(500, style({opacity: 1}))
        ])
      ]
    )
  ]
})
export class CardComponent {
  @Input() cardDetails: any;

  cardFlipped = false;

  flipCard() {
    if (!this.cardFlipped) {
      this.cardFlipped = true;
    }
  }

}
