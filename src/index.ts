import { fromEvent, Subject } from 'rxjs';
import { Game } from './Game';
import { AddLetterObserver } from './observer/AddLetterObserver';
import { RemoveLetterObserver } from './observer/RemoveLetterObserver';
import { CheckWordObserver } from './observer/CheckWordObserver';
import { ColorFieldsObserver } from './observer/ColorFieldsObserver';

const onKewDown$ = fromEvent(document, 'keydown');
const game = new Game('letter-row');
const fieldResultSubject$ = new Subject();

try {
  const removeLetterObserver = new RemoveLetterObserver(game).invoke;
  const addLetterObserver = new AddLetterObserver(game).invoke;
  const checkWord = new CheckWordObserver(game, fieldResultSubject$).invoke;
  const colorFields = new ColorFieldsObserver(game).invoke;

  onKewDown$.subscribe(addLetterObserver);
  onKewDown$.subscribe(removeLetterObserver);
  onKewDown$.subscribe(checkWord);
  fieldResultSubject$.subscribe(colorFields);
} catch (e) {
  console.log(e.message);
}
