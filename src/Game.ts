import WORDS from '../src/words.json';

export interface GameInterface {
  readonly _letterIndex:number;
  readonly _letterRowIndex:number;
  _letterRows: HTMLCollectionOf<Element>;
  _currentWord: string;
  addLetter: (letter:string) => void;
  removeLetter: () => void;
  checkWord: () => void;
}

export class Game implements GameInterface{
  _letterIndex: number = 0;
  _letterRowIndex: number = 0;
  _letterRows: HTMLCollectionOf<Element>;
  _currentWord: string;
  _userWordle: string[] = [];

  constructor(letterRowsClassNameContainer: string) {
    this._letterRows = document.getElementsByClassName(letterRowsClassNameContainer);
    this._currentWord = this.getRandomWord();
  }

  checkWord = () => {

  };

  addLetter = (letter: string): void => {
    try{
      this.validateLetter(letter);
      this.addLetterAction(letter);
    }catch (e) {
      console.log(e.message);
    }
  }

  private addLetterAction = (letter: string): void => {
    if (this._letterIndex <= 4) {
      this.addLetterIndex();
      this.updateTexRow(letter);
      this.fillUserWordle(letter);
    }
  }

  private fillUserWordle = (letter: string): void => {
      this._userWordle.push(letter);
  }

  private updateTexRow = (letter: string): void => {
    const letterBox: Element = this.getCurrentHTMLLetterBox();
    letterBox.textContent = letter;
    letterBox.classList.add('filled-letter');
  };

  private addLetterIndex = (): void => { this._letterIndex++; }

  private getCurrentHTMLLetterBox = (): Element => {
    return Array.from(this._letterRows)[this._letterRowIndex].children[this._letterIndex-1];
  }

  removeLetter = (): void => {
    if(this._letterIndex > 0) {
      const letterBox: Element = this.getCurrentHTMLLetterBox();
      letterBox.textContent = '';
      letterBox.classList.remove('filled-letter');
      this.removeLetterIndex();
      this._userWordle.pop();
    }
  }

  private removeLetterIndex = (): void => { this._letterIndex--; }

  private validateLetter = (letter: string): void => {
    if (!letter.match(/^[A-Z]$/)){
      throw new Error('No es una letra.');
    }
  }

  private getRandomWord = () => WORDS[Math.floor(Math.random()*WORDS.length)];

}

new Game('letter-row');