import { Component, ViewChildren, QueryList } from '@angular/core';

import { CardList } from './common/card-list';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChildren(CardComponent) cardComponents!: QueryList<CardComponent>;

  title = 'CardMatchingGame';
  cardList = CardList;
  gameStarted = false;
  firstCard: any;
  secondCard: any;

  startGame() {
    this.gameStarted = true;
  }

  onCardSelect(selectedCard: any) {
    this.cardList.forEach(card => {
      if (card.id === selectedCard.id) {
        card.flipped = true;
      }
    });
    if (!this.firstCard) {
      this.firstCard = selectedCard;
    } else if (this.firstCard && !this.secondCard) {
      this.secondCard = selectedCard;
    }
    if (this.firstCard && this.secondCard) {
      this.checkCards();
    }
  }

  checkCards() {
    if (this.firstCard.name === this.secondCard.name && this.firstCard.id !== this.secondCard.id) {
      this.setCardToMatched(this.firstCard, this.secondCard);
    } else {
      this.flipCardsBack(this.firstCard, this.secondCard);
    }
    this.firstCard = null;
    this.secondCard = null;
  }

  setCardToMatched(card1: any, card2: any) {
    this.cardList.forEach(card => {
      if (card.id === card1.id || card.id === card2.id) {
        card.flipped = true;
        card.matched = true;
      }
    })
  }

  flipCardsBack(card1: any, card2: any) {
    for (let cardComponent of this.cardComponents) {
      setTimeout(() => {
        cardComponent.flipCardBack();
      }, 500);
    }
  }
}
