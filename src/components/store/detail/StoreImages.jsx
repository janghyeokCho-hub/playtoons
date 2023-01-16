import useFilePath from "@/hook/useFilePath";

const ItemImage = ({ item }) => {
  const { filePath } = useFilePath(item.hash);
  console.log(filePath);
  return (
    <div className="cont_sd">
      <img src={filePath} alt="" />
    </div>
  );
};

const StoreImages = ({ images }) => {
  return images.map((image, index) => (
    <ItemImage key={`image_${index}`} item={image} />
  ));
};

export default StoreImages;
