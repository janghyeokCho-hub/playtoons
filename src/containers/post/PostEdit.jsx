import React, { useRef, useEffect, useState, } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";


import PostContainer from "@/components/post/PostContainer";
import ToolTip from "@/components/dashboard/ToolTip";
import Select from "@/components/dashboard/Select";
import ImageUpload from "@/components/dashboard/ImageUpload";
import ThumbnailTimeline from "@/components/post/ThumbnailTimeline";

import tempImage from '@IMAGES/tmp_comic2.jpg';
import tempImage2 from '@IMAGES/tmp_comic3.png';
import SwiperContainer from "@/components/dashboard/Swiper";
import { SwiperSlide } from "swiper/react";
import Type from "@/components/post/Type";
import Category from "@/components/dashboard/Category";
import Tag from "@/components/dashboard/Tag";
import { useParams } from "react-router-dom";
import { getPostDetailFromServer } from "@/services/postService";
import { useDispatch, useSelector } from "react-redux";
import post, { getPostDetailAction } from "@/modules/redux/ducks/post";

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
  const postInfo = useSelector( ({post}) => post?.post );
  const params = useParams('id');
  const refContents = useRef();
  const refThumbnailTimeline = useRef();
  const refTag = useRef();
  const refType = useRef();
  const refFrom = useRef();


  //==============================================================================
  // event
  //==============================================================================

  const handleClickType = (typeItem) => {
    console.log('ItemType', typeItem);
    setStateType(typeItem);
  };
  
  const handleClickItemCategory = (event) => {
    console.log('ItemCategory', event);
    
  };

  const handleClickItemTimeline = (event) => {
    const id = event.currentTarget.getAttribute("id");
    let selectedItem;
    for( let i = 0; i < statePostInfo.timeline.list.length; i++ ){
      if( statePostInfo.timeline.list[i].id === id ){
        selectedItem = statePostInfo.timeline.list[i];
        break;
      }
    }
   
    refThumbnailTimeline.current.setImage(selectedItem);
  };

  const handleClickPreview = (event) => {
    console.log('Preview', event);
    
  };
  
  const handleClickRegister = (event) => {
    console.log('Register', event);
    return false;
  };

  //==============================================================================
  // Hook & render
  //==============================================================================


  const renderTimelineElements = () => {
    return statePostInfo?.timeline.list.map((item, index) => {
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
    setStatePostInfo({
      ...tempData,
      title: postInfo.title
    });
  }, [dispatch, postInfo]);

  useEffect(() => {
    
  }, [statePostInfo]);

  return (
    <PostContainer
      type={"sub post"}
      headerType={"postUpload"}
      headerClassName={"ty1"} >

      <div className="inr-c">
        <div className="box_area bdn">
          
          <form ref={refFrom}>
            <section className="bbs_write">
              <div className="hd_titbox">
                <h2 className="h_tit1">{text.post_edit}</h2>
              </div>

              <div className="col">
                <h3 className="tit1">{text.series}</h3>
                <input type="text" name={"series"} className="inp_txt w100p" />
              </div>

              <div className="col">
                <h3 className="tit1">{text.type}</h3>
                <div className="lst_txchk">
                  <Type
                    ref={refType}
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
                <input type="text" className="inp_txt w100p" name={"title"} defaultValue={statePostInfo?.title} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.episode}</h3>
                <input type="text" className="inp_txt w100p" name={"episode"} defaultValue={statePostInfo?.episode} />
              </div>


              <div className="col">
                <h3 className="tit1">{text.contents} <button type="button" className="btn_help" title="ヘルプ"><ToolTip title={"Contents"} text={"afasfasdfads"} /></button></h3>
                <ImageUpload
                  ref={refContents}
                  id={"filebox2"}
                  className={"box_drag"}
                  name={"contents"}                     
                  text={text.drag_drop}    
                  />
              </div>

              <div className="col">
                <h3 className="tit1">{text.tag}</h3>
                <Tag 
                  ref={refTag}
                  name={"tags"}
                  className={"inp_txt sch"}
                  placeholder={text.tag_name} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.support_user}</h3>
                <Select 
                  name={"supportor"}
                  className={"select1 wid1"}
                  dataList={stateSupportorList}
                  handleItemClick={handleClickItemCategory} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.timeline} <button type="button" className="btn_help" title="ヘルプ"><ToolTip title={"Contents"} text={"afasfasdfads"} /></button></h3>
                <ThumbnailTimeline
                  ref={refThumbnailTimeline}
                  id={"filebox1"}                     
                  name={"timeline"}
                  image={statePostInfo?.timeline.image}          
                  textDragNDrop={text.drag_drop}    
                  textInputMessage={text.input_image}     
                  textEdit={text.edit}
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
              <div className="btn-pk n blue" onClick={handleClickRegister}><span>{text.register}</span></div>
            </div>
          </form>

        </div>
      </div>

    </PostContainer>
  );
}



