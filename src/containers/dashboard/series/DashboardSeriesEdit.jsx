import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";

import Container from "@/components/dashboard/Container";
import Select from "@/components/dashboard/Select";
import ImageUpload from "@/components/dashboard/ImageUpload";
import ToolTip from "@/components/dashboard/ToolTip";

import { getPostCategoryListFromServer, getPostTypeListFromServer, setFileToServer } from "@/services/dashboardService";

import tempCoverImage from '@IMAGES/tmp_comic2.jpg';
import tempTimelineImage from '@IMAGES/temp_seller_image.png';


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


const tempData = {
  thumbList: [tempTimelineImage, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ],
  tagList: ["#アクション", "#異世界"],
  summary: "No.13の災害後、人類はシェルターにバラバラに散った。<br />そして、奇妙なロボット”クモ”の出現によりシェルター周辺に防壁が張り<br />巡らされた。クモと戦う為、特殊チームレンジャーを創設したが、<br />クモの圧倒的な力には勝てず。そこで、レンジャーたちは人間と機械を融合する<br />アダマ手術を施し、クモに挑むが…果たしてレンジャーたちの行く末は..? <br />クモの正体、そして突如現れた謎の組織カンパニーヌルの正体とは…?!",
  title: "シェルターアーク・世界を滅ぼすものたち",
  category: "アクション",
  grade: "R18",
  status: "連載中",
  type: "マンガ",
  typeCode: "photo",
  main_image: tempCoverImage,
};


export default function DashboardUploadSeries(props) {
  const refType = useRef();
  const refR19 = useRef();
  const refCoverImage = useRef();
  const refTimeline  = useRef();
  const [ stateTypeList, setStateTypeList ] = useState(undefined);
  const [ stateCategoryList, setStateCategoryList ] = useState(undefined);
  const [ stateData, setStateData ] = useState(undefined);



  /**
  *
    파일을 서버에 업로드 
  *
  * @version 1.0.0
  * @author 2hyunkook
  * @param {file} 
  */
  const setCoverImage = async(file) => {
    // 폼데이터 구성
    const params = new FormData();
    
    // params.append("authorId", "");               
    // params.append("subscribeTierId", "");        
    // params.append("productId", "");
    params.append("type", "image");                 //image, video, binary
    params.append("usage", "cover");                //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append("loginRequired", true);
    params.append("licenseRequired", false);        //product 에 관련된 항목 추후 확인 필요
    params.append("rating", "G");                   //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", file);
    

    const {status, data: resultData} = await setFileToServer(params);
    
    //create sccuess
    if( status === 201 ){
      //set hash value to input tag 
      refCoverImage.current.setImageHash(resultData?.hash);
      
      //다음 timeline이 있다면 timeline 업로드
      
    }
    else{
      //error 처리
    }

    console.log("setFile result", status, resultData);
  };

  const setTypeList = async () => {
    const {status, data: result} = await getPostTypeListFromServer();

    if( status === 200 ){
      setStateTypeList(result?.types);
      
    }
    else{

    }

    console.log("setTypeList", status, result);
  };

  const setCategoryList = async (type) => {
    const {status, data: result} = await getPostCategoryListFromServer(type);
    
    if( status === 200 ){
      setStateCategoryList(result?.categories);

    }
    else{
      
    }
    
    console.log('setCategoryList', status, result);
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
    console.log("handlePreview", refR19);

    // refTitle.current.setStatusInInput({type: INPUT_STATUS.ERROR, error: "error"});
  };

  
  useEffect(() => {
    //get types
    setTypeList();
    setStateData(tempData);
  }, []);
  
  // series 정보 변경 후 작업
  useEffect(() => {
    //get detail info
    refR19.current.checked = true;
    refTimeline.current.setImage(tempTimelineImage, "");
    refCoverImage.current.setImage(stateData?.main_image, "");
  }, [stateData]);

  //type list 변경 후 작업
  useEffect(() => {
    refType.current.setSelected(tempData?.typeCode);
  }, [stateTypeList]);


  return (
    <Container
      type={"sub series bg moty1"}
      backTitle={text.series_edit}
      >

      <div className="inr-c">
        <div className="box_area">
          
          <section className="bbs_write">
            <div className="hd_titbox hide-m">
              <h2 className="h_tit1">{text.series_edit}</h2>
            </div>

            <div className="col">
              <h3 className="tit1">{text.title}</h3>
              <input name="title" type="text" className="inp_txt w100p" defaultValue={stateData?.title} />
            </div>

            <div className="col">
              <h3 className="tit1">{text.type}</h3>
              <Select 
                ref={refType}
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
              <textarea name="description" id="description" className="textarea1">{stateData?.summary}</textarea>
            </div>

            <div className="col">
              <h3 className="tit1">{text.setting_tag}</h3>
              <div className="inp_txt sch">
                <button type="button" className="btns" title="検索"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                <input type="text" className="" placeholder={text.tag_name} />
              </div>
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
                ref={refTimeline}
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
    </Container>
  );
}




