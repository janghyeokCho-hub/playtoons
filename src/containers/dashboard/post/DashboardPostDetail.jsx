import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentQuote, faEye, faHeart } from "@fortawesome/pro-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-light-svg-icons";

import Container from "@/components/dashboard/Container";

import tempImage from '@IMAGES/tmp_comic3.png';
import tempProfile from '@IMAGES/img_profile.png';

import { Link, useParams } from "react-router-dom";
import IconWithText from "@/components/dashboard/IconWithText";
import { getPostDetailFromServer } from "@/services/postService";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetailAction } from "@/modules/redux/ducks/post";
import useActions from "@/hook/useActions";


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
  sing_in_to_post : "ログインして投稿する"
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
  content_image: tempImage,
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
  const [stateReactionList, setStateReactionList] = useState(undefined);
  const [stateData, setStateData] = useState(undefined);
  const post = useSelector(({ post }) => post?.post);
  const [getPostDetailFromAction] = useActions([getPostDetailAction], []);
  const dispatch = useDispatch();
  const params = useParams('id');


  const handleClickComentRegister = (event) => {
    console.log('ComentRegister', event);
    
  };

  const handleClickItem = (event) => {
    const id = event.target.getAttribute('data-id');
    const type = event.target.getAttribute('click-type');
    
    console.log('Item', id, type);
  };


  const renderReactionList = () => {
    return stateReactionList?.map((item, index) => {
      return (
        <div className="col" key={index}>
          <div className="imgs"><span style={{backgroundImage: `url(${item.profile})`}}></span></div>
          <div className="conts">
            <p className="h1">{item.name}</p>
            <p className="d1"><span>{item.date}</span><span>コメント</span></p>
            <p className="t1">{item.coment}</p>
            <div className="btns">
              <a className="btn-pk s blue2" data-id={item.id} click-type={'fix'} onClick={handleClickItem}>{text.fix}</a>
              <a className="btn-pk s blue2" data-id={item.id} click-type={'good'} onClick={handleClickItem}>{text.good}</a>
              <a className="btn-pk s blue2" data-id={item.id} click-type={'coment'} onClick={handleClickItem}>{text.coment}</a>
              <a className="btn-pk s blue2" data-id={item.id} click-type={'report'} onClick={handleClickItem}>{text.report}</a>
              <a className="btn-pk s blue2" data-id={item.id} click-type={'delete'} onClick={handleClickItem}>{text.delete}</a>
            </div>
            <div className="rgh">
              <button type="button" className="btn01"><FontAwesomeIcon icon={faHeart} />{item.good_count}</button>
              <button type="button" className="btn02"><FontAwesomeIcon icon={faEllipsisVertical} /></button>
            </div>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    setStateData(tempData);
    setStateReactionList(tempReactionList.list);

    dispatch( getPostDetailAction(params) );
    // getPostDetailFromAction(params);
  }, []);

  useEffect(() => {
    setStateData({
      ...tempData,
      title: post?.title
    });
  }, [post]);

  return (
    <Container
    type={"sub post bg"}
    backTitle={text.page_title} >

    <div className="inr-c">

      <div className="wrap_detail">
        <div className="area_detail1">
          <ul className="cx_list">
            <li><span>{text.name}  </span><span>{stateData?.series}</span></li>
            <li><span>{text.title}  </span><span>{stateData?.title}</span></li>
            <li><span>{text.episode_count}  </span><span>{stateData?.issue}</span></li>
            <li><span>{text.public_date}   </span><span>{stateData?.startAt}</span></li>
            <li><span>{text.end_date}   </span><span>{stateData?.endAt}</span></li>
            <li><span>{text.status}   </span><span>{stateData?.status}</span></li>
          </ul>
          <div className="icon">
            <span><FontAwesomeIcon icon={faEye} />{stateData?.viewCount}</span>
            <span><FontAwesomeIcon icon={faHeart} />{stateData?.likeCount}</span>
            <span><FontAwesomeIcon icon={faCommentQuote} />{stateData?.coment_count}</span>
          </div>
        
          <div className="botm btn-bot">
            <Link to={'/dashboard/reaction'} className="btn-pk n blue"><span>{text.reaction_management}</span></Link>
            <Link to={`/post/edit/${params.id}`} className="btn-pk n blue2"><span>{text.modify}</span></Link>
          </div>
        </div>
        
        <div className="area_detail2">
          <h2 className="h1">{stateData?.title} {stateData?.episode_count}</h2>
          <p className="d1">{stateData?.content_date}</p>
          <p className="t1">{stateData?.content_summary}</p>
        </div>
        
        <div className="">
          <img src={stateData?.content_image} alt="" />
        </div>
        
        <div className="area_detail2">
          <p className="t1 c-gray">{stateData?.content_next_summary}</p>
        </div>
      </div>

      <div className="wrap_comment">
        <div className="top_comm">
          <div className="imgs"><span style={{backgroundImage: `url(${stateData?.my_profile_image})`}}></span></div>
          <IconWithText 
            text={{
              sing_in_to_post: text.sing_in_to_post,
              icon: text.icon,
              register: text.register
            }}
            callback={handleClickComentRegister}
            />
        </div>

        <div className="lst_comm">
          {
            renderReactionList()
          }
        </div>
      </div>
    </div>


    </Container>
    
  );
}

