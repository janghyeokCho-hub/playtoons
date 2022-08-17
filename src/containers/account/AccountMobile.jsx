import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/pro-light-svg-icons";
import LoginMobile from "@COMPONENTS/auth/LoginMobile";

//angle-right-light

const AccountMobile = () => {
  return (
    <Container className="container-center-horizontal">
      <Header>
        <BackIconDiv>
          <FontAwesomeIcon
            icon={faAngleLeft}
            width={12}
            height={24}
            size="xl"
          />
        </BackIconDiv>
      </Header>
      <LoginMobile />
    </Container>
  );
};

const Container = styled.div``;

const Header = styled.div`
  width: 100%;
  height: 40px;
  background-color: var(--white);
  border-bottom: 1px solid rgba(221, 225, 229, 1);
  display: flex;
`;

const BackIconDiv = styled.div`
  margin-left: 15px;
  align-self: center;
  height: 24px;
  width: 24px;
  display: flex;
`;

export default AccountMobile;
