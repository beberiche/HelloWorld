# 싸피 7기 2학기 대전 1반 106B팀 프론트 진행상황

### 220722

#### 종현

- 프론트 프로젝트 생성 첫 커밋
- 프로젝트 초기 설정, 필수 모듈 설치
- 디렉토리 구조 이식, 기본 라우팅 설정
- 상단 네비게이션 바 컴포넌트 생성
- 버튼 컴포넌트 생성
- 메뉴 전용 버튼 컴포넌트 생성
- 이미지 프로필 컴포넌트 생성

#### 성찬

- 전역 css 설정 (font, color)
- 체크박스 컴포넌트 생성

#### 채윤

- 각 section에 사용될 sheet 컴포넌트 생성

### 220723

#### 종현

- 비동기에 사용될 loadingSpinner 컴포넌트 생성

#### 채윤

- 유저 선택을 위한 dropdown 컴포넌트 생성

### 220724

#### 종현

- 폼 형식에 사용될 input 컴포넌트 생성

### 220725

#### 성찬

- 라디오박스, 라디오박스 그룹 컴포넌트 생성
- 모달 컴포넌트 생성

#### 종현

- sheet 컴포넌트 재설정
- 로그인 전용 네비게이션 바 컴포넌트 생성 (HeaderNavAuth)
- 로그인 및 회원가입용 사진 컴포넌트 생성 (WelcomePicture)
- 로그인 컴포넌트 생성
- 로그인 페이지 기본 디자인 완료

#### 채윤

- drop down -> multi select box로 변경 후 작업 진행 및 완료

### 220726

#### 성찬

- 랜딩 페이지 섹션 컴포넌트 생성
- 랜딩 페이지 레이아웃 설정

#### 종현

- React APP 환경 구축
- next APP -> React APP으로 변환
- 현 시점 모든 코드 전환 완료


#### 채윤

- find password page 작업

### 220727

#### 성찬

- 개발 컨벤션: ESLint & Prettier 설정
- 사용자 메인 페이지 (포스트 섹션 제외) 생성

#### 종현

- 모든 코드 ESLint 규칙에 맞게 리팩토링
- 미팅 페이지에 필요한 컴포넌트 생성 (진행중)
- Meeting.js
  - VideoDisplay1
  - VideoDisplay2
  - VideoControlBtns
  - Chatting

#### 채윤

- 깃 재설정
- find password page 작업

### 220728

#### 성찬

- 좌측 프로필 섹션에 PropTypes 적용
- 프로필 영역에 채우지 못한 아이콘(하트(heart), 설정(gear)) 및 국기 이미지 추가
- 설정 아이콘 클릭 시 사용자 설정 페이지로 이동하도록 링크 추가
- 사용자 메인 페이지 우측 포스트 섹션 구현
- 포스트 아이템 클릭 시 모달 창을 표시하도록 구현
- 포스트 섹션 내 '더 보기' 버튼 및 포스트 더미 데이터 추가

#### 종현

- 미팅 페이지 생성 완료
- Meeting.js
  - VideoDisplay1
  - VideoDisplay2
  - VideoControlBtns
  - Chatting
    - ChattingLog
- Kurento 연결 초기 작업

#### 채윤

- validation check 작업 

### 220729

#### 종현
- 유효성 검사 로직 구현
  - 유효성 함수를 외부 함수로 두어, input 재사용 컴포넌트에서 실행함
  - 종속성 최소화, 확장 가능
  - 현 시점 email, password 유효성 완료
  - 연산 처리 및 컴포넌트 재평가 많음 (디바운싱 작업 필요)

#### 성찬
- 로딩 모달 (로딩 중 & 완료) 구현
  - 페이지 대신 모달 형식으로 구현
- 모달의 `contents.content` prop 타입을 `string`에서 `node`로 변경
- 모달의 레이아웃을 클릭했을 때 모달이 닫히지 않게 하는 `locked` prop 추가

