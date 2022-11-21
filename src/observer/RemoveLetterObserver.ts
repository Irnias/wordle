import { Observer } from "rxjs";
import { GameInterface } from "../Game";

export class RemoveLetterObserver {

  constructor(private game: GameInterface) {
  }

  public invoke: Observer<KeyboardEvent> = {
    next: (e) => e.key === 'Backspace' ? this.game.removeLetter() : '',
    error: function (err: any): void {
      throw new Error("Function not implemented.");
    },
    complete: function (): void {
      throw new Error("Function not implemented.");
    }
  }

}