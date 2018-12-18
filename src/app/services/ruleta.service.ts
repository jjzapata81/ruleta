import { Injectable } from '@angular/core';
import { Word, Letter } from '../interfaces/interfaz';

@Injectable({
  providedIn: 'root'
})
export class RuletaService {
  revelate(word:Word[]) {
    for (let entry of word) {
      for(let letter of entry.letter){
        letter.color = letter.letter === ' ' ? 'space' : 'show-letter';
      }
    }
  }

  constructor() { }

  getWord(word:string): Word[] {
    var words : Word[] = [];
    var wordSplited = word.split(' ');
    for (let entry of wordSplited) {
      var letters : Letter[] = [];
      for(let letter of entry.split('')){
        letters.push(new Letter(letter.toUpperCase(), 'secret-letter'));
      }
      letters.push(new Letter(' ', 'space'));
      words.push(new Word(letters));
    }
    return words;
  }

  countLetters(word:string):number{
    var letters:number = 0;
    for (let letter of word.split('')){
      if(letter!=' '){
        letters++;
      }
    }
    return letters;
  }

  
}
