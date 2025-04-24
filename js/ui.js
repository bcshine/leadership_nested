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
    
    let html = '<h1>리더십-팔로우십 매트릭스(궁합)</h1>';
    
    try {
        // 데이터 접근 가능한지 확인
        if (typeof leadershipFollowershipMatrix === 'undefined') {
            throw new Error("leadershipFollowershipMatrix 변수가 정의되지 않았습니다.");
        }
        
        if (!Array.isArray(leadershipFollowershipMatrix) || leadershipFollowershipMatrix.length === 0) {
            throw new Error("leadershipFollowershipMatrix가 배열이 아니거나 비어 있습니다.");
        }
        
        // 매트릭스 설명 추가
        html += `
            <div class="type-comparison">
                <p>리더십 유형과 팔로우십 유형이 결합되면 다음과 같은 16가지 조합(궁합)이 가능합니다. 각 조합은 서로 다른 특성과 시너지를 가지며, 이는 팀의 성과와 분위기에 큰 영향을 미칩니다.</p>
                <p>당신의 리더십 유형과 함께 일하는 팀원들의 팔로우십 유형에 따라 어떤 시너지가 발생하는지, 어떤 갈등 요소가 있는지 살펴보세요. 이를 통해 팀 역학을 더 깊이 이해하고 효과적인 협업 방식을 발견할 수 있습니다.</p>
                <p>각 조합의 특성을 파악하고 장점은 강화하고 잠재적 갈등 요소는 미리 대비하는 것이 성공적인 리더십의 핵심입니다.</p>
            </div>`;
        
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
                            <p class="matrix-advice">
                                <strong>조언:</strong> ${getMatrixAdvice(leaderType, followerType)}
                            </p>
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
            margin-bottom: 20px;
            padding: 15px 15px 15px 25px;
            border-left: 3px solid #2980b9;
            background-color: #f9f9f9;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border-radius: 0 4px 4px 0;
        }
        
        .matrix-item h3 {
            color: #2980b9;
            margin-top: 0;
            font-size: 18px;
        }
        
        .type-comparison h2 {
            color: #333;
            background-color: #eaeaea;
            padding: 12px 15px;
            border-radius: 5px;
            margin-top: 30px;
            border-left: 5px solid #2980b9;
            font-size: 20px;
        }
        
        .matrix-advice {
            margin-top: 10px;
            border-top: 1px dashed #ccc;
            padding-top: 10px;
            font-style: italic;
            color: #555;
        }
        
        .matrix-advice strong {
            color: #e67e22;
        }
    `;
    document.head.appendChild(style);
    
    console.log("리더십-팔로우십 매트릭스 섹션 초기화 완료");
}

// 리더십-팔로우십 조합별 조언 생성 함수
function getMatrixAdvice(leaderType, followerType) {
    // 각 조합별 맞춤형 조언
    const adviceMap = {
        "엄마형-자기주도형": "서로의 자율성과 지원 방식에 대해 열린 대화를 나누세요. 지나친 간섭은 자기주도형 팔로워의 독립성을 저해할 수 있으니, 명확한 기대치와 적절한 지원의 경계를 설정하는 것이 좋습니다.",
        
        "엄마형-상호의존형": "이 조합의 시너지를 극대화하려면 정기적인 팀 활동과 소통 채널을 구축하세요. 상호 신뢰를 바탕으로 한 관계 중심 프로젝트가 특히 효과적입니다.",
        
        "엄마형-수동실행형": "수동실행형 팔로워가 점진적으로 더 많은 주도권을 갖도록 격려하세요. 안전한 환경에서 작은 결정부터 시작해 자신감을 키울 수 있도록 지원하는 것이 중요합니다.",
        
        "엄마형-관망저항형": "정기적인 1:1 미팅을 통해 관망저항형 팔로워의 우려사항을 경청하세요. 그들의 비판적 의견을 팀 개선의 기회로 활용하면 더 건설적인 관계를 구축할 수 있습니다.",
        
        "장인형-자기주도형": "높은 기준과 자율성 사이의 균형을 찾으세요. 명확한 품질 기준을 제시하되, 그 기준을 달성하는 방법에 있어서는 자기주도형 팔로워의 창의적 접근을 존중하는 것이 효과적입니다.",
        
        "장인형-상호의존형": "팀 프로젝트에서 협업과 품질 모두를 강조하는 환경을 조성하세요. 상호의존형 팔로워가 팀 내 품질 문화를 전파하는 역할을 할 수 있도록 격려하는 것이 좋습니다.",
        
        "장인형-수동실행형": "상세한 지침과 명확한 기대치를 제공하되, 점진적으로 더 많은 책임을 위임하세요. 정기적인 피드백을 통해 수동실행형 팔로워가 자신감을 키울 수 있도록 지원하는 것이 중요합니다.",
        
        "장인형-관망저항형": "비판적 의견을 품질 개선의 기회로 활용하세요. 서로 다른 관점이 충돌할 수 있지만, 건설적인 토론을 통해 더 나은 결과물을 만들어낼 수 있습니다.",
        
        "코치형-자기주도형": "이 조합은 성장과 혁신에 특히 강점을 보입니다. 도전적인 목표를 설정하고 정기적인 피드백 교환을 통해 서로의 성장을 촉진하세요. 자율성과 지원의 균형을 유지하는 것이 중요합니다.",
        
        "코치형-상호의존형": "팀 내 지식 공유와 협력적 학습을 장려하세요. 프로젝트 회고와 그룹 코칭 세션을 통해 팀 전체의 역량을 키우는 데 집중하는 것이 효과적입니다.",
        
        "코치형-수동실행형": "개방형 질문과 점진적인 자율성 부여가 핵심입니다. 수동실행형 팔로워가 스스로 생각하고 결정할 수 있는 영역을 점차 확대하면서 자신감을 키울 수 있도록 지원하세요.",
        
        "코치형-관망저항형": "비판적 사고를 건설적인 방향으로 유도하세요. 관망저항형 팔로워의 통찰력을 인정하고 팀 개선에 활용하되, 적극적인 참여를 유도하는 전략을 개발하는 것이 중요합니다.",
        
        "지휘관형-자기주도형": "명확한 목표와 기대치를 설정하되, 실행 방법에 있어서는 자율성을 부여하세요. 정기적인 체크인을 통해 진행 상황을 점검하면서도 마이크로매니징을 피하는 것이 효과적입니다.",
        
        "지휘관형-상호의존형": "팀 전체의 목표를 명확히 하고, 상호의존형 팔로워가 팀 내 협력을 촉진하도록 격려하세요. 결정 과정에 팀을 참여시켜 더 포용적인 리더십을 발휘하는 것이 좋습니다.",
        
        "지휘관형-수동실행형": "명확한 지시와 기대치를 제공하되, 점진적으로 결정권을 위임하세요. 실행 과정에서 정기적인 피드백을 제공하고 성공적인 결과를 인정하는 것이 중요합니다.",
        
        "지휘관형-관망저항형": "열린 대화를 통해 상호 이해를 증진하세요. 관망저항형 팔로워의 비판적 의견을 듣고 고려하되, 결정된 방향에 대한 동의를 얻기 위해 명확한 근거와 비전을 제시하는 것이 효과적입니다."
    };
    
    // 조합 키 생성
    const key = `${leaderType}-${followerType}`;
    
    // 해당 조합의 조언 반환, 없으면 기본 조언 반환
    return adviceMap[key] || "이 조합에서는 서로의 강점을 이해하고 약점을 보완하기 위한 열린 소통이 중요합니다. 정기적인 미팅을 통해 기대치와 작업 방식에 대해 논의하세요.";
} 