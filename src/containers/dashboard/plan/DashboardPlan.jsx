import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Container from "@/components/dashboard/Container";

import tempPlanImage1 from "@IMAGES/img_mainplan1.jpg";
import tempPlanImage2 from "@IMAGES/img_mainplan2.jpg";
import tempPlanImage3 from "@IMAGES/img_mainplan3.jpg";
import tempProfile from "@IMAGES/img_profile.png";


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
      id: "3",
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
  ],
  supporters : [
    {
      date : "2022/04",
      title : "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      plan: "VVIPプラン"
    },
    {
      date : "2022/04",
      title : "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      plan: "VVIPプラン"
    },
    {
      date : "2022/04",
      title : "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      plan: "VVIPプラン"
    },
  ]
};


export default function DashboardPlan(props) {
  const {refIsAdult, refInputNickname, refIntrodction, refTag} = useRef();
  const [data, setData] = useState(undefined);
  const params = useParams();
  const navigate = useNavigate();

  let seriesData = {};

  const handleRegister = () => {
    console.log("refToggle", refIsAdult);
  };


  const handlePostImageFile = useCallback((file) => {
    // 폼데이터 구성
    const formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", file);
    console.log("postImage file", file);
  }, []);

  const handleClickAddPlan = () => {
    console.log("handleTimelineImageFile");
    //move to add plan page
    // navigate("/");     
  };

  const handleTimelineImageFile = (file) => {
    console.log("handleTimelineImageFile", file);
  };

  const handleItemClickPlan = (e) => {

  }

  const getPlanList = () => {
    if( data === undefined ){
      return;
    }

    let containerMarginRight = "";

    return data.plans.map((item, i) => {
      containerMarginRight = i === data.plans.length - 1 ? "" : "10px";

      return  (
                <></>
              );
    });
  }

  const getSupporterList = () => {
    if( data === undefined ){
      return;
    }

    return data.supporters.map((item, i) => {
      return  (
        <></>
              );
    });

  }

  useEffect(() => {
    setData(tempData);
  }, []);

  return (
    <Container 
      type={"plan bg"} >

      <div class="inr-c">
			
        <section class="box_area pr-mb2 ty_plan2">
          <header class="hd_titbox hd_mst1">
            <h2 class="h_tit1"><span>支援管理</span></h2>
            <div class="rgh">
              <a href="#" class="btn-pk n blue2"><span><FontAwesomeIcon icon="fa-solid fa-plus" /> 支援を追加</span></a>
            </div>
          </header>

          <div class="lst_mainplan">
            <div class="col">
              <div class="icon"><img src={tempPlanImage1} alt="image" /></div>
              <div class="cont">
                <h3 class="h1">ダイヤモンドプラン</h3>
                <p class="t1"><span class="c-blue">1,000PC</span> /月</p>
                <p class="t2">ひと月だけでも嬉しいです！タイムラプスや未統合
                その他限定記事が見れます。更新は不定期ですが、
                なるべく沢山更新できるよう頑張ります。</p>
                <div class="t_dot1">
                  <p>・差分が見れます</p>
                  <p>・ダイヤモンドプランの内容＋psdファイルを公開しています。</p>
                </div>
                <a href="#" class="btn-pk b blue w100p"><span>編集する</span></a>
              </div>
            </div>
            <div class="col">
              <div class="icon"><img src={tempPlanImage2} alt="image" /></div>
              <div class="cont">
                <h3 class="h1">プラチナプラン</h3>
                <p class="t1"><span class="c-blue">2,000CP</span> /月</p>
                <p class="t2">ひと月だけでも嬉しいです！タイムラプスや未統合
                その他限定記事が見れます。更新は不定期ですが、
                なるべく沢山更新できるよう頑張ります。</p>
                <div class="t_dot1">
                  <p>・差分が見れます</p>
                  <p>・ダイヤモンドプランの内容＋psdファイルを公開しています。</p>
                </div>
                <a href="#" class="btn-pk b blue w100p"><span>編集する</span></a>
              </div>
            </div>
            <div class="col">
              <div class="icon"><img src={tempPlanImage3} alt="image" /></div>
              <div class="cont">
                <h3 class="h1">VIPプラン</h3>
                <p class="t1"><span class="c-blue">3,000CP</span> /月</p>
                <p class="t2">ひと月だけでも嬉しいです！タイムラプスや未統合
                その他限定記事が見れます。更新は不定期ですが、
                なるべく沢山更新できるよう頑張ります。</p>
                <div class="t_dot1">
                  <p>・差分が見れます</p>
                  <p>・ダイヤモンドプランの内容＋psdファイルを公開しています。</p>
                </div>
                <a href="#" class="btn-pk b blue w100p"><span>編集する</span></a>
              </div>
            </div>
          </div>
        </section>


        <section class="box_area ty_plan1">
          <div class="hd_titbox">
            <h3 class="h_tit1">支援者管理</h3>
            <a href="#" class="rgh c-blue"><span class="ico_arr_link">すべてみる <i class="fa-solid fa-angle-right"></i></span></a>
          </div>
          <div class="lst_txt1">
            <ul>
              <li>
                <div>
                  <p class="t_profile"><span class="im" style={{backgroundImage: `url(${tempProfile})`}}></span><span>琉桔真緒 ✧◝(⁰▿⁰)◜✧</span></p>
                  <p class="t2">2022/06/11</p>
                </div>
                <p class="t1 c-black">VVIPプラン</p>
              </li>
              <li>
                <div>
                  <p class="t_profile"><span class="im" style={{backgroundImage: `url(${tempProfile})`}}></span><span>琉桔真緒 ✧◝(⁰▿⁰)◜✧</span></p>
                  <p class="t2">2022/06/11</p>
                </div>
                <p class="t1 c-black">VVIPプラン</p>
              </li>
              <li>
                <div>
                  <p class="t_profile"><span class="im" style={{backgroundImage: `url(${tempProfile})`}}></span><span>琉桔真緒 ✧◝(⁰▿⁰)◜✧</span></p>
                  <p class="t2">2022/06/11</p>
                </div>
                <p class="t1 c-black">VVIPプラン</p>
              </li>
            </ul>
          </div>
        </section>
			
		  </div>

    </Container>
  );
}
