import { Component, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
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

export class CardComponent implements OnChanges {
  @Input() cardDetails: any;

  @Output() cardSelected = new EventEmitter<any>();

  cardFlipped: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cardDetails && changes.cardDetails.currentValue) {
      this.cardDetails = changes.cardDetails.currentValue;
      this.cardFlipped = this.cardDetails.flipped;
    }
  }

  flipCard() {
    if (!this.cardFlipped) {
      this.cardFlipped = true;
      this.cardSelected.emit(this.cardDetails);
    }
  }

  flipCardBack() {
    if (this.cardFlipped && !this.cardDetails.matched) {
      this.cardFlipped = false;
    }
  }
}
