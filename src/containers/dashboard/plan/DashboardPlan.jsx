import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Container from "@/components/dashboard/Container";

import tempPlanImage1 from "@IMAGES/img_mainplan1.jpg";
import tempPlanImage2 from "@IMAGES/img_mainplan2.jpg";
import tempPlanImage3 from "@IMAGES/img_mainplan3.jpg";
import tempProfile from "@IMAGES/img_profile.png";
import { faAngleRight, faPlus } from "@fortawesome/pro-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribeTierAuthorIdFromServer } from "@/services/dashboardService";
import Image from "@/components/dashboard/Image";
import SwiperContainer from "@/components/dashboard/Swiper";
import { SwiperSlide } from "swiper/react";
import { getSubscribeTierAction } from "@/modules/redux/ducks/dashboard";


const text = {
  plan_management: "支援管理",
  add_plan: "支援を追加",
  edit: "編集する",
  supporter_management: "支援者管理",
  see_all: "すべてみる",
  month: "月",
};

const tempData = {
  result : 200,
  plans : [
    {
      id: "1",
      image: tempPlanImage1,
      title: "ダイヤモンドプラン",
      money: "1,000CP",
      description: "ひと月だけでも嬉しいです！タイムラプスや未統合PSD、その他限定記事が見れます。更新は不定期ですが、なるべく沢山更新できるよう頑張ります。",
      benefits : [
        {
          text : "・差分が見れます"
        },
        {
          text : "・ダイヤモンドプランの内容＋psdファイルを　公開しています。"
        },
      ]
    },
    {
      id: "2",
      image: tempPlanImage2,
      title: "プラチナプラン",
      money: "2,000CP",
      description: "ひと月だけでも嬉しいです！タイムラプスや未統合PSD、その他限定記事が見れます。更新は不定期ですが、なるべく沢山更新できるよう頑張ります。",
      benefits : [
        {
          text : "・差分が見れます"
        },
        {
          text : "・ダイヤモンドプランの内容＋psdファイルを　公開しています。"
        },
      ]
    },
    {
      id: "3",
      image: tempPlanImage3,
      title: "VIPプラン",
      money: "3,000CP",
      description: "ひと月だけでも嬉しいです！タイムラプスや未統合PSD、その他限定記事が見れます。更新は不定期ですが、なるべく沢山更新できるよう頑張ります。",
      benefits : [
        {
          text : "・差分が見れます"
        },
        {
          text : "・ダイヤモンドプランの内容＋psdファイルを　公開しています。"
        },
      ]
    },
  ],
  supporters : [
    {
      image: tempProfile,
      date : "2022/04/22",
      title : "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      plan: "ダイヤモンドプラン"
    },
    {
      image: tempProfile,
      date : "2022/06/30",
      title : "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      plan: "プラチナプラン"
    },
    {
      image: tempProfile,
      date : "2022/08/01",
      title : "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      plan: "VVIPプラン"
    },
  ]
};


export default function DashboardPlan(props) {
  const [stateSupporter, setStateSupporter] = useState(undefined);
  const dispatch = useDispatch();
  const reduxAuthors = useSelector(({post}) => post?.authorMine?.authors);
  const reduxSubscribeTiers = useSelector(({dashboard}) => dashboard?.subscribeTiers);


  //==============================================================================
  // render & hook
  //==============================================================================

  const renderPlanList = () => {
    return reduxSubscribeTiers?.map((item, i) => {
      return  (
        <SwiperSlide className="col h_auto" key={i}>
          <div className="icon"><Image hash={item.thumbnailImage} alt="planImage" /></div>
          <div className="cont">
            <h3 className="h1">{item.name}</h3>
            <p className="t1"><span className="c-blue">{item.price}</span> /{text.month}</p>
            <p className="t2">{item.description}</p>
            <div className="t_dot1">
              {/* <p>{item.description}</p> */}
            </div>
            <Link to={`/dashboard/plan/edit/${item.id}`} className="btn-pk b blue w100p bottom"><span>{text.edit}</span></Link>
          </div>
        </SwiperSlide>
      );
    });
  };

  const renderBenefitList = (list) => {
    return list.map((item, i) => {
      return <p key={i}>{item.text}</p>
    });
  };

  const renderSupporterList = () => {
    return stateSupporter?.map((item, i) => {
      return  (
        <li key={i}>
          <div>
            <p className="t_profile"><span className="im" style={{backgroundImage: `url(${item.image})`}}></span><span>{item.title}</span></p>
            <p className="t2">{item.date}</p>
          </div>
          <p className="t1 c-black">{item.plan}</p>
        </li>
      );
    });

  };

  useEffect(() => {
    //temp
    setStateSupporter(tempData.supporters);
    dispatch( getSubscribeTierAction({authorId: reduxAuthors[0].id}) );
  }, []);

  return (
    <Container 
      type={"plan bg"} >

      <div className="inr-c">
			
        <section className="box_area pr-mb2 ty_plan2">
          <header className="hd_titbox hd_mst1">
            <h2 className="h_tit1"><span>{text.plan_management}</span></h2>
            <div className="rgh">
              <Link to="/dashboard/plan/upload" className="btn-pk n blue2"><span><FontAwesomeIcon icon={faPlus} /> {text.add_plan}</span></Link>
            </div>
          </header>

          <div className="lst_mainplan relative">
            <SwiperContainer 
                  className={"mySwiper1"}
                  buttonClassName={'wh_i'}    
                  slidesPerView={4}
                  breakpoints={{
                    0: {
                      slidesPerView: 2,
                      spaceBetween: 8,
                    },
                    1000: {
                      slidesPerView: 3,
                      spaceBetween: 15,
                    },
                    1400: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                  }}
                  list={renderPlanList} />
          </div>
        </section>


        <section className="box_area ty_plan1">
          <div className="hd_titbox">
            <h3 className="h_tit1">{text.supporter_management}</h3>
            <Link to="/dashboard/plan/subscriber" className="rgh c-blue"><span className="ico_arr_link">{text.see_all} <FontAwesomeIcon icon={faAngleRight} /></span></Link>
          </div>
          <div className="lst_txt1">
            <ul>
              {
                renderSupporterList()
              }
            </ul>
          </div>
        </section>
			
		  </div>

    </Container>
  );
}
