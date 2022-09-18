import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { getEulaVersion, updateAccount } from "@API/accountService";

const Agreement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;

  const [agree, setAgree] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState(false);

  const [eulaVersion, setEulaVersion] = useState(0);

  const markdownTxt = `
  # 마크다운 테스트
  ## MarkdownPreview
  
  ## Header 2
  
  ### Header 3
  A paragraph with *emphasis* and **strong importance**.
  
  > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
  
  * Lists
  * [ ] todo
  * [x] done
  
  A table:
  
  | a | b |
  | - | - |
  `;

  useEffect(() => {
    async function getEulaVersionFn() {
      const { data, status } = await getEulaVersion("user");
      if (status === 200) {
        const { version } = data.agreement;
        setEulaVersion(version);
      } else {
        setEulaVersion(null);
      }
    }
    getEulaVersionFn();
  }, []);

  const handleAgree = useCallback(async () => {
    if (!agree) {
      setIsErrorShow(true);
    } else {
      // patch account
      const params = {
        // email,
        // password,
        eulaVersion: eulaVersion,
        // privacyVersion: 0, // 기존 버전으로 바꿔야함
      };
      const response = await updateAccount(params);

      const { status } = response;
      if (status === 200) {
        navigate("/register-completed");
      } else if (status === 400) {
        alert("코드 참조");
      } else if (status === 409) {
        alert("이미 사용중인 메일 주소");
      } else if (status === 503) {
        alert("코드 참조");
      }
    }
  }, [agree, email, password, eulaVersion, navigate]);

  return (
    <>
      <h1 className="logo">利用規約</h1>
      <button className="btn_close">
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <div className="area_terms">
        <div className="in">
          <MarkdownPreview source={markdownTxt} />
        </div>
      </div>

      <div className={`${isErrorShow && !agree ? "error" : ""} inps`}>
        {/* <!-- 에러일때 추가 --> */}
        <label className="inp_checkbox">
          <input type="checkbox" onChange={(e) => setAgree(e.target.checked)} />
          <span>利用規約に同意します。</span>
        </label>

        {isErrorShow && !agree && (
          <p className="t_error">
            <span className="ico_error">必須項目をチェックしてください。</span>
          </p>
        )}
      </div>

      <div className="botm">
        <button type="submit" className="btn-pk mem blue" onClick={handleAgree}>
          <span>同意する</span>
        </button>
      </div>
    </>
  );
};
export default Agreement;
