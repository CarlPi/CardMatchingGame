import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      imports: [ BrowserAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.cardFlipped).toBeFalsy();
  });

  it('should flipCard change the status of card and emit selected card', () => {
    component.cardFlipped = false;
    spyOn(component.cardSelected, 'emit');
    component.flipCard();
    expect(component.cardFlipped).toBeTruthy();
    expect(component.cardSelected.emit).toHaveBeenCalledWith(component.cardDetails);
  });

  it('should flipCardBack flip back the card', () => {
    component.cardDetails = {
      id: 2,
      name: "Amazon",
      icon: "https://img.icons8.com/color/96/000000/amazon.png",
      flipped: true,
      matched: false
    };
    component.cardFlipped = true;
    component.flipCardBack();
    expect(component.cardFlipped).toBeFalsy();
  });

});
