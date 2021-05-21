export default function BaseballGame() {
  addSubmitButtonEvent();

  this.play = function(computerInputNumbers, userInputNumbers) {
    return '결과 값 String';
  };

  function checkValidInput(userInput) {
    const _userInput = userInput.split('').filter((x) => parseInt(x));
    if (_userInput.length !== 3) {
      return false;
    }
    return parseInt(userInput);
  }

  function clickSubmitButton() {
    const _userInput = getUserInputNumber();
    // Input is not valid
    if (!checkValidInput(_userInput)) {
    }
    //Input valud
    console.log(_userInput);
  }

  function getUserInputNumber() {
    const userInput = document.getElementById('user-input').value;
    return userInput;
  }

  function addSubmitButtonEvent() {
    const _$submitButton = document.getElementById('submit');
    _$submitButton.addEventListener('click', () => clickSubmitButton());
  }
}

new BaseballGame();
