import React, { useRef, useEffect, useState, } from "react";

import PostContainer from "@/components/post/PostContainer";
import ToolTip from "@/components/dashboard/ToolTip";
import Select from "@/components/dashboard/Select";
import ImageUpload from "@/components/dashboard/ImageUpload";
import Tag from "@/components/dashboard/Tag";
import { setFileToServer } from "@/services/dashboardService";
import { getFromDataJson } from "@/common/common";
import { setPostToServer } from "@/services/postService";
import Type from "@/components/post/Type";
import Category from "@/components/dashboard/Category";


const text = {
  upload_post: "投稿する",
  post_edit: "投稿を修正",
  series: "シリーズ",
  type: "タイプ",
  category: "カテゴリ",
  title: "タイトル",
  episode: "話",
  contents: "コンテンツ",  
  tag: "タグ",
  support_user: "閲覧範囲（支援者）",  
  timeline: "タイムラインのサムネイル",
  drag_drop: "ドラッグ＆ドロップ",
  preview: "プレビュー",
  register: "登録する",

  tag_name: "タグ名",
  type_webtoon: "ウェブトゥーン",
  type_article: "アーティクル",
  type_movie: "映像",
  label_can_not_edit: "編集不可",
  input_image: "置いてください。",
};

const supportorList = [
  {
    name : "閲覧範囲（支援者）",
    code : "1",
    checked : true,
  },
  {
    name : "2hyunkook",
    code : "2",
    checked : false,
  },
  {
    name : "yoon",
    code : "3",
    checked : false,
  }
];

