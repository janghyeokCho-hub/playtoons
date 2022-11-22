import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "@/components/dashboard/ImageUpload";
import ToolTip from "@/components/dashboard/ToolTip";
import {
  setFileToServer,
  setSeriesToServer,
} from "@/services/dashboardService";
import {
  getErrorMessageFromResultCode,
  getFromDataJson,
  getRatingToChecked,
  initButtonInStatus,
  showOneButtonPopup,
} from "@/common/common";
import Tag from "@/components/dashboard/Tag";
import Type from "@/components/dashboard/Type";
import Category from "@/components/dashboard/Category";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "@/modules/redux/ducks/modal";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import Input from "@/components/dashboard/Input";
import Textarea from "@/components/dashboard/Textarea";
import Button from "@/components/dashboard/Button";
import { setContainer } from "@/modules/redux/ducks/container";

const text = {
  series_management: "シリーズ詳細",
  register_series: "シリーズ登録",
  series_edit: "シリーズ修正",
  post_image: "表紙",
  timeline: "タイムラインのサムネイル",
  drag_drop: "ドラッグ＆ドロップ",
  title: "タイトル",
  type: "タイプ",
  category: "カテゴリ",
  setting_tag: "タグ設定",
  register: "登録する",
  summary: "説明",
  setting_adult: "年齢設定",
  r_19: "R-19",
  preview: "プレビュー",
  can_not_edit: "編集不可",
  tag_name: "タグ名",
  input_image: "置いてください。",
  select_timeline: "サムネイル選択",
  please_input_cover: "表紙を入力してください。",
  please_input_thumbnail: "サムネイルを入力してください。",
  please_input_title: "タイトルを入力してください。",
  please_input_description: "説明を入力してください。",
  error_title: "お知らせ",
  done_upload: 'シリーズ登録しました。',
};

