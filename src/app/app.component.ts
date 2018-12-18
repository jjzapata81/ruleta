import { Component } from '@angular/core';
import { Word } from './interfaces/interfaz';
import { RuletaService } from './services/ruleta.service';
import swal from 'sweetalert2';

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
  lettersGame:string[];
  lettersToWin:number;
  numberOfLetters:number;

  constructor(private wordService:RuletaService){
    this.wordService = wordService;
    this.init();
  }

  private init(){
    this.isNewGame = true;
    this.wordsToGuess = '';
    this.word = [];
    this.wordToCheck = '';
    this.lettersGame = [];
    this.lettersToWin = 0;
    this.numberOfLetters = 0;
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
