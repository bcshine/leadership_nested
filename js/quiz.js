/**
 * 리더십 유형 진단 퀴즈 관련 기능
 */

// 전역 변수 선언
let currentQuestion = 0;
const answers = [];
let userLeaderType = '';

// DOM 요소 참조
const container = document.getElementById("questions");
const resultDiv = document.getElementById("result");
const nextQuestionBtn = document.getElementById("nextQuestion");
const submitQuizBtn = document.getElementById("submitQuiz");
const progressDiv = document.getElementById("progress");

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 모든 기존 질문 제거
    container.innerHTML = '';
    renderQuestion(0);
});

// 질문 렌더링 함수
function renderQuestion(index) {
    // 모든 기존 질문 제거
    container.innerHTML = '';
    
    const q = questions[index];
    const div = document.createElement("div");
    div.className = "question active";
    div.innerHTML = `<strong>${q.text}</strong><div class="scale">` +
        [1,2,3,4,5].map(n =>
            `<label><input type="radio" name="q${index}" value="${n}" required /> ${n}</label>`
        ).join("") +
        `</div>`;
    
    container.appendChild(div);
    
    // 이미 답변한 질문인 경우 체크 표시
    if (answers[index]) {
        document.querySelector(`input[name="q${index}"][value="${answers[index]}"]`).checked = true;
        nextQuestionBtn.style.display = 'block';
    } else {
        nextQuestionBtn.style.display = 'none';
    }
    
    // 진행 상황 업데이트
    progressDiv.textContent = `${index + 1}/${questions.length}`;
    
    // 마지막 질문이면 다음 버튼 대신 결과 보기 버튼 표시
    if (index === questions.length - 1) {
        nextQuestionBtn.style.display = 'none';
        if (answers[index]) {
            submitQuizBtn.style.display = 'block';
        } else {
            submitQuizBtn.style.display = 'none';
        }
    } else {
        submitQuizBtn.style.display = 'none';
    }
    
    // 응답이 선택되면 다음 버튼 또는 결과 보기 버튼 활성화
    const radioButtons = div.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            answers[index] = parseInt(radio.value);
            
            if (index === questions.length - 1) {
                submitQuizBtn.style.display = 'block';
            } else {
                nextQuestionBtn.style.display = 'block';
            }
        });
    });
}

// 다음 질문 버튼 이벤트
nextQuestionBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion(currentQuestion);
    }
});

// 폼 제출 처리 (결과 보기 버튼용)
document.getElementById("quizForm").addEventListener("submit", function(e) {
    e.preventDefault();
    showResult();
});

// 결과 표시 함수
function showResult() {
    const scores = { 엄마형: 0, 코치형: 0, 장인형: 0, 지휘관형: 0 };

    questions.forEach((q, i) => {
        const score = answers[i];
        scores[q.type] += score;
    });

    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const bestType = sortedScores[0][0]; // 유형 이름 저장
    userLeaderType = bestType; // 전역 변수에 저장
    
    // 질문 컨테이너 숨기기
    document.getElementById("questions").style.display = "none";
    document.getElementById("progress").style.display = "none";
    document.getElementById("nextQuestion").style.display = "none";
    document.getElementById("submitQuiz").style.display = "none";
    document.getElementById("quizForm").style.marginBottom = "0";
    
    // 섹션 타이틀 변경
    document.querySelector("#assessment h1").textContent = "리더십 유형 자가진단 결과";
    
    // 최고 점수와 동일한 점수를 가진 유형들 찾기
    const highestScore = sortedScores[0][1];
    const highestTypes = sortedScores.filter(([_, score]) => score === highestScore)
                                   .map(([type, _]) => type);
    
    // 리더십 유형 표시 텍스트 생성
    let leadershipDisplay = '';
    if (highestTypes.length === 1) {
        leadershipDisplay = `<strong>${bestType}</strong> 입니다`;
    } else {
        // 동점 유형들을 나열
        const typeIcons = {
            "엄마형": "💖",
            "코치형": "🧭",
            "장인형": "🔧",
            "지휘관형": "🚩"
        };
        
        // 동점 리더십 타입 텍스트 생성
        const typesText = highestTypes.map(type => {
            let displayType = type;
            if (type.length >= 4) {
                const insertAt = Math.ceil(type.length / 2);
                displayType = type.substring(0, insertAt) + '<wbr>' + type.substring(insertAt);
            }
            return `<strong>${typeIcons[type]} ${displayType}</strong>`;
        }).join(' / ');
        
        leadershipDisplay = `${typesText} <span style="display: inline-block;">입니다</span>`;
    }
    
    // 점수 차트 생성
    let scoreHtml = '';
    sortedScores.forEach(([type, score]) => {
        const barWidthPercent = Math.round((score / 25) * 100);
        const isHighest = highestTypes.includes(type);
        const typeIcon = type === "엄마형" ? "💖" : 
                        type === "코치형" ? "🧭" : 
                        type === "장인형" ? "🔧" : 
                        "🚩";
        
        scoreHtml += `
        <div style="margin-bottom: 15px;">
            <div style="display: flex; align-items: center; margin-bottom: 5px; flex-wrap: wrap;">
                <div style="min-width: 80px; width: 25%; font-weight: ${isHighest ? 'bold' : 'normal'}; color: ${isHighest ? '#2980b9' : '#333'}; padding-right: 8px; white-space: nowrap;">
                    ${typeIcon} ${type}
                </div>
                <div style="flex-grow: 1; min-width: 100px;">
                    <div class="score-bar">
                        <div class="score-fill ${isHighest ? 'highest' : 'normal'}" style="width: ${barWidthPercent}%;"></div>
                    </div>
                </div>
                <div style="width: 60px; text-align: right; margin-left: 8px; font-weight: ${isHighest ? 'bold' : 'normal'};">
                    ${score}/25점
                </div>
            </div>
        </div>`;
    });
    
    // 결과 HTML 생성
    resultDiv.innerHTML = `
        <div class="result-container">
            <h2>🎯 당신의 리더십 유형은</h2>
            <p style="font-size: ${highestTypes.length > 1 ? '24px' : '28px'}; text-align: center; color: #2980b9; margin-bottom: 25px;">
                ${leadershipDisplay}
            </p>
            
            <h3>유형별 점수</h3>
            <div style="width: 100%; margin: 0 auto 20px auto;">
                ${scoreHtml}
            </div>
        </div>
        
        <div class="navigation-buttons">
            <button onclick="showSection('comparison', '${bestType}')">내 ${bestType} 리더 유형의 특성 보기</button>
            <button onclick="showSection('leadership_followership_relation')">리더십-팔로우십 관계</button>
            <button onclick="showSection('followership')">팔로우십 유형</button>
            <button onclick="showSection('leadership_followership_matrix')">리더십-팔로우십 매트릭스</button>
        </div>
    `;
    
    // 맨 위로 스크롤
    window.scrollTo(0, 0);
} 