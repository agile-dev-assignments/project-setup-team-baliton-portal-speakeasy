import { useCallback, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { LISTENER, MOD } from "../App";
import theme from "../theme";
import { useCallState } from "../CallProvider";
import {useLocation} from "react-router-dom";

const PreJoinRoom = () => {
  
  const search = useLocation().search;
  const searchURL = new URLSearchParams(search).get('id');
  const attributeList = searchURL.split('?title=');
  const urlID = attributeList[0];
  const callTitle = attributeList[1];
  let callMessage = "";

  if (callTitle) {
    callMessage = "Joining Call: '" + callTitle + "'"; 
  }
  else {
    callMessage = "Joining Call";
  }

  const { joinRoom, error } = useCallState();
  const firstNameRef = useRef(null);
  const callTitleRef = useRef(null);
  const callTagRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (error) {
      setSubmitting(false);
    }
  }, [error]);

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (submitting) return;
      setSubmitting(true);

      if (!firstNameRef?.current) {
        return;
      }

      if ((urlID === "") && ((!callTagRef?.current) || (!callTitleRef?.current))) {
        return;
      }

      let userName = `${firstNameRef?.current?.value}`;
      let name = "";
      let callTag = "";
      let callTitle = "";
      
      console.log(`Creating call, username: ${firstNameRef?.current?.value}`);
      console.log(`Creating call, call title: ${callTitleRef?.current?.value}`);
      console.log(`Creating call, call tag: ${callTagRef?.current?.value}`);

      if (urlID !== "" ) {
        name = urlID;
        /**
         * We track the account type but appending it to the username.
         * This is a quick solution for a demo; not a production-worthy solution!
         * You'd likely make a call to your server here to set the account type.
         */
        userName = `${userName?.trim()}_${LISTENER}`;
      } else {
        /**
         * If they're not submitting a specific room name, we'll create a new
         * room in joinRoom() so let's make them the moderator by default.
         */
         callTag = `${callTagRef?.current?.value}`;
         callTitle = `${callTitleRef?.current?.value}`;
        userName = `${userName?.trim()}_${MOD}`;
      }
      joinRoom({ userName, name, callTag, callTitle });
    },
    [firstNameRef, callTagRef, callTitleRef, joinRoom, submitting, urlID]
  );

  if (urlID !== "") {
    return (
      <Container>
        <Title>{callMessage}</Title>
        <Form onSubmit={submitForm}>
          <Label htmlFor="fname">Choose a nickname:</Label>
          <Input
            ref={firstNameRef}
            type="text"
            id="fname"
            name="fname"
            required
          />
          <SmallText>
            Nicknames will never be tracked and do not create an account, only serve
            as a temporary identifying name while you are in the call you are about
            to join.
          </SmallText>
          <Submit
            type="submit"
            value={
              submitting
                ? "Joining..."
                : "Joining..."
                ? "Join Room!"
                : "Join Room!"
            }
          />
          {error && <ErrorText>Error: {error.toString()}</ErrorText>}
        </Form>
      </Container>
    );
  }
  else {
    return (
      <Container>
        <Title>Create New Call:</Title>
        <Form onSubmit={submitForm}>
          <Label htmlFor="fname">Choose a Nickname:</Label>
          <Input
            ref={firstNameRef}
            type="text"
            id="fname"
            name="fname"
            required
          />
          <Label htmlFor="ctitle">Enter Call Title:</Label>
          <Input
            ref={callTitleRef}
            type="text"
            id="ctitle"
            name="ctitle"
            required
          />
          <Label htmlFor="ctag">Enter Call Tag:</Label>
          <Input
            ref={callTagRef}
            type="text"
            id="ctag"
            name="ctag"
            required
          />
          <SmallText>
            Nicknames will never be tracked and do not create an account, only serve
            as a temporary identifying name while you are in the call you are about
            to create.
          </SmallText>
          <Submit
            type="submit"
            value={
              submitting
                ? "Creating & Joining..."
                : "Creating & Joining..."
                ? "Create & Join Room!"
                : "Create & Join Room!"
            }
          />
          {error && <ErrorText>Error: {error.toString()}</ErrorText>}
        </Form>
      </Container>
    );
  }
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  max-width: 400px;
  margin-top: 48px;

  @media only screen and (min-width: 768px) {
    justify-content: flex-start;
    margin-top: 32px;
  }
`;
const Title = styled.h1`
  font-size: ${theme.fontSize.large};
  color: ${theme.colors.blueDark};
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 0 24px;
`;
const SmallText = styled.p`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.greyDark};
  margin: 2px 0;
`;
const Label = styled.label`
  color: ${theme.colors.blueDark};
  font-size: ${theme.fontSize.base};
  margin-bottom: 4px;
  line-height: 16px;
  margin-top: 16px;
  font-weight: 400;
`;
const Input = styled.input`
  border-radius: 8px;
  border: ${theme.colors.grey} 1px solid;
  padding: 4px;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 4px;

  &:focus {
    outline: ${theme.colors.grey} auto 1px;
  }
`;
const Submit = styled(Input)`
  margin-top: 16px;
  border: ${theme.colors.cyanLight} 2px solid;
  background-color: ${theme.colors.turquoise};
  padding: 5px;
  font-size: ${theme.fontSize.base};
  font-weight: 600;
  height: 36px;
  cursor: pointer;

  &:active {
    background-color: ${theme.colors.cyan};
  }
  &:hover {
    border: ${theme.colors.cyan} solid 2px;
  }
`;
const ErrorText = styled.p`
  margin-left: auto;
  color: ${theme.colors.red};
`;

export default PreJoinRoom;
