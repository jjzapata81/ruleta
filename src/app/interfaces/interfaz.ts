export interface WordInterface{
    letter:Letter[];
}

export interface LetterInterface{
    letter:string;
    color:string;
}

export class Letter implements LetterInterface {
    constructor(public letter: string, public color: string) {
        this.letter = letter;
        this.color = color;
     }
}

export class Word implements WordInterface {
    constructor(public letter: Letter[]) {
        this.letter = letter;
     }
}