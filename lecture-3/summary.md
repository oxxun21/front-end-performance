# 4주차

## 이미지 지연로딩

가장 처음 보여지는 콘텐츠가 가장 나중에 로드되면, 사용자가 첫 화면에서 아무것도 보지 못하기 때문에 사용자 경험에 좋지 않을 것<br/>
→ 이럴 때 당장 사용되지 않는 이미지를 나중에 다운로드하고 맨 처음 보여야하는 동영상을 먼저 다운로드함 (이미지 지연 로드)<br/>

이미지 로드는 언제 해야하나?<br/>

- 뷰포트에 이미지가 표시될 위치까지 스크롤 되었을 때로 판단 가능

### Intersection Observer

스크롤 이동에 따른 이미지 지연 로딩을 위해 스크롤 이벤트에 로직을 넣으면 스크롤을 할 때마다 해당 로직이 반복 실행<br/>
→ 조금이라도 무거운 로직이 들어가면 메인 스레드에 무리가 생길 것<br/>

이런 스크롤 문제를 **Intersection Observer** 로 해결 할 수 있음

> **Intersection Observer?** <br/>
> 브라우저에서 제공하는 API<br/>
> 이를 통해 웹 페이지의 특정 요소를 관찰하면 페이지 스크롤 시, 해당 요소가 화면에 들어왔는지 아닌지를 알려줌<br/>
> 스크롤 이벤트처럼 스크롤 할 때마다 함수를 호출하는 것이 아닌 요소가 화면에 들어왔을 때만 함수 호출<br/> > https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

```js
// Intersection Observer 예제 코드

// Intersection Observer의 옵션 설정
const options = {
  root: null, // 대상 객체의 가시성을 확인할 때 사용되는 뷰포트 요소(null로 설정 시 브라우저의 뷰포트로 설정)
  rootMargin: "0px", // root의 여백 (root의 가시범위를 가상으로 확장하거나 축소 가능)
  threshold: 1.0, // 가시성 퍼센티지, 대상 요소가 어느 정도로 보일 때 콜백을 실행할지 결정 (1.0 → 대상 요소가 모두 보일 때 / 0 → 1px이라도 보일 때)
};

// 가시성이 변경될 때마다 실행되는 함수
const callback = (entries, observer) => {
  console.log("Entries", entries);
};

// options와 callback 정의 후 IntersectionObserver 객체 생성하면 observer 인스턴스 생성 완료
const observer = new IntersectionObserver(callback, options);

// 이 인스턴스를 이용하여 원하는 요소 관촬
observer.observe(document.querySelector("#target-element1"));
observer.observe(document.querySelector("#target-element2"));

// 대상 요소의 가시성이 변할 때마다 콜백이 실행되며 콜백에서는 첫 번째 인자로 가시성이 변한 요소(entries)를 배열 형태로 전달 받음
// 이후 원하는 로직 실행
```

![Alt text](image.png)

`console.log("Entries", entries);` 결과

- isIntersecting : 해당 요소가 뷰포트 내에 들어왔는지를 나타내는 값, 이 값을 통해 해당 요소가 화면에 보이는지 나갔는지 확인 가능
