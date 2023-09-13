# 원티드 프리온보딩 프론트엔드 12차 4주차 과제

## 📚 과제

주어진 데이터를 기반으로 시계열 차트 만들기

## 🚀 실행 방법 및 프리뷰

```bash
$ npm install
$ npm start
```

### 구현 기능

- [x] 시계열 차트 만들기
  - [x] 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 만들기
- [x] 호버 기능 구현
  - [x] 특정 데이터 구역에 마우스 호버시 id, value_area, value_bar 데이터를 툴팁 형태로 제공
- [x] 필터링 기능 구현
  - [x] 필터링 시 버튼에서 선택한 ID값과 동일한 ID값을 가진 데이터 구역만 하이라이트 처리
  - [x] 특정 데이터 구역을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트

### 배포 링크

🔗 [배포 링크](http://preonboarding-frontend-12th-jk.s3-website.ap-northeast-2.amazonaws.com/)

### 구현 영상

<img width="400" alt="issueList_gif" src="https://github.com/preOnBorading-Idle/pre-onboarding-12th-3-18/assets/101536766/e3c26e96-af44-4792-8d0b-5a23de39df0b" />

## ✨ 기능 구현 이슈

### 1. 시계열 차트 만들기 (복합 그래프로 만들기)

### 🤔 Recharts vs Chart.js

**Recharts:**

👍 장점:

> 1. Recharts는 React와 원활하게 통합이 되어 있어 React 애플리케이션에서 사용하기 용이하다.
> 2. 커스터마이징이 쉽게 가능하며, React 구성 요소로 사용할 수 있어 재사용성이 좋다.
> 3. SVG 기반 벡터 그래픽 형식으로, 화면 크기나 확대/축소에 관계없이 그래프가 깨지지 않고 부드럽게 렌더링된다.

👎 단점:

> 1. Recharts는 React에 의존해서 다른 프레임워크나 라이브러리와 통합하기 어렵다.
> 2. 다른 라이브러리에 비해 몇 가지 고급 기능이 부족할 수 있다.
> 3. 큰 규모의 데이터를 다룰 때 초기 로딩 속도가 느릴 수 있다.

**Chart.js:**

👍 장점:

> 1. 라이브러리에는 6개의 차트 세트가 포함되어 있으며 11Kb로 압축되어 있어 로딩 시간과 페이지에 미치는 영향이 적다.
> 2. 프레임워크에 독립적으로 사용할 수 있으므로 React, Angular, Vue.js 등 다양한 환경에서 사용 가능하다.
> 3. NPM을 통해 많은 플러그인을 사용할 수 있다.

👎 단점:

> 1. 초기에는 Chart.js를 사용하는 데 다소 러닝 커브가 있을 수 있다.
> 2. 자주 사용되는 차트를 미리 만들어놓고 가져다 쓰는 방식이라 커스터마이징이 제한적이며 고급 커스터마이즈나 복잡한 요구사항을 충족하기 위해서는 추가 작업이 필요할 수 있다.
> 3. 캔버스 기반 비트맵 방식을 사용해서 모바일 및 고해상도 모니터에서 그래프가 깨질 수 있다.

### 😎 결과

요약하자면, 저는 **러닝 커브가 낮고, 리액트에 최적화 되어있으며, 렌더링이 빠르고 부드럽게되는 Recharts를 사용하는 것**이 더 적절하다고 판단했습니다.

> 실제로 사용해보니 공식 문서가 잘 되어있어서 비교적 쉽게 그래프를 만들 수 있었습니다. 또한 커스터마이징도 편했고, 무엇보다 첫 렌더링, 호버 시 툴팁 생성 등에서 볼 수 있는 부드러운 애니메이션과 그래프 자체의 디자인이 깔끔해서 잘 선택했다고 생각했습니다.

---

### 2. 호버 시, 툴팁 형태로 데이터 제공 구현

### 🤔 기존 툴팁 사용 vs 커스텀 툴팁 생성

**기존 툴팁 사용:**

👍 장점:

> 1. 간편함: 기존 툴팁을 사용하면 기본 설정으로 툴팁을 표시할 수 있으며, 추가적인 코드 작성 없이도 사용할 수 있다.
> 2. 빠름: Recharts에 내장되어 있어 추가 라이브러리나 컴포넌트를 가져오거나 구성할 필요가 없으므로 렌더링이 빠르다.

👎 단점:

> 1. 기본 툴팁은 제한된 커스터마이즈 옵션을 제공하므로 디자인이나 레이아웃을 완전히 변경하기 어려울 수 있다.

**커스텀 툴팁 생성:**

👍 장점:

> 1. 커스텀 툴팁을 사용하면 완벽하게 커스터마이즈할 수 있으므로 디자인, 레이아웃, 색상 등을 자유롭게 조절할 수 있다.

👎 단점:

> 1. 커스텀 툴팁을 만들려면 추가적인 코드 및 컴포넌트를 작성해야 한다.
> 2. 복잡한 커스텀 툴팁을 만들 경우, 렌더링 성능에 영향을 미칠 수 있으므로 최적화가 필요할 수 있다.

### 😎 결과

요약하자면, 저는 **툴팁에서 원하는 데이터를 뽑아서 보여주고, 디자인을 마음대로 커스터마이징 하기 위해선 커스텀 툴팁을 생성해서 사용**하는 것이 더 적절하다고 판단했습니다.

```ts
function CustomTooltip({ active, payload, label }: any) {
	if (active && payload && payload.length) {
		const data = payload[0].payload;
		return (
			<div className={styles.customTooltip}>
				<p className={styles.label}>{`${label}`}</p>
				<p className={styles.id}>{`ID: ${data.id}`}</p>
				<p className={styles.area}>{`Area: ${data.value_area}`}</p>
				<p className={styles.bar}>{`Bar: ${data.value_bar}`}</p>
			</div>
		);
	}

	return null;
}
```

---

### 3. 필터링 기능 구현

> 버튼 클릭/데이터 구역 클릭 시 동일 ID값을 가진 데이터 구역 하이라이트

### 😎 결과

**Recharts에서 제공하는 Cell을 사용하여 구현하였습니다. 그래프 내의 데이터를 돌면서 선택한 ID값(버튼 클릭 또는 데이터 구역 클릭)과 동일한 ID값을 가진 데이터 구역의 색상을 변경시켜 하이라이트 해주었습니다.**

```ts
<Bar
	dataKey="value_bar"
	fill={COLOR.BAR}
	name="Bar"
	yAxisId="right"
	onClick={handleBarClick}
>
	{chartData.map((entry, index) => (
		<Cell
			key={index}
			fill={entry.id === selectedID ? COLOR.HIGHLIGHTED_BAR : COLOR.BAR}
		/>
	))}
</Bar>
```

---

## 📁 디렉토리 구조

```
📦src
 ┣ 📂api
 ┣ 📂components
 ┃ ┣ 📂LoadingSpinner
 ┃ ┗ 📂TimeSeriesChart
 ┣ 📂constants
 ┣ 📂pages
 ┃ ┣ 📂MainPage
 ┃ ┗ 📂NotFoundPage
 ┣ 📂utils
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┗ 📜react-app-env.d.ts
```

## 기술스택

### Environment

<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/visual Studio code-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white">

### Config

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"> <img src="https://img.shields.io/badge/husky-FF4088?style=for-the-badge&logo=hugo&logoColor=white">

### Development

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">

### Library

<img src="https://img.shields.io/badge/scss-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>

### Deploy

<!-- <img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=AmazonEC2&logoColor=white"> <img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"> -->
