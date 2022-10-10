import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCircleChevronLeft,
  faCircleChevronRight,
  faLock,
} from "@fortawesome/pro-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-light-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Novel = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="wrap_detail">
        <div className="area_detail2">
          <h2 className="h1">シェルターアーク 2話</h2>
          <p className="d1">2022.06.10</p>
          <p className="t1 c-gray">
            モと戦う為、特殊チームレンジャーを創設したが、クモの圧倒的な力には勝てず。
          </p>
        </div>

        <div className="area_novel">
          今年の気候は体に合わない。
          そのことを心底実感しながら、改札機へ叩きつけるように定期券をタッチし駅構内に入った。ワイシャツの背中をぬるりと流れていく汗が不愉快で顔を顰める。革靴の中までもじっとりと蒸れているのを感じた。ホームへ続くエスカレーターに乗り込む。さっき自販機で買った冷たい飲料水を首と肩の間に挟み、スーツの上を脱いでビジネスバッグと一緒に持った。体の熱が少し下がった気がする。
          土日出勤の多い仕事だということは、ハウスメーカーの営業４年目にもなれば理解し尽くしているつもりだった。しかし、担当エリア外でのイレギュラーな出勤がこうも続くのでは堪える。
          住宅展示場での突発的な営業業務は先月から頻発していた。都内の一等地に自社ビルを持つ、世間に言わせれば「儲かっている会社」も必死なのだ。接客は嫌いではないし、給与もきちんと発生するが、貴重な休みを急に剝奪される気分は良いものではない。それでも今日はマシなほうだ。別のエリア担当者が交替に来てくれたので、半日で帰ることができた。
          休日の昼下がりで人のまばらなホームに降り立つ。電光掲示板を見上げ、使い慣れない路線の電車を確認していると、視界の隅にある人物の姿が飛び込んできた。
          心臓が引き絞られる心地がする。そういえば、彼はこの辺りに住んでいると言っていた。
          良い機会じゃないか、と高揚した心が身勝手に囁きかけてくる。
          会えなくなって引き裂かれんばかりに苦しかった感情の正体をここで確かめるのだ。「結婚してないよね。彼女いるのかな」「あの人と仲良いでしょ、何か知らないの」と口々に詰め寄ってきた女子社員たちと同じものか。それとも、ただの強烈な名残惜しさか。
          ためらう気持ちはもちろんあったが、身体が先に動いていた。僕は昔からこういう性格だ。曖昧なものははっきりさせないと安眠できない。
          「当銘トウメイさん」
          僕の呼びかけに彼は振り返った。ノーカラーの白シャツ、フランネルのストレートパンツ、黒のローファー。ダークブラウンの髪は艶やかで、耳には小さな黒い石のピアスを嵌めている。会社で働いていたときとは雰囲気が違う。すらりと背の高い彼にはスーツもよく似合ったが、私服は自然と目を惹かれる不思議な存在感がある。
          「…久しぶり。元気だった」
          思わぬ場所での再会に驚いた素振りを見せながらも、かつての同僚である当銘さんは笑いかけてきた。彼の笑顔を見るのも久しぶりで、ぐっと胸が詰まる。
          「はい。…お世話になったのに、お辞めになるときご挨拶も出来なくて。すみません」
          僕が低頭すると、「いいよ、そんなこと」と慌てたように首を振る。彼の退職日、僕はちょうど他の設計担当者とプレゼンのため外出しており、顔を見ることすら叶わなかった。
          当銘さんと同じフロアだった同期の話では、恒例である退職者からのスピーチも、上司からの花束贈呈もなかったらしい。事情があるとはいえ、そこまで露骨に区別する必要があるのかと僕は密かに不満を抱いていた。
          「大変でしたよね、色々」
          当時の様子を思い出して、ついそんな言葉が出てしまう。彼が形の良い眉を上げた。
          「それはどういう意味」
          硬い声で問いかけられ、背筋が凍り付く。余計なことを言うのではなかったと深く後悔した。
          「いえあの、当銘さんだってそりゃミスくらいするし、それがたまたま厄介な案件だったからって、大袈裟なことになっちゃって…」
          「どうしてですか」 「あの時、篠田課長とは拗れていたから」
          「うちの課長と、ですか。…えっと、すみません、どういうことでしょう」
          言われたことの意味が本気で分からず、重ねて問いかける。彼はそこで、はっとしたように切れ長の眼を見開いて僕を見た。
          「…そうか。知らないよな」
          独り言のように呟く。僕は、なぜか物凄く嫌な予感がした。根拠のない動物的な勘だ。
          果たして、当銘さんはこともなげに言ってのけた。
          「付き合っていたんだよ。そちらの課長と」
        </div>

        <div className="area_detail3">
          <div className="box_profile">
            <ImgTmpProfileBgDiv bgImg={require("@IMAGES/tmp_profile_bg.png")} />
            <div className="pf_txt">
              <div className="icon">
                <img src={require("@IMAGES/img_profile.png")} alt="profile" />
              </div>
              <p className="h1">名前のない人間23349名前のない人間23349</p>
              <div className="btns">
                <a href="#" className="btn-pk n blue">
                  <span>フォロー</span>
                </a>
                <a href="#" className="btn-pk n blue2">
                  <span>支援する</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap_comment">
        <div className="top_comm">
          <div className="imgs">
            <ImgProfileSpan
              bgImg={require("@IMAGES/img_profile.png")}
            ></ImgProfileSpan>
          </div>
          <div className="conts">
            <textarea
              name=""
              id=""
              className="textarea1"
              placeholder="ログインして投稿する"
            ></textarea>
            <div className="btns">
              <button type="button" className="btn-pk s gray">
                <span>アイコン</span>
              </button>
              <button type="button" className="btn-pk s blue">
                <span>登録</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lst_comm">
          <div className="col">
            <div className="imgs">
              <ImgProfileSpan
                bgImg={require("@IMAGES/img_profile.png")}
              ></ImgProfileSpan>
            </div>
            <div className="conts">
              <p className="h1">琉桔真緒 ✧◝(⁰▿⁰)◜✧</p>
              <p className="d1">
                <span>3日前</span>
                <span>コメント</span>
              </p>
              <p className="t1">
                氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪
                だるまは嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動
                パターン把握したくなります(笑)
              </p>
              <div className="rgh">
                <button type="button" className="btn01">
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ marginRight: "8px" }}
                  />
                  123
                </button>
                <button type="button" className="btn02">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    style={{ marginRight: "8px" }}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="imgs">
              <ImgProfileSpan
                bgImg={require("@IMAGES/img_profile.png")}
              ></ImgProfileSpan>
            </div>
            <div className="conts">
              <p className="h1">琉桔真緒 ✧◝(⁰▿⁰)◜✧</p>
              <p className="d1">
                <span>3日前</span>
                <span>コメント</span>
              </p>
              <p className="t1">
                氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪
                だるまは嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動
                パターン把握したくなります(笑)
              </p>
              <div className="rgh">
                <button type="button" className="btn01">
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ marginRight: "8px" }}
                  />
                  123
                </button>
                <button type="button" className="btn02">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    style={{ marginRight: "8px" }}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="botm">
            <a href="#">コメントをもっと見る</a>
          </div>
        </div>
      </div>

      <div className="detail_botm_slider">
        <div className="slider">
          <div className="swiper-container mySwiper1">
            <Swiper className="swiper-wrapper">
              <BoxVslideDiv className="box_vslide swiper-slide">
                <a href="#">
                  <ImgComicDiv
                    className="thumb"
                    bgImg={require("@IMAGES/tmp_comic3.png")}
                  ></ImgComicDiv>
                  <div className="txt">
                    <p className="h1">シェルターアーク</p>
                    <p className="t1">1話</p>
                    <p className="t2">
                      小ページで気軽に漫画描きたくて、描いたやつFANBOXにアップする名目で
                    </p>
                  </div>
                </a>
              </BoxVslideDiv>
              <BoxVslideDiv className="box_vslide swiper-slide">
                <a href="#">
                  <ImgComicDiv
                    className="thumb"
                    bgImg={require("@IMAGES/tmp_comic3.png")}
                  ></ImgComicDiv>
                  <div className="txt">
                    <p className="h1">シェルターアーク</p>
                    <p className="t1">1話</p>
                    <p className="t2">
                      小ページで気軽に漫画描きたくて、描いたやつFANBOXにアップする名目で
                    </p>
                  </div>
                </a>
              </BoxVslideDiv>
              <BoxVslideDiv className="box_vslide swiper-slide">
                <a href="#">
                  <ImgComicDiv
                    className="thumb"
                    bgImg={require("@IMAGES/tmp_comic3.png")}
                  ></ImgComicDiv>
                  <div className="txt">
                    <p className="h1">シェルターアーク</p>
                    <p className="t1">1話</p>
                    <p className="t2">
                      小ページで気軽に漫画描きたくて、描いたやつFANBOXにアップする名目で
                    </p>
                  </div>
                </a>
              </BoxVslideDiv>
            </Swiper>
          </div>
          <button type="button" className="swiper-button-prev my1">
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button type="button" className="swiper-button-next my1">
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>
      </div>
    </>
  );
};

const ImgProfileSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

const ImgComicDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
`;

const ImgTmpProfileBgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const BoxVslideDiv = styled.div`
  width: 316.5px;
  margin-right: 27px;
`;
export default Novel;
