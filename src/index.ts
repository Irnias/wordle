import {fromEvent, Observer} from "rxjs";
import {Game} from "./Game";
import {AddLetterObserver} from "./observer/AddLetterObserver";
import {RemoveLetterObserver} from "./observer/RemoveLetterObserver";
import {CheckWordObserver} from "./observer/CheckWordObserver";

const onKewDown$ = fromEvent( document, 'keydown');
const game = new Game('letter-row');

try{
    const removeLetterObserver = new RemoveLetterObserver(game).invoke;
    const addLetterObserver = new AddLetterObserver(game).invoke;
    const checkWord = new CheckWordObserver(game).invoke;

    onKewDown$.subscribe(addLetterObserver);
    onKewDown$.subscribe(removeLetterObserver);
}catch (e) {
    console.log(e.message);
}
