import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentQuote, faEye, faHeart } from "@fortawesome/pro-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-light-svg-icons";

import Container from "@/components/dashboard/Container";



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
};

const tempData = {
  name: "シェルターアーク",
  title: "終わらない話",
  episode_count: "541話",
  public_date: "2022/06/07",
  end_date: "2022/06/07",
  status: "公開中",
  view_count: "1.2k",
  good_count: "1.2k",
  coment_count: "966",
  content_title: "シェルターアーク 2話",
  content_date: "2022.06.10",
  content_summary: (
    <React.Fragment>
      モと戦う為、特殊チームレンジャーを創設したが、
      <br />
      クモの圧倒的な力には勝てず。
    </React.Fragment>
  ),
  content_image:
    "/img/dashboardpostdetail-rectangle-3F15B08E-F381-4DB5-9F3D-63F6E781FDA3.jpg",
  content_next_summary:
    "リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だということが伝わってきた。",

  my_icon_image:
    "/img/dashboardpostdetail-oval-copy-A74BAE99-7E7C-4FC9-A864-C9DCC025808F@2x.png",
};

const tempReactions = [
  {
    id: "12",
    profile:
      "/img/dashboardpostdetail-oval-copy-A74BAE99-7E7C-4FC9-A864-C9DCC025808F@2x.png",
    name: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
    coment:
      "#SSSRearise はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行ったけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな。",
    good_count: "123",
  },
  {
    id: "15",
    profile:
      "/img/dashboardpostdetail-oval-copy-A74BAE99-7E7C-4FC9-A864-C9DCC025808F@2x.png",
    name: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
    coment:
      "#SSSRearise はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行ったけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな。",
    good_count: "123",
  },
];

export default function DashboardPostDetail() {
  const [reactionList, setReactionList] = useState([]);
  const [data, setData] = useState({
    name: "",
    title: "",
    episode_count: "",
    public_date: "",
    end_date: "",
    status: "",
    view_count: "",
    good_count: "",
    coment_count: "",
    content_title: "",
    content_date: "",
    content_summary: "",
    content_image:"",
    content_next_summary:"",
    my_icon_image:"",
  });

  const handleReactionClick = (e) => {
    let type = e.target.innerText;
    let id = e.target.getAttribute("data-id");

    if (text.fix === type) {
      console.log("type Click", type, id);
    } else if (text.good === type) {
      console.log("good Click", type, id);
    } else if (text.coment === type) {
      console.log("coment Click", type, id);
    } else if (text.report === type) {
      console.log("report Click", type, id);
    } else if (text.delete === type) {
      console.log("delete Click", type, id);
    }
  };

  const getReactionList = (resultList) => {
    return resultList.map((item, index) => {
      return (
        <></>
      );
    });
  };

  useEffect(() => {
    setData(tempData);
    setReactionList(getReactionList(tempReactions));
  }, []);

  return (
    <Container
    type={"sub post bg"}
    backTitle={text.page_title} >

    <div class="inr-c">

      <div class="wrap_detail">
        <div class="area_detail1">
          <ul class="cx_list">
            <li><span>シリーズ名  </span><span>シェルターアークシェルターアークシェルターアークシェルターアークシェルターアーク</span></li>
            <li><span>タイトル  </span><span>終わらない話</span></li>
            <li><span>話数  </span><span>541話</span></li>
            <li><span>公開日   </span><span>2022/06/07</span></li>
            <li><span>終了日   </span><span>2022/06/07</span></li>
            <li><span>状態   </span><span>公開中</span></li>
          </ul>
          <div class="icon">
            <span><FontAwesomeIcon icon={faEye} />1.2k</span>
            <span><FontAwesomeIcon icon={faHeart} />1.2k</span>
            <span><FontAwesomeIcon icon={faCommentQuote} />966</span>
          </div>
        
          <div class="botm btn-bot">
            <a href="#" class="btn-pk n blue"><span>リアクション管理</span></a>
            <a href="#" class="btn-pk n blue2"><span>修正する</span></a>
          </div>
        </div>
        
        <div class="area_detail2">
          <h2 class="h1">シェルターアーク 2話</h2>
          <p class="d1">2022.06.10</p>
          <p class="t1">モと戦う為、特殊チームレンジャーを創設したが、クモの圧倒的な力には勝てず。</p>
        </div>
        
        <div class="">
          <img src="../images/tmp/tmp_comic3.png" alt="" />
        </div>
        
        <div class="area_detail2">
          <p class="t1 c-gray">リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だということが伝わってきた。</p>
        </div>
      </div>

      <div class="wrap_comment">
        <div class="top_comm">
          <div class="imgs"><span style={{backgroundImage: "url(../images/common/img_profile.png)"}}></span></div>
          <div class="conts">
            <textarea name="" id="" class="textarea1" placeholder="ログインして投稿する"></textarea>
            <div class="btns">
              <button type="button" class="btn-pk s gray"><span>アイコン</span></button>
              <button type="button" class="btn-pk s blue"><span>登録</span></button>
            </div>
          </div>
        </div>

        <div class="lst_comm">
          <div class="col">
            <div class="imgs"><span style={{backgroundImage: "url(../images/common/img_profile.png)"}}></span></div>
            <div class="conts">
              <p class="h1">琉桔真緒 ✧◝(⁰▿⁰)◜✧</p>
              <p class="d1"><span>3日前</span><span>コメント</span></p>
              <p class="t1">氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪
              だるまは嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動
              パターン把握したくなります(笑)
              </p>
              <div class="btns">
                <a href="#" class="btn-pk s blue2"><span>固定</span></a>
                <a href="#" class="btn-pk s blue2"><span>いいね</span></a>
                <a href="#" class="btn-pk s blue2"><span>コメント</span></a>
                <a href="#" class="btn-pk s blue2"><span>通報</span></a>
                <a href="#" class="btn-pk s blue2"><span>削除</span></a>
              </div>
              <div class="rgh">
                <button type="button" class="btn01"><FontAwesomeIcon icon={faHeart} />123</button>
                <button type="button" class="btn02"><FontAwesomeIcon icon={faEllipsisVertical} /></button>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="imgs"><span style={{backgroundImage: "url(../images/common/img_profile.png)"}}></span></div>
            <div class="conts">
              <p class="h1">琉桔真緒 ✧◝(⁰▿⁰)◜✧</p>
              <p class="d1"><span>3日前</span><span>コメント</span></p>
              <p class="t1">氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪
              だるまは嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動
              パターン把握したくなります(笑)
              </p>
              <div class="btns">
                <a href="#" class="btn-pk s blue2"><span>固定</span></a>
                <a href="#" class="btn-pk s blue2"><span>いいね</span></a>
                <a href="#" class="btn-pk s blue2"><span>コメント</span></a>
                <a href="#" class="btn-pk s blue2"><span>通報</span></a>
                <a href="#" class="btn-pk s blue2"><span>削除</span></a>
              </div>
              <div class="rgh">
                <button type="button" class="btn01"><FontAwesomeIcon icon={faHeart} />123</button>
                <button type="button" class="btn02"><FontAwesomeIcon icon={faEllipsisVertical} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    </Container>
    
  );
}

