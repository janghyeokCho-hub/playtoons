import React from "react";
import { useSelector } from "react-redux";
import EmptyDiv from "../dashboard/EmptyDiv";
import StoreItem from "./StoreItem";

const StoreItems = () => {
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);

  const renderStoreList = () => {
    if( !currentAuthor?.products || currentAuthor?.products.length === 0 ){
      return (
        <EmptyDiv
          className={'relative empty'}
          text={`商品がいません。`}
        />
      );
    }
    
    return currentAuthor?.products?.map((item, index) => {
      return (
        <StoreItem key={`item_${index}`} item={item} />
      );
    });
  };

  return (
    <div className="lst_store1 widn">
      {
        renderStoreList()
      }
    </div>
  );
};

export default StoreItems;
