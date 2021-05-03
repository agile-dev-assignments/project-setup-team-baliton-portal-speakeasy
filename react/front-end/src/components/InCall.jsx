import { useMemo, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { INCALL, useCallState } from "../CallProvider";
import { SPEAKER, LISTENER, MOD } from "../App";
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

  //use room ID to get call info from database
  const [callInfoDB, setCallInfoDB] = useState([]);
  useEffect(() => {
    //get request call info using fetch inside useEffect react hook
    fetch('http://159.65.182.78:5000/getCall/' + room.name)
      .then(response => response.json())
      .then(data => setCallInfoDB(data))
      .catch(error => {
        console.error('There was an error with /getCall/' + room.name + ' !!', error);
      });

  //reload if different call name 
  }, [room.name])
  
  const history = useHistory();

  const handleEndCall = () => {
    //get request to remove call from database
    fetch('http://159.65.182.78:5000/end/' + room.name)
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

  const ChatroomToplog = () => {
    return (
      <div id = "top">
        {mods?.length < 2 && getAccountType(local?.user_name) === MOD ? (
            <a className="linka" href="/main">
              <h1 id="logotext" onClick={handleEndCall}>Speakeasy </h1>
            </a>
          ) : (
            <a className="linka" href="/main">
              <h1 id="logotext" onClick={handleLeaveCall}>Speakeasy </h1>
            </a>
          )}
      </div>
    );
  }
  const ChatroomBottom = () => {
    return (
      <div id = "bottom">
        <br></br>
        <h2 id="reserved"> All rights reserved 2021 </h2>
      </div>
    );
  }

  return (
    <div>
    <ChatroomToplog />
    <Container hidden={view !== INCALL}>
      <h1 id="title">{"'" + callInfoDB.callTitle + "'"}</h1>
      <h1 id="tag">{"Tag: " + callInfoDB.callTag}</h1>
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
    <ChatroomBottom />
    </div>
  );
};


const Container = styled.div`
  max-width: 700px;
  margin: auto;
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
font-size: calc(10px + 1.1vw);
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
font-size: calc(10px + 1vw);
border-radius: 10px;
height: 60px;
`;
const ButtonText = styled.span`
  margin-left: 4px;
`;

export default InCall;
