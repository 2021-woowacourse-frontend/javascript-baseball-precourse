export default class BaseballGame {
  first: number;
  second: number;
  third: number;
  computerNum: string;
  strike: number;
  ball: number;
  result: string;

  constructor() {
    this.first = 0;
    this.second = 0;
    this.third = 0;
    this.computerNum = this.randomNumGenerator();
    this.strike = 0;
    this.ball = 0;
    this.result = '';
  }

  randomNumGenerator(): string {
    this.first = Math.floor(Math.random() * 9 + 48);
    this.second = Math.floor(Math.random() * 9 + 48);
    this.third = Math.floor(Math.random() * 9 + 48);
    return (
      this.third.toString() + this.second.toString() + this.first.toString()
    );
  }

  play(computerInputNumbers: string, userInputNumbers: string): string {
    let computerNumArray = this.computerNum.split('');
    let userNumArray = userInputNumbers.split('');

    console.log(this.computerNum);
    console.log(userInputNumbers);
    computerNumArray.forEach(function(this: BaseballGame, item, index) {
      if (item == userNumArray[index]) {
        this.strike += 1;
      }
      if (
        item == userNumArray[(index + 2) % 3] ||
        item == userNumArray[(index + 1) % 3]
      ) {
        this.ball += 1;
      }
    });
    if (this.ball == 0 && this.strike == 0) {
      this.result = '낫싱';
    } else if (this.ball != 0 && this.strike != 0) {
      this.result =
        this.ball.toString() + '볼 ' + this.strike.toString() + '스트라이크';
    } else if (this.ball == 0 && this.strike != 0) {
      this.result = this.strike.toString() + '스트라이크';
    } else if (this.ball != 0 && this.strike == 0) {
      this.result = this.ball.toString() + '볼';
    }
    return this.result;
  }
}

const userInput: HTMLElement = document.getElementById(
  'user-input',
) as HTMLElement;
const userInputNumbers: string = userInput.innerHTML as string;
const checkBtn: any = document.getElementById('submit');

let baseball = new BaseballGame();

checkBtn.addEventListener(
  'click',
  baseball.play(baseball.computerNum, userInputNumbers),
);
