import React, { useEffect, useRef } from "react";

function Card(props) {
  const imgRef = useRef(null);

  // useEffect 를 사용하지 않으면 렌더링 할 때마다 인스턴스가 생성되고, 대상 요소를 관찰하게 되면서 여러 개의 콜밸이 실행될 것 (중복 방지)
  useEffect(() => {
    const options = {};

    // entries 확인
    // const callback = (entries, observer) => {
    //   console.log("Entries", entries);
    // };

    // 화면에 이미지가 보이는 순간(콜백 실행 순간) 이미지 로드하기
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("is intersection", entry.target.dataset.src);
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target); // 해당 요소의 observe 해제 (한 번 이미지를 로드한 후에는 다시 호출할 필요 X)
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(imgRef.current);

    return () => observer.disconnect(); // clean-up 함수에서 observer.disconnect 함수를 통해 리소스가 낭비되지 않도록 함
  }, []);

  return (
    <div className="Card text-center">
      {/* <img img={props.image} ref={imgRef} /> */}
      {/* 가장 상위에 있는 WebP를 우선으로 로드하고, 브라우저가 WebP를 지원하지 않으면 img 태그에 있는 JPG 이미지를 렌더링 */}
      <picture>
        <source data-srcset={props.webp} type="image/webp" />
        {/* data-src에 이미지 주소(props.image)를 넣게 되면 src 값이 할당되지 않기 때문에 해당 이미지를 로드하지 않음 */}
        {/* 나중에 이미지가 뷰포트에 들어왔을 때 data-src에 있는 값을 src로 옮겨 이미지 로드 */}
        <img data-src={props.image} ref={imgRef} />
      </picture>
      <div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">{props.children}</div>
    </div>
  );
}

export default Card;
