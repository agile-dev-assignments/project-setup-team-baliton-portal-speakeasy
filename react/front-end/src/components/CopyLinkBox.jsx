import { useState } from "react";
import styled from "styled-components";
import theme from "../theme";

const CopyLinkBox = ({ room }) => {
  const [linkCopied, setLinkCopied] = useState(false);
  return (
    <Container>
      <InviteContainer>
        <Header>Invite others</Header>
        <SubHeader>
          Copy and share join code with others to invite them. Code:{" "}
          <Bold>{room?.name}</Bold>
        </SubHeader>
      </InviteContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
`;
const InviteContainer = styled.div`
  border: 1px solid ${theme.colors.grey};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;
const Header = styled.h3`
  color: ${theme.colors.blueDark};
  margin: 0;
`;
const SubHeader = styled.p`
  text-align: center;
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.blueDark};
`;
const Bold = styled.span`
  font-weight: 600;
`;

export default CopyLinkBox;
