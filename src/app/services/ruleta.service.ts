import { Injectable } from '@angular/core';
import { Word, Letter } from '../interfaces/interfaz';

@Injectable({
  providedIn: 'root'
})
export class RuletaService {

  copyOfWords : Word[] = [];

  revelate(word:Word[]) {
    for (let entry of word) {
      for(let letter of entry.letter){
        letter.color = letter.letter === ' ' ? 'space' : 'show-letter';
      }
    }
  }

  constructor() { }

  getWord(word:string): Word[] {
    this.copyOfWords = [];
    var words : Word[] = [];
    var wordSplited = word.split(' ');
    for (let entry of wordSplited) {
      var letters : Letter[] = [];
      for(let letter of entry.split('')){
		if(letter === ','){
			letters.push(new Letter(letter.toUpperCase(), 'show-letter'));
		}else{
			letters.push(new Letter(letter.toUpperCase(), 'secret-letter'));
		}
      }
      letters.push(new Letter(' ', 'space'));
      words.push(new Word(letters));
    }
    this.copyOfWords = Object.assign([], words);
    return words;
  }

  getRamdomWord():number{
    var position = Math.round(Math.random()*(this.copyOfWords.length-1));
    var randomWord = this.copyOfWords[position];
    if(randomWord.letter.length > 0){
      return position;
    }
    return -1;
  }

  getRandomLetter():number{
    var position = this.getRamdomWord();
    if(position>-1){
      var randomWord = this.copyOfWords[position];
      var letterPosition = Math.round(Math.random()*(randomWord.letter.length-1));
      var randomLetter = randomWord.letter[letterPosition];
    }
    return -1;
  }

  countLetters(word:string):number{
    var letters:number = 0;
    for (let letter of word.split('')){
      if(letter!=' ' && letter!=','){
        letters++;
      }
    }
    return letters;
  }
  
}
