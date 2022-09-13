import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";

const Agreement = () => {
  const { state } = useLocation();
  const code = state?.code || "user";

  const [eulaContent, setEulaContent] = useState(null);

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
    const getEulaContent = async () => {};

    if (!eulaContent) {
      getEulaContent();
    }
  }, [code, eulaContent]);

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

      <div className="inps error">
        {/* <!-- 에러일때 추가 --> */}
        <label className="inp_checkbox">
          <input type="checkbox" />
          <span>利用規約に同意します。</span>
        </label>

        <p className="t_error">
          <span className="ico_error">必須項目をチェックしてください。</span>
        </p>
        {/* <!-- 에러일때 추가 --> */}
      </div>

      <div className="botm">
        <button type="submit" className="btn-pk mem blue">
          <span>同意する</span>
        </button>
      </div>
    </>
  );
};
export default Agreement;