export default function UploadPost(props) {
  const [stateSupportorList, setStateSupportorList] = useState(undefined);
  const [stateType, setStateType] = useState(undefined);
  const refContents = useRef();
  const refThumbnail = useRef();
  const refTags = useRef();
  const refForm = useRef();

  //==============================================================================
  // function
  //==============================================================================

  const callbackThumbnailImageAfterUpload = (imageInfo) => {
    console.log('callbackThumbnailImageAfterUpload');
    //[post] '/post' upload
    setPost();
  };

  const callbackContentImageAfterUpload = (imageInfo) => {
    console.log('callbackContentImageAfterUpload');
    //thumbnailImage upload
    if( refThumbnail.current.getImageFile() === undefined ){
      callbackThumbnailImageAfterUpload();
    }
    else{
      setImageToServer( refThumbnail, 'thumbnail' );
    }
  };

  //==============================================================================
  // api
  //==============================================================================
  const setImageToServer = async(ref, usage) => {
    // 폼데이터 구성
    const params = new FormData();
    params.append('authorId', '');               
    params.append('subscribeTierId', '');        
    params.append('productId', '');
    params.append('usage', usage);                  //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append('type', 'image');                 //image, video, binary
    params.append('loginRequired', false);          //언제 체크해서 보내는건지?
    params.append('licenseRequired', false);        //product 에 관련된 항목 추후 확인 필요
    params.append('rating', 'G');                   //G, PG-13, R-15, R-17, R-18, R-18G
    params.append('file', ref.current.getImageFile());
    
    console.log('set file params', params);
    
    const {status, data: resultData} = await setFileToServer(params);
    console.log('setFile result', status, resultData);
    
    //create sccuess
    if( status === 201 ){
      ref.current.setImageValueToInputTag(resultData?.hash);
    }
    else{
      //error 처리
    }
  };

  const setPost = async () => {
    /*
    {
      "authorId": "string",
      "typeId": "string",
      "categoryId": "string",
      "seriesId": "string",
      "issueId": "string",
      "subscribeTierId": "string",
      "title": "string",
      "thumbnailImage": "string",
      "startAt": "2022-10-06T00:27:39.823Z",
      "endAt": "2022-10-06T00:27:39.823Z",
      "content": "string",
      "tags": [
        "string"
      ],
      "rating": "string",
      "status": "pending"   //enabled, disabled, pending, suspended(사용자가 설정 못함)
    }
    */
    let json = getFromDataJson(refForm);
    json = {
      ...json,
      authorId: '',       //author id 확인 필요
      rating: 'G',
      status: 'enabled',
      tags: refTags.current.getTagsJsonObject(),
    };
    delete json[''];
    console.log('setPost josn', json);

    const {status, data} = await setPostToServer(json);
    console.log('setPost', status, data);
    
    if( status === 200 ){
      
    }
    else{
      
    }
    
  };

  //==============================================================================
  // event
  //==============================================================================
  const handleClickType = (typeItem) => {
    console.log('handleClickType', typeItem);
    setStateType(typeItem);
  };
  
  const handleClickItemCategory = (event) => {
    console.log('ItemCategory', event);
    
  };

  const handleClickPreview = (event) => {
    console.log('Preview', event);
    
  };
  
  const handleClickRegister = (event) => {
    if( refContents.current.getImageFile() === undefined ){
      callbackContentImageAfterUpload();
    }
    else{
      //content upload
      setImageToServer(refContents, 'post');
      //thumbnail upload  ->      execute in callbackContentImageAfterUpload
      //[post] '/post' upload ->  execute in callbackThumbnailImageAfterUpload
    }
  };

  //==============================================================================
  // Hook && render
  //==============================================================================

  useEffect(() => {
    //temp
    setStateSupportorList(supportorList);
  }, []);


  return (
    <PostContainer
      type={"sub post"}
      headerType={"postUpload"}
      headerClassName={"ty1"} >

      <div className="inr-c">
        <div className="box_area bdn">
          
          <form ref={refForm}>
            <section className="bbs_write">
              <div className="hd_titbox">
                <h2 className="h_tit1">{text.upload_post}</h2>
              </div>

              <div className="col">
                <h3 className="tit1">{text.series}</h3>
                <input type="text" name={"seriesId"} className="inp_txt w100p" />
              </div>

              <div className="col">
                <h3 className="tit1">{text.type}</h3>
                <div className="lst_txchk">
                  <Type
                    name={'typeId'}
                    callback={handleClickType}
                    />
                </div>
              </div>

              <div className="col">
                <h3 className="tit1">{text.category}</h3>
                <Category 
                  name={'categoryId'}
                  className={'select1 wid1 '}
                  typeId={stateType?.id} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.title}</h3>
                <input type="text" className="inp_txt w100p" name={"title"} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.episode}</h3>
                <input type="text" className="inp_txt w100p" name={"issueId"}/>
              </div>


              <div className="col">
                <h3 className="tit1">{text.contents} <button type="button" className="btn_help" title="ヘルプ"><ToolTip title={"Contents"} text={"afasfasdfads"} /></button></h3>
                <ImageUpload
                  ref={refContents}
                  id={"filebox2"}
                  className={"box_drag"}
                  name={"content"}                     
                  text={text.drag_drop}    
                  callback={callbackContentImageAfterUpload}
                  />
              </div>

              <div className="col">
                <h3 className="tit1">{text.tag}</h3>
                <Tag
                  ref={refTags}
                  name={"tags"}
                  className={"inp_txt sch"}
                  placeholder={text.tag_name} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.support_user}</h3>
                <Select 
                  name={"subscribeTierId"}
                  className={"select1 wid1"}
                  dataList={stateSupportorList}
                  handleItemClick={handleClickItemCategory} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.timeline} <button type="button" className="btn_help" title="ヘルプ"><ToolTip title={"Contents"} text={"afasfasdfads"} /></button></h3>
                <ImageUpload
                  ref={refThumbnail}
                  name={"thumbnailImage"}                     
                  id={"filebox1"}             
                  className={"box_drag"}        
                  text={text.drag_drop}    
                  callback={callbackThumbnailImageAfterUpload}
                  />
              </div>
            </section>

            <div className="bbs_write_botm">
              <div className="btn-pk n blue2" onClick={handleClickPreview}><span>{text.preview}</span></div>
              <div className="btn-pk n blue" onClick={handleClickRegister}><span>{text.register}</span></div>
            </div>
          </form>

        </div>
      </div>

    </PostContainer>
  );
}


