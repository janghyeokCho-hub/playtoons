import React, { useState,  useImperativeHandle, forwardRef  } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from "@fortawesome/pro-duotone-svg-icons";
import moment from 'moment';
import { useRef } from 'react';
import { useEffect } from 'react';
import { DATE_FORMAT } from '@/common/constant';

//temp
import '@/css/test.css';

/**
*
   Calendar component
*
* @version 1.0.0
* @author 2hyunkook
* @param type 'none', 'now', '-1month' 두개 타입만 정의 되어 있음. 필요하면 getInitDate에서 정의해서 사용
* @param callback 날짜를 선택했을 경우 callback
* @return
*/
export default forwardRef( function Calendar(props, ref) {
  const { type, name, callback } = props;
  const [stateDate, setStateDate] = useState(undefined);
  const [stateShow, setStateShow] = useState(false);
  const refContainer = useRef();

  const getInitDate = () => {
    const now = new Date();
    if(type === 'now'){
      return now;
    }
    else if( type === '-1month' ){
      return  new Date(now.setMonth(now.getMonth() - 1)) ;
    }

    //none
    return undefined;
  };
  
  const getStateDateFormated = () => {
    if( stateDate === undefined ){
      return '';
    }

    return moment(stateDate).format(DATE_FORMAT);
  };

  const handleClick = (event) => {
    setStateShow(prev => !prev);
  };

  const handleClickDate = (date) => {
    setStateShow(prev => !prev);
    if( callback === undefined ){
      setStateDate(date);
    }
    else{
      if( callback?.(name, date) ){
        setStateDate(date);
      }
    }

  };

  
  useImperativeHandle(ref, () => ({
    getDate: () => {
      return stateDate;
    },
    getDateFormatted: () => {
      return getStateDateFormated();
    }
  }));

  useEffect(() => {
    setStateDate(getInitDate());
  }, []);

  return (
    <div className="relative" ref={refContainer}>
      <div className={`btn-pk s calendar-text ${stateDate !== undefined ? 'blue2' : ''}`} onClick={handleClick}>
        <FontAwesomeIcon className="fs14 mr12" icon={faCalendarDay} />{getStateDateFormated()} 
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
})