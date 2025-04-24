/**
 * 섹션 전환 관련 기능
 */

// 섹션 전환 함수
function showSection(sectionId, leaderType = null) {
    console.log(`섹션 전환 요청: ${sectionId}, 리더 유형: ${leaderType || '전체'}`);
    
    // 모든 섹션 숨기기
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // 요청된 섹션 표시
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        console.log(`${sectionId} 섹션을 표시합니다.`);
        targetSection.style.display = 'block';
        
        // 특정 섹션 초기화와 커스터마이징
        if (sectionId === 'comparison' && leaderType) {
            // 특정 리더 유형만 표시
            customizeComparisonSection(targetSection, leaderType);
        } else if (sectionId === 'improvement' && leaderType) {
            // 특정 리더 유형의 개선 방향만 표시
            customizeImprovementSection(targetSection, leaderType);
        } else if (['followership', 'leadership_followership_relation', 'leadership_followership_matrix'].includes(sectionId)) {
            // 팔로우십 관련 섹션인 경우 데이터 로딩 확인
            checkDataAndReloadIfNeeded(sectionId);
        }
        
        // 모바일에서 페이지 상단으로 스크롤
        window.scrollTo(0, 0);
    } else {
        console.error(`${sectionId} 섹션을 찾을 수 없습니다.`);
        alert(`오류: ${sectionId} 섹션을 찾을 수 없습니다.`);
    }
}

// 특정 리더 유형에 대한 비교 섹션 커스터마이징
function customizeComparisonSection(section, leaderType) {
    console.log(`비교 섹션을 ${leaderType} 리더 유형에 맞게 커스터마이징합니다.`);
    
    try {
        // 모든 유형 숨기기
        const allTypes = section.querySelectorAll('.type-comparison');
        allTypes.forEach(item => {
            item.style.display = 'none';
        });
        
        // 제목 변경
        const title = section.querySelector("h1");
        if (title) {
            title.textContent = `${leaderType} 리더의 특성`;
        }
        
        // 해당 유형만 표시
        let found = false;
        allTypes.forEach(item => {
            const itemTitle = item.querySelector("h2");
            if (itemTitle && itemTitle.textContent.includes(leaderType)) {
                item.style.display = 'block';
                found = true;
            }
        });
        
        if (!found) {
            console.warn(`${leaderType} 리더 유형에 대한 정보를 찾을 수 없습니다.`);
        }
        
        // 네비게이션 버튼 내용 변경
        const navButtons = section.querySelector('.navigation-buttons');
        if (navButtons) {
            navButtons.innerHTML = `
                <button onclick="showSection('improvement', '${leaderType}')">
                    ${leaderType} 리더의 개선 방향 보기
                </button>
                <button onclick="showAllTypes('comparison')">
                    모든 유형의 특성 보기
                </button>
                <button onclick="showSection('assessment')">
                    진단 결과로 돌아가기
                </button>
            `;
        }
    } catch (error) {
        console.error("비교 섹션 커스터마이징 중 오류 발생:", error);
    }
}

// 특정 리더 유형에 대한 개선 섹션 커스터마이징
function customizeImprovementSection(section, leaderType) {
    console.log(`개선 섹션을 ${leaderType} 리더 유형에 맞게 커스터마이징합니다.`);
    
    try {
        // 모든 개선 방향 숨기기
        const allItems = section.querySelectorAll('.improvement');
        allItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // 제목 변경
        const title = section.querySelector("h1");
        if (title) {
            title.textContent = `${leaderType} 리더의 개선 방향`;
        }
        
        // 해당 유형만 표시
        let found = false;
        allItems.forEach(item => {
            const itemTitle = item.querySelector("h2");
            if (itemTitle && itemTitle.textContent.includes(leaderType)) {
                item.style.display = 'block';
                found = true;
            }
        });
        
        if (!found) {
            console.warn(`${leaderType} 리더 유형에 대한 개선 방향을 찾을 수 없습니다.`);
        }
        
        // 네비게이션 버튼 수정
        const navButtons = section.querySelector('.navigation-buttons');
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
    } catch (error) {
        console.error("개선 섹션 커스터마이징 중 오류 발생:", error);
    }
}

