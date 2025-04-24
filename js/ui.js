/**
 * UI 컴포넌트 렌더링 함수
 */

// DOM이 로드된 후 각 섹션의 콘텐츠를 생성
document.addEventListener('DOMContentLoaded', function() {
    initSections();
});

// 각 섹션 초기화
function initSections() {
    initComparisonSection();
    initImprovementSection();
    initFollowershipSection();
    initRelationSection();
    initMatrixSection();
}

// 유형 비교 섹션 초기화
function initComparisonSection() {
    const section = document.getElementById('comparison');
    
    if (!section) return; // 섹션이 존재하지 않으면 종료
    
    let html = '<h1>리더십 유형별 행동과 삶의 차이</h1>';
    
    // 리더십 유형 데이터가 있는지 확인
    if (typeof leadershipTypes === 'undefined' || Object.keys(leadershipTypes).length === 0) {
        html += `
            <div class="type-comparison">
                <p>리더십 유형 데이터를 불러오는 중 오류가 발생했습니다.</p>
            </div>
        `;
    } else {
        // 각 리더십 유형 콘텐츠 추가
        for (const [type, data] of Object.entries(leadershipTypes)) {
            html += `
                <div class="type-comparison">
                    <h2>${data.icon} ${data.title}</h2>
                    <p>${data.description}</p>
                    <p>${data.strengths}</p>
                </div>
            `;
        }
    }
    
    // 네비게이션 버튼 추가
    html += createComparisonNavButtons();
    
    section.innerHTML = html;
}

// 개선 방향 섹션 초기화
function initImprovementSection() {
    const section = document.getElementById('improvement');
    
    if (!section) return; // 섹션이 존재하지 않으면 종료
    
    let html = '<h1>4가지 리더십 유형별 향후 개선 방향</h1>';
    
    // 리더십 유형 데이터가 있는지 확인
    if (typeof leadershipTypes === 'undefined' || Object.keys(leadershipTypes).length === 0) {
        html += `
            <div class="improvement">
                <p>리더십 유형 데이터를 불러오는 중 오류가 발생했습니다.</p>
            </div>
        `;
    } else {
        // 각 리더십 유형별 개선 방향 추가
        for (const [type, data] of Object.entries(leadershipTypes)) {
            html += `
                <div class="improvement">
                    <h2>${data.icon} ${type} 리더의 개선 방향</h2>
                    ${data.improvement}
                </div>
            `;
        }
    }
    
    // 네비게이션 버튼 추가
    html += createImprovementNavButtons();
    
    section.innerHTML = html;
}

// 비교 섹션 네비게이션 버튼 생성
function createComparisonNavButtons() {
    return `
        <div class="navigation-buttons">
            <button id="improvementButton" onclick="showSection('improvement')">유형별 개선 방향 보기</button>
            <button onclick="showSection('assessment')">진단 결과로 돌아가기</button>
        </div>
    `;
}

// 개선 방향 섹션 네비게이션 버튼 생성
function createImprovementNavButtons() {
    return `
        <div class="navigation-buttons">
            <button onclick="showSection('comparison')">모든 유형의 특성 보기</button>
            <button onclick="showSection('assessment')">진단 결과로 돌아가기</button>
        </div>
    `;
}

