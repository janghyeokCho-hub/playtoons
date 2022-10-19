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
import { getFromDataJson } from "@/common/common";

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
  const refContents = useRef();
  const refThumbnailTimeline = useRef();
  const refTag = useRef();
  const refForm = useRef();

  //==============================================================================
  // function
  //==============================================================================

  const callbackContents = () => {
    console.log('callbackContents');
     //upload 할 이미지가 없다면
     if( refThumbnailTimeline.current.getImageFile() === undefined ){
        callbackTimeline();
      }
      else{
        setImageToServer(refThumbnailTimeline, 'thumbnail');
      }
  };


  const callbackTimeline = () => {
    console.log('callbackTimeline');
    
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
  * @param {file} 
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
      ref.current.setError(status);
    }
  };

  const editPost = async () => {
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

    if( !json.thumbnailImage.length ){
      json = {
        ...json,
        thumbnailImage: reduxPostInfo.thumbnailImage
      };
    }

    console.log('editPost json', json);

    const {status, data} = await editPostToServer(json);
    
    if( status === 200 ){
      if( window.confirm('投稿を修正しました。') ){
        navigate(`/dashboard/post/detail/${params.id}`);
      }
    }
    else{
      //temp
      alert( String(status, data) );
    }
    
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
    //test
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
                    disabled={true} 
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
                <input type="text" className="inp_txt w100p" name={"title"} defaultValue={reduxPostInfo?.title} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.episode}</h3>
                <input type="text" className="inp_txt w100p" name={"number"} defaultValue={reduxPostInfo?.number} />
              </div>


              <div className="col">
                <h3 className="tit1">{text.contents} <button type="button" className="btn_help" title="ヘルプ"><ToolTip title={"Contents"} text={"afasfasdfads"} /></button></h3>
                <ImageUpload
                  ref={refContents}
                  id={"filebox2"}
                  className={"box_drag"}
                  name={""}                     
                  text={text.drag_drop}    
                  // previewHash={statePostInfo?.thumbnailImage}
                  callback={callbackContents}
                  />
              </div>

              <div className="col">
                <h3 className="tit1">{text.tag}</h3>
                <Tag 
                  ref={refTag}
                  name={"tagIds"}
                  className={"inp_txt sch"}
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
                  // image={statePostInfo?.timeline.image}          
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
              <div className="btn-pk n blue" onClick={handleClickRegister}><span>{text.btn_edit}</span></div>
            </div>
          </form>

        </div>
      </div>

    </PostContainer>
  );
}



