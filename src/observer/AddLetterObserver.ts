import { Observer } from 'rxjs';
import { GameInterface } from '../GameInterface';

export class AddLetterObserver {
  constructor(private game: GameInterface) {}

  public invoke: Observer<KeyboardEvent> = {
    next: (e) => this.game.addLetter(e.key.toUpperCase()),
    error: function (err: any): void {
      throw new Error('Function not implemented.');
    },
    complete: function (): void {
      throw new Error('Function not implemented.');
    },
  };
}
