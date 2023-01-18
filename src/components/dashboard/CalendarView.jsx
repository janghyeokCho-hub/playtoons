import { DATE_FORMAT } from "@/common/constant";
import { faCalendarDay } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ko, ja, enUS } from "date-fns/esm/locale";
import { useLayoutEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

/**
*
   Calendar component
   <CalendarView 
    name={"end"}
    className={"none"} 
    value={stateStartAt} 
    onChange={handleDate} />
*
* @version 1.0.0
* @author 2hyunkook
* @return
*/
export default function CalendarView(props) {
  const {
    name,
    className = '',
    value,
    isMaxDate = true,
    onChange,
  } = props;
  const [stateOpen, setStateOpen] = useState(false);
  const [stateLanguage, setStateLanguage] = useState(ja);
  const {i18n} = useTranslation();

  const getLanguage = () => {
    switch (i18n.language) {
      case 'ko-KR':
        return ko;
      case 'en-US':
        return enUS;
      default:  //ja-JP
        return ja;
    }
  };

  useLayoutEffect(() => {
    setStateLanguage( getLanguage() );
  }, [i18n.language]);
  //==============================================================================
  // render
  //==============================================================================

  return (
    <div className={`inp_cal`}>
      <div className="relative">
        <FontAwesomeIcon
          className={`cal_ico ${stateOpen ? "cal_blue" : ""}`}
          icon={faCalendarDay}
        />
        <DatePicker
          locale={stateLanguage}
          className={`inp_txt calendar datepicker_last ${className}`}
          selected={value}
          maxDate={isMaxDate ? new Date() : undefined}
          onCalendarOpen={() => setStateOpen(true)}
          onCalendarClose={() => setStateOpen(false)}
          onChange={(date) => onChange(name, date)}
          dateFormat={DATE_FORMAT}
        />
      </div>
    </div>
  );
};
