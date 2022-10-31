import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";

import Editor from "@/components/dashboard/Editor";
import Container from "@/components/dashboard/Container";
import Select from "@/components/dashboard/Select";
import ImageUpload from "@/components/dashboard/ImageUpload";
import ToolTip from "@/components/dashboard/ToolTip";

import {
  getPostCategoryListFromServer,
  getPostTypeListFromServer,
  setFileToServer,
} from "@/services/dashboardService";
import { useDispatch } from "react-redux";
import { setHeader } from "@/modules/redux/ducks/container";

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
};

export default function DashboardPostUpload(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refIsAdult = useRef();
  const refCoverImage = useRef();
  const [stateTypeList, setStateTypeList] = useState(undefined);
  const [stateCategoryList, setStateCategoryList] = useState(undefined);

  const handleContainer = useCallback(() => {
    const header = {
      headerClass: "header ty1",
      containerClass: "container sub post",
      isHeaderShow: true,
      isMenuShow: false,
      headerType: "postUpload",
      menuType: null,
      isDetailView: true,
      backTitle: "シリーズ登録",
    };
    dispatch(setHeader(header));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  /**
  *
    파일을 서버에 업로드 
  *
  * @version 1.0.0
  * @author 2hyunkook
  * @param {file} 
  */
  const setCoverImage = async (file) => {
    // 폼데이터 구성
    const params = new FormData();

    // params.append("authorId", "");
    // params.append("subscribeTierId", "");
    // params.append("productId", "");
    params.append("type", "image"); //image, video, binary
    params.append("usage", "cover"); //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append("loginRequired", true);
    params.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
    params.append("rating", "G"); //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", file);

    console.log("set file params", params);

    const { status, data: resultData } = await setFileToServer(params);

    //create sccuess
    if (status === 201) {
      //set hash value to input tag
      refCoverImage.current.setImageHash(resultData?.hash);

      //다음 timeline이 있다면 timeline 업로드
    } else {
      //error 처리
    }

    console.log("setFile result", status, resultData);
  };

  const setTypeList = async () => {
    const { status, data: result } = await getPostTypeListFromServer();

    if (status === 200) {
      setStateTypeList(result?.types);
    } else {
    }

    console.log("setTypeList", status, result);
  };

  const setCategoryList = async (type) => {
    const { status, data: result } = await getPostCategoryListFromServer(type);

    if (status === 200) {
      setStateCategoryList(result?.categories);
    } else {
    }

    console.log("setCategoryList", status, result);
  };

  const handleItemClickType = (item) => {
    setCategoryList(item.value);
  };

  const handleRegister = (e) => {
    console.log("handleRegister", refCoverImage.current.getImageFile());
    // refTitle.current.setStatusInInput({type: INPUT_STATUS.DEFAULT, error: "error"});

    //cover 이미지 업로드
    //cover 이미지 hash 값 저장
    //timeline 이미지 업로드
    //timeline 이미지 hash 값 저장
    //series 업로드
  };

  const handlePreview = (e) => {
    console.log("handlePreview", refIsAdult);

    // refTitle.current.setStatusInInput({type: INPUT_STATUS.ERROR, error: "error"});
  };

  useEffect(() => {
    //get types
    setTypeList();
  }, []);

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="box_area">
          <section className="bbs_write">
            <div className="hd_titbox hide-m">
              <h2 className="h_tit1">{text.register_series}</h2>
            </div>

            <div className="col">
              <h3 className="tit1">{text.title}</h3>
              <input name="title" type="text" className="inp_txt w100p" />
            </div>

            <div className="col">
              <h3 className="tit1">{text.type}</h3>
              <Select
                name={"typeId"}
                className={"select1 wid1"}
                dataList={stateTypeList}
                handleItemClick={handleItemClickType}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.category}</h3>
              <Select
                name={"categoryId"}
                className={"select1 wid1"}
                dataList={stateCategoryList}
                // handleItemClick={handleItemClickCategory}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.setting_adult}</h3>
              <label className="inp_chktx">
                <input name="rating" type="checkbox" />
                <span>{text.r_19}</span>
              </label>
            </div>

            <div className="col">
              <h3 className="tit1">{text.summary}</h3>
              <textarea
                name="description"
                id="description"
                className="textarea1"
              ></textarea>
            </div>

            <div className="col">
              <h3 className="tit1">{text.setting_tag}</h3>
              <div className="inp_txt sch">
                <button type="button" className="btns" title="検索">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input type="text" className="" placeholder={text.tag_name} />
              </div>
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
                id={"filebox2"}
                className={"box_drag"}
                name={"thumbnailImage"}
                text={text.drag_drop}
              />
            </div>
          </section>

          <div className="bbs_write_botm">
            <a className="btn-pk n blue2">
              <div className="pull_width" onClick={handlePreview}>
                <span>{text.preview}</span>
              </div>
            </a>
            <a className="btn-pk n blue">
              <div className="pull_width" onClick={handleRegister}>
                <span>{text.register}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
