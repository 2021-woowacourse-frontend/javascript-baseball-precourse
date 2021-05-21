export default function BaseballGame() {
  let computerInputNumber = getComputerInputNumber();
  let retryCount = 0;
  addSubmitButtonEvent();

  /*
   ** Play Game
   */

  function printResult({ _strikeCount, _ballCount }) {
    let _$result = document.getElementById('retryResult');
    if (!_$result) {
      _$result = document.getElementById('result');
      _$result.innerHTML += `<div id="retryResult"></div>`;
      _$result = document.getElementById('retryResult');
    }

    let result = '';
    if (_strikeCount === 0 && _ballCount === 0) {
      result = '낫싱';
    }
    result += _ballCount === 0 ? '' : `${_ballCount}볼`;
    result += _strikeCount === 0 ? '' : `${_strikeCount}스트라이크`;

    _$result.innerHTML += `<p>${result}</p>`;
  }

  function getStrikeBall({ computerInputNumbers, userInputNumbers }) {
    let _ballCount = 0;
    let _strikeCount = 0;
    for (let i = 0; i < 3; i++) {
      if (computerInputNumbers[i] === userInputNumbers[i]) {
        _strikeCount++;
      } else {
        if (computerInputNumbers.includes(userInputNumbers[i])) {
          _ballCount++;
        }
      }
    }
    return { _strikeCount, _ballCount };
  }

  function correctAnswer() {
    let _$result = document.getElementById('retryResult');
    if (!_$result) {
      _$result = document.getElementById('result');
    }
    _$result.innerHTML +=
      '<p>🎉<strong>정답을 맞추셨습니다!</strong>🎉</p>' +
      '<p>게임을 새로 시작하시겠습니까? <button id="game-restart-button">게임 재시작</button></p>';
    return '🎉정답을 맞추셨습니다!🎉';
  }

  const play = function(computerInputNumbers, userInputNumbers) {
    console.log('computerInputNumbers', computerInputNumbers);
    let _result = "";
    let { _strikeCount, _ballCount } = getStrikeBall({
      computerInputNumbers: String(computerInputNumbers).split(''),
      userInputNumbers: String(userInputNumbers).split(''),
    });
    console.log('strikeCount', _strikeCount, 'ballCount', _ballCount);
    if (_strikeCount === 3) {
      _result = correctAnswer();
      addResetButtonEvent();
    } else {
      _result = printResult({ _strikeCount, _ballCount });
      const _$app = document.getElementById('app');
      let _$retryResult = document.getElementById('retryResult');
      retryCount++;
      if (_$retryResult === null) {
        _$app.innerHTML += `<div id="retryResult"></div>`;
        _$retryResult = document.getElementById('retryResult');
        _$retryResult.innerHTML +=
          `<input type="text" id="user-input${retryCount}" />` +
          `<button id="submit${retryCount}">확인</button>` +
          '<h3>📄 결과</h3>' +
          `<div id="result${retryCount === 0 ? '' : retryCount}"></div>`;
      } else {
        _$retryResult.innerHTML +=
          `<input type="text" id="user-input${retryCount}" />` +
          `<button id="submit${retryCount}">확인</button>` +
          '<h3>📄 결과</h3>' +
          `<div id="result${retryCount === 0 ? '' : retryCount}"></div>`;
      }
    }
    addSubmitButtonEvent();
    return _result;
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
    let _computerInput = new Set();

    while (_computerInput.size != 3) {
      _computerInput.add(getRandomSingleDigit());
    }
    return Number([..._computerInput].join(''));
  }

  /*
   ** User Input
   */

  // 123a
  // 12a
  function checkValidInput(userInput) {
    const _userInput = userInput.split('').filter((x) => parseInt(x));
    if (userInput.length !== _userInput.length || _userInput.length !== 3) {
      return false;
    }
    return parseInt(userInput);
  }

  function getUserInputNumber(retryCount) {
    return document.getElementById(
      `user-input${retryCount === 0 ? '' : retryCount}`,
    ).value;
  }

  /*
   ** Init
   */

  function init() {
    computerInputNumber = getComputerInputNumber();
    // remove submit EventListener
    for (let i = 1; i < retryCount; i++) {
      let _$submitButton = document.getElementById(
        `submit${retryCount === 1 ? '' : retryCount}`,
      );
      _$submitButton.removeEventListener('click', () => clickResetButton());
    }
    // remove reset EventListener
    const _$resetButton = document.getElementById(`game-restart-button`);
    _$resetButton.removeEventListener('click', () => clickResetButton());
    retryCount = 0;
    const _$retryResult = document.getElementById('retryResult');
    _$retryResult.remove();
  }

  /*
   ** Event Listener
   */

  function clickSubmitButton() {
    const _userInput = getUserInputNumber(retryCount);
    console.log(retryCount, _userInput);
    if (!checkValidInput(_userInput)) {
      alert('유효한 input을 입력해주세요.');
      return;
    }
    console.log(play(computerInputNumber, _userInput));
  }

  function addSubmitButtonEvent() {
    const _$submitButton = document.getElementById(
      `submit${retryCount === 0 ? '' : retryCount}`,
    );
    _$submitButton.addEventListener('click', () => clickSubmitButton());
  }

  function clickResetButton() {
    init();
    addSubmitButtonEvent();
  }

  function addResetButtonEvent() {
    const _$resetButton = document.getElementById(`game-restart-button`);
    _$resetButton.addEventListener('click', () => clickResetButton());
  }
}

new BaseballGame();
