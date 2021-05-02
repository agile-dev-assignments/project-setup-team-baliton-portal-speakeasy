import styled from "styled-components";
import InCall from "./components/InCall";
import PreJoinRoom from "./components/PreJoinRoom";
import theme from "./theme";
import logo from "./icons/logo.svg";
import { SmallText } from "./components/shared/SmallText";
import { CallProvider, INCALL, PREJOIN, useCallState } from "./CallProvider";
import Logos from './frontend/images/speakeasyLogo.PNG';
import './App.css';
export const MOD = "MOD";
export const SPEAKER = "SPK";
export const LISTENER = "LST";


const AppContent = () => {
  const { view } = useCallState();
  return (
    <Container>
    <Toplog />
    <AppContainer>
      <Wrapper>
        <Header>
        </Header>
        {view === PREJOIN && <PreJoinRoom />}
        {view === INCALL && <InCall />}
      </Wrapper>
    </AppContainer>
    <Bottom />
    </Container>
  );
};

function Backend() {
  return (
    <CallProvider>
      <AppContent />
    </CallProvider>
  );
}

const Toplog = (props) => {
  return (
    <div id = "top">
      <div id = "t">
          <Speakeasy>Speakeasy</Speakeasy>
      </div>
    </div>
  );
}

function Bottom() {
  return (
    <div id = "bottom">
      <br></br>
      <h2 id="reserved"> All rights reserved 2021 </h2>
    </div>
  );
}

const Container = styled.div`
  background-color: ${theme.colors.greyLightest}
`;

const AppContainer = styled.div`
  background-color: ${theme.colors.greyLightest};
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const Wrapper = styled.div`
  max-width: 700px;
  padding: 32px 24px 0;
  min-height: 100%;
  margin: 0 auto;
`;
const Logo = styled.img`
  height: 24px;
`;
const Header = styled.header`
  display: flex;
  flex-direction: column;
`;
const HeaderTop = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-size: ${theme.fontSize.xxlarge};
  color: ${theme.colors.blueDark};
  margin: 4px 0;
  font-weight: 600;
`;
const Link = styled.a`
  font-weight: 400;
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.greyDark};
  display: flex;
  justify-content: center;
  max-width: 400px;

  @media only screen and (min-width: 768px) {
    justify-content: ${(props) => (props.center ? "center" : "flex-start")};
    max-width: ${(props) => (props.center ? "100%" : "400px")};
  }
`;
const Speakeasy = styled.h1`
  margin: 0 auto;
  color:white;
  width:100%;
  font-family: Blippo, fantasy;
  
`;

export default Backend;
