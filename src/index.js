export default function BaseballGame() {
  addButtonEvent();

  this.play = function(computerInputNumbers, userInputNumbers) {
    return '결과 값 String';
  };

  function clickSubmitButton() {
    const userInput = getUserInputNumber();
    console.log(userInput);
  }

  function getUserInputNumber() {
    const userInput = document.getElementById('user-input').value;
    return userInput;
  }

  function addButtonEvent() {
    const _$submitButton = document.getElementById('submit');
    _$submitButton.addEventListener('click', () => clickSubmitButton());
  }
}

new BaseballGame();
