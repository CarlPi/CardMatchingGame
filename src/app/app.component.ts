import { Component } from '@angular/core';

import { CardList } from './common/card-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'CardMatchingGame';
  cardList = CardList;
}
