import React, { useRef, useEffect, useState, } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetailAction } from "@/modules/redux/ducks/post";
import SwiperContainer from "@/components/dashboard/Swiper";
import { SwiperSlide } from "swiper/react";

import PostContainer from "@/components/post/PostContainer";
import ToolTip from "@/components/dashboard/ToolTip";
import Select from "@/components/dashboard/Select";
import ImageUpload from "@/components/dashboard/ImageUpload";
import ThumbnailTimeline from "@/components/post/ThumbnailTimeline";
import Type from "@/components/post/Type";
import Category from "@/components/dashboard/Category";
import Tag from "@/components/dashboard/Tag";

import tempImage from '@IMAGES/tmp_comic2.jpg';
import tempImage2 from '@IMAGES/tmp_comic3.png';
import { editPostToServer, getPostSeriesMine } from "@/services/postService";
import Series from "@/components/post/Series";
import { getFileUrlFromServer } from "@/services/fileService";
import { setFileToServer } from "@/services/dashboardService";
import { getErrorMessageFromResultCode, getFromDataJson, initButtonInStatus } from "@/common/common";
import Input from "@/components/dashboard/Input";
import { showModal } from "@/modules/redux/ducks/modal";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import Button from "@/components/dashboard/Button";

const text = {
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
  edit: "編集",
  select_timeline: "サムネイル選択",
  preview: "プレビュー",
  btn_edit: "修正する",

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

const tempData = {
  seires : "",
  title: "シェルターアーク",
  episode: "12",
  timeline: {
    image : {
      preview : tempImage,
      filename: "webtoon_shorts.mp4",
      fileLenth: "32秒"
    },
    list: [
      {
        id: "1",
        preview: tempImage,
        filename: "webtoon_shorts.mp4",
        fileLenth: "32秒"
      },
      {
        id: "2",
        preview: tempImage2,
        filename: "123124_shorts.mp4",
        fileLenth: "52秒"
      },
      {
        id: "",
        preview: undefined,
        filename: "",
        fileLenth: ""
      },
      {
        id: "",
        preview: undefined,
        filename: "",
        fileLenth: ""
      },
      {
        id: "",
        preview: undefined,
        filename: "",
        fileLenth: ""
      },
      {
        id: "",
        preview: undefined,
        filename: "",
        fileLenth: ""
      },
      {
        id: "",
        preview: undefined,
        filename: "",
        fileLenth: ""
      },
      {
        id: "",
        preview: undefined,
        filename: "",
        fileLenth: ""
      },
      {
        id: "",
        preview: undefined,
        filename: "",
        fileLenth: ""
      },
     
    ]
  },
};

export default function PostEdit(props) {
  const [stateType, setStateType] = useState(undefined);
  const [stateSupportorList, setStateSupportorList] = useState(undefined);
  const [statePostInfo, setStatePostInfo] = useState(undefined);
  const dispatch = useDispatch();
  const reduxPostInfo = useSelector( ({post}) => post?.post );
  const reduxAuthors = useSelector( ({post}) => post?.authorMine.authors );
  const params = useParams('id');
  const navigate = useNavigate();
  const refForm = useRef();
  const refTitle = useRef();
  const refNumber = useRef();
  const refContents = useRef();
  const refThumbnailTimeline = useRef();
  const refTag = useRef();
  const refRegister = useRef();

  //==============================================================================
  // function
  //==============================================================================

  const callbackContents = () => {
     //upload 할 이미지가 없다면
     if( refThumbnailTimeline.current.getImageFile() === undefined ){
        callbackTimeline();
      }
      else{
        setImageToServer(refThumbnailTimeline, 'thumbnail');
      }
  };


  const callbackTimeline = () => {
    editPost();
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
  const setImageToServer = async(ref, usage) => {
    // 폼데이터 구성
    const params = new FormData();
    params.append("authorId", reduxAuthors[0].id);               
    params.append("subscribeTierId", "");        
    params.append("productId", "");
    params.append("type", "image");                 //image, video, binary
    params.append("usage", usage);                //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append("loginRequired", false);          //언제 체크해서 보내는건지?
    params.append("licenseRequired", false);        //product 에 관련된 항목 추후 확인 필요
    params.append("rating", reduxPostInfo?.rating);                   //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", ref.current.getImageFile());
    
    const {status, data: resultData} = await setFileToServer(params);
    
    //create sccuess
    if( status === 201 ){
      ref.current.setImageValueToInputTag(resultData?.hash);
    }
    else{
      //error 처리
      initButtonInStatus(refRegister);
      ref.current.setError( String(status + resultData) );
    }
  };

  /**
  *
    edit post
  *
  * @version 1.0.0
  * @author 2hyunkook
  */
  const editPost = async () => {

    //필드 확인
    if( refTitle.current.isEmpty() ){
      initButtonInStatus(refRegister);
			refTitle.current.setError( text.please_input_title );
			return;
		}
    if( refNumber.current.isEmpty() ){
      initButtonInStatus(refRegister);
			refNumber.current.setError( text.please_input_number );
			return;
		}
    if( refContents.current.checkToEmpty() ){
      initButtonInStatus(refRegister);
      refContents.current.setError( text.please_input_content );
      return;
    }
    if( refThumbnailTimeline.current.checkToEmpty() ){
      initButtonInStatus(refRegister);
      refThumbnailTimeline.current.setError( text.please_input_thumbnail );
      return;
    }

    let json = getFromDataJson(refForm);
    json = {
      ...json,
      postId: params.id,
      typeId: stateType.id,
      tagIds: refTag.current.getTagsJsonObject(),
      // rating: reduxPostInfo.rating,
      // status: reduxPostInfo.status,
      // issueId: '',
      // subscribeTierId: '',
      // outline: '',
      // number: '',
    };
    if( !json.content.length ){
      json = {
        ...json,
        content: reduxPostInfo.content,
      };
    }
    if( !json.thumbnailImage.length ){
      json = {
        ...json,
        thumbnailImage: reduxPostInfo.thumbnailImage,
      };
    }
    console.log('editPost json', json);

    const {status, data} = await editPostToServer(json);
    if( status === 200 ){
      dispatch(
        showModal(
          {
            title: text.error_title, 
            contents: <ErrorPopup message={'投稿を修正しました。'} buttonTitle={'確認'} />, 
            callback: ()=> {navigate(`/dashboard/post/detail/${params.id}`)}
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

    initButtonInStatus(refRegister);
  };
  //==============================================================================
  // event
  //==============================================================================

  const handleClickType = (typeItem) => {
    setStateType(typeItem);
  };
  
  const handleClickItemTimeline = (event) => {
    const id = event.currentTarget.getAttribute("id");
    let selectedItem;
    for( let i = 0; i < tempData.timeline.list.length; i++ ){
      if( tempData.timeline.list[i].id === id ){
        selectedItem = tempData.timeline.list[i];
        break;
      }
    }
   
    refThumbnailTimeline.current.setImage(selectedItem);
  };

  const handleClickPreview = (event) => {
    console.log('Preview', event);
    
  };
  
  const handleClickRegister = (event) => {
    //check contents
    //upload 할 이미지가 없다면
    if( refContents.current.getImageFile() === undefined ){
      callbackContents();
    }
    else{
      setImageToServer(refContents, 'post');
    }
  };

  //==============================================================================
  // Hook & render
  //==============================================================================


  const renderTimelineElements = () => {
    return tempData.timeline.list.map((item, index) => {
      return (
        <SwiperSlide key={index} className="cx swiper-slide" onClick={handleClickItemTimeline} id={item.id}>
          <div >
            <div className="cx_thumb">
              {
                item.preview !== undefined &&
                  <span><img src={item.preview} alt="timeline"/></span>
              }
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };
  
  useEffect(() => {
    //temp
    setStateSupportorList(supportorList);
    dispatch( getPostDetailAction(params) );
  }, []);
  
  useEffect(() => {
    setStatePostInfo(reduxPostInfo);
    setStateType(reduxPostInfo?.type);
  }, [dispatch, reduxPostInfo]);

  useEffect(() => {
    
  }, [statePostInfo]);

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
                <h2 className="h_tit1">{text.post_edit}</h2>
              </div>

              <div className="col">
                <h3 className="tit1">{text.series}</h3>
                <Series
                  name={'seriesId'}
                  className={'select1 w100'}
                  selected={reduxPostInfo?.seriesId}
                  />
              </div>

              <div className="col">
                <h3 className="tit1">{text.type}</h3>
                <div className="lst_txchk">
                  <Type
                    name={'typeId'}
                    callback={handleClickType}
                    selected={reduxPostInfo?.typeId}
                    disabled={true}   //2022.10.19 edit일때는 type이 변경되면 안된다.
                    />
                </div>
              </div>

              <div className="col">
                <h3 className="tit1">{text.category}</h3>
                <Category
                  name={'categoryId'}
                  className={'select1 wid1 '}
                  typeId={stateType?.id} 
                  selected={reduxPostInfo?.categoryId}
                  />
              </div>

              <div className="col">
                <h3 className="tit1">{text.title}</h3>
                <Input ref={refTitle} type="text" className="inp_txt w100p" name={"title"} defaultValue={reduxPostInfo?.title} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.episode}</h3>
                <Input ref={refNumber} type="text" className="inp_txt w100p" name={"number"} defaultValue={reduxPostInfo?.number} />
              </div>


              <div className="col">
                <h3 className="tit1">{text.contents} <button type="button" className="btn_help" title="ヘルプ"><ToolTip title={"Contents"} text={"afasfasdfads"} /></button></h3>
                <ImageUpload
                  ref={refContents}
                  id={"filebox2"}
                  className={"box_drag"}
                  name={"content"}                     
                  text={text.drag_drop}    
                  previewHash={statePostInfo?.content}
                  callback={callbackContents}
                  />
              </div>

              <div className="col">
                <h3 className="tit1">{text.tag}</h3>
                <Tag 
                  ref={refTag}
                  name={"tagIds"}
                  className={"inp_txt sch"}
                  list={reduxPostInfo?.tags}
                  placeholder={text.tag_name} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.support_user}</h3>
                <Select 
                  name={""}
                  className={"select1 wid1"}
                  dataList={stateSupportorList}
                   />
              </div>

              <div className="col">
                <h3 className="tit1">{text.timeline} <button type="button" className="btn_help" title="ヘルプ"><ToolTip title={"Contents"} text={"afasfasdfads"} /></button></h3>
                <ThumbnailTimeline
                  ref={refThumbnailTimeline}
                  id={"filebox1"}                     
                  name={"thumbnailImage"}
                  previewHash={reduxPostInfo?.thumbnailImage}
                  textDragNDrop={text.drag_drop}    
                  textInputMessage={text.input_image}     
                  textEdit={text.edit}
                  callback={callbackTimeline}
                  />
              </div>

              <div className="col">
                <h3 className="tit1">{text.select_timeline}</h3>
                <div className="lst_comic2 pd1">
                  <SwiperContainer 
                    className={"mySwiper2"}
                    slidesPerView={4}
                    breakpoints={{
                        0: {
                          slidesPerView: 4.3,
                          spaceBetween: 12,
                        },
                        1000: {
                          slidesPerView: 5,
                          spaceBetween: 12,
                        },
                        1400: {
                          slidesPerView: 6,
                          spaceBetween: 16,
                        },
                      }}
                    list={ renderTimelineElements } />
                </div>
              </div>
            </section>

            <div className="bbs_write_botm">
              <div className="btn-pk n blue2" onClick={handleClickPreview}><span>{text.preview}</span></div>
              <Button ref={refRegister} className={'btn-pk n blue'} text={text.btn_edit} onClick={handleClickRegister} />
            </div>
          </form>

        </div>
      </div>

    </PostContainer>
  );
}



