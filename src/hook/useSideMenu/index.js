import React, { useState, useEffect, useCallback } from "react";
import useWindowSize from "@/hook/useWindowSize";

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

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowSize?.width <= 960) {
      wrapRef.current?.classList?.remove("open");
    }
  }, [windowSize, wrapRef]);

  return {
    isSideMenuShow,
    handleChange,
  };
}
