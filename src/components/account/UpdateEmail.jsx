import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title3, Border1pxGhost } from "@/styledMixins";
import Input from "@COMPONENTS/Input";
import Button from "@COMPONENTS/Button";
import { verifyCheckResend, verifyCheck } from "@/services/accountService";
import moment from "moment";
import Timer from "@COMPONENTS/Timer";

/**
 * 이메일 변경을 위해 새 이메일 입력 받는 폼
 */
const UpdateEmail = () => {
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState(null);
  const [code, setCode] = useState(null);
  const [expireOn, setExpireOn] = useState(null);
  const [countTime, setCountTime] = useState(0);
  const [verifyIsShow, setVerifyIsShow] = useState(false);

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  /**
   * @todo 성공시 이전 페이지로 가야함
   */
  const handleVerifySend = useCallback(async () => {
    const { status, data } = await verifyCheckResend({ email: newEmail });
    if (status === 200) {
      // SUCCESS
      setExpireOn(data?.expireOn);
      navigate("/");
    } else if (status === 400) {
      // 코드 참조
      alert("코드 참조");
    } else if (status === 403) {
      // 사용할 수 없는 이메일 주소
      alert("사용할 수 없는 이메일 주소");
    } else if (status === 404) {
      // 코드 참조
      alert("코드 참조");
    } else if (status === 503) {
      // 코드 참조
      alert("코드 참조");
    }
  }, [newEmail]);

  const handleVerifyCheck = useCallback(async () => {
    const { status } = await verifyCheck({ code: code });
    if (status === 200) {
      // SUCCESS
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
  }, [code]);

  useEffect(() => {
    if (expireOn) {
      setCountTime(moment(expireOn).diff(moment(), "seconds") || 0);
      setVerifyIsShow(true);
    }

    return () => {
      setCountTime(0);
      setVerifyIsShow(false);
    };
  }, [expireOn]);

  return (
    <AccountBoxDiv>
      <UpdateEmailTitle>メールアドレスの変更</UpdateEmailTitle>
      <UpdateEmailContent>
        {(verifyIsShow && "宛に認証用メールを送信しました。") ||
          "新しいメールアドレスを入力してください。"}
      </UpdateEmailContent>
      <UpdateEmailInputDiv>
        <Input
          inputType="text"
          label="新しいメールアドレス"
          fontWeight={500}
          callback={handleNewEmailChange}
          disabled={verifyIsShow}
        />

        {verifyIsShow && (
          <Input
            inputType="text"
            label="認証コード"
            fontWeight={500}
            callback={handleCodeChange}
          />
        )}

        {verifyIsShow && <Timer countSec={countTime} />}
      </UpdateEmailInputDiv>
      <Button
        text={(verifyIsShow && "確認する") || "次へ"}
        color="--white"
        bgColor="--violet-blue"
        borderRadius={20}
        marginTop={30}
        callback={() =>
          verifyIsShow ? handleVerifyCheck() : handleVerifySend()
        }
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

const UpdateEmailTitle = styled.h1`
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

const UpdateEmailContent = styled.div`
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

const UpdateEmailInputDiv = styled.div`
  align-self: center;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
`;

export default UpdateEmail;
