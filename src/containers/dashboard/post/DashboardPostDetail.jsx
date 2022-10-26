import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentQuote, faEye, faHeart } from "@fortawesome/pro-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-light-svg-icons";

import Container from "@/components/dashboard/Container";

import tempImage from '@IMAGES/tmp_comic3.png';
import tempProfile from '@IMAGES/img_profile.png';

import { Link, useNavigate, useParams } from "react-router-dom";
import IconWithText from "@/components/dashboard/IconWithText";
import { getPostDetailFromServer, getPostIdMineFromServer } from "@/services/postService";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetailAction } from "@/modules/redux/ducks/post";
import useActions from "@/hook/useActions";
import Image from "@/components/dashboard/Image";
import ProfileSpan from "@/components/dashboard/ProfileSpan";
import { getDateYYYYMMDD, getDescriptionToHtml, getErrorMessageFromResultCode } from "@/common/common";
import { showModal } from "@/modules/redux/ducks/modal";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import ReactionButtons from "@/components/dashboard/ReactionButtons";
import { getReactionFromServer } from "@/services/dashboardService";
import Pagination from "@/components/dashboard/Pagination";


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
  sing_in_to_post : "ログインして投稿する",
  modal_title: 'お知らせ',
  register_coment: 'コメントを登録しました。',
  please_input_coment: 'コメントを入力してください。',
};

const tempData = {
  series: "シェルターアークシェルターアークシェルターアークシェルターアークシェルターアーク",
  title: "終わらない話",
  issue: "541話",
  startAt: "2022/06/07",
  endAt: "2022/06/07",  
  status: "公開中",     
  viewCount: "1.2k",    
  likeCount: "1.2k",
  coment_count: "966",
  content_title: "シェルターアーク 2話",
  content_date: "2022.06.10",
  content_summary: "モと戦う為、特殊チームレンジャーを創設したが、 クモの圧倒的な力には勝てず。",
  thumbnailImage: tempImage,
  content_next_summary: "リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だということが伝わってきた。",

  my_profile_image: tempProfile,
};

const tempReactionList = {
  list : [
    {
      id: "12",
      profile: tempProfile,
      name: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      data: "3日前",
      coment: "氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪だるまは嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動パターン把握したくなります(笑)",
      good_count: "123",
    },
    {
      id: "15",
      profile: tempProfile,
      name: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      data: "2日前",
      coment: "#SSSRearise はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行ったけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな。",
      good_count: "10",
    },
  ]
};


