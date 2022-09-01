import React from "react";
import styled from "styled-components";
import CategoryCard from "@COMPONENTS/landingpage/CategoryCard";

const CategoryList = ({ list }) => {
  return (
    <CategoryDiv>
      <CategoryTitle>カテゴリー</CategoryTitle>
      <CategoryItemsDiv>
        {list.map((data, index) => (
          <CategoryCard
            key={`category_${index}`}
            bgImgSrc={data.bgImgSrc}
            bgColor={data.bgColor}
            name={data.name}
          />
        ))}
      </CategoryItemsDiv>
    </CategoryDiv>
  );
};

const CategoryDiv = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`;

const CategoryTitle = styled.h1`
  font-family: var(--font-family-noto_sans_jp);
  color: var(--vulcan);
  font-size: var(--font-size-32px);
  letter-spacing: 5px;
  line-height: 46px;
  white-space: nowrap;
`;

const CategoryItemsDiv = styled.div`
  width: 1250px;
  height: auto;
  display: flex;
  flex: none;
  justify-content: start;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default CategoryList;
