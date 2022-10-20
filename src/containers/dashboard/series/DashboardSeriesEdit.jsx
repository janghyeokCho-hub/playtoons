import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";

import Container from "@/components/dashboard/Container";
import Select from "@/components/dashboard/Select";
import ImageUpload from "@/components/dashboard/ImageUpload";
import ToolTip from "@/components/dashboard/ToolTip";

import { editPostSeriesToServer, getPostCategoryListFromServer, getPostTypeListFromServer, setFileToServer } from "@/services/dashboardService";

import tempCoverImage from '@IMAGES/tmp_comic2.jpg';
import tempTimelineImage from '@IMAGES/temp_seller_image.png';
import { useSelector } from "react-redux";
import Type from "@/components/dashboard/Type";
import Category from "@/components/dashboard/Category";
import Tag from "@/components/dashboard/Tag";
import { getFromDataJson, getRatingToChecked } from "@/common/common";
import { useNavigate, useParams } from "react-router-dom";
import { getPostIdMineFromServer } from "@/services/postService";


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
  const reduxSeriesDetail = useSelector(({dashboard}) => dashboard?.series );
  const reduxAuthors = useSelector( ({post}) => post?.authorMine?.authors );
  const navigate = useNavigate();
  const params = useParams('id');
  const refForm = useRef();
  const refTags = useRef();
  const refR19 = useRef();
  const refCoverImage = useRef();
  const refTimeline  = useRef();


  //==============================================================================
  // function
  //==============================================================================

  const setCheckedFromSeriesDetailInfo = () => {
    if( reduxSeriesDetail?.rating === 'R-18' ){
      refR19.current.checked = true;
    }
  };

  const getCheckedToSeriesDetail = () => {
      return reduxSeriesDetail.rating === 'R-18';
  };

  const callbackCoverImage = () => {
    //timeline 이미지 업로드
    //upload 할 이미지가 없다면 
    if( refTimeline.current.getImageFile() === undefined ){
      callbackTimelineImage();
    }
    else{
      //이미지 업로드 후 image hash 저장 
      setImage(refTimeline, 'thumbnail');
    }
  };

  const callbackTimelineImage = () => {
    //series 업로드
    editSeries();
  };

  
  //==============================================================================
  // api
  //==============================================================================
  
  const setImage = async(refImage, usage) => {
    // 폼데이터 구성
    const params = new FormData();
    
    params.append("authorId", reduxAuthors[0].id);               
    // params.append("subscribeTierId", "");        
    // params.append("productId", "");
    params.append("type", "image");                 //image, video, binary
    params.append("usage", usage);                  //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append("loginRequired", false);
    params.append("licenseRequired", false);        //product 에 관련된 항목 추후 확인 필요
    params.append("rating", getRatingToChecked(refR19));                   //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", refImage.current.getImageFile());

    const {status, data} = await setFileToServer(params);
    
    //create sccuess
    if( status === 201 ){
      //set hash value to input tag 
      //imageupload 컴포넌트에서 state가 저장되면 callback함수로 다음으로 진행
      refImage.current.setImageValueToInputTag(data?.hash);
    }
    else{
      //error 처리
      refImage.current.setError( String(status, data) );
    }
  };


  const editSeries = async () => {
    //"titleKana": "string",
    //"code": "string",
    //"labelId": "string",
    //"publisherId": "string",
    //"status": "pending",
    if( refCoverImage.current.checkToEmpty() ){
      refCoverImage.current.setError('サムネイルが必要です。');
      return false;
    }

    if( refTimeline.current.checkToEmpty() ){
      refTimeline.current.setError('サムネイルが必要です。');
      return false;
    }

    let json = getFromDataJson(refForm);
    json = {
      ...json,
      seriesId: params.id,
      rating: getRatingToChecked(refR19),
      tagIds: refTags.current.getTagsJsonObject(),
      typeId: reduxSeriesDetail?.type.id,
    };

    if( !json.coverImage.length ){
      json = {
        ...json,
        coverImage: reduxSeriesDetail?.coverImage,
      };
    }
    if( !json.thumbnailImage.length ){
      json = {
        ...json,
        thumbnailImage: reduxSeriesDetail?.thumbnailImage,
      };
    }


    console.log('editSeries json', json);
    const {status, data} = await editPostSeriesToServer(json);
    console.log('editSeries', status, data);
    
    if( status === 200 ){
      if( window.confirm('シリーズ修正しました。') ){
        navigate(`/dashboard/series/detail/${params.id}`);
      }
    }
    else{
      //error 처리
      alert( String(status, data) );
    }
  };
 
  //==============================================================================
  // event
  //==============================================================================
  const handleRegister = (e) => {
    //cover 이미지 업로드
    //upload 할 이미지가 없다면 
    if( refCoverImage.current.getImageFile() === undefined ){
      callbackCoverImage();
    }
    else{
      //이미지 업로드 후 image hash저장 
      setImage(refCoverImage, 'cover');
    }
  };

  const handlePreview = (e) => {
    console.log("handlePreview", refR19);
    
  };

  //==============================================================================
  // Hook & render
  //==============================================================================
  
  useEffect(() => {
    console.log('first', reduxSeriesDetail);
    setCheckedFromSeriesDetailInfo();
  }, [reduxSeriesDetail]);
  

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

            <form ref={refForm}>
              <div className="col">
                <h3 className="tit1">{text.title}</h3>
                <input name="title" type="text" className="inp_txt w100p" defaultValue={reduxSeriesDetail?.title} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.type}</h3>
                <Type
                  className={'select1 wid1'}
                  selected={reduxSeriesDetail?.type.id}
                  disabled={true}
                  disabledText={text.can_not_edit}
                  />
              </div>

              <div className="col">
                <h3 className="tit1">{text.category}</h3>
                <Category 
                  name={'categoryId'}
                  className={'select1 wid1'}
                  typeId={reduxSeriesDetail?.type.id}
                  selected={reduxSeriesDetail?.category.id}
                  />
              </div>

              <div className="col">
                <h3 className="tit1">{text.setting_adult}</h3>
                <label className="inp_chktx"><input ref={refR19} name="rating" type="checkbox" defaultChecked={getCheckedToSeriesDetail} /><span>{text.r_19}</span></label>
              </div>

              <div className="col">
                <h3 className="tit1">{text.summary}</h3>
                <textarea name="description" id="description" className="textarea1" defaultValue={reduxSeriesDetail?.description} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.setting_tag}</h3>
                <Tag
                  ref={refTags}
                  name={"tagIds"}
                  className={"inp_txt sch"}
                  placeholder={text.tag_name}
                  list={reduxSeriesDetail?.tags} />
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
                  previewHash={reduxSeriesDetail?.coverImage}
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
                  ref={refTimeline}
                  id={"filebox2"}
                  className={"box_drag"}
                  name={"thumbnailImage"}                     
                  text={text.drag_drop}    
                  previewHash={reduxSeriesDetail?.thumbnailImage}
                  callback={callbackTimelineImage}
                  />
              </div>
            </form>
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




