import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';

import { CardList } from './common/card-list';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChildren(CardComponent) cardComponents!: QueryList<CardComponent>;

  title = 'CardMatchingGame';
  cardList!: any[];
  gameStarted = false;
  firstCard: any;
  secondCard: any;
  gameEndedOnce = false;
  countOfFlips = 0;
  timeConsumed: number = 0;
  timerRef: any;
  minute: number = 0;
  second: number = 0;

  ngOnInit(): void {
    this.shuffleCards();
  }

  shuffleCards() {
    const cards = JSON.parse(JSON.stringify(CardList));
    let currentIndex = cards.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [cards[currentIndex], cards[randomIndex]] = [
        cards[randomIndex], cards[currentIndex]];
    }
    this.cardList = cards;
  }

  startGame() {
    if (this.gameEndedOnce) {
      this.shuffleCards();
    }
    this.gameStarted = true;
    this.countOfFlips = 0;
    this.timeConsumed = 0;
    this.minute = 0;
    this.second = 0;
    this.startTimer();
  }

  onCardSelect(selectedCard: any) {
    this.countOfFlips ++;
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
      this.flipCardsBack();
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
    this.checkGameStatus();
  }

  flipCardsBack() {
    for (let cardComponent of this.cardComponents) {
      setTimeout(() => {
        cardComponent.flipCardBack();
      }, 500);
    }
  }

  checkGameStatus() {
    const unmatchedCard = this.cardList.find(card => !card.matched);
    if (!unmatchedCard) {
      this.gameStarted = false;
      this.gameEndedOnce = true;
      this.stopTimer();
    }
  }

  startTimer() {
    this.timerRef = setInterval(() => {
      this.timeConsumed ++;
      if (this.timeConsumed >= 60) {
        this.minute = Math.floor(this.timeConsumed / 60);
        this.second = (this.timeConsumed % 60);
      } else {
        this.second = this.timeConsumed;
      }
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.timerRef);
  }
}
