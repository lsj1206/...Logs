import React from "react";
import { styled } from "./styles/Theme";

import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Background>
      <Header />
      <Sidebar />
      <MainPage />
      <Footer />
    </Background>
  );
}

const Background = styled.div`
  z-index: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bgMain};
  transition: background 0.3s ease-in, color 0.3s ease-in;
`;

export default App;
