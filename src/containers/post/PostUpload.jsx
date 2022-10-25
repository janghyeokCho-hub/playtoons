import React, { useRef, useEffect, useState, } from "react";

import PostContainer from "@/components/post/PostContainer";
import ToolTip from "@/components/dashboard/ToolTip";
import Select from "@/components/dashboard/Select";
import ImageUpload from "@/components/dashboard/ImageUpload";
import Tag from "@/components/dashboard/Tag";
import { setFileToServer } from "@/services/dashboardService";
import { getErrorMessageFromResultCode, getFromDataJson } from "@/common/common";
import { setPostToServer } from "@/services/postService";
import Type from "@/components/post/Type";
import Category from "@/components/dashboard/Category";
import { useDispatch, useSelector } from "react-redux";
import Series from "@/components/post/Series";
import { useNavigate } from "react-router-dom";
import Input from "@/components/dashboard/Input";
import { showModal } from "@/modules/redux/ducks/modal";
import ErrorPopup from "@/components/dashboard/ErrorPopup";


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
  please_input_content: '表紙を入力してください。',
  please_input_thumbnail: 'サムネイルを入力してください。',
  please_input_title: 'タイトルを入力してください。',
  please_input_number: '話を入力してください。',
  error_title: 'お知らせ',
};

const supportorList = [
  {
    name : "閲覧範囲（支援者）",
    id : "1",
    checked : true,
  },
  {
    name : "2hyunkook",
    id : "2",
    checked : false,
  },
  {
    name : "yoon",
    id : "3",
    checked : false,
  }
];

export default function UploadPost(props) {
  const [stateSupportorList, setStateSupportorList] = useState(undefined);
  const [stateType, setStateType] = useState(undefined);
  const myAuthors = useSelector(({post}) => post?.authorMine?.authors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refTitle = useRef();
  const refNumber = useRef();
  const refContents = useRef();
  const refThumbnail = useRef();
  const refTags = useRef();
  const refForm = useRef();

  //==============================================================================
  // function
  //==============================================================================

  const callbackThumbnailImageAfterUpload = (imageInfo) => {
    //[post] '/post' upload
    setPost();
  };

  const callbackContentImageAfterUpload = (imageInfo) => {
    //thumbnailImage upload
    if( refThumbnail.current.getImageFile() === undefined ){
      refThumbnail.current.setError( text.please_input_thumbnail );
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
    params.append('authorId', myAuthors[0].id);               
    params.append('subscribeTierId', '');        
    params.append('productId', '');
    params.append('usage', usage);                  //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append('type', 'image');                 //image, video, binary
    params.append('loginRequired', false);          //언제 체크해서 보내는건지?
    params.append('licenseRequired', false);        //product 에 관련된 항목 추후 확인 필요
    params.append('rating', 'G');                   //G, PG-13, R-15, R-17, R-18, R-18G
    params.append('file', ref.current.getImageFile());
    
    const {status, data: resultData} = await setFileToServer(params);
    console.log('setFile result', status, resultData);
    
    //create sccuess
    if( status === 201 ){
      ref.current.setImageValueToInputTag(resultData?.hash);
    }
    else{
      //error 처리
      ref.current.setError( status + getErrorMessageFromResultCode(resultData) );
    }
  };

  const setPost = async () => {

    //필드 확인 
    if( refTitle.current.isEmpty() ){
			refTitle.current.setError( text.please_input_title );
			return;
		}

    if( refNumber.current.isEmpty() ){
			refNumber.current.setError( text.please_input_description );
			return;
		}

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
      // authorId: '1',       
      authorId: myAuthors[0].id,       
      rating: 'G',
      status: 'enabled',
      typeId: stateType.id,
      tagIds: refTags.current.getTagsJsonObject(),
    };
    
    console.log('setPost josn', json);

    const {status, data} = await setPostToServer(json);
    console.log('setPost', status, data);
    
    if( status === 201 ){
      dispatch(
        showModal(
          {
            title: text.error_title, 
            contents: <ErrorPopup message={'投稿登録しました。'} buttonTitle={'確認'} />, 
            callback: ()=> {navigate(`/dashboard/post`)}
          }
        )
      );
    }
    else{
      dispatch(
        showModal(
          {
            title: text.error_title, 
            contents: <ErrorPopup message={getErrorMessageFromResultCode(data)} buttonTitle={'確認'} />, 
          }
        )
      );
    }
    
  };

  //==============================================================================
  // event
  //==============================================================================
  const handleClickType = (typeItem) => {
    setStateType(typeItem);
  };
  
  const handleClickItemSubscribeTier = (event) => {
    console.log('handleClickItemSubscribeTier', event);
    
  };

  const handleClickPreview = (event) => {
    
  };
  
  const handleClickRegister = (event) => {
    if( refContents.current.getImageFile() === undefined ){
      refContents.current.setError( text.please_input_content );
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
      className={"sub post"}
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
                <Series
                  name={'seriesId'}
                  className={'select1 w100'}
                  />
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
                <Input ref={refTitle} type="text" className="inp_txt w100p" name={"title"} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.episode}</h3>
                <Input ref={refNumber} type="text" className="inp_txt w100p" name={"number"}/>
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
                  name={"tagIds"}
                  className={"inp_txt sch"}
                  placeholder={text.tag_name} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.support_user}</h3>
                <Select 
                  name={"subscribeTierId"}
                  className={"select1 wid1"}
                  dataList={stateSupportorList}
                  handleItemClick={handleClickItemSubscribeTier} />
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


