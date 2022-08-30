import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title3 } from "@/styledMixins";
import Input from "@COMPONENTS/Input";
import Button from "@COMPONENTS/Button";

/**
 * 비밀번호 변경을 위해 기존 비밀번호 입력 폼
 */
const UpdatePasswordCheckMobile = () => {
  const navigate = useNavigate();
  const [originPwd, setOriginPwd] = useState(null);

  const handleOriginPwdChange = (e) => {
    setOriginPwd(e.target.value);
  };

  return (
    <AccountBoxDiv>
      <UpdatePasswordCheckTitle>パスワードの変更</UpdatePasswordCheckTitle>
      <UpdatePasswordCheckContent>
        既存のパスワードを入力してください。
      </UpdatePasswordCheckContent>
      <UpdatePasswordCheckInputDiv>
        <Input
          inputType="text"
          label="既存のパスワード"
          width="100%"
          fontWeight="500px"
          callback={handleOriginPwdChange}
        />
      </UpdatePasswordCheckInputDiv>
      <Button
        text="次へ"
        color="--white"
        bgColor="--violet-blue"
        width="100%"
        marginTop="30px"
      />
      <Button
        text="戻る"
        color="--violet-blue"
        bgColor="--white"
        width="100%"
        marginTop="15px"
        callback={() => navigate(-1)}
      />
    </AccountBoxDiv>
  );
};

const AccountBoxDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2em;
  align-items: center;
`;

const UpdatePasswordCheckTitle = styled.h1`
  ${Title3}
  align-self: center;
  color: var(--vulcan);
  font-weight: 500;
  white-space: nowrap;
  font-family: var(--font-family-noto_sans_jp);
  font-size: var(--font-size-xxl);
  letter-spacing: 1px;
  font-style: normal;
`;

const UpdatePasswordCheckContent = styled.div`
  align-self: center;
  color: var(${(props) => props.color});
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  font-family: var(--font-family-noto_sans_jp);
  font-size: var(--font-size-m);
  letter-spacing: 1px;
  font-style: normal;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const UpdatePasswordCheckInputDiv = styled.div`
  width: 100%;
  align-self: center;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
`;

export default UpdatePasswordCheckMobile;
