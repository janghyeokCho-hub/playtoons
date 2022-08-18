import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Border1pxGhost } from "@/styledMixins";
import Input from "@COMPONENTS/Input";
import Button from "@COMPONENTS/Button";
import { emailValidation } from "@COMMON/common";
import Timer from "@COMPONENTS/Timer";

/**
 * 이메일 입력 폼
 * @param {*} param0
 * @returns
 */
const PreVerify = ({
  handleAccountType,
  setIsShowType,
  email,
  handleEmail,
}) => {
  const handleSendEmail = useCallback(() => {
    const result = emailValidation(email);

    if (result) {
      // 이곳에서 이메일 번송
      setIsShowType("CHECK");
    } else {
      // Email 형식 X
    }
  }, [email]);

  return (
    <>
      <VerifyTitle>パスワードを再設定</VerifyTitle>
      <VerifyContent color="--bright-gray">
        ログインIDとして使用中の
      </VerifyContent>
      <VerifyContent color="--bright-gray">
        メールアドレスを入力してください。
      </VerifyContent>
      <VerifyInputDiv marginBottom="40px" marginTop="40px">
        <Input inputType="text" label="メールアドレス" callback={handleEmail} />
      </VerifyInputDiv>
      <Button
        text="次へ"
        color="--white"
        bgColor="--violet-blue"
        width={400}
        height={40}
        marginBottom={15}
        callback={handleSendEmail}
        borderRadius={20}
      />
      <Button
        text="戻る"
        color="--violet-blue"
        bgColor="--white"
        bdColor="--violet-blue"
        width={400}
        height={40}
        marginBottom={15}
        callback={() => handleAccountType("LOGIN")}
        borderRadius={20}
      />
    </>
  );
};

/**
 * 인증 번호 입력 폼
 * @param {*} param0
 * @returns
 */
const CheckVerify = ({ setIsShowType, email }) => {
  return (
    <>
      <VerifyTitle>パスワードを再設定</VerifyTitle>
      <VerifyContent color="--violet-blue">{email}</VerifyContent>
      <VerifyContent color="--bright-gray">
        宛に認証用メールを送信しました。
      </VerifyContent>

      <VerifyInputDiv marginBottom="10px" marginTop="40px">
        <Input inputType="text" label="認証コード" />
        <Timer />
      </VerifyInputDiv>
      <Button
        text="確認する"
        color="--white"
        bgColor="--violet-blue"
        width={400}
        height={40}
        marginBottom={15}
        callback={() => setIsShowType("CONFIRM")}
        borderRadius={20}
      />
      <Button
        text="戻る"
        color="--violet-blue"
        bgColor="--white"
        bdColor="--violet-blue"
        width={400}
        height={40}
        marginBottom={15}
        callback={() => setIsShowType("INPUT")}
      />
    </>
  );
};

/**
 * 패스워드 변경
 * @param {*} param0
 * @returns
 */
const VerifyConfirm = ({ setIsShowType, handleAccountType }) => {
  // パスワードを再設定
  return (
    <>
      <VerifyTitle>パスワードを再設定</VerifyTitle>

      <VerifyContent color="--bright-gray">
        ログインIDとして使用中の
      </VerifyContent>
      <VerifyContent color="--bright-gray">
        メールアドレスを入力してください。
      </VerifyContent>

      <VerifyInputDiv marginBottom="10px" marginTop="40px">
        <Input inputType="password" label="パスワード" />
        <Input inputType="password" label="パスワード確認" />
      </VerifyInputDiv>
      <Button
        text=">パスワード変更"
        color="--white"
        bgColor="--violet-blue"
        width={400}
        height={40}
        marginBottom={15}
        callback={() => handleAccountType("LOGIN")}
        borderRadius={20}
      />
      <Button
        text="戻る"
        color="--violet-blue"
        bgColor="--white"
        bdColor="--violet-blue"
        width={400}
        height={40}
        marginBottom={15}
        callback={() => setIsShowType("INPUT")}
        borderRadius={20}
      />
    </>
  );
};

const Verify = ({ handleAccountType }) => {
  /**
   * 이메일 인증 창 표시 Type
   * INPUT = 이메일 입력 폼
   * CHECK = 인증 코드 체크
   * CONFIRM = 비밀번호 입력 폼
   */
  const [isShowType, setIsShowType] = useState("INPUT");

  const [email, setEmail] = useState(null);
  const handleEmail = useCallback(({ nativeEvent }) => {
    const { target } = nativeEvent;
    setEmail(target?.value);
  }, []);

  return (
    <AccountBoxDiv>
      {isShowType === "INPUT" && (
        <PreVerify
          handleAccountType={handleAccountType}
          setIsShowType={setIsShowType}
          email={email}
          handleEmail={handleEmail}
        />
      )}
      {isShowType === "CHECK" && (
        <CheckVerify setIsShowType={setIsShowType} email={email} />
      )}
      {isShowType === "CONFIRM" && (
        <VerifyConfirm
          setIsShowType={setIsShowType}
          handleAccountType={handleAccountType}
        />
      )}
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

const VerifyTitle = styled.h1`
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

const VerifyContent = styled.div`
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

const VerifyInputDiv = styled.div`
  align-self: center;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
`;

export default Verify;