export default function DashboardPostDetail() {
  const [statePinnedReactions, setStatePinnedReactions] = useState(undefined);
  const [stateReactions, setStateReactions] = useState(undefined);
  const [stateData, setStateData] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams('id');


  //==============================================================================
  // api
  //==============================================================================
  const getPostDetail = async () => {
    const {status, data} = await getPostIdMineFromServer(params);
    console.log('getPostDetail', status, data);
    
    if( status === 200 ){
      setStateData(data?.post);
    }
    else{
      dispatch( showModal({title: text.error_title, contents: <ErrorPopup message={String(data)} buttonTitle={'確認'} />, }) );
    }
  };

  const getReactions = async (page) => {
    const formData = new FormData();
    formData.append('postId', params.id);
    formData.append('page', page);

    const {status, data} = await getReactionFromServer(formData);
    console.log('getReactions', status, data);
    
    if( status === 200 ){
      setStateReactions(data);
    }
    else{
      dispatch( showModal({title: text.error_title, contents: <ErrorPopup message={String(data)} buttonTitle={'確認'} />, }) );
    }
  };

  const getPinnedReactions = async () => {
    const formData = new FormData();
    formData.append('postId', params.id);
    formData.append('pinned', true);

    const {status, data} = await getReactionFromServer(formData);
    console.log('getPinnedReactions', status, data);
    
    if( status === 200 ){
      setStatePinnedReactions(data);
    }
    else{
      dispatch( showModal({title: text.error_title, contents: <ErrorPopup message={String(data)} buttonTitle={'確認'} />, }) );
    }
  };

  //==============================================================================
  // event
  //==============================================================================

  const handleClickComentRegister = (event) => {
    getReactions(1);
  };

  //==============================================================================
  // Hook & render
  //==============================================================================

  const renderReactionList = (data) => {
    return data?.reactions?.map((item, index) => {
      return (
        <div className="col" key={index}>
          <div className="imgs"><ProfileSpan hash={stateData?.author?.profileImage} /></div>  {/* item.profileImage 데이터 없음*/}
          <div className="conts">
            <p className="h1">{item.account.email}</p>  {/* item.account.name 데이터 없음*/}
            <p className="d1"><span>{item.date || '1日前'}</span><span>コメント</span></p> {/* date 항목 없음 */}
            <p className="t1">{item.content}</p>
            <p className="icon_image"><img src={'/temp/' + item.iconImage} alt='icon' /></p>
            <div className="btns">
              <ReactionButtons type={'postDetail'} text={text} item={item}  />
            </div>
            <div className="rgh">
              <button type="button" className="btn01"><FontAwesomeIcon icon={faHeart} /> {item.likeCount}</button>
              <button type="button" className="btn02"><FontAwesomeIcon icon={faEllipsisVertical} /></button>
            </div>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    //temp
    getPostDetail();
    getPinnedReactions();
    getReactions(1);
  }, []);

  return (
    <Container
    type={"sub post bg"}
    backTitle={text.page_title} >

    <div className="inr-c">

      <div className="wrap_detail">
        <div className="area_detail1">
          <ul className="cx_list">
            <li><span>{text.name}  </span><span>{stateData?.series?.title}</span></li>
            <li><span>{text.title}  </span><span>{stateData?.title}</span></li>
            <li><span>{text.episode_count}  </span><span>{stateData?.number}</span></li>
            <li><span>{text.public_date}   </span><span>{ getDateYYYYMMDD(stateData?.startAt, '/') }</span></li>
            <li><span>{text.end_date}   </span><span>{stateData?.endAt}</span></li>
            <li><span>{text.status}   </span><span>{stateData?.status}</span></li>
          </ul>
          <div className="icon">
            <span><FontAwesomeIcon className='mr8' icon={faEye} />{stateData?.viewCount}</span>
            <span><FontAwesomeIcon className='mr8' icon={faHeart} />{stateData?.likeCount}</span>
            <span><FontAwesomeIcon className='mr8' icon={faCommentQuote} />{stateData?.reactionCount}</span>
          </div>
        
          <div className="botm btn-bot">
            <Link to={`/dashboard/reaction/detail/${stateData?.id}/1`} className="btn-pk n blue"><span>{text.reaction_management}</span></Link>
            <Link to={`/post/edit/${params.id}`} className="btn-pk n blue2"><span>{text.modify}</span></Link>
          </div>
        </div>
        
        <div className="area_detail2">
          <h2 className="h1">{stateData?.title} {stateData?.number}</h2>
          <p className="d1">{ getDateYYYYMMDD(stateData?.startAt, '.') }</p>
          <p className="ws_pre">{ stateData?.series?.description }</p>
        </div>
        
        <div className="ta_center">
          <Image hash={stateData?.content} alt="playtonns content" />
        </div>
        
        <div className="area_detail2">
          <p className="t1 c-gray">{tempData.content_next_summary}</p>
        </div>
      </div>

      <div className="wrap_comment">
        <div className="top_comm">
          <div className="imgs"><ProfileSpan hash={stateData?.author?.profileImage} /></div>
          <IconWithText
            postInfo={stateData}
            text={text}
            callback={handleClickComentRegister}
            />
        </div>

        <div className="lst_comm">
          {/* pinned reaction */}
          {
            renderReactionList(statePinnedReactions)
          }
          {/* reaction */}
          {
            renderReactionList(stateReactions)
          }

          {
            stateReactions?.reactions?.length > 0 &&
              <Pagination
                className={''}
                page={stateReactions?.meta.currentPage}
                itemsCountPerPage={stateReactions?.meta.itemsPerPage}
                totalItemsCount={stateReactions?.meta.totalItems}
                callback={(page) => getReactions(page)} />
          }
        </div>
      </div>
    </div>


    </Container>
    
  );
}

