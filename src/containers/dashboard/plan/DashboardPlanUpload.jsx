import React, { useCallback, useEffect } from "react";

import Container from "@/components/dashboard/Container";
import ImageUpload from "@/components/dashboard/ImageUpload";
import { useRef } from "react";
import {
  getErrorMessageFromResultCode,
  getFromDataJson,
  initButtonInStatus,
} from "@/common/common";
import {
  setFileToServer,
  setSubscribeTierToServer,
} from "@/services/dashboardService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "@/components/dashboard/Input";
import Textarea from "@/components/dashboard/Textarea";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import { showModal } from "@/modules/redux/ducks/modal";
import Price from "@/components/dashboard/Price";
import Button from "@/components/dashboard/Button";
import { setHeader } from "@/modules/redux/ducks/container";

const text = {
  add_plan: "支援を追加",
  product_name: "商品名",
  summary: "説明",
  image: "イメージ",
  drag_drop: "ドラッグ＆ドロップ",
  setting_age: "年齢設定",
  r_19: "R-19",
  price: "価格",
  register: "登録する",
  please_input_image: "イメージを入力してください。",
  please_input_product_name: "商品名を入力してください。",
  please_input_description: "説明を入力してください。",
  please_input_price: "価格を入力してください。",
  error_title: "お知らせ",
};

export default function DashboardPlanUpload(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myAuthors = useSelector(({ post }) => post?.authorMine?.authors);
  const refForm = useRef();
  const refProductName = useRef();
  const refDescription = useRef();
  const refThumbnailImage = useRef();
  const refRating = useRef();
  const refPrice = useRef();
  const refRegister = useRef();

  const handleContainer = useCallback(() => {
    const header = {
      headerClass: "header",
      containerClass: "container sub series bg moty1",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      backTitle: "支援を追加",
      activeMenu: "plan",
    };
    dispatch(setHeader(header));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  //==============================================================================
  // function
  //==============================================================================
  const callbackThumbnailImage = () => {
    setSubscribeTier();
  };

  //==============================================================================
  // api
  //==============================================================================
  /**
  *
    파일을 서버에 업로드 
  *
  * @version 1.0.0
  * @author 2hyunkook
  */
  const setImageToServer = async (ref, usage) => {
    // 폼데이터 구성
    const params = new FormData();
    params.append("authorId", "");
    params.append("subscribeTierId", "");
    params.append("productId", "");
    params.append("type", "image"); //image, video, binary
    params.append("usage", usage); //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append("loginRequired", false); //언제 체크해서 보내는건지?
    params.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
    params.append("rating", refRating.current.checked ? "R-18" : "G"); //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", ref.current.getImageFile());

    const { status, data: resultData } = await setFileToServer(params);
    console.log("setFile result", status, resultData);
    //create sccuess
    if (status === 201) {
      ref.current.setImageValueToInputTag(resultData?.hash);
    } else {
      //error 처리
      initButtonInStatus(refRegister);
      ref.current.setError(String(status + resultData));
    }
  };

  /**
  *
    plan upload 
  *
  * @version 1.0.0
  * @author 2hyunkook
  */
  const setSubscribeTier = async () => {
    //필드 확인
    if (refProductName.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refProductName.current.setError(text.please_input_product_name);
      return;
    }
    if (refDescription.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refDescription.current.setError(text.please_input_description);
      return;
    }
    if (refPrice.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refPrice.current.setError(text.please_input_price);
      return;
    }

    let json = getFromDataJson(refForm);
    json = {
      ...json,
      tier: 0,
      authorId: myAuthors[0].id,
      status: "enabled",
      price: parseInt(refPrice.current.getValue()),
    };

    const { status, data } = await setSubscribeTierToServer(json);
    console.log("setSubscribeTier", status, data);
    if (status === 201) {
      dispatch(
        showModal({
          title: text.error_title,
          contents: (
            <ErrorPopup message={"支援を追加しました。"} buttonTitle={"確認"} />
          ),
          callback: () => {
            navigate(`/dashboard/plan`);
          },
        })
      );
    } else {
      //error 처리
      dispatch(
        showModal({
          title: text.error_title,
          contents: (
            <ErrorPopup
              message={getErrorMessageFromResultCode(data)}
              buttonTitle={"確認"}
            />
          ),
        })
      );
    }

    initButtonInStatus(refRegister);
  };

  //==============================================================================
  // event
  //==============================================================================

  const handleClickRegister = useCallback((event) => {
    //cover 이미지 업로드, thumbnail 업로드, series 업로드
    //upload 할 이미지가 없다면
    if (refThumbnailImage.current.getImageFile() === undefined) {
      initButtonInStatus(refRegister);
      refThumbnailImage.current.setError(text.please_input_image);
    } else {
      //이미지 업로드 후 image url
      setImageToServer(refThumbnailImage, "thumbnail");
    }
  }, []);

  //==============================================================================
  // render & hook
  //==============================================================================

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="box_area">
          <section className="bbs_write">
            <div className="hd_titbox hide-m">
              <h2 className="h_tit1">{text.add_plan}</h2>
            </div>

            <form ref={refForm}>
              <div className="col">
                <h3 className="tit1">{text.product_name}</h3>
                <Input
                  ref={refProductName}
                  type="text"
                  name="name"
                  className="inp_txt w100p"
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.summary}</h3>
                <Textarea
                  ref={refDescription}
                  name="description"
                  id=""
                  className="textarea1"
                ></Textarea>
              </div>

              <div className="col">
                <h3 className="tit1">{text.image}</h3>
                <ImageUpload
                  ref={refThumbnailImage}
                  className={"box_drag half"}
                  id={"filebox1"}
                  name={"thumbnailImage"}
                  text={text.drag_drop}
                  callback={callbackThumbnailImage}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.setting_age}</h3>
                <label className="inp_chktx">
                  <input type="checkbox" ref={refRating} />
                  <span>{text.r_19}</span>
                </label>
              </div>

              <div className="col">
                <h3 className="tit1">{text.price}</h3>
                <Price ref={refPrice} type="text" name="price" className="" />
              </div>
            </form>
          </section>

          <div id="btnReg" className="bbs_write_botm">
            <Button
              ref={refRegister}
              className={"btn-pk n blue"}
              text={text.register}
              onClick={handleClickRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
