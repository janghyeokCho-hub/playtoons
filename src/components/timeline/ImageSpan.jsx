import useFilePath from "@/hook/useFilePath";

export default function ImageSpan(props) {
  const { className = '', imagePath } = props;
  const { filePath, loading } = useFilePath(imagePath);

  return (
    <>
      {!loading && (
        <span className={className} style={{backgroundImage: `url(${filePath})`}}></span>
      )}
    </>

  )
}
