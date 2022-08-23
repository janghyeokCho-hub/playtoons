import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title3, Border1pxGhost } from "@/styledMixins";
import Input from "@COMPONENTS/Input";
import Button from "@COMPONENTS/Button";

/**
 * 비밀번호 변경을 위해 기존 비밀번호 입력 폼
 */
const UpdatePasswordCheck = () => {
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
          fontWeight={500}
          callback={handleOriginPwdChange}
        />
      </UpdatePasswordCheckInputDiv>
      <Button
        text="次へ"
        color="--white"
        bgColor="--violet-blue"
        borderRadius={20}
        marginTop={30}
      />
      <Button
        text="戻る"
        color="--violet-blue"
        bgColor="--white"
        borderRadius={20}
        marginTop={15}
        callback={() => navigate(-1)}
      />
    </AccountBoxDiv>
  );
};

const AccountBoxDiv = styled.div`
  ${Border1pxGhost}
  position: absolute;
  width: 480px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 8px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  align-self: center;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
`;

export default UpdatePasswordCheck;
