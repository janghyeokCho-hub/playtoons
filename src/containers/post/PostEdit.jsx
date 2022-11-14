import SwiperContainer from "@/components/dashboard/SwiperContainer";
import { getPostDetailAction } from "@/modules/redux/ducks/post";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import Category from "@/components/dashboard/Category";
import ImageUpload from "@/components/dashboard/ImageUpload";
import Select from "@/components/dashboard/Select";
import Tag from "@/components/dashboard/Tag";
import ToolTip from "@/components/dashboard/ToolTip";
import Type from "@/components/post/Type";

import {
  checkLoginExpired,
  getFromDataJson,
  getShowEditor,
  initButtonInStatus,
  showOneButtonPopup
} from "@/common/common";
import Button from "@/components/dashboard/Button";
import Image from "@/components/dashboard/Image";
import Input from "@/components/dashboard/Input";
import Series from "@/components/post/Series";
import { setContainer } from "@/modules/redux/ducks/container";
import { getTimelineFromServer, setFileToServer } from "@/services/dashboardService";
import { editPostToServer, getPostIdMineFromServer } from "@/services/postService";
import DraftEditor from "@/components/post/DraftEditor";
import { clearUserData } from "@/utils/localStorageUtil";

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
  please_input_content: "コンテンツを入力してください。",
  please_input_thumbnail: "サムネイルを入力してください。",
  please_input_title: "タイトルを入力してください。",
  please_input_number: "話を入力してください。",
  error_title: "お知らせ",
  login_expired: '自動ログイン時間が過ぎました。',
};

const supportorList = [
  {
    name: "閲覧範囲（支援者）",
    id: "1",
    checked: true,
  },
  {
    name: "2hyunkook",
    id: "2",
    checked: false,
  },
  {
    name: "yoon",
    id: "3",
    checked: false,
  },
];


