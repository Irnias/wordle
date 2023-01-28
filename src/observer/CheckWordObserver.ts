import {GameInterface} from "../Game";
import {Observer} from "rxjs";

export class CheckWordObserver {
  constructor(private game: GameInterface) {
  }

  public invoke: Observer<KeyboardEvent> = {
    next: (e) => e.key === 'Enter' ? this.game.removeLetter() : '',
    error: function (err: any): void {
      throw new Error("Function not implemented.");
    },
    complete: function (): void {
      throw new Error("Function not implemented.");
    }
  }
}