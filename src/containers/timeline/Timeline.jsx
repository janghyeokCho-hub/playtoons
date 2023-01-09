import React, { useState, useCallback, useEffect } from "react";
import { getTimeline as getTimelineAPI } from "@API/timelineService";
import TimelineItems from "@COMPONENTS/timeline/TimelineItems";
import { useDispatch } from "react-redux";
import { initRefreshAction, initTimelineAction } from "@/modules/redux/ducks/timeline";

const Timeline = () => {
  const [timelines, setTimelines] = useState([]);
  const dispatch = useDispatch();

  const getTimeline = useCallback(async () => {
    const response = await getTimelineAPI();
    if (response?.status === 200) {
      setTimelines(response.data?.timeline);
    }
  }, []);

  useEffect(() => {
    getTimeline();

    return () => {
      dispatch( initRefreshAction() );
      dispatch( initTimelineAction() );
    }
  }, []);

  return (
    <div className="contents">
      <div className="wrap_timeline">
        <TimelineItems items={timelines} />
      </div>
    </div>
  );
};

export default Timeline;