export default function PostEdit(props) {
  const [stateData, setStateData] = useState(undefined);
  const [stateSupportorList, setStateSupportorList] = useState(undefined);
  const [stateTimeline, setStateTimeline] = useState(undefined);
  const reduxAuthors = useSelector(({ post }) => post?.authorMine.authors);
  const reduxLoginTime = useSelector(({login}) => login?.loginSuccessTime);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refForm = useRef();
  const refTitle = useRef();
  const refNumber = useRef();
  const refContents = useRef();
  const refEditor = useRef();
  const refThumbnailTimeline = useRef();
  const refTag = useRef();
  const refRegister = useRef();

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header ty1",
      containerClass: "container sub post",
      isHeaderShow: true,
      isMenuShow: false,
      headerType: "postUpload",
      menuType: "DASHBOARD",
      isDetailView: true,
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

  const callbackContents = () => {
    //upload 할 이미지가 없다면
    if (refThumbnailTimeline.current.getImageFile() === undefined) {
      callbackTimeline();
    } else {
      setImageToServer(refThumbnailTimeline, "thumbnail");
    }
  };

  const callbackTimeline = () => {
    editPost();
  };

  //==============================================================================
  // api
  //==============================================================================
  const getPostDetail = async () => {
    const { status, data } = await getPostIdMineFromServer(params);
    console.log("getPostDetail", status, data);

    if (status === 200) {
      setStateData(data?.post);
    } else {
      showOneButtonPopup(dispatch, status + data);
    }
  };

  /**
    파일을 서버에 업로드 
  * @version 1.0.0
  * @author 2hyunkook
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
    params.append("rating", stateData?.rating); //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", ref.current.getImageFile());

    const { status, data: resultData } = await setFileToServer(params);

    //create sccuess
    if (status === 201) {
      ref.current.setImageValueToInputTag(resultData?.hash);
    } else {
      //error 처리
      initButtonInStatus(refRegister);
      ref.current.setError(String(status + resultData));
    }
  };

  /**
    edit post
  * @version 1.0.0
  * @author 2hyunkook
  */
  const editPost = async () => {
    //필드 확인
    let json = getFromDataJson(refForm);
    if (refTitle.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refTitle.current.setError(text.please_input_title);
      refTitle.current.focus();
      return;
    }

    if( getShowEditor(stateData.type) ){
      if( refEditor.current.isEmpty() ){
        initButtonInStatus(refRegister);
        refEditor.current.setError(text.please_input_content);
        return;
      }
    }
    else{
      if (refContents.current.checkToEmpty()) {
        initButtonInStatus(refRegister);
        refContents.current.setError(text.please_input_content);
        return;
      }
    }

    if (refThumbnailTimeline.current.checkToEmpty()) {
      initButtonInStatus(refRegister);
      refThumbnailTimeline.current.setError(text.please_input_thumbnail);
      return;
    }

    json = {
      ...json,
      postId: params.id,
      typeId: stateData?.type?.id,
      tagIds: refTag.current.getTagsJsonObject(),
      categoryId: json.categoryId === "" ? stateData?.category?.id : json.categoryId,
      content: getShowEditor(stateData.type) ? refEditor.current.getContent() : json.content,
      // rating: stateData.rating,
      // status: stateData.status,
      // issueId: '',
      // subscribeTierId: '',
      // outline: '',
      // number: '',
    };

    //이미지 변경이 없는 경우 기존 정보를 넣어준다.
    if (!json.content.length) {
      json = {
        ...json,
        content: stateData.content,
      };
    }

    if (!json.thumbnailImage.length) {
      json = {
        ...json,
        thumbnailImage: stateData.thumbnailImage,
      };
    }
    
    console.log("editPost json", json);

    const { status, data } = await editPostToServer(json);
    if (status === 200) {
      showOneButtonPopup(dispatch, "投稿を修正しました。", () => {
        navigate(`/dashboard/post/detail/${params.id}`);
      });
    } else {
      showOneButtonPopup(dispatch, data);
    }

    initButtonInStatus(refRegister);
  };

  const getTimeline = async () => {
    const params = new FormData();
    params.append('authorId', reduxAuthors[0].id);
    params.append('reduced', true);

    const { status, data } = await getTimelineFromServer(params);
    console.log("getTimeline", status, data);

    if (status === 200) {
      setStateTimeline(data);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };
  //==============================================================================
  // event
  //==============================================================================

  const handleClickItemTimeline = (event) => {
    //
    const id = event.currentTarget.getAttribute("id");
    let selectedItem = undefined;
    for( let i = 0; i < stateTimeline.posts.length; i++ ){
      if(  id === stateTimeline.posts[i].id ){
        selectedItem = stateTimeline.posts[i]
        break;
      }
    }

    refThumbnailTimeline.current.setThumbnailImage(selectedItem?.thumbnailImage);
  };

  const handleClickPreview = (event) => {
    console.log("Preview", event);
  };

  const handleClickRegister = () => {
    if( getShowEditor(stateData?.type) ){
      //undefined(일회성 post), novel, blog 타입
      if( refEditor.current.isEmpty() ){
        initButtonInStatus(refRegister);
        refEditor.current.setError(text.please_input_content);
      }
      else{
        callbackContents();
      }
    }
    else{
      //webtoon, illust, photo, music 타입
      //check contents
      //upload 할 이미지가 없다면
      if (refContents.current.getImageFile() === undefined) {
        callbackContents();
      } else {
        setImageToServer(refContents, "post");
      }
    }
  };

  //==============================================================================
  // Hook & render
  //==============================================================================

  const renderTimelineElements = () => {
    return stateTimeline?.posts?.map((item, index) => {
      return (
        <SwiperSlide
          key={index}
          className="cx swiper-slide"
          onClick={handleClickItemTimeline}
          id={item.id}
        >
          <div>
            <div className="cx_thumb">
              {item !== undefined && (
                <span>
                  <Image hash={item.thumbnailImage}  />
                </span>
              )}
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };

  useLayoutEffect(() => {
    checkLoginExpired( navigate, dispatch, text.login_expired, reduxLoginTime );
  }, []);

  useEffect(() => {
    getPostDetail();
    getTimeline();
    //temp
    setStateSupportorList(supportorList);
  }, []);

  useEffect(() => {
    // 가끔 html-to-draftjs.js:1 Uncaught TypeError: Cannot read properties of undefined (reading 'trim') 오류남 확인 필요
    if( stateData !== undefined ){
      if( refEditor !== undefined && getShowEditor(stateData?.type) ){
        refEditor.current.setContent( stateData?.content );
      }
    }
  }, [stateData]);

  return (
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
                name={"seriesId"}
                className={"select1 w100"}
                selected={stateData?.seriesId}
                disabled={true}
                disabledText={stateData?.series?.title}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.type}</h3>
              <div className="lst_txchk">
                <Type
                  name={"typeId"}
                  selected={stateData?.typeId}
                  disabled={true} //2022.10.19 edit일때는 type이 변경되면 안된다.
                />
              </div>
            </div>

            <div className="col">
              <h3 className="tit1">{text.category}</h3>
              <Category
                name={"categoryId"}
                className={"select1 wid1 "}
                typeId={stateData?.type?.id}
                selected={stateData?.categoryId}
                disabled={stateData?.seriesId !== null}
                disabledText={stateData?.category?.name}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.title}</h3>
              <Input
                ref={refTitle}
                type="text"
                className="inp_txt w100p"
                name={"title"}
                defaultValue={stateData?.title}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.episode}</h3>
              <Input
                ref={refNumber}
                type="text"
                className="inp_txt w100p"
                name={"number"}
                defaultValue={stateData?.number}
              />
            </div>

            <div className="col">
              <h3 className="tit1">
                {text.contents}{" "}
                <button type="button" className="btn_help" title="ヘルプ">
                  <ToolTip title={"Contents"} text={"afasfasdfads"} />
                </button>
              </h3>
              {
                ( getShowEditor(stateData?.type) ) ? (
                  <DraftEditor ref={refEditor} className="draft_editor_container" placeholder={text.please_input_content} />
                ) : (
                  <ImageUpload
                    ref={refContents}
                    id={"filebox2"}
                    className={"box_drag"}
                    name={"content"}
                    text={text.drag_drop}
                    previewHash={stateData?.content}
                    callback={callbackContents}
                  />
                )
              }
            </div>

            <div className="col">
              <h3 className="tit1">
                {text.tag}{" "}
                <button type="button" className="btn_help" title="ヘルプ">
                  <ToolTip
                    title={text.tag}
                    text={
                      "タグ入力は、老眼鏡アイコンクリックまたはエンタをご利用ください。"
                    }
                  />
                </button>
              </h3>
              <Tag
                ref={refTag}
                name={"tagIds"}
                className={"inp_txt sch"}
                list={stateData?.tags}
                placeholder={text.tag_name}
              />
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
              <h3 className="tit1">
                {text.timeline}{" "}
                <button type="button" className="btn_help" title="ヘルプ">
                  <ToolTip title={"Contents"} text={"afasfasdfads"} />
                </button>
              </h3>
              <ImageUpload
                ref={refThumbnailTimeline}
                id={"filebox1"}
                name={"thumbnailImage"}
                className={'box_drag'}
                renderType={'thumbnail'}
                previewHash={stateData?.thumbnailImage}
                text={text.drag_drop}
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
                    960: {
                      slidesPerView: 5,
                      spaceBetween: 12,
                    },
                    1400: {
                      slidesPerView: 6,
                      spaceBetween: 16,
                    },
                  }}
                  list={renderTimelineElements}
                />
              </div>
            </div>
          </section>

          <div className="bbs_write_botm">
            <div className="btn-pk n blue2" onClick={handleClickPreview}>
              <span>{text.preview}</span>
            </div>
            <Button
              ref={refRegister}
              className={"btn-pk n blue"}
              text={text.btn_edit}
              onClick={handleClickRegister}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
