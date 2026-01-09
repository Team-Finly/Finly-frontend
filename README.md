# Finly Frontend

## 🤝 Convention

### 1. Commit Convention
커밋 메시지는 `type: 제목` 형태이며, 콜론(`:`) 뒤에만 space가 있음에 유의합니다.

* **Format:** `type: 제목`
* **Example:** `feat: 로그인 기능 구현`

| Type | 설명 |
|:---:|:---|
| **feat** | 새로운 기능 추가 |
| **fix** | 버그 수정 |
| **docs** | 문서 수정 (README, API 명세서 등) |
| **style** | 코드 포맷팅, 세미콜론 누락 (비즈니스 로직 변경 없음) |
| **design** | 사용자 UI 디자인 변경 (CSS, 레이아웃 등) |
| **refactor** | 코드 리팩토링 (기능 변경 없음) |
| **perf** | 성능 개선 |
| **test** | 테스트 코드 추가/수정 |
| **chore** | 빌드, 패키지 매니저, 환경 설정 수정 (.gitignore, package.json 등) |
| **init** | 프로젝트 초기 생성 |
| **rename** | 파일/폴더명 수정 혹은 이동 |
| **remove** | 파일 삭제 |
| **revert** | 이전 커밋 되돌리기 |
| **comment** | 주석 추가 및 변경 |

### 2. PR Convention
PR 제목은 **Gitmoji**를 포함하여 작성합니다.
터미널에서 `gitmoji -c` 명령어를 사용하거나 아래 표를 참고하세요.

* **Format:** `[Gitmoji] [Type] 제목`
* **Example:** `✨ [Feat] 로그인 기능 구현`

| Gitmoji | Type | 설명 |
|:---:|:---:|:---|
| ✨ | **Feat** | 새로운 기능 추가 |
| 🐛 | **Fix** | 버그 수정 |
| 📝 | **Docs** | 문서 수정 |
| 🎨 | **Style** | 코드 스타일 수정 |
| 💄 | **Design** | 사용자 UI 디자인 수정 |
| ♻️ | **Refactor** | 코드 리팩토링 |
| ⚡️ | **Perf** | 성능 개선 |
| ✅ | **Test** | 테스트 코드 추가 |
| 📦 | **Chore** | 빌드/설정 파일 수정 |
| 🎉 | **Init** | 프로젝트 초기 생성 |
| 🚚 | **Rename** | 파일 이동/이름 변경 |
| 🔥 | **Remove** | 파일 삭제 |
| ⏪️ | **Revert** | 커밋 되돌리기 |
| 💡 | **Comment** | 주석 추가/변경 |

### 3. Branch Strategy
브랜치 이름은 해당 작업의 이슈 번호를 포함하여 생성합니다.

* **main**: 배포용 최종 브랜치
* **develop**: 개발용 메인 브랜치
* **feature**: 기능 개발 브랜치 (`feat/#이슈번호-제목`)
    * ex) `feat/#12-login`