export default function DashboardUploadSeries(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxAuthors = useSelector(({ post }) => post?.authorMine?.authors);
  const [stateType, setStateType] = useState(undefined);
  const refTitle = useRef();
  const refDescription = useRef();
  const refR19 = useRef();
  const refCoverImage = useRef();
  const refTimelineImage = useRef();
  const refForm = useRef();
  const refTags = useRef();
  const refRegister = useRef();

  //==============================================================================
  // header
  //==============================================================================
  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container sub series bg moty1",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      backTitle: "シリーズ登録",
      activeMenu: "series",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  //==============================================================================
  // function
  //==============================================================================

  /**
     cover, timeline 이미지 업로드 완료 후 series 작성
  * @version 1.0.0
  * @author 2hyunkook
  * @param {*} props
  * @return
  */
  const callbackTimeline = () => {
    //필드 확인
    if (refTitle.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refTitle.current.setError(text.please_input_title);
      return;
    }

    if (refDescription.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refDescription.current.setError(text.please_input_description);
      return;
    }

    //call series 작성 api
    // "title": "string",
    // "typeId": "string",
    // "categoryId": "string",
    // "rating": "string",
    // "description": "string",
    // "tags": [
    //   "string"
    // ],
    // "coverImage": "string",
    // "thumbnailImage": "string",

    // "keyword": "string",
    // "status": "string",          //enabled, disabled, pending, suspended(사용자가 설정 못함)
    // "authorId": "string"
    // "titleKana": "string",
    // "code": "string",
    // "labelId": "string",
    // "publisherId": "string",
    let json = getFromDataJson(refForm);
    json = {
      ...json,
      coverImage: refCoverImage.current.getImageInfo().value,
      thumbnailImage: refTimelineImage.current.getImageInfo().value,
      tagIds: refTags.current.getTagsJsonObject(),
      rating: getRatingToChecked(refR19),
      status: "enabled",
      authorId: reduxAuthors[0].id, //author 가 아니면 못옴
    };

    setSeries(json);
  };

  const callbackCoverImage = () => {
    //upload 할 이미지가 있다면
    if (refTimelineImage.current.getImageFile() === undefined) {
      initButtonInStatus(refRegister);
      refTimelineImage.current.setError(text.please_input_thumbnail);
    } else {
      refTimelineImage.current.setError(undefined);
      setImageToServer(refTimelineImage, "thumbnail");
    }
  };

  //==============================================================================
  // api function
  //==============================================================================
  /**
  *
    파일을 서버에 업로드 
  *
  * @version 1.0.0
  * @author 2hyunkook
  * @param {file} 
  */
  const setImageToServer = async (ref, usage) => {
    // 폼데이터 구성
    const params = new FormData();
    params.append("authorId", reduxAuthors[0].id);
    params.append("subscribeTierId", "");
    params.append("productId", "");
    params.append("type", "image"); //image, video, binary
    params.append("usage", usage); //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append("loginRequired", false); //언제 체크해서 보내는건지?
    params.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
    params.append("rating", getRatingToChecked(refR19));
    params.append("file", ref.current.getImageFile());

    const { status, data: resultData } = await setFileToServer(params);

    //create sccuess
    if (status === 201) {
      ref.current.setImageValueToInputTag(resultData?.hash);
    } else {
      //error 처리
      initButtonInStatus(refRegister);
      showOneButtonPopup(dispatch, resultData );
    }
  };

  const setSeries = async (params) => {
    const { status, data: result } = await setSeriesToServer(
      JSON.stringify(params)
    );

    if (status === 201) {
      showOneButtonPopup(dispatch, text.done_upload, () => navigate("/dashboard/series"));
    } else {
      //error 처리
      showOneButtonPopup(dispatch, result );
    }

    initButtonInStatus(refRegister);
  };

  //==============================================================================
  // handler
  //==============================================================================

  const handleItemClickType = (item) => {
    setStateType(item);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    //cover 이미지 업로드, thumbnail 업로드, series 업로드
    //upload 할 이미지가 없다면
    if (refCoverImage.current.getImageFile() === undefined) {
      initButtonInStatus(refRegister);
      refCoverImage.current.setError(text.please_input_cover);
    } else {
      //이미지 업로드 후 image url
      refCoverImage.current.setError(undefined);
      setImageToServer(refCoverImage, "cover");
    }
  };

  const handlePreview = (e) => {
    console.log("handlePreview", refR19);
  };

  //==============================================================================
  // render
  //==============================================================================

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="box_area">
          <form ref={refForm}>
            <section className="bbs_write">
              <div className="hd_titbox hide-m">
                <h2 className="h_tit1">{text.register_series}</h2>
              </div>

              <div className="col">
                <h3 className="tit1">{text.title}</h3>
                <Input
                  ref={refTitle}
                  name="title"
                  type="text"
                  className="inp_txt w100p"
                />
              </div>

              <div className="col type">
                <h3 className="tit1">{text.type}</h3>
                <Type
                  name={"typeId"}
                  className={"select1 wid1"}
                  callback={handleItemClickType}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.category}</h3>
                <Category
                  name={"categoryId"}
                  className={"select1 wid1"}
                  typeId={stateType?.id}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.setting_adult}</h3>
                <label className="inp_chktx">
                  <input ref={refR19} name="rating" type="checkbox" />
                  <span>{text.r_19}</span>
                </label>
              </div>

              <div className="col">
                <h3 className="tit1">{text.summary}</h3>
                <Textarea
                  ref={refDescription}
                  name="description"
                  id="description"
                  className="textarea1"
                ></Textarea>
              </div>

              <div className="col">
                <h3 className="tit1">
                  {text.setting_tag}{" "}
                  <button type="button" className="btn_help" title="ヘルプ">
                    <ToolTip
                      title={text.setting_tag}
                      text={
                        "タグ入力は、老眼鏡アイコンクリックまたはエンタをご利用ください。"
                      }
                    />
                  </button>
                </h3>
                <Tag
                  ref={refTags}
                  name={"tagIds"}
                  className={"inp_txt sch"}
                  placeholder={text.tag_name}
                />
              </div>

              <div className="col">
                <h3 className="tit1">
                  {text.post_image}
                  <button type="button" className="btn_help" title="ヘルプ">
                    <ToolTip
                      title={text.post_image}
                      text={"text something123142"}
                    />
                  </button>
                </h3>
                <ImageUpload
                  ref={refCoverImage}
                  id={"filebox1"}
                  className={"box_drag small"}
                  name={"coverImage"}
                  text={text.drag_drop}
                  callback={callbackCoverImage}
                />
              </div>

              <div className="col">
                <h3 className="tit1">
                  {text.timeline}
                  <button type="button" className="btn_help" title="ヘルプ">
                    <ToolTip
                      title={text.timeline}
                      text={"text something123142"}
                    />
                  </button>
                </h3>
                <ImageUpload
                  ref={refTimelineImage}
                  id={"filebox2"}
                  className={"box_drag"}
                  name={"thumbnailImage"}
                  text={text.drag_drop}
                  callback={callbackTimeline}
                />
              </div>
            </section>
          </form>

          <div className="bbs_write_botm">
            <button className="btn-pk n blue2" onClick={handlePreview}>
              <div className="pull_width">
                <span>{text.preview}</span>
              </div>
            </button>
            <Button
              ref={refRegister}
              className={"btn-pk n blue"}
              text={text.register}
              onClick={handleRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
