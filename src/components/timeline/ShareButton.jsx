import { showPopup } from "@/common/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import SharePopup from "./SharePopup";

export default function ShareButton(props) {
  const { className, icon, item, children, onClick } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    onClick?.("loading");
    showPopup(
      dispatch,
      "シェアーする",
      <SharePopup title={`[${item.title}] ${item.outline}`} url={`${window.location.origin}/post/detail/${item?.type?.code}/${item?.id}`} />,
      () => onClick?.("init"),
      "pop_share"
    );
  };

  return (
    <>
      <button
        type="button"
        className={`${className}`}
        onClick={() => handleClick()}
      >
        <span className="i">
          <FontAwesomeIcon icon={icon} />
        </span>
        {children}
      </button>
    </>
  );
}
