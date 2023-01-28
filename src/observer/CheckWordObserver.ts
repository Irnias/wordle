import { Observer, Subject } from 'rxjs';
import { GameInterface } from '../GameInterface';

export class CheckWordObserver {
  constructor(private game: GameInterface, private fieldResultSubject$: Subject<any>) {}

  public invoke: Observer<KeyboardEvent> = {
    next: (e) => {
      if (e.key === 'Enter'){
        this.game.checkWord(this.fieldResultSubject$);
      }
    },
    error: function (err: any): void {
      throw new Error('Function not implemented.');
    },
    complete: function (): void {
      throw new Error('Function not implemented.');
    },
  };
}
