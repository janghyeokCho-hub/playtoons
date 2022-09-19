import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-solid-svg-icons';

import '@/css/test.css';          //사용자 css

/**
*
   Slick Arrow
*
* @version 1.0.0
* @author 2hyunkook
* @param {icon, customClass} props
*/
function Arrow(props) {
  const { className, style, onClick, customClass, icon } = props;
  return (
    <div
      className={`${className} ${customClass}`}
      style={{ ...style}}
      onClick={onClick} >
        <FontAwesomeIcon className={"slick_arrow_icon"} icon={icon} />
    </div>
  );
}

/**
* 
   <Slick 
    list={tempTimeline} 
    handleItemClick={handleSlideClick} />
*
* @version 1.0.0
* @author 2hyunkook
* @param {list} props slide list
*/
export default function Slick(props) {
  const { handleItemClick } = props;

  const sliderSetting = {
    slide: 'div',         //slide tag 지정
    className : "timeline_slick_container",
    infinite: true,       //loop 설정
    speed: 500,         
    slidesToShow: 5,      //화면에 보여질 slide 수
    slidesToScroll: 1,    //한번에 이동할 slide 수
    nextArrow: <Arrow customClass={"slick_arrow_container slick_arrow_next"} icon={faChevronRight} />,
    prevArrow: <Arrow customClass={"slick_arrow_container slick_arrow_prev"} icon={faChevronLeft} />,
    // variableWidth: true,     //slide수를 자동으로 결정
    respondTo : "window",     
    responsive: [ // 반응형 웹 구현 옵션
					{  
						breakpoint: 960, //화면 사이즈 960px
						settings: {
							slidesToShow: 3 
						} 
					},
				]
  };

  const handleClick = (item) => {
    console.log("handleItemClick", item);
    handleItemClick?.(item);
  };

  const getList = () => {
    return props?.list?.map((item, i) => {
      return <div key={i}>
              <div 
                className="timelins_slick_box" 
                onClick={() => {
                  handleClick(item);
                }} >

                  {item.image}

              </div>
            </div>;
    });
  };

  return (
    <Slider {...sliderSetting}>
      {getList()}
    </Slider>
  )
}