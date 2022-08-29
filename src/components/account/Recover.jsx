import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Border1pxGhost } from "@/styledMixins";
import { emailValidation } from "@/common/common";
import Input from "@COMPONENTS/Input";
import Button from "@COMPONENTS/Button";
import { recoverCheckSend } from "@/services/accountService";
import { useNavigate } from "react-router-dom";

/**
 * 이메일 입력 폼
 * @param {*} param0
 * @returns
 */
const Recover = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const handleEmail = useCallback(({ nativeEvent }) => {
    const { target } = nativeEvent;
    setEmail(target?.value);
  }, []);

  const handleVerifyCheck = useCallback(async () => {
    // navigate("/account/agreement")
    const { status, data } = await recoverCheckSend({ email: email });
    console.log(data);
    if (status === 200) {
      // Success
      navigate("/account/recover-check", {
        state: { email: email, expireOn: data?.expireOn },
      });
    } else if (status === 400) {
      // 코드 참조
      alert("코드 참조");
    } else if (status === 404) {
      // 코드 참조
      alert("코드 참조");
    } else if (status === 503) {
      // 코드 참조
      alert("코드 참조");
    }
  }, [email, navigate]);

  return (
    <AccountBoxDiv>
      <RecoverTitle>パスワードを再設定</RecoverTitle>
      <RecoverContent color="--bright-gray">
        ログインIDとして使用中の
      </RecoverContent>
      <RecoverContent color="--bright-gray">
        メールアドレスを入力してください。
      </RecoverContent>
      <RecoverInputDiv marginBottom="40px" marginTop="40px">
        <Input inputType="text" label="メールアドレス" callback={handleEmail} />
      </RecoverInputDiv>
      <Button
        text="次へ"
        color="--white"
        bgColor="--violet-blue"
        marginBottom="15px"
        callback={handleVerifyCheck}
      />
      <Button
        text="戻る"
        color="--violet-blue"
        bgColor="--white"
        bdColor="--violet-blue"
        marginBottom="15px"
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

const RecoverTitle = styled.h1`
  align-self: center;
  color: var(--vulcan);
  font-weight: 500;
  white-space: nowrap;
  font-family: var(--font-family-noto_sans_jp);
  font-size: var(--font-size-xxl);
  letter-spacing: 1px;
  font-style: normal;
  margin-bottom: 50px;
`;

const RecoverContent = styled.div`
  align-self: center;
  color: var(${(props) => props.color});
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  font-family: var(--font-family-noto_sans_jp);
  font-size: var(--font-size-m);
  letter-spacing: 1px;
  font-style: normal;
  margin-bottom: 10px;
`;

const RecoverInputDiv = styled.div`
  align-self: center;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
`;

export default Recover;