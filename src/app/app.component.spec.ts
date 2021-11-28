import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CardList } from './common/card-list';
import { CardComponent } from './components/card/card.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
        CardComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial states', () => {
    expect(component.title).toEqual('CardMatchingGame');
    expect(component.gameStarted).toBeFalsy();
    expect(component.gameEndedOnce).toBeFalsy();
  });

  it('should shuffleCards shuffle card list', () => {
    component.shuffleCards();
    expect(component.cardList).not.toEqual(CardList);
  });

  it('should startGame start game and shuffle cards if it is a restart', () => {
    spyOn(component, 'shuffleCards');
    component.gameEndedOnce = true;
    component.startGame();
    expect(component.shuffleCards).toHaveBeenCalled();
    expect(component.gameStarted).toBeTruthy();
  });

  it('should onCardSelect change card status to flipped and assign first or second card', () => {
    const testCard = {
      id: 4,
      name: "Dropbox",
      icon: "https://img.icons8.com/color/96/000000/dropbox.png",
      flipped: false,
      matched: false
    };
    component.onCardSelect(testCard);
    const cardResult = component.cardList.find(card => card.id === 4);
    expect(cardResult.flipped).toBeTruthy();
    expect(component.firstCard).toBe(testCard);
    spyOn(component, 'checkCards');
    component.firstCard = 'test';
    component.onCardSelect(testCard);
    expect(component.secondCard).toBe(testCard);
    expect(component.checkCards).toHaveBeenCalled();
  });

  it('should checkCards call setCardToMatched if the two selected cards match and clear selected cards', () => {
    const testCard1 = {
      id: 1,
      name: "Amazon",
      icon: "https://img.icons8.com/color/96/000000/amazon.png",
      flipped: false,
      matched: false
    };
    const testCard2 = {
      id: 2,
      name: "Amazon",
      icon: "https://img.icons8.com/color/96/000000/amazon.png",
      flipped: false,
      matched: false
    };
    spyOn(component, 'setCardToMatched');
    component.firstCard = testCard1;
    component.secondCard = testCard2;
    component.checkCards();
    expect(component.setCardToMatched).toHaveBeenCalledWith(testCard1, testCard2);
    expect(component.firstCard).toBeNull();
    expect(component.secondCard).toBeNull();
  });

  it('should checkCards call flipCardsBack if the two selected cards do not match and clear selected cards', () => {
    const testCard1 = {
      id: 1,
      name: "Amazon",
      icon: "https://img.icons8.com/color/96/000000/amazon.png",
      flipped: false,
      matched: false
    };
    const testCard2 = {
      id: 3,
      name: "Dropbox",
      icon: "https://img.icons8.com/color/96/000000/dropbox.png",
      flipped: false,
      matched: false
    };
    spyOn(component, 'flipCardsBack');
    component.firstCard = testCard1;
    component.secondCard = testCard2;
    component.checkCards();
    expect(component.flipCardsBack).toHaveBeenCalled();
    expect(component.firstCard).toBeNull();
    expect(component.secondCard).toBeNull();
  });

  it('should setCardToMatched set two selected cards to matched state and call checkGameStatus', () => {
    const testCard1 = {
      id: 1,
      name: "Amazon",
      icon: "https://img.icons8.com/color/96/000000/amazon.png",
      flipped: false,
      matched: false
    };
    const testCard2 = {
      id: 2,
      name: "Amazon",
      icon: "https://img.icons8.com/color/96/000000/amazon.png",
      flipped: false,
      matched: false
    };
    spyOn(component, 'checkGameStatus');
    component.setCardToMatched(testCard1, testCard2);
    const cardResult1 = component.cardList.find(card => card.id === 1);
    const cardResult2 = component.cardList.find(card => card.id === 2);
    expect(component.checkGameStatus).toHaveBeenCalled();
    expect(cardResult1.flipped).toBeTruthy();
    expect(cardResult1.matched).toBeTruthy();
    expect(cardResult2.flipped).toBeTruthy();
    expect(cardResult2.matched).toBeTruthy();
  });

  it('should checkGameStatus end the game if all cards are matched', () => {
    const testCardList = CardList.map(card => {
      card.flipped = true;
      card.matched = true;
      return card;
    });
    component.cardList = testCardList;
    component.checkGameStatus();
    expect(component.gameStarted).toBeFalsy();
    expect(component.gameEndedOnce).toBeTruthy();
  });

  it('should flipCardsBack call flipCardBack method in child components', fakeAsync(() => {
    spyOn(component.cardComponents.toArray()[0], 'flipCardBack');
    component.flipCardsBack();
    tick(500);
    expect(component.cardComponents.toArray()[0].flipCardBack).toHaveBeenCalled();
  }));

});
