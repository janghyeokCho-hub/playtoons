import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentQuote,
  faEye,
  faHeart,
} from "@fortawesome/pro-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-light-svg-icons";

import Container from "@/components/dashboard/Container";

import { Link, useNavigate, useParams } from "react-router-dom";
import IconWithText from "@/components/dashboard/IconWithText";
import {
  getPostDetailFromServer,
  getPostIdMineFromServer,
} from "@/services/postService";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetailAction } from "@/modules/redux/ducks/post";
import useActions from "@/hook/useActions";
import Image from "@/components/dashboard/Image";
import ProfileSpan from "@/components/dashboard/ProfileSpan";
import {
  getDateYYYYMMDD,
  getDescriptionToHtml,
  getErrorMessageFromResultCode,
  showOneButtonPopup,
} from "@/common/common";
import { showModal } from "@/modules/redux/ducks/modal";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import ReactionButtons from "@/components/dashboard/ReactionButtons";
import { getReactionFromServer } from "@/services/dashboardService";
import Pagination from "@/components/dashboard/Pagination";
import { setHeader } from "@/modules/redux/ducks/container";

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
};

// const tempData = {
//   content_next_summary: "リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だということが伝わってきた。",
// };

export default function DashboardPostDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams("id");
  const [statePinnedReactions, setStatePinnedReactions] = useState(undefined);
  const [stateReactions, setStateReactions] = useState(undefined);
  const [stateData, setStateData] = useState(undefined);

  const handleContainer = useCallback(() => {
    const header = {
      headerClass: "header",
      containerClass: "container sub post bg",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      backTitle: text.page_title,
      activeMenu: "post",
    };
    dispatch(setHeader(header));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  const getReactionAllList = () => {
    getPinnedReactions();
    getReactions(1);
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

  const getReactions = async (page) => {
    const formData = new FormData();
    formData.append("postId", params.id);
    formData.append("page", page);

    const { status, data } = await getReactionFromServer(formData);
    console.log("getReactions", status, data);

    if (status === 200) {
      setStateReactions(data);
    } else {
      showOneButtonPopup(dispatch, status + data);
    }
  };

  const getPinnedReactions = async () => {
    const formData = new FormData();
    formData.append("postId", params.id);
    formData.append("pinned", true);

    const { status, data } = await getReactionFromServer(formData);
    console.log("getPinnedReactions", status, data);

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
            <ProfileSpan hash={stateData?.author?.profileImage} />
          </div>{" "}
          {/* item.profileImage 데이터 없음*/}
          <div className="conts">
            <p className="h1">{item.account.email}</p>{" "}
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

  useEffect(() => {
    //temp
    getPostDetail();
    getReactionAllList();
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
                <span>{stateData?.endAt}</span>
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

          <div className="ta_center">
            <Image hash={stateData?.content} alt="playtonns content" />
          </div>

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

            {stateReactions?.reactions?.length > 0 && (
              <Pagination
                className={""}
                page={stateReactions?.meta.currentPage}
                itemsCountPerPage={stateReactions?.meta.itemsPerPage}
                totalItemsCount={stateReactions?.meta.totalItems}
                callback={(page) => getReactions(page)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
