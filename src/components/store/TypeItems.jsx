import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useFilePath from "@/hook/useFilePath";
import TypeItem from "./TypeItem";

const TypeItems = ({ selectTab, setSelectTab }) => {
  const productTypes = useSelector(({ store }) => store.productTypes);
  return (
    <ul className="inr-c">
      {productTypes?.map((item, index) => {
        return (
          <TypeItem
            key={`type_${index}`}
            item={item}
            selectTab={selectTab}
            setSelectTab={setSelectTab}
          />
        );
      })}
    </ul>
  );
};

export default TypeItems;
