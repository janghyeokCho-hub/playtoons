import React, {useEffect, useState} from "react";
import { useParams} from 'react-router-dom';
import { SwiperSlide } from "swiper/react";

import SwiperContainer from "@/components/dashboard/Swiper";
import Container from "@/components/dashboard/Container";

import tempImage from '@IMAGES/tmp_comic2.jpg';
import { getSeriesDetailFromServer } from "@/services/dashboardService";
import Image from "@/components/dashboard/Image";

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
  const [stateData, setStateData] = useState(undefined);
  const params = useParams('id');

  const getSeriesDetail = async () => {
    const {status, data} = await getSeriesDetailFromServer(params);
    console.log('getSeriesDetail', status, data);
    
    if( status === 200 ){
      
      setStateData({
        ...tempData,
        title: data.series.title,
        category: data.series.category,
        rating: data.series.rating,
        type: data.series.type,
        coverImage: data.series.coverImage,
        tags: data.series.tags,
        description: data.series.description
      });
    }
    else{
      
    }
    
  };

  const renderThumbList = () => {
    return stateData?.thumbList?.map( (item, index) => {
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

  const renderTagList = () => {
    return stateData?.tags?.map( (item, index) => {
      return <div className="i_tag" key={index}>{item}</div>
    });
  };

  useEffect(() => {
    getSeriesDetail();
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
              <p className="cx_tit">{stateData?.title}</p>
              <div className="cx_thumb"><span><Image hash={stateData?.coverImage} alt="cover image" /></span></div>
              <ul className="cx_list">
                <li><span>{text.category} </span><span>{stateData?.category.name}</span></li>
                <li><span>{text.grade} </span><span>{stateData?.rating}</span></li>
                <li><span>{text.status} </span><span>{stateData?.status}</span></li>
                <li><span>{text.type}  </span><span>{stateData?.type.name}</span></li>
              </ul>
            </div>

            <h3 className="tit1">{text.summary}</h3>
            <p className="txt1">{stateData?.description}</p>

            <h3 className="tit1">{text.tag}</h3>
            <div className="txt1">
              <div className="lst_tag">
                {
                  renderTagList()
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
              list={renderThumbList} />
            </div>

          </section>
        </div>
      </div>

    </Container>
  );
}



