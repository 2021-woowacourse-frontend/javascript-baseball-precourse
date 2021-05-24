import {
  BALL,
  STRIKE,
  NOTHING,
  ERROR,
  CORRECT,
  RESTART,
  RESTART_BTN,
} from './define.js';

const baseballGame = new BaseballGame();
const computerInputNumbers = generateRandomNumbers();
const userInputNumbers = document.getElementById('user-input');
const divResult = document.getElementById('result');
const buttonSubmit = document.getElementById('submit');

export default function BaseballGame() {
  this.play = function (computerInputNumbers, userInputNumbers) {
    const result = startGame(computerInputNumbers, userInputNumbers);

    divResult.innerHTML = `${result}`;
    if (result === CORRECT) {
      // 정답이라면 restart버튼 추가
      divResult.appendChild(createRestartButton());
      const restart = document.getElementById('restart');
      restart.addEventListener('click', removeResultElement);
    }
    return result;
  };
}

buttonSubmit.addEventListener('click', () => {
  if (checkValidInput(userInputNumbers) == false) {
    // 입력 값이 유효하지 않은 경우
    alert(ERROR); // 에러메세지 alert
    init();
  } else {
    // 유효하다면 play
    baseballGame.play(computerInputNumbers, userInputNumbers);
  }
});

// 게임 재시작 버튼 생성 함수
function createRestartButton() {
  const restartButton = document.createElement('div');
  restartButton.innerHTML = `<span>${RESTART}</span>
  <button id="restart">${RESTART_BTN}</button>`;
  return restartButton;
}

function init() {
  userInputNumbers.value = ''; // input 값 삭제
  userInputNumbers.focus(); // 재입력하도록 focus
}

function removeResultElement() {
  divResult.innerHTML = '';
  init();
}

function startGame(computerInputNumbers, userInputNumbers) {
  let result = '';
  let countBall = 0;
  let countStrike = 0;
  const correct = computerInputNumbers
  const userAnswer = userInputNumbers.value

  for (let index = 0; index < userAnswer.length; index++) {
    if (correct[index] === userAnswer[index]) {
      // index까지 일치하면
      countStrike++;
    } else if (userAnswer.includes(correct[index])) {
      // 포함만 되어있으면
      countBall++;
    }
  }
  result = checkResult(countStrike, countBall);
  return result;
}

function checkResult(strike, ball) {
  let result = '';

  if (strike === 3) {
    // 3스트라이크면 정답
    result = CORRECT;
  } else if (strike === 0 && ball === 0) {
    // 0스트라이크 0볼 낫싱
    result = NOTHING;
  } else if (strike !== 0 && ball !== 0) {
    result = `${ball}${BALL} ${strike}${STRIKE}`;
  } else if (strike !== 0) {
    result = `${strike}${STRIKE}`;
  } else if (ball !== 0) {
    result = `${ball}${BALL}`;
  }
  return result;
}

// 랜덤 3자리 숫자 생성 함수
function generateRandomNumbers() {
  let base = [...Array(10).keys()]; // 0~9까지 10개
  let numbers = '';

  base.splice(0, 1); // 0 제거
  while (numbers.length < 3) {
    const position = parseInt(Math.random() * base.length, 10);
    numbers += base.splice(position, 1);
  }
  console.log(numbers);
  return numbers;
}

// 인풋 값 유효성 체크 함수
function checkValidInput(userInputNumbers) {
  const userInput = userInputNumbers.value
    .split('')
    .map((v) => parseInt(v));

  if (isNaN(userInputNumbers.value)) {
    return false;
  } else if (userInput.length !== 3) {
    return false;
  } else if (userInput.includes(0)) {
    return false;
  } else {
    return true;
  }
}
