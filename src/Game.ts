import WORDS from '../src/words.json';
import { GameInterface } from './GameInterface';
import { Subject } from 'rxjs';
import { LogLevel } from 'ts-loader/dist/logger';

export class Game implements GameInterface {
  _letterIndex: number = 0;
  _letterRowIndex: number = 0;
  _letterRows: HTMLCollectionOf<Element>;
  _currentWord: string;
  _userWordle: string[] = [];
  private _messageText: Element;

  constructor(letterRowsClassNameContainer: string) {
    this._letterRows = document.getElementsByClassName(letterRowsClassNameContainer);
    this._currentWord = this.getRandomWord();
    this._messageText = document.getElementsByClassName('message-text')[0];
  }

  checkWord = (fieldResultSubject$: Subject<any>) => {
    if (this._userWordle.length !== 5) {
      this.sendMessage('La palabra no tiene 5 letras', 5000);
      return;
    }
    if (!WORDS.includes(this._userWordle.join(''))) {
      const textContent = `La palabra ${this._userWordle.join(
        ''
      )} no existe. Si esto es un error, avisanos que la agregamos!`;
      this.sendMessage(textContent, 5000);
      for (let i = 0; i < 5; i++) {
        this.removeLetter();
      }
      return;
    }
    if (this._letterRowIndex > 4) {
      const textContent = 'Mas suerte para la proxima!';
      this.sendMessage(textContent, 5000);
      return;
    }
    fieldResultSubject$.next('');
    this.resetWordAndGoNextRow();
  };

  private sendMessage(textContent: string, ms: number) {
    this._messageText.textContent = textContent;
    setTimeout(() => {
      this._messageText.textContent = '';
    }, ms);
  }

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
    } catch (e) {}
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
