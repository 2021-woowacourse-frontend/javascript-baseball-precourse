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

    checkUserInput(userInputNumbers) {
        let userNumArray = userInputNumbers.split('');
        if (userNumArray.length != 3) {
            return false;
        }
        else if (isNaN(userInputNumbers) == true) {
            return false;
        }
        let ret = true;
        userNumArray.forEach(function(item, index) {
            if (item == userNumArray[(index + 1) % 3] || item == userNumArray[(index + 2) % 3]) {
                ret = false;
            }
        })
        if (ret == false) {
            return false;
        }
        return true;
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
      if (this.result == '3스트라이크') {
          this.result = '🎉 정답을 맞추셨습니다! 🎉';
      }
      return this.result;
    }
  }
  
  const checkBtn = document.getElementById('submit');
  let baseball = new BaseballGame();
  
  checkBtn.addEventListener('click', function(event){
      let userInputNumbers = document.getElementById('user-input').value;
      console.log(userInputNumbers);
      let checkInput = baseball.checkUserInput(userInputNumbers);
      console.log(checkInput);
      if (checkInput == false) {
          alert('유효하지 않은 입력입니다.')
          document.getElementById('user-input').value = '';
          return ; 
      }
      let resultText = baseball.play(baseball.computerNum, userInputNumbers);
      let result = document.getElementById('result');
      result.innerText = resultText;
      baseball.ball = 0;
      baseball.strike = 0;
      if (resultText == '🎉 정답을 맞추셨습니다! 🎉') {
          console.log("haha")
          let newDiv = document.createElement('div');
          newDiv.innerHTML = '게임을 새로 시작하시겠습니까?';
          let newBtn = document.createElement('button');
          newBtn.innerHTML = '게임 재시작';
          newDiv.append(newBtn);
          document.body.appendChild(newDiv);
      }
  });
  