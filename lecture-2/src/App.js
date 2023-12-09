import React, { Suspense, lazy, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import InfoTable from "./components/InfoTable";
import SurveyChart from "./components/SurveyChart";
import Footer from "./components/Footer";
// import ImageModal from './components/ImageModal'

const LazyImageModal = lazy(() => import("./components/ImageModal"));

function App() {
  const [showModal, setShowModal] = useState(false);

  // 1. 버튼 위에 마우스를 올려놓았을 때
  const handleMouseEnter = () => {
    const component = import("./components/ImageModal");
  };

  // 2. 컴포넌트의 마운트 완료 후
  useEffect(() => {
    const component = import("./components/ImageModal");
  }, []);

  return (
    <div className="App">
      <Suspense fallback={null}>
        <Header />
        <InfoTable />
        <ButtonModal
          onClick={() => {
            setShowModal(true);
          }}
          onMouseEnter={handleMouseEnter}
        >
          올림픽 사진 보기
        </ButtonModal>
        <SurveyChart />
        <Footer />
        {showModal ? (
          <LazyImageModal
            closeModal={() => {
              setShowModal(false);
            }}
          />
        ) : null}
      </Suspense>
    </div>
  );
}

const ButtonModal = styled.button`
  border-radius: 30px;
  border: 1px solid #999;
  padding: 12px 30px;
  background: none;
  font-size: 1.1em;
  color: #555;
  outline: none;
  cursor: pointer;
`;

export default App;