// 팔로우십 관련 데이터 확인 및 필요시 재로딩
function checkDataAndReloadIfNeeded(sectionId) {
    let needsReload = false;
    
    // 섹션별 필요한 데이터 확인
    if (sectionId === 'followership' && 
        (typeof followershipTypes === 'undefined' || !Array.isArray(followershipTypes) || followershipTypes.length === 0)) {
        needsReload = true;
    } else if (sectionId === 'leadership_followership_relation' && 
                (typeof leadershipFollowershipRelation === 'undefined' || !leadershipFollowershipRelation)) {
        needsReload = true;
    } else if (sectionId === 'leadership_followership_matrix' && 
                (typeof leadershipFollowershipMatrix === 'undefined' || !Array.isArray(leadershipFollowershipMatrix) || leadershipFollowershipMatrix.length === 0)) {
        needsReload = true;
    }
    
    // 데이터가 없는 경우 관련 함수 재호출
    if (needsReload) {
        console.log(`${sectionId} 섹션의 데이터가 없습니다. 관련 섹션을 다시 초기화합니다.`);
        
        if (sectionId === 'followership') {
            initFollowershipSection();
        } else if (sectionId === 'leadership_followership_relation') {
            initRelationSection();
        } else if (sectionId === 'leadership_followership_matrix') {
            initMatrixSection();
        }
    }
}

// 다른 리더 유형들의 개선 방향 표시
function showOtherImprovements(currentType) {
    console.log(`${currentType} 리더를 제외한 다른 리더 유형들의 개선 방향 표시`);
    
    const section = document.getElementById('improvement');
    if (!section) {
        console.error("improvement 섹션을 찾을 수 없습니다.");
        return;
    }
    
    // 제목 변경
    const title = section.querySelector("h1");
    if (title) {
        title.textContent = `다른 리더 유형들의 개선 방향`;
    }
    
    // 모든 유형 표시 후 현재 유형만 숨기기
    const improvements = section.querySelectorAll('.improvement');
    let found = false;
    
    improvements.forEach(imp => {
        const itemTitle = imp.querySelector("h2");
        if (itemTitle && itemTitle.textContent.includes(currentType)) {
            imp.style.display = 'none';
            found = true;
        } else {
            imp.style.display = 'block';
        }
    });
    
    if (!found) {
        console.warn(`${currentType} 리더 유형을 찾을 수 없습니다.`);
    }
    
    // 네비게이션 버튼 수정
    const navButtons = section.querySelector('.navigation-buttons');
    if (navButtons) {
        navButtons.innerHTML = `
            <button onclick="showSection('improvement', '${currentType}')">
                <span style="font-weight: bold;">${currentType}</span> 리더의 개선 방향으로 돌아가기
            </button>
            <button onclick="showAllTypes('comparison')">
                모든 유형의 특성 보기
            </button>
            <button onclick="showSection('assessment')">
                진단 결과로 돌아가기
            </button>
        `;
    } else {
        console.warn("네비게이션 버튼 영역을 찾을 수 없습니다.");
    }
}

// 모든 유형 보기 함수
function showAllTypes(sectionId) {
    console.log(`모든 유형 표시: ${sectionId || 'comparison'}`);
    
    const section = document.getElementById(sectionId || 'comparison');
    if (!section) {
        console.error(`${sectionId} 섹션을 찾을 수 없습니다.`);
        return;
    }
    
    // 모든 유형 표시
    const items = section.querySelectorAll(sectionId === 'improvement' ? '.improvement' : '.type-comparison');
    items.forEach(item => {
        item.style.display = 'block';
    });
    
    // 제목 복원
    const title = section.querySelector("h1");
    if (title) {
        if (sectionId === 'improvement') {
            title.textContent = "4가지 리더십 유형별 향후 개선 방향";
        } else {
            title.textContent = "리더십 유형별 행동과 삶의 차이";
        }
    }
    
    // 네비게이션 버튼 원래대로
    const navButtons = section.querySelector('.navigation-buttons');
    if (navButtons) {
        if (sectionId === 'improvement') {
            navButtons.innerHTML = `
                <button onclick="showAllTypes('comparison')">모든 유형의 특성 보기</button>
                <button onclick="showSection('assessment')">진단 결과로 돌아가기</button>
            `;
        } else {
            navButtons.innerHTML = `
                <button onclick="showAllTypes('improvement')">모든 유형의 개선 방향 보기</button>
                <button onclick="showSection('assessment')">진단 결과로 돌아가기</button>
            `;
        }
    } else {
        console.warn("네비게이션 버튼 영역을 찾을 수 없습니다.");
    }
    
    // 해당 섹션이 비어있으면 초기화
    if (items.length === 0) {
        console.log(`${sectionId} 섹션이 비어 있어 초기화합니다.`);
        if (sectionId === 'improvement') {
            initImprovementSection();
        } else if (sectionId === 'comparison') {
            initComparisonSection();
        }
    }
    
    // 섹션 표시 (다른 섹션은 모두 숨김)
    const sections = document.querySelectorAll('section');
    sections.forEach(s => {
        s.style.display = 'none';
    });
    section.style.display = 'block';
    
    // 페이지 맨 위로 스크롤
    window.scrollTo(0, 0);
} 