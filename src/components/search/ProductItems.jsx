import ProductItem from "./ProductItem";
const ProductItems = ({ items }) => {
  return (
    <div className="lst_store1 widn">
      {items?.map((item, index) => (
        <ProductItem key={`product_item_${index}`} item={item} />
      ))}
    </div>
  );
};

export default ProductItems;
