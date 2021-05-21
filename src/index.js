export default function BaseballGame() {
  addSubmitButtonEvent();

  /*
   ** Play Game
   */

  this.play = function(computerInputNumbers, userInputNumbers) {
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
    console.log('computerInput', _computerInput);
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
    getComputerInputNumber();
    console.log('final', _userInput);
  }

  function addSubmitButtonEvent() {
    const _$submitButton = document.getElementById('submit');
    _$submitButton.addEventListener('click', () => clickSubmitButton());
  }
}

new BaseballGame();
