# Finly Frontend

## 🤝 Convention

### 1. Commit Convention
커밋 메시지는 `type: 제목` 형태이며, 콜론(`:`) 뒤에만 space가 있음에 유의합니다.
`gitmoji -c` 사용을 권장합니다.
 
| Type | Emoji | 설명 |
|:---:|:---:|:---|
| **Feat** | ✨ | 새로운 기능 추가 |
| **Fix** | 🐛 | 버그 수정 |
| **Docs** | 📝 | 문서 수정 |
| **Style** | 🎨 | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 |
| **Refactor** | ♻️ | 코드 리팩토링 |
| **Test** | ✅ | 테스트 코드 추가 |
| **Chore** | 📦 | 빌드 업무 수정, 패키지 매니저 수정 |

### 2. PR Convention
PR 제목: `[Gitmoji] [Type] 제목`
* ex) `✨ [Feat] 로그인 기능 구현`

### 3. Branch Strategy
* **main**: 배포용 최종 브랜치
* **develop**: 개발용 메인 브랜치
* **feature**: 기능 개발 브랜치 (`feat/#이슈번호-제목`)
    * ex) `feat/#12-login`