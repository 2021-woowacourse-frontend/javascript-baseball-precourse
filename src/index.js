export default class BaseballGame {

    constructor() {
      this.computerNum = this.randomNumGenerator();
      this.strike = 0;
      this.ball = 0;
      this.result = '';
      console.log(this.computerNum);
    }
  
    randomNumGenerator() {
      let first = Math.floor(Math.random() * 9 + 1);
      let second = Math.floor(Math.random() * 9 + 1);
      while (first == second) {
        second = Math.floor(Math.random() * 9 + 1);
      }
      let third = Math.floor(Math.random() * 9 + 1);
      while (third == first || third == second) {
        third = Math.floor(Math.random() * 9 + 1);
      }
      return (
        third.toString() + second.toString() + first.toString()
      );
    }
  
    play(computerInputNumbers, userInputNumbers) {
      let computerNumArray = this.computerNum.split('');
      let userNumArray = userInputNumbers.split('');
  
      console.log(this.computerNum);
      console.log(userInputNumbers);
      computerNumArray.forEach(function(item, index) {
        if (item == userNumArray[index]) {
          this.strike += 1;
        }
        if (
          item == userNumArray[(index + 2) % 3] ||
          item == userNumArray[(index + 1) % 3]
        ) {
          this.ball += 1;
        }
      }, this);
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
  
  const checkBtn = document.getElementById('submit');
  let baseball = new BaseballGame();
  
  checkBtn.addEventListener('click', function(event){
      let userInputNumbers = document.getElementById('user-input').value;
      console.log(userInputNumbers);
      console.log(baseball.strike);
      let resultText = baseball.play(baseball.computerNum, userInputNumbers);
      let result = document.getElementById('result');
      result.innerText = resultText;
  });
  