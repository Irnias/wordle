import { fromEvent } from "rxjs";
import { Game } from "./Game";
import { AddLetterObserver } from "./observer/AddLetterObserver";
import { RemoveLetterObserver } from "./observer/RemoveLetterObserver";

const onKewDown$ = fromEvent( document, 'keydown');
const game = new Game('letter-row');

const removeLetterObserver = new RemoveLetterObserver(game).invoke;
const addLetterObserver = new AddLetterObserver(game).invoke;

onKewDown$.subscribe(addLetterObserver);
onKewDown$.subscribe(removeLetterObserver);