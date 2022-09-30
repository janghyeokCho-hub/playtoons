import React, {useEffect, useState} from "react";
import { useParams} from 'react-router-dom';
import { SwiperSlide } from "swiper/react";

import SwiperContainer from "@/components/dashboard/Swiper";
import Container from "@/components/dashboard/Container";

import tempImage from '@IMAGES/tmp_comic2.jpg';

const text = {
  timeline_thumb: "タイムラインのサムネイル",
  tag: "タグ",
  summary: "説明",
  category: "カテゴリ",
  grade: "指定",
  status: "状態",
  type: "タイプ",
  series_detail: "シリーズ詳細",
};

const tempData = {
  thumbList: [tempImage, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ],
  tagList: ["#アクション", "#異世界"],
  summary: "No.13の災害後、人類はシェルターにバラバラに散った。<br />そして、奇妙なロボット”クモ”の出現によりシェルター周辺に防壁が張り<br />巡らされた。クモと戦う為、特殊チームレンジャーを創設したが、<br />クモの圧倒的な力には勝てず。そこで、レンジャーたちは人間と機械を融合する<br />アダマ手術を施し、クモに挑むが…果たしてレンジャーたちの行く末は..? <br />クモの正体、そして突如現れた謎の組織カンパニーヌルの正体とは…?!",
  title: "シェルターアーク・世界を滅ぼすものたち",
  category: "アクション",
  grade: "R18",
  status: "連載中",
  type: "マンガ",
  main_image: tempImage,
};

export default function DashboardSeriesDetail(props) {
  const [data, setData] = useState(undefined);
  const params = useParams('id');

  const getThumbList = () => {
    return data?.thumbList?.map( (item, index) => {
      return <SwiperSlide className="cx swiper-slide" key={index}>
              <a href="#">
                <div className="cx_thumb">
                  {
                    item !== undefined &&
                      <span><img src={item} alt="thumbnail" /></span>
                  }
                </div>
              </a>
            </SwiperSlide>;
    } );
  }

  const getTagList = () => {
    return data?.tagList?.map( (item, index) => {
      return <div className="i_tag" key={index}>{item}</div>
    });
  };

  useEffect(() => {
    setData(tempData);
  }, []);
  

  return (
    <Container
      type={"sub series bg"}
      backTitle={text.series_detail} >

      <div className="inr-c">
        <div className="box_area">
          
          <section className="bbs_view">
            <div className="hd_titbox hide-m">
              <h2 className="h_tit1">{text.series_detail}</h2>
            </div>
            
            <div className="bbs_book">
              <p className="cx_tit">{data?.title}</p>
              <div className="cx_thumb"><span><img src={data?.main_image} alt="사진" /></span></div>
              <ul className="cx_list">
                <li><span>{text.category} </span><span>{data?.category}</span></li>
                <li><span>{text.grade} </span><span>{data?.grade}</span></li>
                <li><span>{text.status} </span><span>{data?.status}</span></li>
                <li><span>{text.type}  </span><span>{data?.type}</span></li>
              </ul>
            </div>

            <h3 className="tit1">{text.summary}</h3>
            <p className="txt1">{data?.summary}</p>

            <h3 className="tit1">{text.tag}</h3>
            <div className="txt1">
              <div className="lst_tag">
                {
                  getTagList()
                }
              </div>
            </div>

            <h3 className="tit1">{text.timeline_thumb}</h3>
            <div className="lst_comic2">
            <SwiperContainer 
              className={"mySwiper2"}
              slidesPerView={4}
              breakpoints={{
                0: {
                  slidesPerView: 3.2,
                  spaceBetween: 12,
                  },
                  960: {
                  slidesPerView: 4,
                  spaceBetween: 12,
                  },
                  1400: {
                  slidesPerView: 6,
                  spaceBetween: 16,
                  },
                }}
              list={getThumbList} />
            </div>

          </section>
        </div>
      </div>

    </Container>
  );
}



