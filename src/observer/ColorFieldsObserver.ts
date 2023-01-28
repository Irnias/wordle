import { Observer } from 'rxjs';
import { GameInterface } from '../GameInterface';

export class ColorFieldsObserver {
  constructor(private game: GameInterface) {}

  public invoke: Observer<KeyboardEvent> = {
    next: (e) => {
      const rowToValidate = this.game.getCurrentRow();
      for (let i = 0; i < 5; i++) {
        const { textContent, classList } = rowToValidate.children[i];
        if (textContent === this.game._currentWord[i]) {
          classList.add('letter-green');
          continue;
        }
        if (this.game._currentWord.includes(textContent)) {
          classList.add('letter-yellow');
          continue;
        }
        classList.add('letter-grey');
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
