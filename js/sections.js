/**
 * 섹션 전환 관련 기능
 */

// 섹션 전환 함수
function showSection(sectionId, leaderType = null) {
    // 모든 섹션을 숨김
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 선택한 섹션만 표시
    document.getElementById(sectionId).classList.add('active');
    
    // 특정 섹션 초기화 (콘텐츠가 비어있는 경우)
    switch (sectionId) {
        case 'comparison':
            if (leaderType) {
                // 특정 유형만 표시
                document.querySelectorAll('.type-comparison').forEach(comp => {
                    comp.style.display = 'none';
                });
                
                // 제목 변경
                document.querySelector("#comparison h1").textContent = `${leaderType} 리더의 특성`;
                
                // 해당 유형만 표시
                const targetTypeElement = Array.from(document.querySelectorAll("#comparison .type-comparison"))
                    .find(el => el.querySelector("h2").textContent.includes(leaderType));
                
                if (targetTypeElement) {
                    targetTypeElement.style.display = 'block';
                }
                
                // 네비게이션 버튼 내용 변경
                const buttons = document.querySelectorAll("#comparison .navigation-buttons button");
                if (buttons.length > 0) {
                    buttons[0].textContent = `${leaderType} 리더의 개선 방향 보기`;
                    buttons[0].onclick = function() {
                        showSection('improvement', leaderType);
                    };
                }
            } else {
                // 모든 유형 표시
                document.querySelector("#comparison h1").textContent = "리더십 유형별 행동과 삶의 차이";
                document.querySelectorAll('.type-comparison').forEach(comp => {
                    comp.style.display = 'block';
                });
                
                // 네비게이션 버튼 초기화
                const navButtons = document.querySelector("#comparison .navigation-buttons");
                if (navButtons) {
                    navButtons.innerHTML = createComparisonNavButtons();
                }
            }
            
            // 콘텐츠가 비어있으면 초기화
            if (document.querySelectorAll("#comparison .type-comparison").length === 0) {
                initComparisonSection();
            }
            break;
            
        case 'improvement':
            if (leaderType) {
                // 모든 개선 방향 항목 숨기기
                document.querySelectorAll('.improvement').forEach(imp => {
                    imp.style.display = 'none';
                });
                
                // 제목 변경
                document.querySelector("#improvement h1").textContent = `${leaderType} 리더의 개선 방향`;
                
                // 해당 유형만 표시
                const targetImpElement = Array.from(document.querySelectorAll("#improvement .improvement"))
                    .find(el => el.querySelector("h2").textContent.includes(leaderType));
                
                if (targetImpElement) {
                    targetImpElement.style.display = 'block';
                }
                
                // 네비게이션 버튼 수정
                const navButtons = document.querySelector("#improvement .navigation-buttons");
                if (navButtons) {
                    navButtons.innerHTML = `
                        <button onclick="showSection('comparison', '${leaderType}')">
                            ${leaderType} 리더의 특성으로 돌아가기
                        </button>
                        <button onclick="showOtherImprovements('${leaderType}')">
                            다른 리더 유형의 개선 방향 보기
                        </button>
                        <button onclick="showSection('assessment')">
                            진단 결과로 돌아가기
                        </button>
                    `;
                }
            }
            
            // 콘텐츠가 비어있으면 초기화
            if (document.querySelectorAll("#improvement .improvement").length === 0) {
                initImprovementSection();
            }
            break;
            
        case 'followership':
            // 콘텐츠가 비어있으면 초기화
            if (document.querySelectorAll("#followership .type-comparison").length === 0) {
                initFollowershipSection();
            }
            break;
            
        case 'leadership_followership_relation':
            // 콘텐츠가 비어있으면 초기화
            if (document.querySelectorAll("#leadership_followership_relation .type-comparison").length === 0) {
                initRelationSection();
            }
            break;
            
        case 'leadership_followership_matrix':
            // 콘텐츠가 비어있으면 초기화
            if (document.querySelectorAll("#leadership_followership_matrix .type-comparison").length === 0) {
                initMatrixSection();
            }
            break;
    }
    
    // 페이지 맨 위로 스크롤
    window.scrollTo(0, 0);
}

// 다른 리더 유형들의 개선 방향 표시
function showOtherImprovements(currentType) {
    const section = document.getElementById('improvement');
    
    // 제목 변경
    section.querySelector("h1").textContent = `다른 리더 유형들의 개선 방향`;
    
    // 현재 표시된 유형을 제외한 나머지 유형들 표시
    const improvements = section.querySelectorAll('.improvement');
    improvements.forEach(imp => {
        const title = imp.querySelector("h2").textContent;
        if (!title.includes(currentType)) {
            imp.style.display = 'block';
        }
    });
    
    // 네비게이션 버튼 수정
    const navButtons = section.querySelector('.navigation-buttons');
    if (navButtons) {
        navButtons.innerHTML = `
            <button onclick="showSection('improvement', '${currentType}')">
                ${currentType} 리더의 개선 방향으로 돌아가기
            </button>
            <button onclick="showAllTypes('comparison')">
                모든 유형의 특성 보기
            </button>
            <button onclick="showSection('assessment')">
                진단 결과로 돌아가기
            </button>
        `;
    }
}

// 모든 유형 보기 함수
function showAllTypes(sectionId) {
    // 모든 섹션을 숨김
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 선택한 섹션만 표시
    const section = document.getElementById(sectionId || 'comparison');
    section.classList.add('active');
    
    // 모든 유형 표시
    const items = section.querySelectorAll(sectionId === 'improvement' ? '.improvement' : '.type-comparison');
    items.forEach(item => {
        item.style.display = 'block';
    });
    
    // 제목 복원
    if (sectionId === 'improvement') {
        section.querySelector("h1").textContent = "4가지 리더십 유형별 향후 개선 방향";
    } else {
        section.querySelector("h1").textContent = "리더십 유형별 행동과 삶의 차이";
    }
    
    // 네비게이션 버튼 원래대로
    const navButtons = section.querySelector('.navigation-buttons');
    if (navButtons) {
        if (sectionId === 'improvement') {
            navButtons.innerHTML = createImprovementNavButtons();
        } else {
            navButtons.innerHTML = createComparisonNavButtons();
        }
    }
    
    // 해당 섹션이 비어있으면 초기화
    if (items.length === 0) {
        if (sectionId === 'improvement') {
            initImprovementSection();
        } else if (sectionId === 'comparison') {
            initComparisonSection();
        }
    }
} 