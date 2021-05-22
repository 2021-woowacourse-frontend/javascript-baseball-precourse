export default function BaseballGame() {
  let _computerInputNumber = getComputerInputNumber();
  let _retryCount = 0;
  let _retryFlag = 0;
  addButtonEvent(
    `submit${_retryCount === 0 ? '' : _retryCount}`,
    clickSubmitButton,
  );

  /*
   ** Play Game
   */

  function getResult({ strikeCount, ballCount }) {
    let $result = document.getElementById('retryResult');
    if (!$result) {
      $result = document.getElementById('result');
      $result.innerHTML += `<div id="retryResult"></div>`;
      $result = document.getElementById('retryResult');
    }
    let result = '';
    if (strikeCount === 0 && ballCount === 0) {
      result = '낫싱';
    }
    result += ballCount === 0 ? '' : `${ballCount}볼`;
    result += strikeCount === 0 ? '' : `${strikeCount}스트라이크`;
    $result.innerHTML += `<p>${result}</p>`;
    return result;
  }

  function getStrikeBall({ computerInputNumbers, userInputNumbers }) {
    let ballCount = 0;
    let strikeCount = 0;
    for (let i = 0; i < 3; i++) {
      if (computerInputNumbers[i] === userInputNumbers[i]) {
        strikeCount++;
      } else {
        if (computerInputNumbers.includes(userInputNumbers[i])) {
          ballCount++;
        }
      }
    }
    return { strikeCount, ballCount };
  }

  function correctAnswer() {
    let $result = document.getElementById('retryResult');
    if (!$result) {
      $result = document.getElementById('result');
    }
    $result.innerHTML +=
      '<p>🎉<strong>정답을 맞추셨습니다!</strong>🎉</p>' +
      '<p>게임을 새로 시작하시겠습니까? <button id="game-restart-button">게임 재시작</button></p>';
    return '🎉정답을 맞추셨습니다!🎉';
  }

  const play = function(computerInputNumbers, userInputNumbers) {
    console.log('computerInputNumbers', computerInputNumbers);
    let result = '';
    let { strikeCount, ballCount } = getStrikeBall({
      computerInputNumbers: String(computerInputNumbers).split(''),
      userInputNumbers: String(userInputNumbers).split(''),
    });
    console.log('strikeCount', strikeCount, 'ballCount', ballCount);
    if (strikeCount === 3) {
      result = correctAnswer();
      addButtonEvent(`game-restart-button`, clickResetButton);
    } else {
      _retryFlag = 1;
      result = getResult({ strikeCount, ballCount });
      const $app = document.getElementById('app');
      let $retryResult = document.getElementById('retryResult');
      _retryCount++;
      if ($retryResult === null) {
        $app.innerHTML += `<div id="retryResult"></div>`;
        $retryResult = document.getElementById('retryResult');
      }
      $retryResult.innerHTML +=
        `<input type="text" id="user-input${_retryCount}" />` +
        `<button id="submit${_retryCount}">확인</button>` +
        '<h3>📄 결과</h3>' +
        `<div id="result${_retryCount === 0 ? '' : _retryCount}"></div>`;
    }
    addButtonEvent(
      `submit${_retryCount === 0 ? '' : _retryCount}`,
      clickSubmitButton,
    );
    return result;
  };

  /*
   ** Computer Input
   */

  function getRandomSingleDigit() {
    const min = 1;
    const max = 10;

    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getComputerInputNumber() {
    let computerInput = new Set();

    while (computerInput.size != 3) {
      computerInput.add(getRandomSingleDigit());
    }
    return Number([...computerInput].join(''));
  }

  /*
   ** User Input
   */

  function checkValidInput(userInput) {
    const checkUserInput = userInput.split('').filter((x) => parseInt(x));
    if (
      userInput.length !== checkUserInput.length ||
      checkUserInput.length !== 3
    ) {
      return false;
    }
    return parseInt(userInput);
  }

  function getUserInputNumber(_retryCount) {
    return document.getElementById(
      `user-input${_retryCount === 0 ? '' : _retryCount}`,
    ).value;
  }

  /*
   ** Init
   */

  function initValue() {
    document.getElementById('user-input').value = '';
  }

  function removeEvent() {
    for (let i = 1; i < _retryCount; i++) {
      let $submitButton = document.getElementById(
        `submit${_retryCount === 1 ? '' : _retryCount}`,
      );
      $submitButton.removeEventListener('click', () => clickResetButton());
    }
    const $resetButton = document.getElementById(`game-restart-button`);
    $resetButton.removeEventListener('click', () => clickResetButton());
  }

  function removeDOM() {
    const $retryResult = document.getElementById('retryResult');
    $retryResult.remove();
  }

  function init() {
    _computerInputNumber = getComputerInputNumber();
    initValue();
    removeEvent();
    _retryCount = 0;
    removeDOM();
  }

  /*
   ** Event Listener
   */

  function clickSubmitButton() {
    const userInput = getUserInputNumber(_retryCount);
    console.log(_retryCount, userInput);
    if (!_retryFlag && !checkValidInput(userInput)) {
      alert('유효한 input을 입력해주세요.');
      return;
    }
    console.log(play(_computerInputNumber, userInput));
  }

  function clickResetButton() {
    init();
  }

  function addButtonEvent(buttonId, func) {
    const $submitButton = document.getElementById(buttonId);
    $submitButton.addEventListener('click', () => func());
  }
}

new BaseballGame();
