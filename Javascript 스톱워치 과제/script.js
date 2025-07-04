const display = document.getElementById("display");
let timer = null; // no-value
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
display.textContent = "00:00:00:00";

const laps = [];
const lapList = document.getElementById("laps");

const selectedLaps = new Set();

function start() {
    if(!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        // console.log(timer);
    }

    // console.log(startTime);
}

function stop() {

    if(isRunning) {
        isRunning = false;
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;

        laps.push(elapsedTime);
        renderLaps();
    }

}

function reset() {
    clearInterval(timer);
    timer = null; // no-value
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
    laps.length = 0;
    selectedLaps.clear();
    renderLaps();
    updateSelectAllCheckbox();
}

function update() {

    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    display.textContent = formatElapsedTime(elapsedTime);

}

function renderLaps() {
    lapList.innerHTML = "";
    laps.forEach((lap, idx) => {
        const li = document.createElement("li");

        // 체크박스 생성
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = selectedLaps.has(idx);
        checkbox.addEventListener("change", function(e) {
            e.stopPropagation(); // li 클릭과 중복 방지
            if (checkbox.checked) {
                selectedLaps.add(idx);
            } else {
                selectedLaps.delete(idx);
            }
            renderLaps();
        });

        // li 클릭 시 체크박스 토글
        li.addEventListener("click", function() {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event("change"));
        });

        // 선택된 경우 클래스 추가
        if (selectedLaps.has(idx)) {
            li.classList.add("selected");
        }

        const text = document.createTextNode(` Lap ${idx + 1}: ${formatElapsedTime(lap)}`);
        li.appendChild(checkbox);
        li.appendChild(text);

        lapList.appendChild(li);
    });
    updateSelectAllCheckbox();
}

const deleteBtn = document.getElementById("deleteSelected");
deleteBtn.addEventListener("click", function() {
    // idx 내림차순으로 삭제해야 인덱스 꼬임 방지
    const toDelete = Array.from(selectedLaps).sort((a, b) => b - a);
    toDelete.forEach(idx => {
        laps.splice(idx, 1);
    });
    selectedLaps.clear();
    renderLaps();
    updateSelectAllCheckbox();
});

// 전체 선택 체크박스
const selectAllCheckbox = document.getElementById("selectAll");
selectAllCheckbox.addEventListener("change", function() {
    if (this.checked) {
        // 모든 lap 선택
        laps.forEach((_, idx) => {
            selectedLaps.add(idx);
        });
    } else {
        // 모든 선택 해제
        selectedLaps.clear();
    }
    renderLaps();
});

// 전체 삭제 버튼
const deleteAllBtn = document.getElementById("deleteAll");
deleteAllBtn.addEventListener("click", function() {
    if (laps.length > 0) {
        if (confirm("모든 기록을 삭제하시겠습니까?")) {
            laps.length = 0;
            selectedLaps.clear();
            renderLaps();
            updateSelectAllCheckbox();
        }
    }
});

// 전체 선택 체크박스 상태 업데이트
function updateSelectAllCheckbox() {
    if (laps.length === 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
    } else if (selectedLaps.size === laps.length) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
    } else if (selectedLaps.size > 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = true;
    } else {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
    }
}

function formatElapsedTime(elapsedTime) {
    let hours = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(2, "0");
    let minutes = String(Math.floor((elapsedTime / (1000 * 60)) % 60)).padStart(2, "0");
    let seconds = String(Math.floor((elapsedTime / 1000) % 60)).padStart(2, "0");
    let milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}