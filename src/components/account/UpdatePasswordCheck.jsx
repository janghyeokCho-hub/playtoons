import React, { useState } from "react";

/**
 * 비밀번호 변경을 위해 기존 비밀번호 입력 폼
 */
const UpdatePasswordCheck = () => {
  /*
  const navigate = useNavigate();
  const [originPwd, setOriginPwd] = useState(null);

  const handleOriginPwdChange = (e) => {
    setOriginPwd(e.target.value);
  };
  */

  return (
    <>
      <h1 class="logo">パスワードの変更</h1>
      <div class="txt">
        <p>既存のパスワードを入力してください。</p>
      </div>

      <div class="area_member">
        <div class="inbox ty2">
          <div class="col">
            <label for="id" class="h">
              既存のパスワード
            </label>
            <input type="text" id="id" class="inp_txt w100p" />
          </div>
        </div>
        <div class="btns">
          <button type="submit" class="btn-pk mem blue">
            <span>次へ</span>
          </button>
          <button type="submit" class="btn-pk mem blue2">
            <span>戻る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdatePasswordCheck;
