import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";

import ToolTip from "@/components/dashboard/ToolTip";
import Select from "@/components/dashboard/Select";
import ImageUpload from "@/components/dashboard/ImageUpload";
import Tag from "@/components/dashboard/Tag";
import { setFileToServer } from "@/services/dashboardService";
import {
  getErrorMessageFromResultCode,
  getFromDataJson,
  getShowEditor,
  initButtonInStatus,
  showOneButtonPopup,
} from "@/common/common";
import { setPostToServer } from "@/services/postService";
import Type from "@/components/post/Type";
import Category from "@/components/dashboard/Category";
import { useDispatch, useSelector } from "react-redux";
import Series from "@/components/post/Series";
import { useNavigate } from "react-router-dom";
import Input from "@/components/dashboard/Input";
import Button from "@/components/dashboard/Button";
import { setContainer } from "@/modules/redux/ducks/container";
import { getAuthorMineAction, initSeriesAction, setSeriesAction } from "@/modules/redux/ducks/post";

import DraftEditor from "@/components/post/DraftEditor";
import Textarea from "@/components/dashboard/Textarea";

const text = {
  upload_post: "投稿する",
  post_edit: "投稿を修正",
  series: "シリーズ",
  type: "タイプ",
  category: "カテゴリ",
  title: "タイトル",
  episode: "話",
  outline: "あらすじ",
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
  please_input_content: "コンテンツを入力してください。",
  please_input_thumbnail: "サムネイルを入力してください。",
  please_input_title: "タイトルを入力してください。",
  please_input_number: "話を入力してください。",
  please_input_outline: "あらすじを入力してください。",
  please_input_category: "カテゴリを入力してください。",
  error_title: "お知らせ",
  done_upload: "投稿登録しました。",
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

export default function UploadPost(props) {
  const [stateSupportorList, setStateSupportorList] = useState(undefined);
  // const [stateSeries, setStateSeries] = useState(undefined);
  const [stateType, setStateType] = useState(undefined);
  const reduxAuthors = useSelector(({ post }) => post?.authorMine?.authors);
  const reduxSeries = useSelector(({ post }) => post?.series);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refForm = useRef();
  const refType = useRef();
  const refTitle = useRef();
  const refNumber = useRef();
  const refOutline = useRef();
  const refContents = useRef();
  const refEditor = useRef();
  const refThumbnail = useRef();
  const refTags = useRef();
  const refRegister = useRef();

  //==============================================================================
  // header
  //==============================================================================
  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header ty1",
      containerClass: "container sub post",
      isHeaderShow: true,
      isMenuShow: false,
      headerType: "postUpload",
      menuType: null,
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
  const initType = () => {
    //일회성 포스트
    if (reduxSeries?.id === undefined) {
      refType.current.setDisabled(false);
      //click event가 아닌 경우에만
      if (stateType.checked === false) {
        refType.current.setSelectedForEmptySeries();
      }
    } else {
      refType.current.setSelected(reduxSeries.type);
      setStateType(reduxSeries.type);
    }
  };

  const getRatingToSeriesInfo = () => {
    return reduxSeries?.id === undefined ? "G" : reduxSeries?.rating;
  };

  const getTypeId = () => {
    return reduxSeries?.type === undefined ? stateType?.id : reduxSeries?.type.id;
  };

  const getCategoryId = (json) => {
    return json.categoryId === "" ? reduxSeries?.category.id : json.categoryId;
  };
  

  const callbackThumbnailImageAfterUpload = (imageInfo) => {
    //[post] '/post' upload
    setPost();
  };

  const callbackContentImageAfterUpload = (imageInfo) => {
    //thumbnailImage upload
    if (refThumbnail.current.getImageFile() === undefined) {
      initButtonInStatus(refRegister);
      refThumbnail.current.setError(text.please_input_thumbnail);
    } else {
      setImageToServer(refThumbnail, "thumbnail");
    }
  };

  //==============================================================================
  // api
  //==============================================================================
  const setImageToServer = async (ref, usage) => {
    // 폼데이터 구성
    const params = new FormData();
    params.append("authorId", reduxAuthors[0].id);
    params.append("subscribeTierId", "");
    params.append("productId", "");
    params.append("usage", usage); //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append("type", "image"); //image, video, binary
    params.append("loginRequired", 'post' === usage); //언제 체크해서 보내는건지?
    params.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
    params.append("rating", getRatingToSeriesInfo()); //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", ref.current.getImageFile());

    const { status, data: resultData } = await setFileToServer(params);
    console.log("setFile result", status, resultData);

    //create sccuess
    if (status === 201) {
      ref.current.setImageValueToInputTag(resultData?.hash);
    } else {
      //error 처리
      initButtonInStatus(refRegister);
      ref.current.setError(status + getErrorMessageFromResultCode(resultData));
    }
  };

  const setPost = async () => {
    //필드 확인
    let json = getFromDataJson(refForm);

    if (refTitle.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refTitle.current.setError(text.please_input_title);
      return;
    }

    if( json.categoryId === '' && reduxSeries?.category === undefined ){
      initButtonInStatus(refRegister);
      showOneButtonPopup( dispatch, text.please_input_category );
      return;
    }

    if (refOutline.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refOutline.current.setError(text.please_input_outline);
      return;
    }
    

    // if (refNumber.current.isEmpty()) {
    //   initButtonInStatus(refRegister);
    //   refNumber.current.setError(text.please_input_description);
    //   return;
    // }

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
    json = {
      ...json,
      authorId: reduxAuthors[0].id,
      rating: getRatingToSeriesInfo(),
      status: "enabled",
      typeId: getTypeId(),
      tagIds: refTags.current.getTagsJsonObject(),
      categoryId: getCategoryId(json),
      content: getShowEditor(stateType) ? refEditor.current.getContent() : json.content,
    };

    const { status, data } = await setPostToServer(json);

    if (status === 201) {
      showOneButtonPopup(dispatch, text.done_upload, () =>
        navigate(`/dashboard/post`)
      );
    } else {
      showOneButtonPopup(dispatch, data);
    }

    initButtonInStatus(refRegister);
  };

  //==============================================================================
  // event
  //==============================================================================
  const handleSeries = (series) => {
    //series response 후 callback
    dispatch( setSeriesAction(series) );
  };

  const handleType = (type) => {
    //type response 후 callback
    const tempType = reduxSeries?.type === undefined ? type : reduxSeries?.type;
    setStateType(tempType);
  };

  const handleClickType = (type) => {
    //type item click event
    setStateType(type);
  };

  const handleClickItemSubscribeTier = (event) => {
    //閲覧範囲（支援者） item click event
    console.log("handleClickItemSubscribeTier", event);
  };
  
  const handleClickPreview = (event) => {
    console.log("handleClickPreview", event);
  };

  const handleClickRegister = (event) => {
    if( getShowEditor(stateType) ){
      //undefined(일회성 post), novel, blog 타입
      if( refEditor.current.isEmpty() ){
        initButtonInStatus(refRegister);
        refEditor.current.setError(text.please_input_content);
      }
      else{
        callbackContentImageAfterUpload();
      }
    }
    else{
      //webtoon, illust, photo, music 타입
      if (refContents.current.getImageFile() === undefined) {
        initButtonInStatus(refRegister);
        refContents.current.setError(text.please_input_content);
      } else {
        //content upload
        setImageToServer(refContents, "post");
        //thumbnail upload  ->      execute in callbackContentImageAfterUpload
        //[post] '/post' upload ->  execute in callbackThumbnailImageAfterUpload
      }
    }
  };

  //==============================================================================
  // Hook && render
  //==============================================================================
  useLayoutEffect(() => {
    if (reduxAuthors === undefined) {
      dispatch( getAuthorMineAction() );
    }
  }, []);

  useEffect(() => {
    if (stateType !== undefined) {
      initType();
    }
  }, [reduxSeries, stateType]);

  useEffect(() => {
    //temp
    setStateSupportorList(supportorList);
    return () => {
      dispatch( initSeriesAction() );
    }
  }, []);

  return (
    <div className="inr-c">
      <div className="box_area bdn">
        <form ref={refForm}>
          <section className="bbs_write">
            <div className="hd_titbox">
              <h2 className="h_tit1">{text.upload_post}</h2>
            </div>
              

            <div className="col">
              <h3 className="tit1">{text.series}</h3>
              {reduxAuthors !== undefined && (
                <Series
                  name={"seriesId"}
                  className={"select1 w100"}
                  callback={handleSeries}
                />
              )}
            </div>

            <div className="col">
              <h3 className="tit1">{text.type}</h3>
              <div className="lst_txchk">
                <Type
                  ref={refType}
                  name={"typeId"}
                  callback={handleType}
                  onClick={handleClickType}
                />
              </div>
            </div>

            <div className="col">
              <h3 className="tit1">{text.category}</h3>
              <Category
                name={"categoryId"}
                className={"select1 wid1 "}
                typeId={stateType?.id}
                selected={reduxSeries?.category?.id}
                disabled={reduxSeries?.id !== undefined}
                disabledText={reduxSeries?.category?.name}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.title}</h3>
              <Input
                ref={refTitle}
                type="text"
                className="inp_txt w100p"
                name={"title"}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.episode}</h3>
              <Input
                ref={refNumber}
                type="text"
                className="inp_txt w100p"
                name={"number"}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.outline}</h3>
              <Textarea
                  ref={refOutline}
                  name="outline"
                  id="outline"
                  className="textarea1"
                ></Textarea>
            </div>

            <div className="col">
              <h3 className="tit1">
                {text.contents}{" "}
                <button type="button" className="btn_help" title="ヘルプ">
                  <ToolTip title={"Contents"} text={"afasfasdfads"} />
                </button>
              </h3>
              {
                ( getShowEditor(stateType) ) ? (
                  <DraftEditor ref={refEditor} className="draft_editor_container" placeholder={text.please_input_content}  />
                ) : (
                  <ImageUpload
                      ref={refContents}
                      id={"filebox2"}
                      className={"box_drag"}
                      name={"content"}
                      text={text.drag_drop}
                      // multiple={true}     //TODO mutlti 설정 
                      callback={callbackContentImageAfterUpload}
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
                ref={refTags}
                name={"tagIds"}
                className={"inp_txt sch"}
                placeholder={text.tag_name}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.support_user}</h3>
              <Select
                name={"subscribeTierId"}
                className={"select1 wid1"}
                dataList={stateSupportorList}
                handleItemClick={handleClickItemSubscribeTier}
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
            <div className="btn-pk n blue2" onClick={handleClickPreview}>
              <span>{text.preview}</span>
            </div>
            <Button
              ref={refRegister}
              className={"btn-pk n blue"}
              text={text.register}
              onClick={handleClickRegister}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
