# 명지대 인문캠 학생회관 식단 🍽️

명지대학교 인문캠퍼스 학생회관 주간 식단을 자동으로 업데이트하는 웹앱입니다.
**매주 월요일 오전 9시에 GitHub Actions가 자동으로 식단을 갱신**합니다.

---

## 🚀 GitHub Pages 배포 방법 (처음 한 번만)

### 1단계 — 이 레포지토리 fork 또는 업로드

GitHub에 로그인 후, 새 레포지토리를 만들고 이 파일들을 업로드하세요.
레포 이름을 `mju-cafeteria`로 설정하는 걸 권장합니다.

### 2단계 — GitHub Pages 활성화

1. 레포 → **Settings** → **Pages**
2. Source를 **GitHub Actions**로 변경 후 저장

### 3단계 — Actions 권한 설정

1. 레포 → **Settings** → **Actions** → **General**
2. **Workflow permissions**를 **Read and write permissions**로 변경 후 저장

### 4단계 — 첫 배포 실행

1. 레포 → **Actions** 탭
2. **매주 식단 자동 업데이트** 워크플로우 클릭
3. **Run workflow** 버튼 클릭

약 1~2분 후 `https://[내 GitHub 아이디].github.io/mju-cafeteria/` 주소로 접속 가능!

---

## 📱 폰 홈화면에 앱으로 추가

### iPhone (Safari)
1. Safari로 위 주소 접속
2. 하단 공유 버튼(□↑) 탭
3. **홈 화면에 추가** 선택

### Android (Chrome)
1. Chrome으로 위 주소 접속
2. 우측 상단 ⋮ 메뉴
3. **홈 화면에 추가** 선택

---

## ⚙️ 자동 업데이트 구조

```
매주 월요일 오전 9시 (KST)
        ↓
GitHub Actions 실행
        ↓
fetch_menu.py → 명지대 홈페이지 스크래핑
        ↓
src/menuData.json 업데이트 & 커밋
        ↓
Vite 빌드 → GitHub Pages 배포
        ↓
앱 자동 갱신 완료 ✅
```
