import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { useLocation } from "react-router-dom";
import Login from "@/components/auth/Login";
import Recovery from "@/components/account/Recovery";

import accountrecoverconfirm from "@IMAGES/accountrecoverconfirm.jpg";

const AccountBgImage = styled.div`
  height: 100vh;

  background: ${(props) => `url(${props.backgroundImage})` || ""} no-repeat
    center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const AccountLayout = () => {
  const location = useLocation();
  const [accountType, setAccountType] = useState();

  useEffect(() => {
    if (location.pathname.includes("login")) {
      setAccountType("LOGIN");
    }

    return () => {
      setAccountType(null);
    };
  }, []);

  const handleAccountType = useCallback((type) => {
    setAccountType(type);
  }, []);

  return (
    <div className="container-center-horizontal">
      <div className="authlogin screen">
        <Container backgroundImage={accountrecoverconfirm}>
          {accountType === "LOGIN" && (
            <Login handleAccountType={handleAccountType} />
          )}
          {accountType === "RECOVERY" && (
            <Recovery handleAccountType={handleAccountType} />
          )}
        </Container>
      </div>
    </div>
  );
};

const Container = styled.div`
  height: 100vh;
  background: ${(props) => `url(${props.backgroundImage})` || ""} no-repeat
    center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default AccountLayout;