// 팔로우십 유형 섹션 초기화
function initFollowershipSection() {
    console.log("팔로우십 섹션 초기화 시작");
    
    const section = document.getElementById('followership');
    if (!section) {
        console.error("followership 섹션 요소를 찾을 수 없습니다.");
        return;
    }
    
    let html = '<h1>팔로우십 유형</h1>';
    
    try {
        // 데이터 접근 가능한지 확인
        if (typeof followershipTypes === 'undefined') {
            throw new Error("followershipTypes 변수가 정의되지 않았습니다.");
        }
        
        if (!Array.isArray(followershipTypes) || followershipTypes.length === 0) {
            throw new Error("followershipTypes가 배열이 아니거나 비어 있습니다.");
        }
        
        // 각 팔로우십 유형 추가
        followershipTypes.forEach((type, index) => {
            if (!type || !type.title || !type.description) {
                console.warn(`팔로우십 유형 ${index}의 데이터가 불완전합니다.`);
                return;
            }
            
            const icon = type.icon || "📌";
            html += `
                <div class="type-comparison">
                    <h2>${icon} ${type.title}</h2>
                    <p>${type.description}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error("팔로우십 데이터 처리 중 오류 발생:", error);
        html += `
            <div class="type-comparison">
                <p>팔로우십 유형 데이터를 불러오는 중 오류가 발생했습니다.</p>
                <p>오류 메시지: ${error.message}</p>
            </div>
        `;
    }
    
    // 네비게이션 버튼 추가
    html += `
        <div class="navigation-buttons">
            <button onclick="showSection('leadership_followership_relation')">리더십-팔로우십 관계</button>
            <button onclick="showSection('leadership_followership_matrix')">리더십-팔로우십 매트릭스</button>
            <button onclick="showSection('assessment')">진단 결과로 돌아가기</button>
        </div>
    `;
    
    // HTML 적용
    section.innerHTML = html;
    console.log("팔로우십 섹션 초기화 완료");
}

// 리더십-팔로우십 관계 섹션 초기화
function initRelationSection() {
    console.log("리더십-팔로우십 관계 섹션 초기화 시작");
    
    const section = document.getElementById('leadership_followership_relation');
    if (!section) {
        console.error("leadership_followership_relation 섹션 요소를 찾을 수 없습니다.");
        return;
    }
    
    let html = '<h1>리더십과 팔로우십의 관계</h1>';
    
    try {
        // 데이터 접근 가능한지 확인
        if (typeof leadershipFollowershipRelation === 'undefined') {
            throw new Error("leadershipFollowershipRelation 변수가 정의되지 않았습니다.");
        }
        
        if (!leadershipFollowershipRelation) {
            throw new Error("leadershipFollowershipRelation 값이 비어 있습니다.");
        }
        
        // 관계 설명 추가
        html += `
            <div class="type-comparison">
                ${leadershipFollowershipRelation}
            </div>
        `;
    } catch (error) {
        console.error("리더십-팔로우십 관계 데이터 처리 중 오류 발생:", error);
        html += `
            <div class="type-comparison">
                <p>리더십-팔로우십 관계 데이터를 불러오는 중 오류가 발생했습니다.</p>
                <p>오류 메시지: ${error.message}</p>
            </div>
        `;
    }
    
    // 네비게이션 버튼 추가
    html += `
        <div class="navigation-buttons">
            <button onclick="showSection('leadership_followership_matrix')">리더십-팔로우십 매트릭스</button>
            <button onclick="showSection('followership')">팔로우십 유형</button>
            <button onclick="showSection('assessment')">진단 결과로 돌아가기</button>
        </div>
    `;
    
    // HTML 적용
    section.innerHTML = html;
    console.log("리더십-팔로우십 관계 섹션 초기화 완료");
}

// 리더십-팔로우십 매트릭스 섹션 초기화
function initMatrixSection() {
    console.log("리더십-팔로우십 매트릭스 섹션 초기화 시작");
    
    const section = document.getElementById('leadership_followership_matrix');
    if (!section) {
        console.error("leadership_followership_matrix 섹션 요소를 찾을 수 없습니다.");
        return;
    }
    
    let html = '<h1>리더십-팔로우십 매트릭스</h1>';
    
    try {
        // 데이터 접근 가능한지 확인
        if (typeof leadershipFollowershipMatrix === 'undefined') {
            throw new Error("leadershipFollowershipMatrix 변수가 정의되지 않았습니다.");
        }
        
        if (!Array.isArray(leadershipFollowershipMatrix) || leadershipFollowershipMatrix.length === 0) {
            throw new Error("leadershipFollowershipMatrix가 배열이 아니거나 비어 있습니다.");
        }
        
        // 매트릭스 설명 추가
        html += '<div class="type-comparison"><p>리더십 유형과 팔로우십 유형이 결합되면 다음과 같은 16가지 조합이 가능합니다:</p></div>';
        
        // 리더십 유형 순서 정의 (엄마형, 장인형, 코치형, 지휘관형)
        const leadershipOrder = ["엄마형", "장인형", "코치형", "지휘관형"];
        
        // 팔로우십 유형 순서 정의
        const followershipOrder = ["자기주도형", "상호의존형", "수동실행형", "관망저항형"];
        
        // 각 리더십 유형별로 처리
        for (const leaderType of leadershipOrder) {
            html += `<div class="type-comparison">
                <h2>${leaderType} 리더십 유형</h2>`;
            
            // 이 리더십 유형에 대한 각 팔로우십 유형 조합 찾기
            for (const followerType of followershipOrder) {
                // 해당 조합 찾기
                const item = leadershipFollowershipMatrix.find(item => 
                    item.title.includes(leaderType) && item.title.includes(followerType)
                );
                
                if (!item || !item.title || !item.description) {
                    console.warn(`${leaderType} + ${followerType} 조합의 데이터가 없습니다.`);
                    html += `
                        <div class="matrix-item">
                            <h3>- ${followerType} 팔로워</h3>
                            <p>이 조합에 대한 정보가 없습니다.</p>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="matrix-item">
                            <h3>- ${followerType} 팔로워</h3>
                            <p>${item.description}</p>
                        </div>
                    `;
                }
            }
            
            html += '</div>';
        }
    } catch (error) {
        console.error("리더십-팔로우십 매트릭스 데이터 처리 중 오류 발생:", error);
        html += `
            <div class="type-comparison">
                <p>리더십-팔로우십 매트릭스 데이터를 불러오는 중 오류가 발생했습니다.</p>
                <p>오류 메시지: ${error.message}</p>
            </div>
        `;
    }
    
    // 네비게이션 버튼 추가
    html += `
        <div class="navigation-buttons">
            <button onclick="showSection('leadership_followership_relation')">리더십-팔로우십 관계</button>
            <button onclick="showSection('followership')">팔로우십 유형</button>
            <button onclick="showSection('assessment')">진단 결과로 돌아가기</button>
        </div>
    `;
    
    // HTML 적용
    section.innerHTML = html;
    
    // 스타일 적용을 위한 CSS 추가
    const style = document.createElement('style');
    style.textContent = `
        .matrix-item {
            margin-bottom: 15px;
            padding: 10px 10px 10px 20px;
            border-left: 3px solid #2980b9;
            background-color: #f9f9f9;
        }
        
        .matrix-item h3 {
            color: #2980b9;
            margin-top: 0;
            font-size: 18px;
        }
        
        .type-comparison h2 {
            color: #333;
            background-color: #eaeaea;
            padding: 10px;
            border-radius: 5px;
            margin-top: 25px;
            border-left: 5px solid #2980b9;
        }
    `;
    document.head.appendChild(style);
    
    console.log("리더십-팔로우십 매트릭스 섹션 초기화 완료");
} 