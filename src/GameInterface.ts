import { Subject } from 'rxjs';

export interface GameInterface {
  readonly _letterIndex: number;
  readonly _letterRowIndex: number;
  _letterRows: HTMLCollectionOf<Element>;
  _currentWord: string;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  checkWord: (fieldResultSubject$: Subject<any>) => void;
  getCurrentRow: () => Element;
}
