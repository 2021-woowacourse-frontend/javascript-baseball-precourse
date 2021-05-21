export default function BaseballGame() {
  let computerInputNumber = getComputerInputNumber();
  let retryCount = 0;
  addSubmitButtonEvent();

  /*
   ** Play Game
   */

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
      '<p>게임을 새로 시작하시겠습니까? <button id="reset">게임 재시작</button></p>';
    console.log('🎉정답을 맞추셨습니다!🎉');
  }

  const play = function(computerInputNumbers, userInputNumbers) {
    console.log("computerInputNumbers", computerInputNumbers)
    let {_strikeCount, _ballCount} = getStrikeBall({
      computerInputNumbers: String(computerInputNumbers).split(''),
      userInputNumbers: String(userInputNumbers).split(''),
    });
    console.log('strikeCount', _strikeCount, "ballCount", _ballCount);
    // ball
    // userInputNumbers.forEach((x) => {
    //   computerInputNumbers;
    // });
    if (_strikeCount === 3) {
      correctAnswer();
      addResetButtonEvent();
    } else {
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
    return '결과 값 String';
  };

  /*
   ** Computer Input
   */

  function getRandomSingleDigit() {
    return Math.floor(Math.random() * 9) + 1;
  }

  function getComputerInputNumber() {
    let _computerInput = 0;

    for (let i = 0; i < 3; i++) {
      let _randomNumber = getRandomSingleDigit();
      _computerInput += _randomNumber * Math.pow(10, i);
    }
    return _computerInput;
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
    const _$resetButton = document.getElementById(`reset`);
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
    // Input is not valid
    if (!checkValidInput(_userInput)) {
      alert('유효한 input을 입력해주세요.');
      return;
    }
    //Input valud
    play(computerInputNumber, _userInput);
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
    const _$resetButton = document.getElementById(`reset`);
    _$resetButton.addEventListener('click', () => clickResetButton());
  }
}

new BaseballGame();
