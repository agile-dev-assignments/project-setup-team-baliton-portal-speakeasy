import { useMemo, useCallback } from "react";
import styled from "styled-components";
import { INCALL, useCallState } from "../CallProvider";
import { SPEAKER, LISTENER, MOD } from "../App";
import { Link } from 'react-router-dom';
import CopyLinkBox from "./CopyLinkBox";
import Participant from "./Participant";
import Counter from "./Counter";
import MicIcon from "./MicIcon";
import MutedIcon from "./MutedIcon";
import theme from "../theme";
import './InCall.css';
import { useHistory } from "react-router-dom";



const InCall = () => {
  const {
    participants,
    room,
    view,
    getAccountType,
    leaveCall,
    handleMute,
    handleUnmute,
    raiseHand,
    lowerHand,
    endCall,
  } = useCallState();
  console.log(participants);
  
const history = useHistory();

const handleEndCall = () => {
  //get request to remove call from database
  fetch('http://localhost:5000/end/' + room.name)
  .then(response => response.json())
  .catch(error => {
    console.error('There was an error with /endcall/' + room.name + '!!', error);
  });
  endCall();
  let path = 'main';
  history.push(path);
}

const handleLeaveCall = () => {
  leaveCall();
  let path = 'main'
  history.push(path);
}

  const local = useMemo((p) => participants?.filter((p) => p?.local)[0], [
    participants,
  ]);

  const mods = useMemo(
    () =>
      participants?.filter(
        (p) => p?.owner && getAccountType(p?.user_name) === MOD
      ),
    [participants, getAccountType]
  );
  const speakers = useMemo(
    (p) =>
      participants?.filter((p) => getAccountType(p?.user_name) === SPEAKER),
    [participants, getAccountType]
  );
  const listeners = useMemo(() => {
    const l = participants
      ?.filter((p) => getAccountType(p?.user_name) === LISTENER)
      .sort((a, _) => {
        // Move raised hands to front of list
        if (a?.user_name.includes("✋")) return -1;
        return 0;
      });
    return (
      <ListeningContainer>
        {l?.map((p, i) => (
          <Participant
            participant={p}
            key={i}
            local={local}
            modCount={mods?.length}
          />
        ))}
      </ListeningContainer>
    );
  }, [participants, getAccountType, local, mods]);

  const canSpeak = useMemo(() => {
    const s = [...mods, ...speakers];
    return (
      <CanSpeakContainer>
        {s?.map((p, i) => (
          <Participant
            participant={p}
            key={i}
            local={local}
            modCount={mods?.length}
          />
        ))}
      </CanSpeakContainer>
    );
  }, [mods, speakers, local]);

  const handleAudioChange = useCallback(
    () => (local?.audio ? handleMute(local) : handleUnmute(local)),
    [handleMute, handleUnmute, local]
  );
  const handleHandRaising = useCallback(
    () =>
      local?.user_name.includes("✋") ? lowerHand(local) : raiseHand(local),
    [lowerHand, raiseHand, local]
  );

  return (
    <div>

    <Container hidden={view !== INCALL}>
      <CallHeader>
        <Header>Speakers</Header>
        <Counter />
      </CallHeader>
      {canSpeak}
      <ListeningContainer>
      <Header>Listeners</Header>
      {listeners}
      <CopyLinkBox room={room} />
      </ListeningContainer>
      <Tray>
        <TrayContent>
          {[MOD, SPEAKER].includes(getAccountType(local?.user_name)) ? (
            <AudioButton onClick={handleAudioChange}>
              {local?.audio ? (
                <MicIcon type="simple" />
              ) : (
                <MutedIcon type="simple" />
              )}
              <ButtonText>{local?.audio ? "Mute" : "Unmute"}</ButtonText>
            </AudioButton>
          ) : (
            <HandButton onClick={handleHandRaising}>
              <ButtonText>
                {local?.user_name.includes("✋")
                  ? "Lower hand"
                  : "Raise hand ✋"}
              </ButtonText>
            </HandButton>
          )}
          {mods?.length < 2 && getAccountType(local?.user_name) === MOD ? (
            <LeaveButton onClick={handleEndCall}>End call</LeaveButton>
          ) : (
            <LeaveButton onClick={handleLeaveCall}>Leave call</LeaveButton>
          )}
        </TrayContent>
      </Tray>
    </Container>
    
    </div>
  );
};


const Container = styled.div`
  margin: 0 0 0;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  height: ${(props) => (props.hidden ? "0" : "100%")};
  width: 100%;
`;
const CanSpeakContainer = styled.div`
  border-bottom: ${theme.colors.green} 7px solid;
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
`;
const ListeningContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;\
`;
const Header = styled.h2`
  font-size: ${theme.fontSize.large};
  color: ${theme.colors.blueDark};
`;
const CallHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;
const Tray = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: 0;
  left: 0;
  height: 100px;
  width: 100%;
  box-sizing: border-box;
  background-color:#dee8ff;
  padding: 12px;
  border-radius:5px 5px ;
`;
const TrayContent = styled.div`
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Button = styled.button`
  font-size: ${theme.fontSize.large};
  font-weight: 600;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: ${theme.colors.blueLightest};
  }
`;
const LeaveButton = styled(Button)`
margin-top: 5px;
margin-left: 0;
margin-bottom: 5px;
width: 34%;
background-color: #2a9df4;
font-size: 20px;
border-radius: 10px;
height: 60px;
`;
const HandButton = styled(Button)`
  margin-right: auto;
`;
const AudioButton = styled(Button)`
margin-top: 5px;
margin-left: 0;
margin-bottom: 5px;
width: 34%;
background-color: #2a9df4;
font-size: 20px;
border-radius: 10px;
height: 60px;
`;
const ButtonText = styled.span`
  margin-left: 4px;
`;



export default InCall;
