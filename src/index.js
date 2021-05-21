export default function BaseballGame() {
  let computerInputNumber = getComputerInputNumber();
  addSubmitButtonEvent();

  /*
   ** Play Game
   */

  function checkStrike({computerInputNumbers, userInputNumbers}) {
    let _strikeCount = 0;
    for (let i = 0; i < 3; i++) {
      if (computerInputNumbers[i] === userInputNumbers[i]) {
        _strikeCount++;
      }
    }
    return _strikeCount;
  }

  // function correctAnswer() {
  //   console.log("🎉정답을 맞추셨습니다!🎉")
  // }

  const play = function(computerInputNumbers, userInputNumbers) {
    let _ballCount;
    let _strikeCount;
    console.log(computerInputNumbers, userInputNumbers)
    _strikeCount = checkStrike({computerInputNumbers: String(computerInputNumbers), userInputNumbers: String(userInputNumbers)})
    console.log(_strikeCount);
    // userInputNumbers.forEach((x) => {
    //   computerInputNumbers;
    // });
    // if (_strikeCount === 3) {
    //   correctAnswer();
    // }
    return '결과 값 String';
  };

  /*
   ** Computer Input
   */

  function getRandomSingleDigit() {
    return Math.floor(Math.random() * 10);
  }

  function getComputerInputNumber() {
    let _computerInput = 0;

    for (let i = 0; i < 3; i++) {
      let _randomNumber = getRandomSingleDigit();
      if (i === 2 && _randomNumber === 0) {
        _randomNumber = 1;
      }
      _computerInput += _randomNumber * Math.pow(10, i);
    }
    return _computerInput;
  }

  /*
   ** User Input
   */

  function checkValidInput(userInput) {
    const _userInput = userInput.split('').filter((x) => parseInt(x));
    if (_userInput.length !== 3) {
      return false;
    }
    return parseInt(userInput);
  }

  function getUserInputNumber() {
    const _userInput = document.getElementById('user-input').value;
    return _userInput;
  }

  /*
   ** Event Listener
   */

  function clickSubmitButton() {
    const _userInput = getUserInputNumber();
    // Input is not valid
    if (!checkValidInput(_userInput)) {
    }
    //Input valud
    play(computerInputNumber, _userInput);
  }

  function addSubmitButtonEvent() {
    const _$submitButton = document.getElementById('submit');
    _$submitButton.addEventListener('click', () => clickSubmitButton());
  }
}

new BaseballGame();
