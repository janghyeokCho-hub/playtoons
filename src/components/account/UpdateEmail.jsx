import React, { useCallback, useEffect, useState } from "react";

/**
 * 이메일 변경을 위해 새 이메일 입력 받는 폼
 */
const UpdateEmail = () => {
  /*
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

  const handleVerifySend = useCallback(async () => {
    const { status, data } = await verifyCheckResend({ email: newEmail });
    if (status === 200) {
      // SUCCESS
      setExpireOn(data?.expireOn);
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
      navigate("/");
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
  */

  return (
    <>
      <h1 className="logo">メールアドレスの変更</h1>
      <div className="txt">
        <p>新しいメールアドレスを入力してください。</p>
      </div>

      <div className="area_member">
        <div className="inbox ty2">
          <div className="col">
            <label for="id" className="h">
              新しいメールアドレス
            </label>
            <input type="text" id="id" className="inp_txt w100p" />
          </div>
        </div>
        <div className="btns">
          <button type="submit" className="btn-pk mem blue">
            <span>次へ</span>
          </button>
          <button type="submit" className="btn-pk mem blue2">
            <span>戻る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateEmail;
