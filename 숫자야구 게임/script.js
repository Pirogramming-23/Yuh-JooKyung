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

// 남은 시도 횟수 표시 업데이트
function updateAttemptsDisplay() {
    document.getElementById('attempts').textContent = attempts;
}

// 결과 영역 초기화
function clearResults() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('game-result-img').src = '';
}

// 페이지 로드 시 게임 시작
window.onload = function() {
    initGame();
};
