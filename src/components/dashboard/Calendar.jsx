import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from "@fortawesome/pro-duotone-svg-icons";
import moment from 'moment';
import { useRef } from 'react';
import useOutSideClick from '@/common/useOutSideClick';
import { useEffect } from 'react';

export default function Calendar(props, ref) {
  const [stateDate, setStateDate] = useState(undefined);
  const [stateShow, setStateShow] = useState(false);
  const refContainer = useRef();

  const getInitDate = () => {
    console.log('getInitDate');
    const now = new Date();
    if(props.type === 'now'){
      return now;
    }
    else{ //-1month
      return  new Date(now.setMonth(now.getMonth() - 1)) ;
    }
  };
  

  const handleClick = (event) => {
    setStateShow(prev => !prev);
  };

  const handleClickDate = (date) => {
    setStateShow(prev => !prev);
    setStateDate(date);
  };

  useEffect(() => {
    setStateDate(getInitDate());
  }, []);

  return (
    <div className="relative" ref={refContainer}>
      <div className="btn-pk s blue2 calendar-text" onClick={handleClick}>
        <FontAwesomeIcon className="fs14 mr12" icon={faCalendarDay} />{moment(stateDate).format("YYYY/MM/DD")} 
      </div>
      {
        stateShow &&  <ReactCalendar 
                        className={"calendar-popup"} 
                        onChange={handleClickDate} 
                        value={stateDate} 
                        maxDate={new Date()} 
                        formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
                        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                        />
      }
    </div>
  )
}