#### 채윤

- signup page(1) 기본 배치 디자인 완료

### 220730

#### 종현

- 유효성 검사 로직 구현
  - 유효성 함수 외부 모듈로 옮김 (utils/validation)
  - age,nickName,phone 유효성 완료
  - 남은 유효성 (회원가입에만 쓰이는 컴포넌트) 검사는 회원가입 페이지 제작 후 진행
- 유효성 검사 개선 
  - 디바운싱 처리 완료
  - 자식 컴포넌트에서 처리한 유효성 데이터가 부모 컴포넌트로 이어지도록 처리
- 로그인 로직 구현 완료
  - 서버와의 연결은 객체 공유 라이브러리 선정 후 진행 예정

#### 성찬

- 프로필 이미지 컴포넌트의 이미지 소스와 크기를 정할 수 있는 props 추가
- 회원가입 내 프로필 이미지 셀렉터 구현
  - 임시 기본 이미지 6장 추가
  - `<input type="file">` 태그를 통해 사용자로부터 `.jpg` 및 `.png` 이미지를 업로드 할 수 있도록 설정

### 220731

#### 성찬

- `HeaderNav` 스타일 수정
- 로고 이미지 컴포넌트 리팩토링

#### 채윤

- signup 페이지 상단에 표시될 step indicator 작성 및 적용 시도
- signup(2), signup(3), signup(4) 생성 및 작성
- radioBtnGroup usecallback 진행

#### 종현
- 로그인 로직 리팩토링

### 220801

#### 성찬

- 설정 페이지 일부 구현
  - 설정 공통 페이지 컴포넌트 (중첩 라우트 사용)
  - 프로필 수정 페이지
  - 비밀번호 변경 페이지

#### 채윤

- signup 구성 완료
- indicator 작업 중 중단(페이지 공간 문제)

#### 종현

- login 작업, 회원가입 api 작업 -> 실패
- 서버 리팩토링 작업 후 api 작업 진행하는 걸로

### 220802

#### 성찬

- 설정 페이지 전부 구현
  - 멤버십 구독 페이지
  - 하트 이력 페이지
  - 회원 탈퇴 페이지

#### 채윤

- signup 페이지 추가 파트 구성
- common component 중 구현되지 않은 단일 선택 요소 작업 30%

#### 종현

- openvidu 조사
- openvidu tutorial 코드 적용

### 220803

#### 성찬

- 회원가입 공통 페이지 컴포넌트 및 스텝별 컴포넌트 생성
- 회원가입 스텝 전환 시 트랜지션 적용
- `StepIndicator` 컴포넌트 구현
- 신/구 회원가입 라우트 통합
  - 회원가입 경로를 `/auth/signup`에서 `/signup`으로 변경
  - 로그인 경로를 `/auth`에서 `/login`으로 변경

#### 채윤

- dropdown component (단일 선택) 작업 완료
- 모달창 이용한 privacy policy 작업 완료
- 변환된 라우트에 privacy policy 병합 완료
- 유효성 검사 6개 작업 중

#### 종현

- redux 조사
- redux 세팅
- redux openvidu tutorial 코드 커스텀 완료
- openvidu subscriber 이벤트 이슈 발생


### 220804

#### 종현

- openvidu subscriber 이벤트 이슈 해결
- redux openvidu 반영 완료
- kakao login 버튼 구현
  - 로그인 api 로직 설계 후, 다시 확인하기
- google login 버튼 구현
  - 로그인 api 로직 설계 후, 다시 확인하기

### 220805

#### 종현

- redux user-slice,auth-slice 세팅
- redux thunk 세팅
- 로그인, 유저 정보, 유저 언어 정보 api 연결 완료
- redux issue -> F5 시 리셋
- 로그인 후 headerNav 변환
- 유저 데이터 profile section에 반영
- 유저 데이터 이슈
  - 한줄 소개
  - 하트
  - 국적
  - 프로필 이미지