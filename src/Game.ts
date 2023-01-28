import WORDS from '../src/words.json';
import { GameInterface } from './GameInterface';
import { Subject } from 'rxjs';

export class Game implements GameInterface {
  _letterIndex: number = 0;
  _letterRowIndex: number = 0;
  _letterRows: HTMLCollectionOf<Element>;
  _currentWord: string;
  _userWordle: string[] = [];

  constructor(letterRowsClassNameContainer: string) {
    this._letterRows = document.getElementsByClassName(letterRowsClassNameContainer);
    this._currentWord = this.getRandomWord();
  }

  checkWord = (fieldResultSubject$: Subject<any>) => {
    if (this._userWordle.length !== 5) {
      console.log('La palabra no tiene 5 letras');
      return;
    }
    if (!WORDS.includes(this._userWordle.join(''))) {
      console.log(`La palabra ${this._userWordle.join('')} no existe, avisanos que la agregamos!`);
      for (let i = 0; i < 5; i++) {
        this.removeLetter();
      }
      return;
    }
    fieldResultSubject$.next('');
    this.resetWordAndGoNextRow();
  };

  private resetWordAndGoNextRow() {
    this._letterRowIndex++;
    this.resetCurrentWord();
  }

  private resetCurrentWord() {
    this._letterIndex = 0;
    this._userWordle = [];
  }

  addLetter = (letter: string): void => {
    try {
      this.validateLetter(letter);
      this.addLetterAction(letter);
    } catch (e) {
    }
  };

  private addLetterAction = (letter: string): void => {
    if (this._letterIndex <= 4) {
      this.addLetterIndex();
      this.updateTexRow(letter);
      this.fillUserWordle(letter);
    }
  };

  private fillUserWordle = (letter: string): void => {
    this._userWordle.push(letter);
  };

  private updateTexRow = (letter: string): void => {
    const letterBox: Element = this.getCurrentHTMLLetterBox();
    letterBox.textContent = letter;
    letterBox.classList.add('filled-letter');
  };

  private addLetterIndex = (): void => {
    this._letterIndex++;
  };

  getCurrentRow = (): Element => Array.from<Element>(this._letterRows)[this._letterRowIndex];

  private getCurrentHTMLLetterBox = (): Element => {
    return Array.from(this._letterRows)[this._letterRowIndex].children[this._letterIndex - 1];
  };

  removeLetter = (): void => {
    if (this._letterIndex > 0) {
      const letterBox: Element = this.getCurrentHTMLLetterBox();
      letterBox.textContent = '';
      letterBox.classList.remove('filled-letter');
      this.removeLetterIndex();
      this._userWordle.pop();
    }
  };

  private removeLetterIndex = (): void => {
    this._letterIndex--;
  };

  private validateLetter = (letter: string): void => {
    if (!letter.match(/^[A-Z]$/)) {
      throw new Error('No es una letra.');
    }
  };

  private getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];
}
