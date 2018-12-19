import { Component } from '@angular/core';
import { Word } from './interfaces/interfaz';
import { RuletaService } from './services/ruleta.service';
import swal from 'sweetalert2';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  word:Word[];
  wordToCheck:string;
  wordsToGuess:string;
  isNewGame:boolean;
  timeIsActive:boolean;
  showTimer:boolean;
  lettersGame:string[];
  lettersToWin:number;
  timeCounter:number;
  numberOfLetters:number;
  source = interval(1000);
  completeWord = interval(500);

  constructor(private wordService:RuletaService){
    this.wordService = wordService;
	this.source.subscribe(val => this.countDown());
	this.completeWord.subscribe(val => this.autocompleteWord());
    this.init();
	
  }

  private init(){
    this.isNewGame = true;
	this.timeIsActive = false;
	this.showTimer = false;
    this.wordsToGuess = '';
    this.word = [];
    this.wordToCheck = '';
    this.lettersGame = [];
    this.lettersToWin = 0;
    this.numberOfLetters = 0;
	this.timeCounter = 10;
  }
  
  adivinar(){
	this.timeCounter = 10;
	this.showTimer = true;
	this.timeIsActive = true;
	
  }
  
  countDown(){
	this.timeCounter--;
	if(this.timeCounter<0){
	  this.showTimer = false;
	  this.timeIsActive = false;
	  this.timeCounter = 10;
	}
  }
  
  autocompleteWord(){
	if(this.word.length > 0){
		var randomWord = this.word[Math.round(Math.random()*(this.word.length-1))];
		var randomLetter = randomWord.letter[Math.round(Math.random()*(randomWord.letter.length-1))];
		if(randomLetter.color === 'show-letter'){
			randomLetter = randomWord.letter[Math.round(Math.random()*(randomWord.letter.length-1))];
		}
		if(randomLetter.letter != ' '){
			randomLetter.color = 'show-letter';
		}
	}
  }

  cambiar(){
    if(this.wordToCheck.trim()===''){
      swal("Atención!", "Debe ingresar una letra", "error");
    }else if(this.lettersGame.indexOf(this.wordToCheck)>-1){
      swal("Atención!", "La letra [ " + this.wordToCheck.toUpperCase() + " ] ya ha sido usada.", "error");
    }else{
      this.lettersGame.push(this.wordToCheck);
      var thereIsNot = true;
      for (let entry of this.word) {
        for(let letter of entry.letter){
          if(letter.letter===this.wordToCheck.toUpperCase()){
            letter.color = 'show-letter';
            this.numberOfLetters++;
            thereIsNot = false;
          }
        }
      }
      if(thereIsNot){
        swal("Atención!", "La letra [ " + this.wordToCheck.toUpperCase() + " ] no está en la frase.", "error");
      }
      if(this.lettersToWin === this.numberOfLetters){
        swal("Juego finalizado", "", "success");
      }
    }
    this.wordToCheck='';
  }

  reiniciar(){
    this.init();
  }

  revelar(){
    this.wordService.revelate(this.word);
  }

  comenzar(){
    if(this.wordsToGuess.trim()===''){
      swal("Atención!", "Debe ingresar una frase", "error");
    }else{
      this.isNewGame = false;
      this.lettersToWin = this.wordService.countLetters(this.wordsToGuess.toUpperCase());
      this.word = this.wordService.getWord(this.wordsToGuess.toUpperCase());
    }
  }

}
