import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "@/components/dashboard/Container";
import Select from "@/components/dashboard/Select";
import ImageUpload from "@/components/dashboard/ImageUpload";
import ToolTip from "@/components/dashboard/ToolTip";

import { getPostCategoryListFromServer, getPostTypeListFromServer, setFileToServer, setSeriesToServer } from "@/services/dashboardService";
import { getFromDataJson, } from "@/common/common";
import Tag from "@/components/dashboard/Tag";


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

export default function DashboardUploadSeries(props) {
  const refR19 = useRef();
  const refCoverImage = useRef();
  const refTimelineImage = useRef();
  const refForm = useRef();
  const refTags = useRef();
  const [ stateTypeList, setStateTypeList ] = useState(undefined);
  const [ stateCategoryList, setStateCategoryList ] = useState(undefined);
  const navigate = useNavigate();


  /**
  *
     cover, timeline 이미지 업로드 완료 후 series 작성
  *
  * @version 1.0.0
  * @author 2hyunkook
  * @param {*} props
  * @return
  */
  const callbackTimeline = () => {
    console.log('callbackTimeline');
    
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
      tags: refTags.current.getTagsJsonObject(),
      rating: getRating(),
      keyword: "",
      status: "enabled",
      authorId: ""
    };

    delete json[''];
    console.log("post/series", json);
    setSeries(json);
  };

  const callbackCoverImage = () => {
    console.log('callbackCoverImage');
    //upload 할 이미지가 있다면
    if( refTimelineImage.current.getImageFile() === undefined ){
      callbackTimeline();
    }
    else{
      setImageToServer(refTimelineImage, 'thumbnail');
    }
  };

  const getRating = () => {
    return refR19.current.checked ? 'R-18' : 'G';
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
  const setImageToServer = async(ref, usage) => {
    // 폼데이터 구성
    const params = new FormData();
    params.append("authorId", "");               
    params.append("subscribeTierId", "");        
    params.append("productId", "");
    params.append("type", "image");                 //image, video, binary
    params.append("usage", usage);                //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append("loginRequired", false);          //언제 체크해서 보내는건지?
    params.append("licenseRequired", false);        //product 에 관련된 항목 추후 확인 필요
    params.append("rating", getRating());                   //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", ref.current.getImageFile());
    
    console.log("set file params", params);

    const {status, data: resultData} = await setFileToServer(params);
    console.log("setFile result", status, resultData);
    
    //create sccuess
    if( status === 201 ){
      ref.current.setImageValueToInputTag(resultData?.hash);
    }
    else{
      //error 처리
    }

  };

  const getTypeList = async () => {
    const {status, data: result} = await getPostTypeListFromServer();

    if( status === 200 ){
      setStateTypeList(result?.types);
    }
    else{
      //error 처리
    }
  };
  
  const getCategoryList = async (type) => {
    const {status, data: result} = await getPostCategoryListFromServer(type);
    console.log('setCategoryList', status, result);
    
    if( status === 200 ){
      setStateCategoryList(result?.categories);
    }
    else{
      //error 처리
      
    }
    
  };

  const setSeries = async (params) => {
    const {status, data: result} = await setSeriesToServer(JSON.stringify(params));
    console.log('setSeries', status, result);
    
    if( status === 201 ){
      if( window.confirm('series 등록에 성공했습니다.') ){
        navigate('/dashboard/series');
      }
    }
    else{
      //error 처리
    }
    
  };

  //==============================================================================
  // handler
  //==============================================================================

  
  const handleItemClickType = (item) => {
    getCategoryList(item.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    //cover 이미지 업로드, thumbnail 업로드, series 업로드
    //upload 할 이미지가 없다면 
    if( refCoverImage.current.getImageFile() === undefined ){
      callbackCoverImage();
    }
    else{
      //이미지 업로드 후 image url 
      setImageToServer(refCoverImage, 'cover');
    }
  };

  const handlePreview = (e) => {
    console.log("handlePreview", refR19);
  };

  //==============================================================================
  // render
  //==============================================================================

  useEffect(() => {
    //get types
    getTypeList();
  }, []);

  //get category at first time
  useEffect(() => {
    if( stateTypeList !== undefined ){
      getCategoryList(stateTypeList[0].code);
    }
  }, [stateTypeList]);

  return (
    <Container
      type={"sub series bg moty1"}
      backTitle={text.register_series}
      >

      <div className="inr-c">
        <div className="box_area">
          <form ref={refForm} >
          
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
                <label className="inp_chktx"><input ref={refR19} name="rating" type="checkbox" /><span>{text.r_19}</span></label>
              </div>

              <div className="col">
                <h3 className="tit1">{text.summary}</h3>
                <textarea name="description" id="description" className="textarea1"></textarea>
              </div>

              <div className="col">
                <h3 className="tit1">{text.setting_tag}</h3>
                <Tag 
                  ref={refTags}
                  name={"tags"}
                  className={"inp_txt sch"}
                  placeholder={text.tag_name} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.post_image}
                  <button type="button" className="btn_help" title="ヘルプ">
                    <ToolTip 
                      title={text.post_image} 
                      text={"text something123142"} />
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
                <h3 className="tit1">{text.timeline} 
                  <button type="button" className="btn_help" title="ヘルプ">
                    <ToolTip 
                        title={text.timeline} 
                        text={"text something123142"} />
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
            <button className="btn-pk n blue" onClick={handleRegister}>
              <div className="pull_width" >
                <span>{text.register}</span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </Container>
  );
}




