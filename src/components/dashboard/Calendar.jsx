import moment from "moment";
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useState } from "react";

import { DATE_FORMAT } from "@/common/constant";
import CalendarView from "./CalendarView";
import { getInitDateObject } from "@/common/common";

/**
*
   Calendar component
   <Calendar 
    ref={refCalendarEnd}
    name={"end"}
    type={"none"} 
    callback={handleClickCalendar} />
*
* @version 1.0.0
* @author 2hyunkook
* @param type 'none', 'now', '3month', '1month', '1week', '1day' 타입만 정의 되어 있음. 필요하면 getInitDate에서 정의해서 사용
* @param callback 날짜를 선택했을 경우 callback
* @return
*/
export default forwardRef(function Calendar(props, ref) {
  const {
    type,
    name,
    callback,
    className = "",
    value,
    isMaxDate = true,
    onLoadState,
  } = props;
  const [stateDate, setStateDate] = useState(undefined);

  //==============================================================================
  // function
  //==============================================================================
  const getStateDateFormated = () => {
    if (stateDate === undefined) {
      return "";
    }

    return moment(stateDate).format(DATE_FORMAT);
  };

  //==============================================================================
  // event
  //==============================================================================
  const handleClickDate = (name, date) => {
    if (callback === undefined) {
      setStateDate(date);
    } else {
      if (callback?.(name, date)) {
        setStateDate(date);
      }
    }
  };

  //==============================================================================
  // hook
  //==============================================================================
  useImperativeHandle(ref, () => ({
    getDate: () => {
      return stateDate;
    },
    getDateFormatted: () => {
      return getStateDateFormated();
    },
  }));
  
  useLayoutEffect(() => {
    setStateDate(value || getInitDateObject(type));
  }, [value]);

  useEffect(() => {
    onLoadState?.(name, stateDate);
  }, [stateDate]);
  //==============================================================================
  // render
  //==============================================================================

  return (
    <CalendarView
      name={name}
      className={className}
      value={stateDate}
      isMaxDate={isMaxDate}
      onChange={handleClickDate}
      />
  );
});
