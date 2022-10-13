import React, { useState, useEffect, useCallback } from "react";

/**
 * Side menu hook
 * @param {useRef} wrapRef
 * @returns isSideMenuShow / handleChange
 */
export default function useSideMenu(wrapRef) {
  const [isSideMenuShow, setIsSideMenuShow] = useState(null);
  const handleChange = useCallback(() => {
    setIsSideMenuShow(!isSideMenuShow);
  }, [isSideMenuShow]);

  useEffect(() => {
    if (isSideMenuShow === null) {
      setIsSideMenuShow(true);
      wrapRef.current?.classList?.remove("open");
    } else if (isSideMenuShow === true) {
      wrapRef.current?.classList?.remove("open");
    } else if (isSideMenuShow === false) {
      wrapRef.current?.classList?.add("open");
    }
  }, [isSideMenuShow, wrapRef]);

  return {
    isSideMenuShow,
    handleChange,
  };
}
