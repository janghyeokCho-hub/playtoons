import {
  checkLoginExpired,
  getDateYYYYMMDD,
  getShowEditor,
  showOneButtonPopup,
} from "@/common/common";
import IconWithText from "@/components/dashboard/IconWithText";
import Image from "@/components/dashboard/Image";
import Pagination from "@/components/dashboard/MyPagination";
import ProfileSpan from "@/components/dashboard/ProfileSpan";
import ReactionButtons from "@/components/dashboard/ReactionButtons";
import SeeMoreComent from "@/components/dashboard/SeeMoreComent";
import { setContainer } from "@/modules/redux/ducks/container";
import { getReactionFromServer } from "@/services/dashboardService";
import { getPostIdMineFromServer } from "@/services/postService";
import { clearUserData } from "@/utils/localStorageUtil";
import { faEllipsisVertical } from "@fortawesome/pro-light-svg-icons";
import {
  faCommentQuote,
  faEye,
  faHeart,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const text = {
  page_title: "投稿詳細",
  name: "シリーズ名",
  title: "タイトル",
  episode_count: "話数",
  public_date: "公開日",
  end_date: "終了日",
  status: "状態",
  reaction_management: "リアクション管理",
  modify: "修正する",
  register: "登録",
  good: "いいね",
  coment: "コメント",
  fix: "固定",
  report: "通報",
  delete: "削除",
  icon: "アイコン",
  sing_in_to_post: "リアクションする",
  modal_title: "お知らせ",
  register_coment: "コメントを登録しました。",
  please_input_coment: "コメントを入力してください。",
  do_pinned: "固定しました。",
  do_off_pinned: "固定解除しました。",
  do_good: "いいねしました。",
  do_off_good: "いいねをキャンセルしました。",
  do_coment: "コメントしました。",
  do_report: "通報しました。",
  do_delete: "削除しました。",
  can_do_myself: "本人のみ削除可能です。",
  do_you_delete: "削除しますか？",
  cancel: "キャンセル",
  see_more_coment: "コメントをもっと見る",
  login_expired: '自動ログイン時間が過ぎました。',
};

export default function DashboardPostDetail() {
  const [statePinnedReactions, setStatePinnedReactions] = useState(undefined);
  const [stateReactions, setStateReactions] = useState({meta: undefined, reactions: []});
  const [stateData, setStateData] = useState(undefined);
  const reduxLoginTime = useSelector(({login}) => login?.loginSuccessTime);
  const reduxAuthors = useSelector(({post}) => post.authorMine?.authors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams("");

  //==============================================================================
  // header
  //==============================================================================

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container sub post bg",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      backTitle: text.page_title,
      activeMenu: "post",
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
  const getHtmlElementFromHtmlString = () => {
    if (stateData !== undefined) {
      return parse(stateData.content);
    }
  };

  const getReactionAllList = () => {
    getPinnedReactions();
    getReactions(1);
  };

  //==============================================================================
  // api
  //==============================================================================
  const getPostDetail = async () => {
    const { status, data } = await getPostIdMineFromServer(params);

    if (status === 200) {
      setStateData(data?.post);
    } else {
      showOneButtonPopup(dispatch, status + data);
    }
  };

  const getReactions = async (page, isAdd) => {
    const formData = new FormData();
    formData.append("postId", params.id);
    formData.append("page", page);
    formData.append("limit", 5);

    const { status, data } = await getReactionFromServer(formData);

    if (status === 200) {
      if( isAdd ){
        let list = stateReactions.reactions;
        list.push.apply(list, data.reactions);
        setStateReactions({
          meta: data.meta,
          reactions: list
        });
      }
      else{
        setStateReactions(data);
      }
    } else {
      showOneButtonPopup(dispatch, status + data);
    }
  };

  const getPinnedReactions = async () => {
    const formData = new FormData();
    formData.append("postId", params.id);
    formData.append("pinned", true);

    const { status, data } = await getReactionFromServer(formData);

    if (status === 200) {
      setStatePinnedReactions(data);
    } else {
      showOneButtonPopup(dispatch, status + data);
    }
  };

  //==============================================================================
  // event
  //==============================================================================

  const handleClickComentRegister = (event) => {
    getReactionAllList();
  };

  //==============================================================================
  // Hook & render
  //==============================================================================

  const renderReactionList = (data) => {
    return data?.reactions?.map((item, index) => {
      return (
        <div className="col" key={index}>
          <div className="imgs">
            <ProfileSpan hash={item?.author?.profileImage} />
          </div>{" "}
          {/* item.profileImage 데이터 없음*/}
          <div className="conts">
            <p className="h1">{item?.author?.nickname}</p>{" "}
            {/* item.account.name 데이터 없음*/}
            <p className="d1">
              <span>{item.date || "1日前"}</span>
              <span>コメント</span>
            </p>{" "}
            {/* date 항목 없음 */}
            <p className="t1">{item.content}</p>
            {item.iconImage !== "" && (
              <p className="icon_image">
                <img src={"/temp/" + item.iconImage} alt="icon" />
              </p>
            )}
            <div className="btns">
              <ReactionButtons
                type={"postDetail"}
                text={text}
                item={item}
                callback={() => getReactionAllList()}
              />
            </div>
            <div className="rgh">
              <button type="button" className="btn01">
                <FontAwesomeIcon icon={faHeart} /> {item.likeCount}
              </button>
              <button type="button" className="btn02">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  useLayoutEffect(() => {
    if(checkLoginExpired( navigate, dispatch, text.login_expired, reduxLoginTime )){
      getPostDetail();
      getReactionAllList();
    }
  }, []);


  return (
    <div className="contents">
      <div className="inr-c">
        <div className="wrap_detail">
          <div className="area_detail1">
            <ul className="cx_list">
              <li>
                <span>{text.name} </span>
                <span>{stateData?.series?.title}</span>
              </li>
              <li>
                <span>{text.title} </span>
                <span>{stateData?.title}</span>
              </li>
              <li>
                <span>{text.episode_count} </span>
                <span>{stateData?.number}</span>
              </li>
              <li>
                <span>{text.public_date} </span>
                <span>{getDateYYYYMMDD(stateData?.startAt, "/")}</span>
              </li>
              <li>
                <span>{text.end_date} </span>
                <span>{getDateYYYYMMDD(stateData?.endAt, "/")}</span>
              </li>
              <li>
                <span>{text.status} </span>
                <span>{stateData?.status}</span>
              </li>
            </ul>
            <div className="icon">
              <span>
                <FontAwesomeIcon className="mr8" icon={faEye} />
                {stateData?.viewCount}
              </span>
              <span>
                <FontAwesomeIcon className="mr8" icon={faHeart} />
                {stateData?.likeCount}
              </span>
              <span>
                <FontAwesomeIcon className="mr8" icon={faCommentQuote} />
                {stateData?.reactionCount}
              </span>
            </div>

            <div className="botm btn-bot">
              <Link
                to={`/dashboard/reaction/detail/${stateData?.id}/1`}
                className="btn-pk n blue"
              >
                <span>{text.reaction_management}</span>
              </Link>
              <Link to={`/post/edit/${params.id}`} className="btn-pk n blue2">
                <span>{text.modify}</span>
              </Link>
            </div>
          </div>

          <div className="area_detail2">
            <h2 className="h1">
              {stateData?.title} {stateData?.number}
            </h2>
            <p className="d1">{getDateYYYYMMDD(stateData?.startAt, ".")}</p>
            <p className="ws_pre">{stateData?.series?.description}</p>
          </div>

          {getShowEditor(stateData?.type) ? (
            <div className="editor_p ws_pre">
              {getHtmlElementFromHtmlString()}
            </div>
          ) : (
            <div className="ta_center">
              <Image hash={stateData?.content} alt="" />
            </div>
          )}

          {/* <div className="area_detail2">
          <p className="t1 c-gray">{tempData.content_next_summary}</p>
        </div> */}
        </div>

        <div className="wrap_comment">
          <div className="top_comm">
            <div className="imgs">
              <ProfileSpan hash={stateData?.author?.profileImage} />
            </div>
            <IconWithText
              postInfo={stateData}
              text={text}
              callback={handleClickComentRegister}
            />
          </div>

          <div className="lst_comm">
            {/* pinned reaction */}
            {renderReactionList(statePinnedReactions)}
            {/* reaction */}
            {renderReactionList(stateReactions)}

            {/* <Pagination
              className={""}
              meta={stateReactions?.meta}
              page={stateReactions?.meta?.currentPage}
              itemsCountPerPage={stateReactions?.meta?.itemsPerPage}
              totalItemsCount={stateReactions?.meta?.totalItems}
              callback={(page) => getReactions(page)}
            /> */}

            <SeeMoreComent 
              text={text}
              meta={stateReactions?.meta}
              callback={(page) => getReactions(page, true)}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
