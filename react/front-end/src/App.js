import styled from "styled-components";
import InCall from "./components/InCall";
import PreJoinRoom from "./components/PreJoinRoom";
import theme from "./theme";
import { CallProvider, INCALL, PREJOIN, useCallState } from "./CallProvider";
import './App.css';
export const MOD = "MOD";
export const SPEAKER = "SPK";
export const LISTENER = "LST";


const AppContent = () => {
  const { view } = useCallState();
  return (
    <Container>
    <AppContainer>
      <Wrapper>
        <Header>
        </Header>
        {view === PREJOIN && <PreJoinRoom />}
        {view === INCALL && <InCall />}
      </Wrapper>
    </AppContainer>
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
  min-height: 100%;
  margin: 0 auto;
`;
const Header = styled.header`
  display: flex;
  flex-direction: column;
`;

export default Backend;
