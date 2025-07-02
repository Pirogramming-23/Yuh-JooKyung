// 게임 변수들
let answer = []; // 정답 숫자 3개
let attempts = 9; // 남은 시도 횟수
let gameOver = false; // 게임 종료 여부

// 게임 시작 시 실행되는 함수
function initGame() {
    // 중복 없는 랜덤 숫자 3개 생성
    answer = generateRandomNumbers();
    
    // 게임 상태 초기화
    attempts = 9;
    gameOver = false;
    
    // UI 업데이트
    updateAttemptsDisplay();
    clearResults();
    
    // 이벤트 리스너 설정
    setupEventListeners();
    
    // 콘솔에 정답 출력 (테스트용)
    console.log("정답:", answer);
}

// 중복 없는 랜덤 숫자 3개 생성 함수
function generateRandomNumbers() {
    let numbers = [];
    
    while (numbers.length < 3) {
        let randomNum = Math.floor(Math.random() * 10); // 0~9
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }
    
    return numbers;
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 각 입력 필드에 이벤트 리스너 추가
    for (let i = 1; i <= 3; i++) {
        let inputField = document.getElementById(`number${i}`);
        
        // 기존 이벤트 리스너 제거 (중복 방지)
        inputField.replaceWith(inputField.cloneNode(true));
        let newInputField = document.getElementById(`number${i}`);
        
        // 숫자만 입력 가능하게
        newInputField.addEventListener('input', function(e) {
            let value = e.target.value;
            // 숫자가 아닌 문자 제거
            value = value.replace(/[^0-9]/g, '');
            e.target.value = value;
            
            // 한 자리 숫자만 허용
            if (value.length > 1) {
                e.target.value = value.slice(0, 1);
            }
        });
        
        // 입력 완료 후 다음 입력란으로 이동 (keyup 이벤트 사용)
        newInputField.addEventListener('keyup', function(e) {
            if (e.target.value.length === 1 && i < 3) {
                // 약간의 지연을 두어 입력값이 확실히 처리된 후 이동
                setTimeout(() => {
                    document.getElementById(`number${i+1}`).focus();
                }, 10);
            }
        });
        
        // 키보드 이벤트 처리
        newInputField.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // 기본 동작 방지
                check_numbers();
            } else if (e.key === 'Backspace' && e.target.value === '') {
                // 백스페이스로 이전 입력란으로 이동
                if (i > 1) {
                    document.getElementById(`number${i-1}`).focus();
                }
            }
        });
    }
    
    // Enter 키로 제출 버튼 활성화 (전역 이벤트)
    document.removeEventListener('keydown', handleGlobalKeydown);
    document.addEventListener('keydown', handleGlobalKeydown);
}

// 전역 키보드 이벤트 핸들러
function handleGlobalKeydown(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        check_numbers();
    }
}

// 남은 시도 횟수 표시 업데이트
function updateAttemptsDisplay() {
    document.getElementById('attempts').textContent = attempts;
}

// 결과 영역 초기화
function clearResults() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('game-result-img').src = '';
}

// 입력값 검증 함수
function validateInput(inputNumbers) {
    // 3개의 숫자가 모두 입력되었는지 확인
    if (inputNumbers.length !== 3) {
        alert("3개의 숫자를 모두 입력해주세요!");
        return false;
    }
    
    // 각 숫자가 0~9인지 확인
    for (let num of inputNumbers) {
        if (isNaN(num) || num < 0 || num > 9) {
            console.log("검증 실패 - 숫자:", num, "타입:", typeof num);
            alert("0~9 사이의 숫자만 입력해주세요!");
            return false;
        }
    }
    
    // 중복된 숫자가 있는지 확인
    let uniqueNumbers = [...new Set(inputNumbers)];
    if (uniqueNumbers.length !== 3) {
        alert("중복되지 않는 숫자를 입력해주세요!");
        return false;
    }
    
    return true;
}

// 정답 비교 함수
function compareNumbers(inputNumbers) {
    let strikes = 0;
    let balls = 0;
    
    for (let i = 0; i < 3; i++) {
        if (inputNumbers[i] === answer[i]) {
            strikes++;
        } else if (answer.includes(inputNumbers[i])) {
            balls++;
        }
    }
    
    return { strikes, balls };
}

// 숫자 확인 버튼 클릭 시 실행되는 함수
function check_numbers() {
    // 중복 실행 방지
    if (check_numbers.isRunning) {
        return;
    }
    check_numbers.isRunning = true;
    
    // 게임이 종료되었으면 리턴
    if (gameOver) {
        alert("게임이 종료되었습니다. 페이지를 새로고침하여 다시 시작하세요.");
        check_numbers.isRunning = false;
        return;
    }
    
    // 입력값 가져오기
    let value1 = document.getElementById('number1').value;
    let value2 = document.getElementById('number2').value;
    let value3 = document.getElementById('number3').value;
    
    // 디버깅용 로그
    console.log("원본 입력값:", value1, value2, value3);
    console.log("입력값 길이:", value1.length, value2.length, value3.length);
    console.log("입력값이 빈 문자열인지:", value1 === "", value2 === "", value3 === "");
    
    // 빈 값 체크
    if (!value1 || !value2 || !value3) {
        alert("3개의 숫자를 모두 입력해주세요!");
        check_numbers.isRunning = false;
        return;
    }
    
    let num1 = parseInt(value1);
    let num2 = parseInt(value2);
    let num3 = parseInt(value3);
    
    let inputNumbers = [num1, num2, num3];
    
    // 디버깅용 콘솔 로그
    console.log("입력값:", inputNumbers);
    console.log("입력값 타입:", inputNumbers.map(num => typeof num));
    
    // 입력값 검증
    if (!validateInput(inputNumbers)) {
        check_numbers.isRunning = false;
        return;
    }
    
    // 정답 비교
    let result = compareNumbers(inputNumbers);
    
    // 결과 표시
    displayResult(inputNumbers, result);
    
    // 시도 횟수 감소
    attempts--;
    updateAttemptsDisplay();
    
    // 승리/패배 체크
    if (result.strikes === 3) {
        gameWin();
    } else if (attempts === 0) {
        gameLose();
    }
    
    // 입력란 초기화
    clearInputFields();
    
    // 중복 실행 방지 플래그 리셋
    setTimeout(() => {
        check_numbers.isRunning = false;
    }, 100);
}

// 결과 표시 함수
function displayResult(inputNumbers, result) {
    let resultText = '';
    
    if (result.strikes === 0 && result.balls === 0) {
        resultText = '<span class="num-result out">O</span>';
    } else {
        resultText = `<span class="num-result strike">${result.strikes}S</span> <span class="num-result ball">${result.balls}B</span>`;
    }
    
    let resultDiv = document.createElement('div');
    resultDiv.innerHTML = `${inputNumbers.join('')} → ${resultText}`;
    resultDiv.style.margin = '5px 0';
    
    document.getElementById('results').appendChild(resultDiv);
}

// 입력란 초기화
function clearInputFields() {
    document.getElementById('number1').value = '';
    document.getElementById('number2').value = '';
    document.getElementById('number3').value = '';
    document.getElementById('number1').focus();
}

// 승리 처리
function gameWin() {
    gameOver = true;
    document.getElementById('game-result-img').src = './success.png';
    alert('축하합니다! 정답을 맞추셨습니다! 🎉');
}

// 패배 처리
function gameLose() {
    gameOver = true;
    document.getElementById('game-result-img').src = './fail.png';
    alert(`게임 오버! 정답은 ${answer.join('')}였습니다. 😢`);
}

// 페이지 로드 시 게임 시작
window.onload = function() {
    initGame();
};
